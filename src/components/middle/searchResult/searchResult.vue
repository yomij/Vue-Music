<template>
  <div class="search-result" >
    <p class="title">搜索<span class="bluefont">{{searchText}}</span>,找到{{resultCount}}</p>

	<ul class="nav">
	    <li class="normal" :class="{active:naxIndex === 0}" @click="">
	    	<router-link
	    	class="link" 
	    	:to="{name:'resultSong',query: {st: searchText}}">单曲</router-link>
		</li>
	    <li class="normal" :class="{active:naxIndex === 1}">
	    	<router-link 
	    	class="link" 
	    	:to="{ name: 'resultSinger', query: { st: searchText }}">歌手</router-link></li>
	    <li class="normal" :class="{active:naxIndex === 2}">
	    	<router-link 
	    	class="link" 
	    	:to="{ name: 'resultAlbum', query: { st: searchText }}">专辑</router-link></li>
	    <li class="normal" :class="{active:naxIndex === 3}">
	    	<router-link 
	    	class="link" 
	    	:to="{ name: 'resultSonglist', query: { st: searchText }}">歌单</router-link>
	    </li>
	    <li class="normal"  :class="{active:naxIndex === 4}">
	    	<router-link class="link" 
	    	:to="{ name: 'resultDJ', query: { st: searchText }}">主播电台</router-link>
	    </li>
	    <li class="normal" :class="{active:naxIndex === 5}"> 用户</li>
	</ul>
	<router-view :searchText="searchText" @count="setCount"></router-view>
	

  </div>

</template>
<script>

export default {
  name: 'searchResult',
  data(){ 
  	return { 
  		resultCount:'',
  		naxIndex: 0
  	}
  },
  computed:{
  	searchText(){
  		console.log(' this.$route.query.st',  this.$route.query.st);
  		return this.$route.query.st
  	}
  },
 created(){
 	let route = ['resultSong', 'resultSinger', 'resultAlbum', 'resultSonglist','resultDJ']
  	this.naxIndex = route.indexOf(this.$route.name)
 },
  methods: {
  	setCount(count){ 
  		this.resultCount = count
  	}
  },
  watch:{
  	'$route'(val){
  		let route = ['resultSong', 'resultSinger', 'resultAlbum', 'resultSonglist','resultDJ']
  		console.log(val);
  		this.naxIndex = route.indexOf(val.name)
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.search-result{
	.title{
		text-align: left;
		margin: 30px 0;
		padding-left: 40px;
	}
	.nav{
		width:100%;
		border-bottom:1px $mainRed solid;
		height:38px;
		
		padding:0 40px;
		position:relative;
		li{
			height:100%;
			float:left;
			// padding:0 15px;
			border:1px $border solid;
			color:#000;
			background-color:#fff;
			cursor:pointer;        
			line-height:36px;
			&.normal{
				min-width: 100px;
			  border-bottom:none;margin-right:8px;
			  &:hover{
			      background-color:rgb(245,245,247);
			  }		
			}
			&.active{
	          background-color:$mainRed;
	          color:#fff !important;
	          border:1px $mainRed solid;
	          border-bottom:none;
	          .link{
	          	color:#fff;
	          }
	          &:hover{
	              background-color:$mainRed;
	          }
	        }
	        .link{
	          	display: inline-block;
	          	width: 100%;
	          	height: 100%;
	          	color:#000;
	        }
		}
	}

}
</style>
