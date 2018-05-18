<template>
  <div class="singers" >
  	<div class="navs" @click="changeCat($event.target)">
  		<div class="language nav" >
  			<span>语种:</span>
  			<ul>
  				<li data-cat="5001"><a class="active">全部</a></li>
  				<li data-fcat="10"><a>华语</a></li>
  				<li data-fcat="20"><a>欧美</a></li>
  				<li data-fcat="60"><a>日本</a></li>
  				<li data-fcat="70"><a>韩国</a></li>
  				<li data-fcat="40"><a>其他</a></li>
  			</ul>
  		</div>
  		<div class="kind nav">
  			<span>分类:</span>
  			<ul>
  				<li data-cat="5001"><a class="active">全部</a></li>
  				<li data-lcat="01"><a>男歌手</a></li>
  				<li data-lcat="02"><a>女歌手</a></li>
  				<li data-lcat="03"><a>乐队组合</a></li>
  			</ul>
  		</div>
  		<div class="filter nav">
  			<span>筛选:</span>
  			<ul>
  				<li v-for="f in filter"><a :class="{active:f==='热门'}">{{ f }}</a></li>
  			</ul>
  		</div>
  	</div>
  	<ul class="singers-container" @click="showSingerInf">
  		<li class="list-cover" v-for="singer in singers">
			<div class="cover" :data-sid="singer.id" :style="{backgroundImage:'url('+ singer.picUrl + '?param=250y250)'}">
    		</div>
			<p class="title"><span :data-sid="singer.id">{{singer.name}}</span></p> 
		</li>
  	</ul>
  </div>
</template>
<script>

import request from '../../request/request'

export default {
  name: 'singers',
  data(){
  	return {
  		// language：[{'华语'}]
  		filter:['热门', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  		cat: '5001',
  		singers:[],

  	}
  },
  created(){
  	this.getSinger('5001');
  },
  methods: {
  	changeCat(node){
  		let dataset = node.dataset
  		console.log(dataset);
  		if(dataset.cat){
  			this.cat = dataset.cat
  			return
  		}
  		if(dataset.fcat){
  			 this.cat = dataset.fcat + this.cat.slice(-2)
  			 return 
  		}
  		if(dataset.lcat){
  			this.cat = this.cat.slice(0, 2) + dataset.lcat
  			return 
  		}
  		
  		this.changeCat(node.parentNode)
  		
  	},
  	showSingerInf(el){
  		let sid = el.target.dataset.sid
  		if(sid){
  			console.log(sid);
  			this.$router.push({ name: 'singerInf', query: { sid: sid }})
  		}
  	},
  	getSinger(cat){
  		request.artistList({
  			cat: cat
  		}).then(res => {
			this.singers = res.data.artists
  		})
  	}
  },
  watch:{
  	cat(val){
  		console.log(val);
  		this.getSinger(val)
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

@media screen and (min-width: 1300px) {
    .singers-container{
    	.list-cover{
    		width: 16.667% !important;
    	}
    }
}

.singers{
	.navs{
		padding: 15px 10px;
		border-bottom: 1px $border solid;
		margin: 10px 0;
		.nav{
			color:#7D7D7D;
			overflow: hidden;
			span{
				float: left;
				line-height: 25px;
				margin: 5px 0;
			}
			ul{
				height: 25px;
				line-height: 25px;
				position: relative;
			}
			li{
				// display: inline-block;
				margin: 5px 0;
				transform:translateY(2.5px);
				float:left;
				height: 20px;
				vertical-align: middle;
				padding: 0 15px;
				border-right: 1px $border solid;
				&:last-child{
					border:none;
				}
				a{
					cursor: pointer;
					transform:translateY(-2.5px);
					display: inline-block;
					line-height: 25px;
					// padding: 3px 5px;
					padding: 0 5px;
					border-radius: 3px;
					height: 25px;
					// background-color: red;
					&.active{
						background-color: $darkgray;
						color:#fff;
					}
				}
			}
		}
	}

	.singers-container{
			.list-cover{
		float:left;
		padding:0 10px;
  		width:20%;
  		transition:all .5s;
		.cover{
			cursor:pointer;
			width:100%;
	    	padding-bottom: 100%;
			height:100%;
			overflow:hidden;
			border:1px rgb(222,222,222) solid;
			position:relative;
			background-position:center;
			background-size:100% 100%;
	    	p{
			    &.playcount{
				    text-align:right;
				    width:60%;
				    position:absolute;
				    right:0;
				    padding:5px;
				    background:linear-gradient(left, transparent , rgba(0,0,0,.15));
				    color:#fff;
				    font-size:15px;
				    i{
				      	margin-right:5px;
				    }
				}
	    	}

	  	}
		p.title{
		  	cursor:pointer;
		    text-align:left;
		    width:100%;
		    height:80px;
		    padding:10px 0;
		    color:#515050;
		    &:hover{
				color:#000;
		    }
		}
	}
	}
}
</style>
