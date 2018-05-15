<template>
  <div class="result-song"  @dblclick="listen($event.target)">
    <loader class="loader" v-if="!songs.length"></loader>
		<div class="songs" v-if="songs.length">
      <div class="filter">
        <div class="left">
          <div class="list index "></div>
          <div class=" list op">操作</div>
        </div>
        <div class="right">
          <div class="list title">音乐标题</div>
          <div class="list singer">歌手</div>
          <div class="list album">专辑</div>
          <div class="list duration">时长</div>
          <div class="list hot">热度</div>
        </div>
      </div>

      <div class="song" v-for="(song, index) in songs" :class="{single: index & 1}" :data-id="song.id">
        <div class="left">
          <div class="list index gray">{{index > 8 ? index + 1 : '0' + (index + 1)}}</div>
          <div class="list op gray">
            <i class="iconfont icon-cpxihuanxiantiao"></i>
            <i class="iconfont icon-xiazai"></i>
          </div>
        </div>
        <div class="right">
          <div class="list title">
          	<span v-html="song.name"></span>
			      <p><span v-if="song.alias[0]" class="grayfont" v-html="song.alias[0]"></span></p>
          </div>
          <div class="list singer"><span v-html="singers(song.artists)"></span></div>
          <div class="list album" ><span v-html="song.album.name"></span></div>
          <div class="list duration">{{getSongDuration(song.duration)}}</div>
          <div class="list hot">
          	<div class="bg">
          		<i class="bar"></i>
          	</div>
          </div>
        </div>
      </div>
	  </div>
    <page
    :total="songCount"
    :onePageNum="30"
    @pageChange="searhSongs"
    v-if="songCount"
    ></page>      
  </div>
</template>
<script>
import loader from '../../loader'
import page from '../../page'

import time from '../../../utility/transTime'
import request from '../../../request/request'

export default {
  name: 'resultSong',
  components:{
    'loader': loader,
    'page': page
  },
  props: {
  	searchText:{
  		type: String,
  		default: '我'
  	}
  },
  data(){
  	return {
  		songs: [],
  		songCount: 0
  	}
  },
  created(){
  	console.log('searchText',this.searchText);
  	this.searhSongs()
  },
  computed:{
  },
  methods: {
  	searhSongs(page = 1){
  		request.searchAll({
  			keywords: this.searchText,
  			type: 1,
        offset: (page - 1) * 30
  		}).then(res => {
        this.songCount = res.data.result.songCount
        this.$emit('count', `${this.songCount}首单曲`)
        this.songs = JSON.parse(JSON.stringify(res.data.result.songs).replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`))
  		})
  	},
  	singers(arr){
      return arr.map(art => {
        return art.name
      }).join('/')
    },
    getSongDuration(du){
    	return time.transDuration(du)
    },
    listen(node){
      if(node.className == 'song' || node.className == 'song single'){
        request.songInf({
          ids: node.dataset.id
        }).then(res => {
          console.log(JSON.stringify(res.data.songs[0]));
          let song = res.data.songs[0]
          this.$store.commit('addSong',{
            "name": song.name,
            "id": song.id,
            "alias": song.alia,
            "artists": [{
              "name": song.ar[0].name,
              "id": song.ar[0].id,
            }],
            "album": {
              "name":  song.al.name,
              "id": song.al.id,
              "picUrl":song.al.picUrl
            },
            "duration":song.dt
          })
        })
      }else {
        this.listen(node.parentNode);
      }
    },
  },
  watch:{
  	searchText(val){
  		console.log(val);
  		this.searhSongs()
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.result-song{
  .loader{
    position: relative;
    top: 40px;
  }
  .filter,.song{
    width:100%;
    min-height:38px;
    overflow: auto;
    padding-left:140px;
    position:relative;
    div{
      height:100%;
      line-height:38px;
      &.left{
        width:140px;
        position:absolute;
        left:0;
        float:left;
        div{
          width:70px;
          padding:0 10px;
          &.index{
            text-align:right;
          }
        }
      }
      &.right{
        width:100%;
        float:left;
        div{
          padding:0 10px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &.title{
            width:30%;
          }
          &.singer{
            width:15%;
          }
          &.album{
            width:25%;
          }
          &.duration{
            width:10%;
          }
          &.hot{
            width:20%;
            border-right:none;
            .bg{
              padding: 0;
              display: inline-block;
              vertical-align: middle;
              width: 100px;
              height: 6px;
              border-radius: 50px;
              background-color:rgb(224,224,224);
              .bar{
                display: inline-block;
                position: absolute;
                vertical-align: middle;
                width: 90px;
                height: 6px;
                border-radius: 50px;
                background-color: rgb(197,197,198);
                z-index: 5;
              }
            }
          }
        }
        
      }
      &.list{
        // min-width:60px;
        // width:20%;
        text-align:left;
        float:left;
        line-height:38px;
        padding-left:10px;
      }
    }
  }
  .filter{
    div.list{
      border-bottom:1px $border solid;
      border-right:1px $border solid;
    }
  }
  .song{
    &.single{
      background-color:$lightgray;
    }
    &.song-pick{
      background-color: $hovergray !important;
    }
    &:hover{
      background-color: $hovergray;
    }
  }
}

</style>
