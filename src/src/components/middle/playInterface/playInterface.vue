<template>
	<div class="play-interface">
		<song-playing></song-playing>
		<div class="bottom-container">

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

			<div class="comments">
		
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

			<div class="more-song-inf" v-if="!isDJ">
				<div class="songlist-which-contain">
					<h2 class="title">包含这首歌的歌单</h2>
					<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
					<ul v-if="dataReady">
						<li class="songlist" v-for="songlist in similarSongList" @click="songlistInf(songlist.id)">
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
						<li v-for="similarSong in similarSongs" @click="listen(similarSong)">
							<p class="name">
								{{similarSong.name}}<span class="grayfont" v-if="similarSong.alias[0]">({{similarSong.alias[0]}})</span>
							</p>
							<p class="arts">{{similarSongArtists(similarSong.artists)}}</p>
						</li>
					</ul>
				</div>

				<div class="user-who-like" v-if="similarUsers.length">
					<h2 class="title">喜欢这首歌的人</h2>
					<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
					<ul v-if="dataReady">
						<li class="user" v-for="(user,index) in similarUsers">
          					<img :src="user.avatarUrl">
          					<span class="nickname">
          						{{user.nickname}}
          						<i class="iconfont"
          						v-if="user.gender"
          						:class="{'icon-82':user.gender === 1,'icon-nv':user.gender === 2}"></i>
          					</span>
          					<span class="create-time">{{user.recommendReason}}</span>
    					</li>
					</ul>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>

import playing from './playing'
import singleComment from '../../singleComment'
import loader from '../../loader'
import page from '../../page'

import request from '../../../request/request'

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
			similarSongs: [],
			similarUsers: [],
			similarSongList: [],
			hotComments: [],
			latelyComments: [],
			dataReady: true,
			total: 0,
			commentsCache:{
				length:0
			},
			isDJ:false
		}
	},
	computed: {
		playingSong () {
			if(this.$store.state.playingSong.hasOwnProperty('programId')){
				this.isDJ = true
			}else{
				this.isDJ = false
			}
			console.log('playingSong Change');
			return this.$store.state.playingSong
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
		
		getData (id) {
			console.log('getData');
			this.dataReady = false
			if(!this.isDJ){
				this.axios.get(`http://47.100.63.34:3000/comment/music?id=${id}`).then((res)=>{
					console.log('get song comment',JSON.stringify(res.data));
					this.hotComments = res.data.hotComments
					this.latelyComments = res.data.comments
					this.total = res.data.total
					this.dataReady = true
					return this.axios.get(`http://47.100.63.34:3000/simi/playlist?id=${id}`)
				}).then((res)=>{
					//获取相似歌单
					this.similarSongList = res.data.playlists
					return this.axios.get(`http://47.100.63.34:3000/simi/song?id=${id}`)
				}).then((res) => {
					this.similarSongs = res.data.songs
					return this.axios.get(`http://47.100.63.34:3000/simi/user?id=${id}`)
				}).then((res) => {
					// this.similarUsers = res.data.userprofiles
					if(res.data.userprofiles){
						this.similarUsers = res.data.userprofiles
					}				 
				})
			}else{
				request.commentDj({
					id: id
				}).then((res)=>{
					console.log('get dj comment',JSON.stringify(res.data));
					this.hotComments = res.data.hotComments
					this.latelyComments = res.data.comments
					this.total = res.data.total
					this.dataReady = true
				})
			}
		
		},
		updateComment (page) {
			this.latelyComments = []
			if(page in this.commentsCache){
				this.latelyComments = this.commentsCache[page]
			}else{
				request.commentMusic({
					id: this.playingSong.id,
					limit: 20,
					offset:(page - 1) * 20
				}).then(res =>{
					console.log('请求更新评论');
	          		this.latelyComments = res.data.comments
	          		this.commentsCache[page] = this.latelyComments
        		})
			}
		},
		listen(song){		
			this.$store.commit('addSong',song)
		},
		songlistInf(id){
			this.$store.commit('minimize')
			console.log(id);
      		this.$router.push({ name: 'songlist',query:{id:id}})
    	}
	},
	watch:{
		maximize (val) {
			if(!this.isDJ){
				this.getData(this.playingSong.id)
			}else{
				this.getData(this.playingSong.programId)
			}
		},
		playingSong (val) {
			if (this.maximize) {
				console.log(val.programId);
				if(!this.isDJ){
					this.getData(val.id)
					this.commentsCache = {}	
				}else{
					this.getData(val.programId)
					this.commentsCache = {}	
				}
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
			// border-bottom:1px rgb(207,206,208) solid;
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

		.write-comment{
			float:left;
			position:relative;
			width:700px;
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
		.comments{
			position:absolute;
			width:700px;
			top:200px;
			
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
				li.user{
					cursor:pointer;
					&:hover{
						background-color:rgb(236,237,238);
					}
			        height:60px;
			        line-height:60px;
			        // margin:15px 0;
			        img{
			          	height:40px;
			          	width:40px;
			         	border-radius:50%;
			         	display:inline-block;
			         	vertical-align:middle;
			        }
			        span{
			          	display:inline-block;
			         	vertical-align:middle;
			          	color:#7F7E7E;
			          	overflow: hidden;
					  	text-overflow:ellipsis;
						white-space: nowrap;
			          	&:last-child{
			           		width:100px;
			           		text-align:right;
			          	}
			          	&.nickname{
			            	margin-left:10px;
			            	width:150px;
			            	i{
			            		&.icon-nv{
			            			color:#F771B7;
			            			font-size:17px;
			            		}
			            		&.icon-82{
			            			color:$bule;
			            		}

			            	}
			          	}
			        }
			    }
			}
		}
	}
}
	
</style>