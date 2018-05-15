<template>
  <div class="result-songlist" @click="showPlaylist($event.target)">
  	<loader class="loader" v-if="!playlists.length"></loader>
    <ul class="songlists">
    	<li v-for="(playlist, index) in playlists" :data-lid="playlist.id">
    		<div class="list">
    			<img :src="playlist.coverImgUrl+'?param=60y60'">
    			<span v-html="playlist.name"></span>
    		</div>
    		<div class="list gray">
    			{{playlist.trackCount}}首
    		</div>
    		<div class="list">
    			<span class="grayfont">by</span>
    			<span class="nickname" v-html="playlist.creator.nickname"></span>
    		</div>
    	</li>
    </ul>
    <page
    class="page"
    :total="playlistCount"
    :onePageNum="30"
    @pageChange="searhSonglists"
    v-if="playlistCount"
    ></page> 
  </div>
</template>
<script>
import loader from '../../loader'
import page from '../../page'

import request from '../../../request/request'

export default {
  name: 'resultSonglist',
  components:{
  	'loader': loader,
  	'page': page
  },
  props: {
  	searchText:{
  		type: String,
  		default: '胡'
  	}
  },
  data(){
  	return {
  		playlists: [],
  		playlistCount: 0
  	}
  },
  created(){
  	this.searhSonglists()
  },
  methods: {
  	trans(s){
  		return s.replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`)
  	},
  	searhSonglists(page = 1){
  		let val = this.searchText
  		request.searchAll({
  			keywords: val,
  			type: 1000,
  			offset: (page - 1) * 30
  		}).then(res => {
  			// console.log(JSON.stringify(res.));
  			this.playlistCount = res.data.result.playlistCount
  			this.$emit('count', `${this.playlistCount}个歌单`)
            this.playlists = JSON.parse(JSON.stringify(res.data.result.playlists).replace(new RegExp(val, 'gm'), `<span style='color:#2EB7EB'>${val}</span>`))
  		})
  	},
  	showPlaylist(node){
  		if(node.className === 'result-songlist' || node.className ==='page'){
  			return
  		}else if(node.dataset.lid){
  			this.$router.push({name:'songlist',query:{id: node.dataset.lid}})
  		}else{
  			this.showPlaylist(node.parentNode)
  		}
  	}

  },
  watch:{
  	searchText(val){
  		console.log('searchText',val);
  		this.searhSonglists()
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.result-songlist{
	.loader{
		position: relative;
		top:40px;
	}
	.songlists{

		li{
			&:nth-child(even){
				background-color:$lightgray;
			}
			&:hover{
		        background-color: $hovergray;
		    }
			min-height: 70px;
			.list{
				padding:0 40px;
				text-align: left;
				height: 70px;
				line-height: 70px;
				float: left;
				&:nth-child(1){
					height: 70px;
					width: 51%;
					img{
						width: 50px;
						height: 50px;
						display: inline-block;
						vertical-align: middle;
						margin-right: 8px;
					}
				}
				&:nth-child(2){
					width: 14%;
				}
				&:nth-child(3){
					width: 35%;
					.nickname{
						color:#857F7F;
					}
					// .by{
					// 	@extend .gray;
					// 	margin-right: 5px
					// }
				}
			}

		}
	}

}
</style>
