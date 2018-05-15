<template>
	<div class="playing">
		<div class="playing-bg" :style="{backgroundImage:'url(http://music.163.com/api/img/blur/'+playingSong.album.picId+'.jpg)'}" v-if="playingSong.id">
		</div>
		<div class="playing-container">
			<disc :pic="playingSong.album.picUrl" class="left"></disc>
			<div class="right">
				<div class="song-inf">
					<i class="iconfont icon-msnui-zoom-finger minimize" @click="minimize"></i>
					<h1>{{playingSong.name}}<span class="quality">320k</span></h1>
					<ul v-if="!DJProgram" class="si">
						<li>专辑:<span class="inf">{{playingSong.album.name}}</span></li>
						<li>歌手:<span class="inf">{{playingSong.artists[0].name}}</span></li>
						<li>来源:<span class="inf">{{source}}</span></li>
					</ul>
					<div v-if="DJProgram">
						<ul class="di">
							<li>主播:<span class="inf">{{DJProgram.dj.nickname}}</span></li>
							<li>来源:<span class="inf">{{DJProgram.radio.name}}</span></li>
						</ul>
						<div class="listen-count">
							{{DJProgram.radio.name}}
							<a>
								<i class="iconfont icon-xingxing1"></i>
								订阅({{DJProgram.radio.subCount < 100000 ? DJProgram.radio.subCount : (DJProgram.radio.subCount / 10000).toFixed(0)+'万'}})
							</a>
						</div>
						<p class="extra-inf">
							<span>创建时间：{{transTime()}}</span>
							<span>已播放：{{DJProgram.listenerCount < 100000 ? DJProgram.listenerCount : (DJProgram.listenerCount  / 10000).toFixed(0)+'万次'}}</span>
						</p>
					</div>
				</div>
				<div class="lyrics" :class='{sl:!DJProgram,dl:DJProgram}'>
					<div v-if="!DJProgram" class="simple-music">
						<div class="rightx" ref="lyc_con" @mouseover="lycMoveCancel" @mouseout='lycMoveBegin'>
							<ul class="lrc-con" ref="lyc_ul" v-if="!nolyc">
								<li v-for="(lyric,index) in lyrics.lrc" :class="{playingx:index === (lyricIndex - 1)}" ref="lyrics">
									<p class='lrc'>{{lyric[1]}}</p>
									<p class="tlrc" v-if="lyrics.tlrc">{{lyrics.tlrc[lyric[0]]}}</p>
								</li>
							</ul>
							<div v-if="!nolyc || lyrics.creator">
								贡献者：{{lyrics.creator}}
							</div>
							<span v-if="nolyc" class="nolyc">纯音乐，请您欣赏</span>
						</div>

						<div class="leftx">
							<i class="iconfont icon-xiangshangshouqi-yuankuang sup-icon "></i>
							<i class="iconfont icon-xiangxiazhankai-yuankuang sup-icon"></i>
							<i class="iconfont icon-wenhao sup-icon"></i>
						</div>
					</div>

					<div class="rightx" v-if="DJProgram">
						<span class="tip">{{DJProgram.radio.category}}</span>
						<span class="desc" v-if="descript" v-html="descript"></span>
					</div>

				</div>
			</div>
						
		</div>

	</div>
</template>

<script>
import disc from './disc'

import throttle from '../../../utility/throttle'
import time from '../../../utility/transTime'
import request from '../../../request/request'

