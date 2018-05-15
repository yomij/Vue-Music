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
					<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
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
					<page :total="total" @pageChange="updateComment"></page>
				</div>
			</div>

			<div class="more-song-inf">
				<div class="songlist-which-contain">
					<h2 class="title">包含这首歌的歌单</h2>
					<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
					<ul v-if="dataReady">
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
					<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
					<ul v-if="dataReady">
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
import loader from '../../loader'
import page from '../../page'

export default {
	name: 'comment',
	components: {
		'single-comment': singleComment,
		'song-playing': playing,
		'loader': loader,
		'page': page
	},
	data () {
		return {
			hotComments: [],
			latelyComments: [],
			similarSongs: [],
			similarUsers: [],
			similarSongList: [],
			dataReady: true,
			total: 0
		}
	},
	computed: {
		playingSongId () {
			return this.$store.state.playingSong.id
		},
		maximize () {
			return this.$store.state.maximize
		}
	},
	methods: {
		similarSongArtists (arts) {
			var names = ''
			for(let i in arts){
				names += (arts[i].name + ' ')
			}
			return names
		},
		
		getData () {
			this.dataReady = false
			this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}`).then((res)=>{
				//获取评论
				this.hotComments = res.data.hotComments
				this.latelyComments = res.data.comments
				this.total = res.data.total
				this.dataReady = true
				// console.log(JSON.stringify(res.data.comments));
			}).then(()=>{
				//获取相似歌单
				this.axios.get(`http://musicapi.leanapp.cn/simi/playlist?id=${this.playingSongId}`).then(res =>{
					this.similarSongList = res.data.playlists
				}).then(() => {
					this.axios.get(`http://musicapi.leanapp.cn/simi/song?id=${this.playingSongId}`).then(res => {
						this.similarSongs = res.data.songs
						// console.log(JSON.stringify(this.similarSongs));
					})
				})
			})
		},
		updateComment (page) {
			this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}&limit=20&offset=${page - 1}`).then(res =>{

          		//更新数据
          		this.latelyComments = []
          		res.data.comments.map( comment => {
            		this.latelyComments.push(comment)
          		})
        	})
		}
	},
	watch:{
		maximize (val) {
			if (val) {
				this.getData()			
			}
		},
		playingSongId () {
			if (this.maximize) {
				this.getData()	
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