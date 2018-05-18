<template>
  <div class="singer-inf" >
    <div class="header" >
      <img :src="artist.img1v1Url + '?param=250y250'" >
      <div class="inf">
        <div class="title">
          <i class="icon">歌手</i><span class="name">{{artist.name}}</span>
          <p v-if="artist.alias">{{artist.alias[0]}}</p>
        </div>
<!--         <p class="creatInf">
          <img :src="djRadio.dj.avatarUrl">
          <span class="nickname">{{djRadio.dj.nickname}}</span>
        </p> -->
        <ul class="works">
          <li>
            单曲数：{{artist.musicSize}}
          </li>
          <li>
            专辑数：{{artist.albumSize}}
          </li> 
          <li>
            MV数：{{artist.mvSize}}
          </li> 
        </ul>

      </div>
    </div>

    <div class="main">
      <ul class="nav" >
        <li class="normal" 
        :class="{active:0 === activeIndex}">
          专辑
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}">
          MV
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}">
          歌手详情
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}">
          相似歌手
        </li>
      </ul>

      <div class="albums-container">
        <div class="hot">
          <div class="cover">
            <div class="bg">
              <p>Top</p>
              <p>50</p>
            </div>
          </div>
          <div class="songs-container">
            <div class="title">
              <span>热门{{hotSongs.length}}首</span>
              <div class="left-op gray">
                <i class="iconfont icon-shoucang"></i>
                <i class="iconfont icon-bofang1"></i>
              </div>
            </div>
            <ul @dblclick="listen($event.target)">
              <li v-for="(song,index) in hotSongs" v-if="index < nowListNum" :data-index="index">
                <div class="left">
                  <span class="list index gray">
                  {{ index + 1 > 9 ? index + 1 : `0${index + 1}` }}
                  </span>
                  <div class="list op gray">
                    <i class="iconfont icon-cpxihuanxiantiao"></i>
                    <i class="iconfont icon-xiazai"></i>
                  </div>
                </div>
                <div class="right">
                  <p class="list name" :class="{gray: !song.privilege}">
                    {{song.name}}<span class="grayfont" v-if="song.alias.length">({{song.alias.join('')}})</span>
                  </p>
                  <p class="list duration gray">
                    {{transDuration(song.duration)}}
                  </p>
                </div>
              </li>
            </ul>
            <a class="more gray" href="#" v-if="nowListNum < hotSongs.length" @click="showAllHot">
              查看全部{{hotSongs.length}}首<i class="iconfont icon-jiantou"></i>
            </a>
          </div>
        </div>
        
        <div class="headline">
          <h2>Albums</h2>
        </div>
        <ul class="albums">
          <li v-for="(album,index) in albums" :data-aid="album.id" :class="{'albums-s-flag': index === albums.length - 4}">
            <div class="list">
              <router-link :to="{path:'/albumInf',query:{aid:album.id}}">
                <img :src="album.picUrl + '?param=60y60'">
              </router-link>             
              <span v-html="album.name"></span>
            </div>
            <div class="list gray">
              {{album.size}}首
            </div>
            <div class="list gray">
              发行时间:{{transPublish(album.publishTime)}}
            </div>
          </li>
        </ul>        
      </div>

      
    </div>
  </div>
</template>

<script>
import singleComment from '../singleComment'
import loader from '../loader'
import page from '../page'

import request from '../../request/request'
import time from '../../utility/transTime'

