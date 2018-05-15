<template>
  <div class="about" v-if="isShow">
  	<div class="main">
  		<div class="headline">
  			<h3>Vue-Music 仿写网易云音乐</h3>
  			<i class="close"></i>
  		</div>
  		<div class="content">
  			<ul class="func">
  				<li>1.搜索<br>
					包括1.单曲,2.歌单,3.电台的搜索
  				</li>
  				<li>2.搜索<br>
					包括1.单曲,2.歌单,3.电台的搜索
  				</li>
  			</ul>
  			<p class="entry">
  				Power by 网易云音乐 官网<a href="http://music.163.com/">http://music.163.com/</a><br>
  				网易云音乐 NodeJS 版 API<a href="http://musicapi.leanapp.cn/">http://musicapi.leanapp.cn/</a>
  			</p>
  			<p>
  				本作品仅做个人学习使用
  				github地址<a href=""></a>
  			</p>
  		</div>
  		<div class="extra">
  			<p>By Yomi</p>
  			<p><i>syomijp@gmail.com</i></p>
  		</div>
  	</div>
  </div>
</template>
<script>
export default {
  name: 'about',
  props: {
  	isShow:false
  },
  computed:{
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../style/global.scss';
.about{
	box-sizing:context-box !important;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,.5);
	position: absolute;
	top:0;
	z-index: 10000;
	.main{
		text-align: left;
		overflow: auto;
		padding:10px 15px;
		width: 640px;
		height: 80%;
		position: relative;
		top:10%;
		border-radius: 5px;
		box-shadow: 5px 5px 10px rgba(0,0,0,.6);
		background-color: rgba(255,255,255,.9);
		margin: 0 auto;
		.headline{
    height:50px;
    line-height:50px;
    // margin-top:20px;
    border-bottom:rgb(229,229,230) solid 1.2px;
    // margin:20px 10px;
	text-align: left;
  }
	}
}

</style>