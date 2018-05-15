<template>
	<div class="playing">
		<div class="playing-bg" :style="{backgroundImage:'url(http://music.163.com/api/img/blur/'+playingSong.al.pic+'.jpg)'}">
			<!-- <svg width="100%" height="100%" version="1.1" >
        		<defs>          
           			<radialGradient id="grey_blue" cx="40%" cy="50%" r="70%" fx="40%" fy="60%">
                		<stop offset="0%" style="stop-color:rgb(248,248,248); stop-opacity:.4"/>
                		<stop offset="100%" style="stop-color:rgb(248,248,250); stop-opacity:1"/>
            		</radialGradient>
        		</defs>
        		<rect  width="100%" height="100%" style="fill:rgba(0,0,0,.2);fill:url(#grey_blue)"/>
   			</svg> -->
		</div>
		<div class="playing-container">
			<div class="left" >
				<img src="/static/img/holder.png" class="holder" :class="{ onPlaying:isPlaying}">
				<div class="disc" :style="{transform:'rotate('+rotateDeg+'deg)',backgroundImage:'url('+playingSong.al.picUrl+')'}">
					<img src="/static/img/disc.png" class="song-pic"> <!--专辑图片 -->
				</div>
				<ul>
					<li><i class="iconfont icon-msnui-zoom-finger minimize"></i></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div class="right">
				<div class="song-inf">
					<h1>{{playingSong.name}}<span class="quality">320k</span></h1>
					<ul>
						<li>专辑:<span class="inf">{{playingSong.al.name}}</span></li>
						<li>歌手:<span class="inf">{{playingSong.ar[0].name}}</span></li>
						<li>来源:<span class="inf">阿里嘎多</span></li>
					</ul>
				</div>
				<div class="lyrics" ref="lyc_con" @mouseover="lycMoveCancel" @mouseout='lycMoveBegin'>
					<ul class="lrc-con" ref="lyc_ul" v-if="!nolyc">
						<li v-for="(lyric,time,index) in lyrics.lrc" :class="{playingx:index === (lyricIndex - 1)}" ref="lyrics">
							<div class='lrc'>{{lyric}}</div>
							<div class="tlrc" v-if="lyrics.tlrc">{{lyrics.tlrc[''+time+'']}}</div>
						</li>
					</ul>
					<div v-if="!nolyc">
						贡献者：{{lyrics.creator}}
					</div>
					<span v-if="nolyc">纯音乐，请您欣赏</span>
				</div>

				<div class="rightx">
					<i class="iconfont icon-msnui-zoom-finger minimize"  @click="min"></i>
					<i class="iconfont icon-xiangshangshouqi-yuankuang sup-icon "></i>
					<i class="iconfont icon-xiangxiazhankai-yuankuang sup-icon"></i>
					<i class="iconfont icon-wenhao sup-icon"></i>
				</div>				
			</div>
		</div>


	</div>
</template>

