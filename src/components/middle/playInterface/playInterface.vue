<template>
	<div class="play-interface">
		<song-playing></song-playing>
		<div class="bottom-container">

			<div class="comments">
				<div class="write-comment">
					<div class="title">
						<h2>听友评论</h2><span class="grayfont">(已有{{total}}条评论)</span>
					</div>
					<div class="write-bg">
						<div class="write">
							<i class="iconfont icon-iconset0137"></i>发表评论
							<i class="iconfont icon-aite right"></i>
							<i class="iconfont icon-smiling right"></i>

						</div>
					</div>
				</div>
		
				<div class="brilliants" v-if="hotComments[0]">
					<div v-if="!dataReady">
						loading...
					</div>
					<div class="tag">
						精彩评论
					</div>
					<single-comment  v-if="dataReady" v-for="hotComment in hotComments" :comment="hotComment"></single-comment>

					<div class="more">
						查看更多精彩评论<i class="iconfont icon-jiantou	"></i>
					</div>
				</div>

				<div class="lately-comments">
					<div class="tag">
						最新评论({{ total }})
					</div>
					<single-comment  v-if="dataReady" v-for="comment in latelyComments" :comment="comment"></single-comment>
					<div class="page">
						<ul v-if="total > 20">
							<li class="tally-down icon" @click="tallyDown">
								<i class="iconfont icon-jiantou_zuo"></i>
							</li>
							<li :class="{num: pageNum && index !== nowPageIndex , active: index === nowPageIndex }"v-for="(pageNum,index) in pages" @click=pageChange(pageNum,index)>
								{{ pageNum ? pageNum : '...' }}
							</li>
							<li class="plus-one icon" @click="plusOne">
								<i class="iconfont icon-jiantou"></i>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="more-song-inf">
				<div class="songlist-which-contain">
					<h2 class="title">包含这首歌的歌单</h2>
					<ul>
						<li class="songlist" v-for="songlist in similarSongList">
							<img :src="songlist.coverImgUrl">
							<div class="list-inf">
								<p>{{songlist.name}}</p>
								<span class="grayfont">
									{{
										songlist.playCount > 100000 ? Math.floor(songlist.playCount / 10000)+'万' : songlist.playCount
									}}</span>
							</div>
						</li>
					</ul>
				</div>

				<div class="likely-song">
					<h2 class="title">相似歌曲</h2>
					<ul>
						<li v-for="similarSong in similarSongs">
							<p class="name">
								{{similarSong.name}}<span class="grayfont" v-if="similarSong.alias[0]">({{similarSong.alias[0]}})</span>
							</p>
							<p class="arts">{{similarSongArtists(similarSong.artists)}}</p>
						</li>
					</ul>
				</div>

				<div class="user-who-like">
					<h2 class="title">喜欢这首歌的人</h2>
					<ul>
						<!-- <li>我爱的人<span>(lllll	)</span></li> -->
					</ul>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>

import playing from './playing'
import singleComment from './singleComment'

export default {
	name:'comment',
	components:{
		'single-comment':singleComment,
		'song-playing':playing,
	},
	data(){
		return {
			hotComments:[],
			latelyComments:[],
			similarSongs:[],
			similarUsers:[],
			similarSongList:[],
			dataReady:true,
			total:0,
			pageCount:0,
			pages:[],
			nowPageIndex:0,
			nowPageNum:0
		}
	},
	computed:{
		playingSongId(){
			return this.$store.state.playingSong.id
		},
		maximize(){
			return this.$store.state.maximize
		}
	},
	methods:{
		similarSongArtists(arts){
			var names = ''
			for(let i in arts){
				names += (arts[i].name + ' ')
			}
			return names
		},
		transPage(num, index){
			var pages
			if(num < 6 || this.total < 200){
				this.nowPageIndex = index
				return [1, 2, 3, 4, 5, 6, 7, 8, 0, this.pageCount]
			}else if(num > this.pageCount - 6){
				pages = [1, 0]
				for(let i = this.pageCount - 7; i <= this.pageCount; i++)
					pages.push(i)
				this.nowPageIndex = 9 - (this.pageCount - num)
				console.log('this.nowPageIndex', this.nowPageIndex,"num",num);
			}else if(num >= 6 && this.total >= 200){
				pages = [1, 0]
				for(let i = num - 3; i <= num + 3; i++)
					pages.push(i)
				pages.push(0)
				pages.push(this.pageCount)
				this.nowPageIndex = 5
			}
			return pages
		},
		pageChange(num,index){
			
			if(this.nowPageNum === num) return
			else{
				this.nowPageNum = num
				if(this.total > 200) this.pages = this.transPage(num, index) //获取新的页码
				this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}&limit=20&offset=${num - 1}`).then(res =>{
					//更新数据
					this.latelyComments = []
					res.data.comments.map(comment => {
						this.latelyComments.push(comment)
					})
				})
			}
		},
		tallyDown(){
			if(!(this.nowPageNum - 1) ) return
			this.pageChange(this.nowPageNum - 1,this.nowPageIndex - 1)
		},
		plusOne(){
			if(this.pageCount === this.nowPageNum || !this.pageCount ) return
			this.pageChange(this.nowPageNum + 1,this.nowPageIndex + 1)
		}
	},
	watch:{
		maximize(val){
			if(val){
				// this.hotComments = []
			this.dataReady = false
			this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}`).then((res)=>{
				//获取评论
				this.hotComments = res.data.hotComments
				this.latelyComments = res.data.comments
				this.total = res.data.total
				this.pageCount = Math.ceil(this.total / 20)
				this.dataReady = true
				// console.log(JSON.stringify(res.data.comments));
			}).then(()=>{
				//获取相似歌单
				this.axios.get(`http://musicapi.leanapp.cn/simi/playlist?id=${this.playingSongId}`).then(res =>{
					this.similarSongList = res.data.playlists
				}).then(()=>{
					this.axios.get(`http://musicapi.leanapp.cn/simi/song?id=${this.playingSongId}`).then(res =>{
						this.similarSongs = res.data.songs
						console.log(JSON.stringify(this.similarSongs));
					})
				})
			})
			}
		},
		total(val){
			this.pages = []
			if(val< 200){
				for(let i = 1; i <= val / 20 + 1; i++)
					this.pages.push(i)
			}else{
				this.pages = [1, 2, 3, 4, 5, 6, 7, 8, 0, this.pageCount]
			}
		}
	}
}	
</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';

