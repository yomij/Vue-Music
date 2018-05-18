<template>
  <div class="album-inf" v-if="album.id">
    <div class="header">
      <div class="img-con">
        <img :src="album.picUrl + '?param=250y350'" >
      </div>
      <div class="inf">
        <p class="title">
          <i class="icon">专辑</i>
          <span class="name">{{album.name}}</span>
          <span class="alias grayfont" v-if="album.alias.length">({{album.alias[0]}})</span>          
        </p>
        <ul class="operate">
          <li class="btn play" @click="playAll">
              <i class="iconfont icon-bofang1"></i>播放全部
          </li>
          <li class="btn add">
            <i class="iconfont icon-jiahao"></i>
          </li>
          <li>
            <i class="iconfont icon-shoucang"></i>收藏
          </li> 
          <li>
            <i class="iconfont icon-fenxiang"></i>分享
          </li> 
          <li>
            <i class="iconfont icon-tubiaozhizuomoban"></i>  下载全部
          </li> 
        </ul>
        <p class="singer">
          <span class="tip">歌手：</span><span>{{album.artist.name}}</span>
        </p>
        <p class="time">
          <span class="tip">时间：</span>
          <span >
            {{createdTime}}
          </span>
        </p>
      </div>
    </div>
    
    <div class="main">
      <ul class="nav">
        <li class="normal" 
        :class="{active:0 === activeIndex}"
        @click="nav(0)">
          歌曲列表
        </li>
        <li class="normal" :class="{active:1 === activeIndex}"
        @click="nav(1)">
          评论({{album.info.commentCount}})
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}"
        @click="nav(2)">
          专辑详情
        </li>
      </ul>

      
      <div class="songs" @dblclick="listen($event.target)">
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

        <div class="song" v-for="(song, index) in songs" :class="{single: index & 1}" :data-index="index">
          <div class="left">
            <div class="list index gray">{{index > 8 ? index + 1 : '0' + (index + 1)}}</div>
            <div class="list op gray">
              <i class="iconfont icon-cpxihuanxiantiao"></i>
              <i class="iconfont icon-xiazai"></i>
            </div>
          </div>
          <div class="right">
            <div class="list title">
              {{ song.name }}<span class="grayfont" v-if="song.alias[0]">({{ song.alias[0] }})</span>
            </div>
            <div class="list singer">{{ singers(song.artists) }}</div>
            <div class="list album" >{{ song.album.name }}</div>
            <div class="list duration">{{ getSongDuration(song.duration) }}</div>
            <div class="list hot">
              <div class="bg">
                <i class="bar" :style="{width: song.pop + 'px'}"></i>             
              </div>
            </div>
          </div>
        </div>
      </div>
      
