<template>
	<div class="ranging-list" >
		<div class="headline">
		    <h2>官方榜</h2>
		</div>
		<div class="official-ranking" @click="showSonglist">
			<ul>
				<li class="list-cover" v-for="rank in officialRank">
					<div class="cover" :data-id="rank.id" :style="{backgroundImage:'url('+ rank.picUrl +'param?250y250)'}">
		    		</div>
					<p class="title"><span :data-id="rank.id">{{rank.name}}</span></p> 
				</li>
			</ul>
		</div>
		<div class="headline">
		    <h2>全球榜</h2>
		</div>
		<div class="global-ranking" @click="showSonglist">
			<ul>
				<li class="list-cover" v-for="rank in globalRank">
					<div class="cover" :data-id="rank.id" :style="{backgroundImage:'url('+ rank.picUrl +'param?250y250)'}">
		    		</div>
					<p class="title"><span :data-id="rank.id">{{rank.name}}</span></p> 
				</li>
			</ul>
		</div>
	</div>

</template>
<script>
export default {
  name: 'ranging-list',
  props: {
  },
  data(){
  	return {
  		officialRank:[{
  			name:'飙升榜',
  			id:19723756,
  			picUrl:'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg'
  		},{
  			name:'新歌榜',
  			id:3779629,
  			picUrl:'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg'
  		},{
  			name:'原创榜',
  			id:2884035,
  			picUrl:'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg'
  		},{
  			name:'热歌榜',
  			id:3778678,
  			picUrl:'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg'
  		}],
  		globalRank:[{
  			name:'略略略电音榜',
  			id:1978921795,
  			picUrl:'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg'
  		},{
  			name:'略略略ACG音乐榜',
  			id:71385702,
  			picUrl:'http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg'
  		},{
  			name:'略略路日本Oricon周榜',
  			id:60131,
  			picUrl:'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg'
  		},{
  			name:'略略略古典音乐榜',
  			id:1978921795,
  			picUrl:'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg'
  		},{
  			name:'略略略UK排行榜周榜',
  			id:180106,
  			picUrl:'http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg'
  		},{
  			name:'略略路美国Billboard周榜',
  			id:60198,
  			picUrl:'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg'
  		},{
  			name:'略略略ITunes榜',
  			id:11641012,
  			picUrl:'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg'
  		},{
  			name:'啦啦啦中国TOP排行榜(港台榜)',
  			id:112504,
  			picUrl:'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg'
  		},{
  			name:'啦啦啦中国TOP排行榜(内地榜)',
  			id:64016,
  			picUrl:'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg'
  		}]
  	}
  },
  computed:{
  },
  methods: {
  	showSonglist(el){
  		let id = el.target.dataset.id
  		if(id){
  			this.$router.push({ name: 'songlist', query: { id: id }})
  		}
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';
.ranging-list{
	// padding: 0 30px;
	.headline{
	    height:50px;
	    line-height:50px;
	    // margin-top:20px;
	    border-bottom:rgb(229,229,230) solid 1.2px;
	    margin:20px 10px;
	    h2{
	      float:left;
	    }
	    p{
	      float:right;
	    }
  	}
  	.official-ranking{
  		overflow: auto;
  	}
	.list-cover{
		float:left;
		padding:0 10px;
  		width:20%;
  		max-width: 250px;
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
</style>