.play-interface{
	height:100%;
	width:100%;
	overflow-y:scroll;
	text-align:left;
	background-color:$mainColor;
	z-index:200;

	.bottom-container{
		width:$mainWidth;
		position:relative;
		margin:0 auto;
		// margin-top:30px;
		padding:30px 95px;
		.tag{
			font-size:20px;
			border-bottom:1px rgb(207,206,208) solid;
			padding-bottom:10px;
			margin-bottom:5px;
		}
		.title{
			position:relative;
			left:0;
			h2{
				display:inline-block;
			}
			span{
				margin-left:15px;
			}
			border-bottom:1px rgb(207,206,208) solid;
			padding-bottom:10px;
		}
		.comments{
			position:absolute;
			width:700px;
			.write-comment{
				position:relative;
				.write-bg{
					position:relative;
					height:60px;
					width:100%;
					background-color:rgb(240,240,242);
					padding:12px;
					margin-top:15px;
					margin-bottom:30px;
				}
				.write{
					height:36px;
					width:100% -12;
					box-shadow:1px 1px 1px $clickGray;
					line-height:30px;
					font-size:18px;
					padding:5px;
					// border:1px $clickGray solid;
					background-color:#fff;
					// transform:scale(.9,.9)
					i{
						font-size:18px;
						line-height:30px;
						margin-right:8px;
						&.right{
							float:right;
						}
					}
				}
				
			}
			
			.brilliants{
				.more{
					font-size:20px;
					width:100%;
					text-align:center;
					margin:30px 0;
					i{
						font-size:20px;
					}
				}
			}


			.lately-comments{

				.page {
					text-align:center; //居中
					width:100%;
					min-height:60px;
					ul{
						margin:30px 0;
						display: inline-block; //居中
   						overflow: auto; //居中
						min-height:30px;
						text-align:center;
						min-width:90px;
						li {
							display: inline; //居中
							float:left; //居中
							margin:0 5px;
							height:30px;
							min-width:30px;
							text-align:center;
							line-height:30px;
							border:1px transparent solid;
							color:#585858;

							&.num:hover{
								background-color:rgb(240,240,242);
								border:1px rgb(207,206,208) solid;
								color:black;
								cursor:pointer;
							}
							&.active{
								text-decoration:underline;
								color:$mainRed;
							}
							&.icon{
								border:1px rgb(207,206,208) solid;
								cursor:pointer;
								i{
									font-size:20px;
								}
								&:hover{
									background-color:rgb(240,240,242);
								}
							}
						}
					}

				}
			}

		}
		.more-song-inf{
			position:absolute;
			right:95px;
			width:310px;
			.songlist{
				height:60px;
				width:100%;
				position:relative;
				&:hover{
					background-color:rgb(236,237,238);
				}
				img{
					height:50px;
					width:50px;
					position:relative;
					top:5px;
					border:1px rgb(207,206,208) solid;
				}
				.list-inf{
					position:absolute;
					left:60px;
					top:10px;
					p{
						margin-bottom:5px;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
				}
			}

			.likely-song{
				margin-top:50px;
				ul li{
					height:35px;
					line-height:35px;
					cursor:pointer;
					&:hover{
						background-color:rgb(236,237,238);
					}
					p{
						display:inline-block;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						&.name{
							width:220px;
						}
						&.arts{
							width:85px;
						}
					}
				}
			}

			.user-who-like{
				margin-top:50px;
			}
		}
	}
}
	
</style>