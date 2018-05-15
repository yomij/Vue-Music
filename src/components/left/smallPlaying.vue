<template>
	<div class="small-playing" @click.self="maximize">
		<div class="song-pic" :style="{backgroundImage:'url(' + playingSong.album.picUrl + ')'}">	
		</div>
		<ul class="song-inf">
			<li>{{playingSong.name}}</li>
			<li>{{playingSong.artists[0].name}}</li>
		</ul>
		<ul class="op">
			<li><i class="iconfont icon-cpxihuanxiantiao"></i></li>
			<li><i class="iconfont icon-fenxiang"></i></li>
		</ul>
	</div>
</template>

<script>
export default {
	name:'smallPlaying',
	computed:{
		playingSong(){
			let song = this.$store.state.playingSong
			if(song.hasOwnProperty('mainSong')){
				song = song.mainSong
				this.isDJ = true
				console.log('isDJ By playing');
			}
			return song
		}
	},
	methods:{
		maximize(el){
			console.log('maximize');
			this.$store.commit('maximize')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';

.small-playing{
	position:relative;
	width:$userMenuWidth;
	height:$smallPlayingHeight;
	background-color:$menuBgC;
	border-top:1px rgb(222,222,222) solid;
	border-right:1px rgb(222,222,222) solid;
	color:$lightFontColor;
	&:hover:after{
		position:absolute;
		left:0;
		top:0;
		display:block;
		font-family:"iconfont" !important;
		font-size:40px;
		text-align:center;
		line-height:$smallPlayingHeight;
		height:$smallPlayingHeight;
		width:$smallPlayingHeight;
		content:"\e60a";
		background-color:rgba(0,0,0,.2);
		color:rgb(201,200,199);
		cursor:pointer;
	}
	.song-pic{
		height:$smallPlayingHeight;
		width:$smallPlayingHeight;
		background-image:url("http://p3.music.126.net/qRLujNQhKMKGghAizcES3A==/109951163040746427.jpg");
		background-size:$smallPlayingHeight $smallPlayingHeight;
		position:absolute;
		left:0;
		top:0;
		border-right:1px rgb(222,222,222) solid;
	}
	ul li:hover{
		color:#585757;
	}
	ul.song-inf{
		padding:15px 10px;
		padding-right:0;
		width:120px;
		height:100%;
		margin-left:$smallPlayingHeight;
		li{
			cursor:pointer;
			text-align:left;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			&:first-child{
				font-size:18px;
				margin-bottom:5px;
			}
			&:last-child{
				width:50%;
			}
		}
		
	}
	ul.op{
		position:absolute;
		right:0;
		top:0;
		padding:8px;
		width:50px;
		height:100%;
		margin-left:$smallPlayingHeight;
		li{
			height:50%;
			text-align:left;
			line-height:30px;			
			i{
				font-size:22px;
				cursor:pointer;
			}
		}
		
	}
}
</style>