export default {
  name: 'singer-inf',
  components:{
    'single-comment': singleComment,
    // 'loader': loader,
    // 'page': page
  },
  data(){
    return {
      artist: {},
      hotSongs: [],
      activeIndex: 0,
      nowListNum: 10,
      canPlayIndex: 0,
      albums: [],
      more: true,
      isReqing: false
    }

  },
  computed:{
    scrollTop(){
      return this.$store.state.scrollTop
    },
  },
  created() {
    let id = this.$route.query.sid 
    this.getSingerInf(id)
    this.getSingerAlbum(id,10,0)
  },
  methods: {
    getSingerInf(id){
      this.hotSongs= []
      request.artistInf({
        id: id
      }).then(res => {
        let hotSongsLength = res.data.hotSongs.length
        this.artist = res.data.artist
        this.canPlayIndex  = hotSongsLength
        res.data.hotSongs.forEach((song, index)=> {
          if(song.privilege.sp <= 0 && this.canPlayIndex === hotSongsLength){ //前面的为可以播放的
            this.canPlayIndex = index
          } 
          this.hotSongs.push({
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
              "picUrl": song.al.picUrl
            },
            "duration": song.dt,
            "privilege": song.privilege.sp,
            "source": this.artist.name
          })
        })
      })
    },
    getSingerAlbum(id, limit = 10, offset){
      if(this.more){
        request.artistAlbum({
          id: id,
          limit: limit,
          offset: offset
        }).then(res => {
          this.albums.push(...res.data.hotAlbums)
          this.more = res.data.more
          this.isReqing = false
        })
      }
    },
    transDuration(duration){
      return time.transDuration(duration)
    },
    transPublish(t){
      return time.formatDate(t, '-')
    },
    showAllHot(){
      this.nowListNum = this.hotSongs.length
    },
    listen(node){
      console.log('listen');
      let index = node.dataset.index 
      console.log(index);
      if(index > -1){ 

        if(this.hotSongs[index].privilege){
          console.log("添加列表", this.canPlayIndex);
          this.$store.commit('changeListeningList', this.hotSongs.slice(0, this.canPlayIndex))
          this.$store.commit('changePlayingIndex', index) 
        }else{ 
          alert("没得资源")
        }
        
      }else{ 
        this.listen(node.parentNode)
      }
    }
  },
  watch:{
    '$route' (to, from) {
      this.getSingerInf(to.query.sid)
    },
    scrollTop (val) {
      let flag = document.getElementsByClassName('albums-s-flag')[0];
      if(val + window.innerHeight - 120 > flag.offsetTop && !this.isReqing && this.more){
        this.isReqing = true
        setTimeout(() => {
          this.getSingerAlbum(this.$route.query.sid, 10, this.albums.length)
        }, 30)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.singer-inf{
  // border:1px red solid;
  margin-top: 30px;
  // padding:0 40px;
  background-color: $bgColor;
  width: 100%;
  position: relative;
  .header{
    min-height: 250px;
    width: 100%;
    text-align: left;
    position: relative;
    padding: 0 40px;
    img{
      height: 250px;
      width: 250px;
      display: inline-block;
      border: 1px $border solid;
      // float:left;
      position: absolute;
    }
    div.inf{
      // position:absolute;
      // width:100%;
      padding-left:280px;
      top:0;
      .title{
        // height:35px;
        line-height:35px;
        p{
          padding-left: 62px;
        }
        i.icon{
          display:inline-block;
          height:28px;
          line-height:28px;
          font-size:16px;
          color:#fff;
          background-color:$mainRed;
          font-style:normal;
          padding:0 5px;
          border-radius:4px;
        }
        span.name{
          font-size:28px;
          font-weight:bold;
          display:inline-block;
          height:28px;
          line-height:28px;
          margin-left:20px;
          vertical-align:middle;
        }
      }

      ul.works{
        // height:30px;
        margin-top: 20px;
        li{
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }

  .main{
    .nav{
      width:100%;
      border-bottom:2px $mainRed solid;
      height:38px;
      margin-top:30px;
      padding:0 40px;
      position:relative;
      li{
        min-width: 100px;
        height:100%;
        float:left;
        padding:0 15px;
        border:1px $border solid;
        color:#000;
        background-color:#fff;
        cursor:pointer;        
        line-height:36px;
        &.normal{
          border-bottom:none;margin-right:8px;
          &:hover{
              background-color:rgb(245,245,247);
          }
        }

        &.active{
          background-color:$mainRed;
          color:#fff;
          border:1px $mainRed solid;
          border-bottom:none;
          &:hover{
              background-color:$mainRed;
          }
        }
      }

    }

    .albums-container{
      padding: 0 40px;
    }
    
    .hot{
      margin: 15px 0;
      text-align: left;
      position: relative;
      width: 100%;
      padding-left: 265px;
      .cover{
        position: absolute;
        left: 0;
        width: 265px;
        .bg{
          width: 180px;
          height: 180px;
          position: absolute;
          background-color: rgb(53,53,53);
          left:0;
          padding: 20px;
          p{
            color:#fff;
            // font-weight: 700;
            
            width: 100%;
            &:first-child{
              font-size: 60px;
              text-align: center;
            }
            &:last-child{
              font-size: 60px;
              padding-right: 20px;
              text-align: right;
            }
          }
        }
      }
      .songs-container{
        width: 100%;
        position: relative;
        .title{
          overflow: hidden;
          height: 40px;
          line-height: 40px;
          .left-op{
            float: right;
            i{
              font-size: 20px;
              margin-left: 5px;
            }
          }
        }
        ul{
          border:1.5px $border solid;
          width: 100%;
          // overflow: auto;
          cursor: default;
          position: relative;
          li{
            // overflow: auto;
            padding-left: 120px;
            height: 32px;
            line-height: 32px;
            &:nth-child(2n){
              background-color: $lightgray;
            }
            .left{
              position: absolute;
              width: 120px;
              left:0;
              .index{
                width: 50px;
                padding:0 18px;
              }
              .op{
                width: 70px;
                i{
                  margin-right: 3px;
                  font-size: 18px;
                }
              }
            }
            .right{
              width: 100%;
              .name{
                width: 85%;
              }

            }
            .list{
              float: left;
            }
          }
        }
      }
      .more{
        display: inline-block;
        margin: 10px 0;
      }
    }

    .headline{
      height:50px;
      line-height:50px;
      // margin-top:20px;
      border-bottom:rgb(229,229,230) solid 1.2px;
      margin:20px 10px;
      h2{
        float:left;
      }
    }

    .albums{
      border:1.5px $border solid;
      li{
        padding: 0 20px;
        &:nth-child(even){
          background-color:$lightgray;
        }
        &:hover{
              background-color: $hovergray;
          }
        min-height: 70px;
        .list{
          // padding:0 40px;
          text-align: left;
          height: 70px;
          line-height: 70px;
          float: left;
          &:nth-child(1){
            height: 70px;
            width: 50%;
            img{
              width: 50px;
              height: 50px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 8px;
            }
          }
          &:nth-child(2){
            width: 25%;
          }
          &:nth-child(3){
            width: 25%;
            .nickname{
              color:#857F7F;
            }
            // .by{
            //  @extend .gray;
            //  margin-right: 5px
            // }
          }
        }

      }
    }


  }

}

</style>