export default {
	name: 'listenList',
	components:{
    	'disc': disc
  	},
	data(){
		return {
			lyrics:{
				'lrc':[],
				'tlrc':{},
				'timeLine':[],
				'creator':'yomi',
			},
			lyricIndex:0,
			lyricScrollInterval:null,
			isLycMove:true,
			nolyc:false,
			lycContainerHeight:0,
			DJProgram:null,
		}
	},
	computed:{
		isPlaying(){
			return this.$store.state.isPlaying
		},
		audio(){
			return this.$store.state.audio
		},
		playingSong(){
			return this.$store.state.playingSong
		},
		descript(){
	      if(this.DJProgram && this.DJProgram.description){
	        var des =new String(this.DJProgram.description)
	        return des.replace(/\n/g,'<br>')
	      }else{
	        return ''
	      }
    	},
    	source(){ 
    		return this.playingSong.source || '阿里嘎多'
    	}
	},
	mounted(){
		this.audio.addEventListener('timeupdate',throttle(this.searchNowLyric, 500))
	},
	methods:{
		transTime(){
			// console.log('test');
			return time.formatDate(this.DJProgram.createTime, '-')
		},
		lycMoveCancel(){
			if(this.isLycMove){
				this.isLycMove = false
			}
		},
		lycMoveBegin(){
			if(!this.isLycMove){
				this.isLycMove = true
			}
		},
		searchNowLyric(){
			if(!this.nolyc){
				let currentTime = this.audio.currentTime,
					flagTime = this.lyrics.timeLine[this.lyricIndex]
				if(currentTime > flagTime && currentTime < this.lyrics.timeLine[this.lyricIndex+1]){//自然播放情况
					flagTime = this.lyrics.timeLine[this.lyricIndex++]
				// console.log('自然播放情况',this.lyricIndex);
				}else if(currentTime > this.lyrics.timeLine[this.lyricIndex + 1]){//快进情况
					this.lyricIndex = this.searchNowIndex(this.lyrics.timeLine, currentTime, this.lyricIndex, this.lyrics.timeLine.length)
				}else if(currentTime < this.lyrics.timeLine[this.lyricIndex - 1]){//快退情况
					this.lyricIndex = this.searchNowIndex(this.lyrics.timeLine, currentTime, 0, this.lyricIndex)
				}
			}
		},
		transLyric(lyrics, isLyc = true){
			let i = 0,
				lyc = isLyc ?  [] :  {},
				timeAndLyric
			if (!lyrics) {
				return lyc
			}

			timeAndLyric = lyrics.split('\n')
			if (lyrics.indexOf('[by') > -1) {
				timeAndLyric.shift()
			}

			for (; i < timeAndLyric.length; i++) {
				let t = timeAndLyric[i].match(/\d+:\d+.\d+/g)
				if (t) {
					t.forEach(item => {
						let min = Number(String(item.match(/\d+/i)).slice(1)),
							sec = Number(String(item.match(/\:\d+.\d+/i)).slice(1)),
							time = (min * 60 + sec).toFixed(2)
						if(isLyc){
							lyc.push([time, timeAndLyric[i].replace(/\[.*\]/g, '')])
						}else{
							lyc[time] = timeAndLyric[i].replace(/\[.*\]/g, '')
						}						
					})
				}
			}
			if(isLyc){
				lyc.sort((a, b) => {
					return a[0] - b[0]
				})
			}
			
			return lyc
		},
		lrcScroll(el,scrollPosition,time){
			console.log("lrcScroll");
			if(scrollPosition > this.$refs.lyc_ul.offsetHeight - el.offsetHeight){//到底了
				scrollPosition = this.$refs.lyc_ul.offsetHeight - el.offsetHeight
			}else if(scrollPosition < 0){
				scrollPosition = 0
			}
			clearInterval(this.lyricScrollInterval)
			var nowTop = el.scrollTop 
			var moveLeagth = scrollPosition - nowTop
			var step = moveLeagth / time * 16.7 
			this.lyricScrollInterval = setInterval(()=>{
				el.scrollTop += step
				if(scrollPosition <= el.scrollTop && step > 0) {
					clearInterval(this.lyricScrollInterval)
				}else if(scrollPosition >= el.scrollTop && step < 0){
					clearInterval(this.lyricScrollInterval)
				}
			},16.7)	
		},
		searchNowIndex(arr, key, low, high) {//查找
            if(key < arr[0]){
            	return 0
            }else if(key > arr[arr.length - 1]){
            	return arr.length - 1
            }
            while(low <= high){
                var mid = parseInt((high + low) / 2);
                if(key < arr[mid] && key >= arr[mid - 1]){
                    return  mid - 1
                }else if(key > arr[mid] && key <= arr[mid + 1]){
                	return mid
                }else if(key <= arr[mid + 1]){
                	high = mid - 1
                }else if(key >= arr[mid - 1]){
                	low = mid + 1
                }
            }
        },
        minimize(){
        	this.$store.commit('minimize')
        }

	},
	watch:{
		lyricIndex(val,oldValue){
			var lis = this.$refs.lyrics
			if(this.isLycMove){
				this.lrcScroll(this.$refs.lyc_con, lis[val].offsetTop - 217, 400)	
			}
		},
		playingSong(val){
			this.lyricIndex = 0
			this.lyrics = {
				'lrc':[],
				'tlrc':[],
				'timeLine':[],
				'creator':'yomi',
			}
			if(!val.hasOwnProperty('programId') || val.album.company){ //普通音乐
				this.DJProgram = null
				request.lyric({
					id: val.id
				}).then(res=>{
					if(res.data.nolyric){//纯音乐
						console.log(res.data.nolyric+"纯音乐");
						this.nolyc = true
						return
					}

					this.nolyc = false
					this.lyrics.lrc = this.transLyric(res.data.lrc.lyric)
					this.lyrics.tlrc = this.transLyric(res.data.tlyric.lyric, false)
					this.lyrics.lrc.forEach(item => {
						this.lyrics.timeLine.push(Number(item[0]))
					});
					// console.log(JSON.stringify(this.lyrics.tlrc),res.data.tlyric.lyric,this.lyrics.timeLine);
					//歌词贡献者
					this.lyrics.creator = res.data.lyricUser && res.data.lyricUser.hasOwnProperty('nickname') ? res.data.lyricUser.nickname : res.data.transUser && res.data.transUser.hasOwnProperty('nickname ') ? res.data.transUser.nickname : ''

					this.lyrics = Object.assign({}, this.lyrics)

				})
			}else if(val.hasOwnProperty('programId')){ //DJ 电台节目
				this.nolyc = true
				console.log(val.programId);
				request.djProgramDetial({
					id:val.programId
				}).then(res => {
					this.DJProgram = res.data.program
					// this.DJProgram['description'] = this.DJProgram['description'].split('\n')
				})

			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';

::-webkit-scrollbar-track{
	display:none;
}

::-webkit-scrollbar{
	width: 10px;
	height: 10px;
	background-color: transparent;
}



::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: rgb(207,206,208);
	cursor: pointer;
	&:hover{
		background-color: rgb(191,192,197);
	}
}

.playing{
	position:relative;
	height:$userMenuHeight;
	width:100%;
	background-color:$mainColor;

	i.minimize{
		color:rgb(102,102,102);
		z-index: 100;
		text-align:center;
		width:40px;
		height:30px;
		line-height:35px;
		font-size:25px;
		border:1px rgb(207,206,208) solid;
		border-radius:5px;	
		position:absolute;
		background-color:rgb(251,251,251);
		right:0px;
		top:30px;
		&:hover{
			background-color:rgb(251,251,252)
		}
	}

	.playing-bg{
		background-image:url("http://music.163.com/api/img/blur/16629013858493883.jpg");
		background-position: center;
		background-repeat: no-repeat;
		// background-attachment: fixed;
		background-size:100%;
		height:100%;
		width:100%;
		position:absolute;
		z-index:1;
		// svg{
		// 	position:absolute;
		// 	left:0;top:0;
		// 	z-index:1;
		// }
		&:after{
			content:'';
			position:absolute;
			left:0;
			top:0;
			height:100%;
			width:100%;
			background:radial-gradient(ellipse closest-side at 49% 49%,rgba(208,208,208,.7),rgba(248,248,250,1));
		}
	}
	.playing-container{
			// border:1px red solid;
		position:relative;
		background-color:transparent;
		z-index:2;

		width:$mainWidth;
		height:580px;
		margin:0 auto;
		position:relative;

		.left{
			text-align:center;
			z-index:2;
			width:50%;
			float:left;
			height:100%;
			position:relative;
		}
		.right{
			width: 50%;
			text-align:left;	
			float:left;
			height:100%;
			position: relative;
			z-index:2;
			height:100%;
			.quality{
				border:2px #F06D6D solid;
				color:#F06D6D;
				font-size:16px;
				font-weight:100;
				margin-left:10px;
			}
			.song-inf{
				width:100%;
				height:145px;;
				padding:30px 0;
				.listen-count{
					margin: 20px 0;
					font-size: 20px;
					color:rgb(145,145,147);
					a{
						margin-left: 20px;
						color:#000;
						padding: 0 5px;
						display: inline-block;
						height: 27px;
						line-height: 27px;
						min-width: 100px;
						text-align: center;
						border:1px rgb(165,165,167) solid;
						border-radius: 5px;
						font-size: 16px;
						background-color: rgb(232,232,232);
						i{
							color:rgb(145,145,147);
						}
					}
				}
				.extra-inf{
					margin-top: 45px;
					span{
						margin-right: 20px;	
					}
				}
				ul {
					height:19px;
					
					&.si{
						margin-top:20px;	
					}
					&.di{
						margin-top:10px;	
					}
					li{
						float:left;
						width:160px;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						height:19px;
						margin-right:15px;
						&:last-child{
							margin-right:0;
						}
						.inf{
							color:#8571EA;
							margin-left:5px;
						}
						&:last-child{
							padding-right:0 !important;
						}
					}

				}
			}
			.lyrics{
				width:100%; 
				text-align:left;
				background-color:transparent;
				position:absolute;
				bottom: 0;
				&.sl{
					height:435px;
				}
				&.dl{
					height:355px;
				}
				.simple-music{
					position:relative;
					height:100%;
					width:100%;
				}
				div.rightx{
					width: 80%;
					border-right:1px rgb(207,206,208) solid;
					overflow-y:scroll;
					height:100%;
				}
				div.leftx{
					width: 20%;
					position: absolute;
					right: 0;
					height: 100%;
					top:0;
					i{
						display:block;
						cursor:pointer;
						
						&.sup-icon{
							position:absolute;
							color:rgb(197,196,201);
							font-size:25px;
							left:5px;
							&:hover{
								color:rgb(191,192,197);
							}
							&.icon-xiangshangshouqi-yuankuang{
								top:0px;
							}
							&.icon-xiangxiazhankai-yuankuang{
								top:35px;
							}
							&.icon-wenhao{
								bottom:0;
							}
						}
					}
				}
				ul.lrc-con li {
					min-height:30px;
					padding:8px 0;
					&.playingx{
						color:#fff;
						// min-height:30px;
						// background-color:transparent;
					}
					.lrc{
						font-size:18px;
						// color:#000;
					}
					.tlrc{
						font-size:17px;
						margin-top:5px;
					}
				}

				.nolyc{
					position:absolute;
					left:50%;
					top:50%;
					transform:translate(-60%,-50%);
					font-size:20px;
				}
				span.tip{
		          font-size:14px;
		          color:$mainRed;
		          border:1px $mainRed solid;
		        }
		        span.desc{
		        	font-size:18px;
		        }
			}
			
			
		}

	}
}
</style>