<script>
export default {
	name: 'listenList',
	props:{
		'song':{
			type:Object,
			default:() => {}
		}
	},
	data(){
		return {
			lyrics:{
				'lrc':{},
				'tlrc':{},
				'timeLine':[],
				'creator':'yomi',
			},
			rotateDeg:0,
			interval:null,
			lyricIndex:0,
			lyricScrollInterval:null,
			isLycMove:true,
			nolyc:false

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
		}
	},
	mounted(){
		this.beginInit()
	},
	methods:{
		lycMoveCancel(){
			this.isLycMove = false
		},
		lycMoveBegin(){
			this.isLycMove = true
		},
		beginInit(){
			this.audio.addEventListener('timeupdate', () => {
				if(!this.nolyc && this.isLycMove){
					var flagTime = this.lyrics.timeLine[this.lyricIndex]
					if(this.audio.currentTime > flagTime && this.audio.currentTime < this.lyrics.timeLine[this.lyricIndex+1]){//自然播放情况
						flagTime = this.lyrics.timeLine[this.lyricIndex++]
					// console.log('自然播放情况',this.lyricIndex);
					}else if(this.audio.currentTime > this.lyrics.timeLine[this.lyricIndex + 1]){//快进情况
						this.lyricIndex = this.searchNowIndex(this.lyrics.timeLine, this.audio.currentTime, this.lyricIndex, this.lyrics.timeLine.length)
					}else if(this.audio.currentTime < this.lyrics.timeLine[this.lyricIndex - 1]){//快退情况
						this.lyricIndex = this.searchNowIndex(this.lyrics.timeLine, this.audio.currentTime, 0, this.lyricIndex)
					}
				}
			})
		},
		transLyric(lyrics){
			if(!lyrics) return {}
			var lyc = {}
			var timeAndLyric = lyrics.split('\n')
			if(lyrics.indexOf('[by') > -1){
				timeAndLyric.shift()
			}
			var times = lyrics.match(/\d+:\d+.\d+/g)
			for(var i in times){
				var min = Number(String(times[i].match(/\d+/i)).slice(1)),
                sec = Number(String(times[i].match(/\:\d+.\d+/i)).slice(1));
            	var time = (min * 60 + sec).toFixed(2);
            	lyc[time] = timeAndLyric[i].replace(/\[.*\]/g,'')       	
			}
			return lyc;
		},
		lrcScroll(el,scrollPosition,time){
			if(scrollPosition > this.$refs.lyc_ul.offsetHeight - el.offsetHeight){//到底了
				scrollPosition = this.$refs.lyc_ul.offsetHeight - el.offsetHeight
			}else if(scrollPosition < 0){
				scrollPosition = 0
			}
			// clearInterval(this.lyricScrollInterval)
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
        min(el){
        	console.log('minimize',el.target);
        	this.$store.commit('minimize')
        }

	},
	watch:{
		isPlaying(val){
			if(val){
				clearInterval(this.interval)
				this.interval=setInterval(()=>{
					this.rotateDeg = (this.rotateDeg + 0.4) % 360
				}, 1000 / 60)
			}else{
				clearInterval(this.interval)
			}
		},
		lyricIndex(val,oldValue){
			if(this.isLycMove)
				this.lrcScroll(this.$refs.lyc_con, this.$refs.lyrics[val].offsetTop - 217, 400)	
		},
		playingSong(val){
			this.lyricIndex = 0
			this.lyrics = {
				'lrc':{},
				'tlrc':{},
				'timeLine':[],
				'creator':'yomi',
			}
			this.axios.get(`http://localhost:3000/lyric?id=${val.id}`).then(res=>{
				if(res.data.nolyric){//纯音乐
					this.nolyc = true
					return
				}else {
					this.nolyc = false
				}
				this.lyrics.lrc = this.transLyric(res.data.lrc.lyric)
				this.lyrics.tlrc = this.transLyric(res.data.tlyric.lyric)
				for(var key in this.lyrics.lrc){//时间线
					this.lyrics.timeLine.push(Number(key))
				}
				//歌词贡献者
				this.lyrics.creator = res.data.lyricUser.nickname || res.data.transUser.nickname || 'yomi'
				this.lyrics = Object.assign({}, this.lyrics)

			})
		}
	}
}
</script>



<style lang="scss" scoped>
/* eslint-disable */
@import '/style/global.scss';

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
	.playing-bg{
		background-image:url("http://music.163.com/api/img/blur/16629013858493883.jpg");
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size:100%;
		height:100%;
		width:100%;
		position:absolute;
		z-index:1;
		svg{
			position:absolute;
			left:0;top:0;
			z-index:1;
		}
	}
	.playing-container{
			// border:1px red solid;
		position:relative;
		// &:after{
		// 	content:"";
		// 	display:block;
		// 	width:100%;
		// 	height:100%;
		// 	position:absolute;
		// 	top:0;
		// 	left:0;
		// 	background-color:#EAEAEA;
		// 	opacity:0.4;
		// 	z-index:1
		// }
		background-color:transparent;
		z-index:2;

		width:$mainWidth;
		height:580px;
		margin:0 auto;
		position:relative;
		.left{
			z-index:2;
			width:50%;
			// border:1px black solid;
			float:left;
			height:100%;
			position:relative;
			.disc{
				background-image:url("http://p1.music.126.net/kQqkFAqZwOLTLKYDvupdRg==/3233663698631203.jpg");
				background-repeat:no-repeat;
				background-size:270px 270px;
				height:420px;
				width:420px;
				background-position:center center;
				position:relative;
				margin:0 auto;
				top:-130px;
				// &.rotating{
				// 	// transform:translateX(50px);
				// 	animation: ro 5s infinite  linear;
				// }
			}
			.holder{
				height:172px;
				width:115px;
				position:relative;
				top:-15px;
				transform:rotate(-40deg);
				transform-origin:8% 8%;
				z-index:0;
				transition:all .3s;
				z-index:5;
				&.onPlaying{
					transform:rotate(-15deg);
					top:-20px;
				}
			}
		}
		.right{
			z-index:2;
			position:relative;
			text-align:left;
			height:100%;
			width:40%;
			float:left;
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
				// border:1px red solid;
				ul {
					margin-top:20px;
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
				// border:1px black solid;
				border-right:2px rgb(207,206,208) solid;	
				height:435px;
				overflow-y:scroll;
				text-align:left;
				background-color:transparent;
				position:relative;
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
			}
		}


		.rightx{
			position:absolute;
			top:0;
			right:-25%;
			width:25%;
			height:100%;
			z-index:20;
			i{
				display:block;
				cursor:pointer;
				&.minimize{
					z-index:10000;
					color:rgb(102,102,102);
					text-align:center;
					width:40px;
					height:30px;
					line-height:30px;
					font-size:25px;
					border:1px rgb(207,206,208) solid;
					border-radius:5px;	
					position:absolute;
					background-color:rgb(251,251,251);
					right:30px;
					top:30px;
					&:hover{
						background-color:rgb(251,251,252)
					}
				}
				&.sup-icon{
					position:absolute;
					color:rgb(197,196,201);
					font-size:25px;
					left:5px;
					&:hover{
						color:rgb(191,192,197);
					}
					&.icon-xiangshangshouqi-yuankuang{
						top:145px;
					}
					&.icon-xiangxiazhankai-yuankuang{
						top:180px;
					}
					&.icon-wenhao{
						bottom:0;
					}
				}
			}
		}

		.song-pic{
			height:420px;
			width:420px;
			position:absolute;
			left:50%;
			// top:50px;
			transform:translateX(-50%);

		}
	}
}



// @keyframes ro{
// 	from{
// 		transform:rotate(0deg);
// 	}to{
// 		transform:rotate(360deg);
// 	}
// }

</style>