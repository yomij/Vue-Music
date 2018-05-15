<template>
	<div class="user-menu">
		<ul @click.stop.capture="testx">
			<li class="subtitle">推荐</li>
			<li><i class="iconfont icon-15"></i>发现音乐</li>
			<li><i class="iconfont icon-15 selected"></i>私人FM</li>
			<li><i class="iconfont icon-MV"></i>MV</li>
			<li><i class="iconfont icon-pengyou"></i>朋友</li>
			<li class="subtitle">我的音乐</li>
			<li><i class="iconfont icon-tubiaozhizuomoban1"></i>本地音乐</li>
			<li><i class="iconfont icon-tubiaozhizuomoban"></i>下载管理</li>
			<li><i class="iconfont icon-yunyunpan"></i>我的音乐云盘</li>
			<li><i class="iconfont icon-geshou"></i>我的歌手</li>
			<li><i class="iconfont icon-MV"></i>我的MV</li>
			<li><i class="iconfont icon-guangboxianxing"></i>我的电台</li>
			<li class="subtitle">创建的歌单</li>
			<li v-show="createdSongListShow"><i class="iconfont icon-cpxihuanxiantiao"></i>我喜欢的音乐</li>
			<li v-show="createdSongListShow" v-for="list in songLists"><i class="iconfont icon-liebiao"></i>{{ list }}</li>
			<li class="subtitle">收藏的歌单</li>
			<li v-show="collectedSongListShow"></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'userMenu',
	data(){
		return {
			options:[],
			createdSongListShow:true,
			collectedSongListShow:true,
			songLists:["a","b","c"]
		}
	},
	mounted(){
		this.options = document.querySelectorAll(".userMenu ul li")
	},
	methods:{
		testx(el){

			var selected = el.target.tagName ==="LI" ? el.target : el.target.parentNode

			this.options.forEach( function(li) {
				if(!el.target.classList.contains('subtitle')){
					li.classList.remove('selected')
					if(li === selected){
						li.classList.add('selected')
					}
				}
			})

		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';

::-webkit-scrollbar-track{
	background-color: $menuBgC;
}

.user-menu{
	width:$userMenuWidth;
	height:100%;
	border-right:1px rgb(222,222,222) solid;
	overflow-y:scroll;

	background-color:$menuBgC;
	color:$lightFontColor;
	ul li{
		height:40px;
		// border:1px red solid;
		line-height:40px;
		text-align:left;
		padding-left:25px;
		cursor:pointer;
		&:hover{
			color:rgb(0,0,0);
		}

		&.subtitle{
			margin-top:12px;
			padding-left:15px;
			border-left:none;
			cursor:default;
			// background-color:$clickGray;
			&:first-child{
				margin-top:0;
			}
			&:hover{
				color:$lightFontColor;
			}
		}
		&.selected{
			background-color:$clickGray;
			color:rgb(0,0,0);
			border-left:4px $mainRed solid;
			padding-left:21px;
		}

		i{
			font-size:22px;
			margin-right:10px;
		}
	}
}

</style>