<!--       <div class="comments" v-if="1 === activeIndex">

        <div class="write-comment">
          <div class="write-bg">
            <div class="write">
              <i class="iconfont icon-iconset0137"></i>发表评论
              <i class="iconfont icon-aite right"></i>
              <i class="iconfont icon-smiling right"></i>
            </div>
          </div>
        </div>
        
        <div class="brilliants" v-if="hotComments.length">         
          <div class="tag">
            精彩评论
          </div>
          <loader  :bgc="'#6A6969'" v-show="!dataReady"></loader>
          <single-comment  v-if="dataReady" v-for="hotComment in hotComments" :comment="hotComment"></single-comment>
        </div>

        <div class="lately-comments">
          <div class="tag">
            最新评论({{songlistInf.commentCount}})
          </div>
          <loader  :bgc="'#6A6969'" v-show="!dataReady"></loader>
          <single-comment  v-if="dataReady" v-for="comment in latelyComments" :comment="comment"></single-comment>
        </div>
        <page :total="total" @pageChange="updateComment"></page>
      </div> -->

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
  name: 'albumInf',
  components:{
    'single-comment': singleComment,
    'loader': loader,
    'page': page
  },
  data(){
    return {
      DES_HEIGHT:60,
      album: {},
      songs:[],
      activeIndex:0,
      hotComments: [],
      latelyComments: [],
      dataReady: true,
      total: 0,
      commentsCache:{},
    }
  },
  computed:{
    createdTime(){
      return time.formatDate(this.album.publishTime, '-')
    }
      
  },
  created(){ 
    this.getInf(this.$route.query.aid)
  },
  methods: {
    nav(index){
      console.log('test');
      this.activeIndex = index
      if(index === 1){//获取评论
        this.dataReady = false
        request.commentPlaylist({
          id: this.$route.query.id,
        }).then(res => {
          this.dataReady = true
          this.hotComments = res.data.hotComments
          this.latelyComments = res.data.comments
          this.total = res.data.total
        })
      }
    },
    // updateComment(page){
    //   this.dataReady = false
    //   if(page in this.commentsCache){
    //     this.hotComments = []
    //     this.latelyComments = this.commentsCache[page]
    //     return
    //   }
    //   request.commentPlaylist({
    //     id: this.$route.query.id,
    //     offset: (page - 1) * 20
    //   }).then(res => {
    //       this.dataReady = true
    //       this.hotComments = []
    //       this.latelyComments = res.data.comments
    //       this.total = res.data.total
    //       this.commentsCache[page] = this.latelyComments
    //   })
    // },
    listen(node){
      let index = node.dataset.index
      if(index){
        console.log('index');
        this.$store.commit('changeListeningList', this.songs)
        this.$store.commit('changePlayingIndex', index) 
      }else {
        this.listen(node.parentNode);
      }
    },
    playAll(){
      this.$store.commit('changeListeningList', this.songs)
      this.$store.commit('changePlayingIndex', 0)
    },
    singers(arr){
      return arr.map(art => {
        return art.name
      }).join('/')
    },
    getSongDuration(du){
      return time.transDuration(du)
    },
    getInf(id){
        request.album({
          id:id
        }).then(res => {
          // console.log(JSON.stringify(res.data));
          this.album = res.data.album
          console.log(JSON.stringify(this.album));
          
          res.data.songs.forEach((song, index) => {
            this.songs.push({
              "name": song.name,
              "id": song.id,
              "alias": song.alia,
              "pop": song.pop,
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
              "source": this.album.name
            })
          })         
        })
    },
    getSongDuration(t){
      return time.transDuration(t)
    },
  },
  watch:{
    '$route' (to, from) {
      let id = this.$route.query.aid
      // this.getInf(id)
    }   
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.album-inf{
  // border:1px red solid;
  margin-top:30px;
  // padding:0 40px;
  background-color:$bgColor;
  width:100%;
  position:relative;
  .header{
   
    min-height:250px;

    width:100%;
    text-align:left;
    position:relative;
    padding:0 40px;
    .img-con{
      float: left;
      height:240px;
        width:300px;
       background-image: url('http://s2.music.126.net/style/web2/img/coverall.png?5b7f8eede90d97b29158643ab0a73839');
       background-size:700px 2755px;
       background-position: 0px 1199px;
      img{
        height:240px;
        width:240px;
        display:inline-block;
        border:1px $border solid;
        // float:left;
        position:absolute;
      }
    }
    
    div.inf{
      // position:absolute;
      // width:100%;
      padding-left:300px;
      top:0;
      p.title{
        font-size: 24px;
        height:35px;
        line-height:35px;
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
          margin-right: 5px;
        }

      }
      ul.operate{
        margin-top: 20px;
        height:30px;
        li{
          float:left;
          height:30px;
          border:1px solid $border;
          line-height:30px;
          background-color:#fff;
          border-radius:5px;
          padding:0 8px;
          cursor:pointer;
          margin-right:10px;
          &:hover{
            background-color:rgb(245,245,247);
          }
          i{
            font-size:18px;
            font-weight:bold;
            margin-right:5px;
          }
          &.btn{
            border:1px $border solod;
            &.play{
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              margin-right:0;
              i{
                color:$mainRed;
              }
            }
            &.add{
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-left:none;
            }
          }
        }
      }
      p.singer{
        margin-top:30px;
        a{
          color:$bule;
        }
      }
      p.timer{
        height:58px;
        overflow:hidden;
        white-space:nowrap; 
        text-overflow:ellipsis;
        &.nodes{
          color:$bule;
        }
        span.tip{
          color:#000;
        }
        span.descript{
          color:#6D6C6C;
        }
        margin-top:15px;
      }
      i.expand{
        float:right;
        font-size:25px;
        font-weight:bold;
        color:#808080;
        cursor:pointer;
        &:hover{
          color:#000;
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

        
        &.search{
          height:28px;
          display:inline-block;
          vertical-align:middle;
          position:absolute;
          right:40px;
          border-radius:50px;
          top:4px;
          line-height:28px;
          input{
            height:24px;
            line-height:24px;
            position:relative;
            display:inline-block;
            vertical-align:middle;
            top:-2px;
          }
          i{
            font-size:20px;
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
                  // width: 90px;
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


    .comments{
      // position:absolute;
      // width:700px;
      padding:0 40px;
      .tag{
        font-size:20px;
        // border-bottom:1px rgb(207,206,208) solid;
        padding:5px 0px;
        margin-bottom:5px;
        text-align:left;
      }
      .write-comment{
        position:relative;
        text-align:left;
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
      
      .brilliants{
        margin:30px 0;
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

  }
}

</style>
