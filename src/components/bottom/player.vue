<template>
	<div class="player">
		<div class="audio">
			<ul class="controls">
				<li class="pre" @click="preOrNextPlay(true)"><i class="iconfont icon-048caozuo_xiayishou" ></i></li>
				<li class="pauseAndPlay" @click="playAndPause" ><i class="iconfont" :class="{'icon-bofang':!isPlaying,'icon-zanting':isPlaying}"></i></li>
				<li class="next" @click="preOrNextPlay(false)"><i class="iconfont icon-048caozuo_xiayishou"></i></li>
			</ul>

			<div class="progressBar">
				<div class="currentTime">{{currentTime}}</div>
				<div class="progress" ref="progress" id="progress">
					<div class="bg" 
					@click="adjTimeByClick">
						<div class="nowProgress"
						:style="{width: progress + 'px'}"></div>
						<div class="slider" draggable="true"
						@dragstart="adjTimeBegin"
						@drag="adjTimeByMove"
						@dragend="adjTimeFinish"
						:style="{left:(progress - 7.5) + 'px'}"
						></div>
					</div>
				</div>
				<div class="totalTime">{{ duration }}</div>
			</div>

			<ul class="rightControl">
				<li class="soundIcon">
					<i class="iconfont"
					:class="{'icon-guanbiyinliang': !soundShow, 'icon-yinliangdaxiao': soundShow}"
					@click="mute"></i>
				</li>
				<li class="sound" ref="sound">
					<div class="bg"
					@mouseover="soundSliderShow"
					@mouseout="soundSliderHide"
					@click="adjSoundByClick"  >
						<div class="nowProgress"
						:style="{width:soundShow + 'px'}"></div>
						<div class="slider"
						v-show="isSoundSliderShow"
						:style="{left:(soundShow - 6) + 'px'}"
						draggable="true"
						@dragstart="adjSoundBegin"
						@drag="adjSoundByMove"
						@dragend="adjSoundFinish" ></div>
					</div>				
				</li>
				<li class="playTime" @click="modeChange">
					<i class="iconfont"
					@click="changeMode"
					:class="{'icon-liebiao1':playMode===0,'icon-xunhuan1':playMode===1,'icon-danquxunhuan':playMode===2,'icon-suijibofang':playMode===3}"></i>
				</li>
				<li class="lyricShow">
					<i>词</i>
				</li>
				<li class="playList" @click="listeningListShow">					
					<i class="iconfont icon-liebiao2"></i>
					<span>{{listeningList.length}}</span>					
				</li>
			</ul>
		</div>

		<div class="listenList" v-show="isSongListShow">
			<ul class="top">
				<li class="option left" :class="{active:isPlayList,notActive:!isPlayList}" @click="changeList('playlist')">播放列表</li>
				<li class="option right" :class="{active:!isPlayList,notActive:isPlayList}" @click="changeList('playrecord')">播放记录</li>
				<li class="close" @click="listeningListShow"><i class="iconfont icon-guanbi"></i></li>
			</ul>
			<div class="listInf">
				<span>共{{ listeningList.length }}首</span>
				<div class="listOper">
					<span><i class="iconfont icon-shoucang"></i>收藏全部</span>
					<span class="line"></span>
					<span><i class="iconfont icon-delete"></i>清空</span>
				</div>
			</div>
			<div class="tableContainer">
				<table cellspacing="0">
					<tr class="songInf" v-for="(song,index) in listeningList" :class="{double:index%2,songPick:index===playingIndex}" @dblclick="listen(song,index)" @click="songPicked(index)" >
						<td class="playSymbol"><i class="iconfont" :class="{'icon-bofang':playingIndex === index &&isPlaying,'icon-zanting':playingIndex === index && !isPlaying}"></i></td>
						<td class="songName">
							<p>{{song.name}}<span class="grayfont" v-if="song.alias[0]">({{song.alias[0]}})</span></p>
							<span class="quality">SQ</span></td>
						<td class="singer">{{song.artists[0].name}}</td>
						<td class="source"><i class="iconfont icon-fabu"></i></td>
						<td class="length">{{getSongDuration(song.duration/1000)}}</td>
					</tr>
				</table>
			</div>
		</div>

	</div>
</template>

<script>
import listenList from './listenList.vue'

import throttle from '../../utility/throttle'
import time from '../../utility/transTime'

