<template>
	<div class="player">
		<div class="audio">
			<ul class="controls">
				<li class="pre" @click="preOrNextPlay(true,playMode)"><i class="iconfont icon-048caozuo_xiayishou" ></i></li>
				<li class="pauseAndPlay" @click="playAndPause" ><i class="iconfont" :class="{'icon-bofang':!isPlaying,'icon-zanting':isPlaying}"></i></li>
				<li class="next" @click="preOrNextPlay(false,playMode)"><i class="iconfont icon-048caozuo_xiayishou"></i></li>
			</ul>

			<div class="progressBar">
				<div class="currentTime">{{currentTime}}</div>
				<div class="progress" ref="progress">
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
					<div>
						<i class="iconfont icon-liebiao2"></i>
						<span>{{listeningList.length}}</span>
					</div>
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
						<td class="songName">{{song.name}}<span class="grayfont" v-if="song.alia[0]">({{song.alia[0]}})</span><span class="quality">sq</span></td>
						<td class="singer">{{song.ar[0].name}}</td>
						<td class="source"><i class="iconfont icon-fabu"></i></td>
						<td class="length">{{getSongDuration(song.dt/1000)}}</td>
					</tr>
				</table>
			</div>
		</div>

	</div>
</template>

<script>
import listenList from './listenList.vue'

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
			progressWidth:0
		}
	},
	created(){
		// this.test()
	},
	mounted(){
		this.audio.addEventListener("timeupdate", this.progressUpdate.bind(this))
		this.audio.volume = .1
		this.progressWidth =  this.$refs.progress.offsetWidth
		window.onresize = () =>{
			this.progressWidth =  this.$refs.progress.offsetWidth
		}
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
			return this.$store.state.playingIndex
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
		preOrNextPlay(isPre){//上一首
			var length = this.listeningList.length
			var index = this.playingIndex
			if(this.playMode != 3){
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
    			this.progress = (this.audio.currentTime / this.audio.duration ) * this.progressWidth //进度
    		}
    		if(this.audio.currentTime >= this.audio.duration){
    			var length = this.listeningList.length
				var index = this.playingIndex
    			switch(this.playMode) {
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
		trans(time){
			if(time<10){
    			return `0${Math.floor(time)}`
    		}else if(time<60){
    			return `${Math.floor(time)}`
    		}
		},
		getSongDuration(time){
			return `${this.trans(time / 60)}:${this.trans(time % 60)}`
		},
		adjTimeByClick(el){
			this.progress=el.layerX
			this.audio.currentTime= (el.layerX / this.progressWidth) * this.audio.duration
		},
		adjTimeBegin(){
			console.log('test')
			this.readyToMove = true
			this.isAdjing = true
		},
		adjTimeFinish(el){
			if(this.readyToMove){
				this.audio.currentTime= (this.progress /  this.progressWidth) * this.audio.duration
				this.readyToMove = false
			}

			this.isAdjing = false
			
		},
		adjTimeByMove(el){
			var left = this.$refs.progress.getBoundingClientRect().left
			if(this.readyToMove && el.clientX > left){
				this.progress = el.clientX - left
			}
			el.cancelBubble = true;
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
		// test(){
		// 	this.axios.get('http://musicapi.leanapp.cn/playlist/detail?id=24381625').then(res=>{
		// 		// console.log(res.data.playlist.tracks);
		// 		res.data.playlist.tracks.map( item => {
		// 			// console.log(item);
		// 			this.axios.get(`http://musicapi.leanapp.cn/music/url?id=${item.id}`).then(res=>{

		// 				item.url = res.data.data[0].url
		// 				console.log(item.url)
		// 				var au = new Audio(item.url)
		// 				au.addEventListener('canplay', ()=>{
		// 					item.songLength = this.getSongDuration(au.duration)
		// 					this.songList.push(item)
		// 					console.log(item.name);
		// 				})
		// 			})
		// 		})
		// 	})
		// },
		listen(song, index){
			// console.log(song.url)
			// this.audio.src = song.url
			// this.play()
			// this.duration = song.songLength
			// this.playingIndex = index
			this.$store.commit('changePlayingIndex',index)
			if(song == this.playingSong) return
			else{
				this.$store.commit('changePlayingSong',song)
			}
		},
		listeningListShow(){
			console.log('test')
			this.isSongListShow ? this.isSongListShow = false : this.isSongListShow = true
		},
		songPicked(index){
			this.pickedSong = index
		}
	},
	watch:{
		playingSong(val){
			console.log('歌曲准备播放');
			// console.log(JSON.stringify(val));
			this.duration = this.getSongDuration(val.dt/1000)
			this.audio.src = `http://music.163.com/song/media/outer/url?id=${val.id}.mp3`
			console.log(this.audio.src);
			this.audio.addEventListener('durationchange', ()=>{
				console.log('歌曲开始播放');
				this.audio.play()
				this.$store.commit('play')
			})
			
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';
@import '../../style/player.scss';
</style>