export default {
	name: 'player',
	props:{
		music:{
			type:Object,
			default:() => {}
		}
	},
	data(){
		return {
			currentTime:'00:00',
			duration:'00:00',
			progress:0,//距离
			readyToMove:false,
			readyAdjSound:false,
			isSoundSliderShow:false,
			soundShow:12,
			playMode:0,//0 单曲循环
			isPlayList:true,
			isAdjing:false,
			isSongListShow:false,
			interval:null,
		}
	},
	created(){
		// this.test()
	},
	mounted(){
		this.audio.addEventListener("timeupdate", throttle(this.progressUpdate,500))
		this.audio.volume = .1
	},
	computed:{
		isPlaying(){ 
			return this.$store.state.isPlaying
		},
		playingSong(){
			return this.$store.state.playingSong
		},
		audio(){
			return this.$store.state.audio
		},
		listeningList(){
			return this.$store.state.listeningList
		},
		playingIndex(){
			console.log('playingIndex变化',this.$store.state.playingIndex);
			return Number(this.$store.state.playingIndex)
		}
	},
	methods:{
		playAndPause(){
			if(!this.isPlaying){
				this.play()
			}else{
				this.pause()
			}
		},
		play(){
			this.audio.play()
			this.$store.commit('play')	
		},
		pause(){
			this.audio.pause()
			this.$store.commit('pause')	
		},
		preOrNextPlay(isPre = false){//上一首
			var length = this.listeningList.length
			var index = this.playingIndex
			if(this.playMode != 3){
				if(length === 1){
					this.audio.currentTime = 0
    				this.play()
    				return
				}
				if(isPre){
    				if(index !== 0){
    					this.$store.commit('changePlayingIndex', index - 1)
    				}else{
    					this.$store.commit('changePlayingIndex', length - 1)
    				}
    			}else{
    				if(length - 1 !== index){
    					this.$store.commit('changePlayingIndex', index + 1)
    				}else{
    					this.$store.commit('changePlayingIndex', 0)
    				}
    			}
			}else{
				//随机
				var randomIndex = Math.floor(Math.random() * length)
    			while(randomIndex == this.playingIndex){
    				randomIndex = Math.floor(Math.random() * length)
    			}
    			this.$store.commit('changePlayingIndex', randomIndex)
			}
		},
		changeMode(){
			this.playMode = this.playMode++ % 4
		},
		progressUpdate(){
			if(!this.isAdjing){
    			this.currentTime = this.getSongDuration(this.audio.currentTime)
    			this.progress = (this.audio.currentTime / this.audio.duration ) * this.$refs.progress.offsetWidth //进度
    		}
    		if(this.audio.currentTime >= this.audio.duration){
    			let length = this.listeningList.length,
					index = this.playingIndex,
					mode = this.playMode

				if(length === index + 1){
					if(mode === 0){
						this.audio.currentTime = 0
	    				this.pause()
	    				return
					}else{
						this.audio.currentTime = 0
						this.play()
						return
					}
					
				}
    			switch(mode) {
    				case 0: //顺序播放
    					if(length - 1 !== index){
    						this.$store.commit('changePlayingIndex', index + 1)
    					}
    					break			
    				case 1://列表循环
    					if(length - 1 !== index){
    						this.$store.commit('changePlayingIndex', index + 1)
    					}else{
    						this.$store.commit('changePlayingIndex', 0)
    					}
    					break
    				case 2://单曲循环    				
    					this.audio.currentTime = 0
    					this.play()
    					// this.$store.commit('changePlayingIndex', this.playingIndex)
    					break
    				case 3://随机播放 
    					var randomIndex = Math.floor(Math.random() * length)
    					while(randomIndex == this.playingIndex){
    						randomIndex = Math.floor(Math.random() * length)
    					}
    					this.$store.commit('changePlayingIndex', randomIndex)
    					break
    			}
    		}
		},
		getSongDuration(t){
			return time.transDuration(t * 1000)
		},
		adjTimeByClick(el){
			this.progress=el.layerX
			this.audio.currentTime= (el.layerX / this.$refs.progress.offsetWidth) * this.audio.duration
			this.play()
		},
		adjTimeBegin(){
			if(this.playingSong.id){
				this.readyToMove = true
				this.isAdjing = true
			}

		},
		adjTimeFinish(el){
			if(this.readyToMove){
				this.audio.currentTime= (this.progress /  this.$refs.progress.offsetWidth) * this.audio.duration
				this.readyToMove = false
			}
			this.isAdjing = false
			this.play()
			
		},
		adjTimeByMove(el){
			var left = this.$refs.progress.getBoundingClientRect().left
			if(this.readyToMove && el.clientX > left && (el.clientX - left) < this.$refs.progress.offsetWidth){
				this.progress = el.clientX - left
			}
			el.cancelBubble = true

		},
		soundSliderShow(){
			this.isSoundSliderShow = true
		},
		soundSliderHide(){
			this.isSoundSliderShow = false
		},
		adjSoundBegin(){
			this.readyAdjSound = true
		},
		adjSoundByClick(el){
			this.soundShow = el.layerX
			this.audio.volume = el.layerX / this.$refs.sound.offsetWidth
		},
		adjSoundByMove(el){
			var left = this.$refs.sound.getBoundingClientRect().left
			if(this.readyAdjSound
				 && el.clientX > left){
				this.soundShow = el.clientX - left
			}
		},
		adjSoundFinish(el){
			if(this.readyAdjSound){ 
				this.readyAdjSound = false
				this.audio.volume = this.soundShow / this.$refs.sound.offsetWidth
			}	
		},
		mute(){
			if(this.soundShow != 0){
				this.audio.volume = 0
				this.soundShow = 0
			}else {
				this.audio.volume = .1
				this.soundShow = 12
			}
		},
		modeChange(){
			this.playMode = (this.playMode + 1) % 4
			console.log(this.playMode);
		},
		changeList(kind){
			if(kind === 'playlist'){
				this.isPlayList = true
			}else {
				this.isPlayList = false
			}
		},
		listen(song, index){
			this.$store.commit('changePlayingIndex',index)
			if(song == this.playingSong) return
			else{
				this.$store.commit('changePlayingSong',song)
			}
		},
		listeningListShow(){
			// console.log('test')
			this.isSongListShow ? this.isSongListShow = false : this.isSongListShow = true
		},
		songPicked(index){
			this.pickedSong = index
		},
		songPlay(){
			console.log('歌曲开始播放');
			this.audio.play()
			this.$store.commit('play')
		}
	},
	watch:{
		playingSong(val){
			this.audio.removeEventListener('durationchange',this.songPlay)
			console.log('歌曲准备播放');
			this.duration = this.getSongDuration(val.duration/1000)
			this.audio.src = `http://music.163.com/song/media/outer/url?id=${val.id}.mp3`
			// console.log(this.audio.src);
			this.audio.addEventListener('durationchange', this.songPlay)			
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';
@import '../../style/player.scss';
</style>