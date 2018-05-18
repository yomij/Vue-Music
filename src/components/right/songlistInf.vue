<template>
  <div class="songlist-inf" v-if="songlistInf">
    
    <div class="header">
      <img :src="songlistInf.coverImgUrl + '?param=250y250'" >
      <div class="inf">
        <p class="title">
          <i class="icon">歌单</i><span class="name">{{songlistInf.name}}</span>
          <span class="extra">
            <i class="iconfont icon-yinle"></i><span>{{songlistInf.songsCount}}</span>
            <i class="iconfont icon-bofang1"></i><span>{{playCount}}</span>
          </span>
        </p>
        <p class="creatInf">
          <img :src="songlistInf.creator.avatarUrl">
          <span class="nickname">{{songlistInf.creator.nickname}}</span>
          <span class="create-time">{{createTime}}</span>
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
        <p class="tags" v-if="songlistInf.tags[0]">
          <span class="tip">标签:</span><span v-html="tags"></span>
        </p>
        <p class="des" :class="{nodes:!songlistInf.description}" v-if="songlistInf.description" ref="desContainer">
          <span class="tip">简介:</span>
          <span v-html="descript" class="descript" ref="descript">
            <!-- {{songlistInf.description ? songlistInf.description : '添加简介'}} -->
          </span>
        </p>
        <i class="iconfont expand" :class="{'icon-jiantou_down':expandDes === 1,'icon-jiantou_up':expandDes === 2}" @click="showDes"></i>
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
          评论({{songlistInf.commentCount}})
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}"
        @click="nav(2)">
          收藏者
        </li>
        <li class="search"><input type="text" name="" value="" placeholder="搜索歌单音乐"><i class="iconfont icon-search"></i></li>
      </ul>

      
      <div class="songs" v-show="0 === activeIndex">
        <div class="filter">
          <div class="left">
            <div class="list index "></div>
            <div class=" list op">操作</div>
          </div>
          <div class="right">
            <div class="list title">音乐标题</div>
            <div class="list singer">歌手</div>
            <div class="list album">专辑</div>
            <div class="list duration">时间</div>
          </div>
        </div>

        <div class="song" v-for="(song, index) in songlistInf.songs" :class="{single: index & 1}" @dblclick="listen(song)">
          <div class="left">
            <div class="list index gray">{{index > 8 ? index + 1 : '0' + (index + 1)}}</div>
            <div class="list op gray">
              <i class="iconfont icon-cpxihuanxiantiao"></i>
              <i class="iconfont icon-xiazai"></i>
            </div>
          </div>
          <div class="right">
            <div class="list title">{{song.name}}<span v-if="song.alias[0]" class="grayfont">({{song.alias[0]}})</span></div>
            <div class="list singer">{{singers(song.artists)}}</div>
            <div class="list album">{{song.album.name}}</div>
            <div class="list duration">{{getSongDuration(song.duration)}}</div>
          </div>
        </div>
      </div>
      
      <div class="comments" v-if="1 === activeIndex">

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
  name: 'songlistInf',
  components:{
    'single-comment': singleComment,
    'loader': loader,
    'page': page
  },
  data(){
    return {
      DES_HEIGHT:60,
      songlistInf: null,
      activeIndex:0,
      hotComments: [],
      latelyComments: [],
      dataReady: true,
      total: 0,
      commentsCache:{},
      expandDes:0 //0为不显示展开图标 1为未展开 2为已经展开
    }
  },
  computed:{
    tags(){
      return this.songlistInf.tags[0] ? this.songlistInf.tags.map(tag =>{
        return `<a class="tag" style="color:rgb(64,158,209);cursor:pointer;">${tag}</a>`
      }).join(' / ') : `<a class="tag" style="color:rgb(64,158,209);cursor:pointer;">添加标签</a>`
    },
    descript(){
      if(this.songlistInf.description){
        let des =new String(this.songlistInf.description)
        return des.replace(/\n/g,'<br>')
      }else{
        return ''
      }
        
    },
    playCount(){
      return this.songlistInf.playCount < 100000 ? this.songlistInf.playCount : `${~~(this.songlistInf.playCount / 10000)}万`
    },
    // songlistCache(){
    //   return this.$store.state.songlistCache
    // },
    createTime(){
      let date =new Date(this.songlistInf.createTime)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
      
  },
  created(){ 
    this.getInf(this.$route.query.id)

  },
  methods: {
    singers(arr){
      return arr.map(art => {
        return art.name
      }).join('/')
    },
    nav(index){
      console.log('test');
      this.activeIndex = index
      if(index === 1){
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
    updateComment(page){
      this.dataReady = false
      if(page in this.commentsCache){
        this.hotComments = []
        this.latelyComments = this.commentsCache[page]
        return
      }
      request.commentPlaylist({
        id: this.$route.query.id,
        offset: (page - 1) * 20
      }).then(res => {
          this.dataReady = true
          this.hotComments = []
          this.latelyComments = res.data.comments
          this.total = res.data.total
          this.commentsCache[page] = this.latelyComments
      })
    },
    getSongDuration(t){
      return time.transDuration(t)
    },
    listen(song){
      console.log("listen");
      this.$store.commit('changePlayingSong',song)
      this.$store.commit('changeListeningList',this.songlistInf.songs)
    },
    playAll(){
      this.$store.commit('changeListeningList',this.songlistInf.songs)
      this.$store.commit('changePlayingIndex', 0)
    },
    getInf(id){
      // if(id in this.songlistCache){
      //   this.songlistInf = this.songlistCache[id]
      // }else{
        request.playlistDetail({
          id:id
        }).then(res => {
          let inf = res.data.result
          this.songlistInf = {
            songs: inf.tracks,
            name: inf.name,
            songsCount: inf.trackCount,
            creator:inf.creator,
            coverImgUrl:inf.coverImgUrl,
            tags:inf.tags,
            playCount:inf.playCount,
            description: inf.description,
            commentCount: inf.commentCount,
            createTime: inf.createTime
          }
          
          //缓存 
          // this.$store.commit('addsonglistCache', {id:id,inf:this.songlistInf})

        })
      // }
      
    },
    showDes(){

      if(this.expandDes === 1){
          this.$refs.desContainer.style.height = this.$refs.descript.offsetHeight + 'px'
          this.expandDes = 2
      }else if(this.expandDes === 2){
          this.$refs.desContainer.style.height = this.DES_HEIGHT + 'px'
          this.expandDes = 1
      }
    }
  },
  watch:{
    '$route' (to, from) {
      let id = this.$route.query.id
      this.getInf(id)
    },
    songlistInf(){
      // console.log(this.$refs.descript.offsetHeight,this.DES_HEIGHT);
      setTimeout(() => {
        if(this.$refs.descript.offsetHeight > this.DES_HEIGHT){
          console.log('简介被收缩了');
          this.expandDes = 1
        }
      },30)
      
    }    
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.songlist-inf{
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
    img{
      height:250px;
      width:250px;
      display:inline-block;
      border:1px $border solid;
      // float:left;
      position:absolute;
    }
    div.inf{
      // position:absolute;
      // width:100%;
      padding-left:280px;
      top:0;
      p.title{
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
        }
        i.iconfont{
          margin-right:5px;
          margin-left:20px;
          font-size:18px;
          color:#656565;
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
        span.extra{
          position:absolute;
          right:40px;
          color:#656565;
        }
      }
      p .tip{
        margin-right:5px;
      }
      p.creatInf{
        height:40px;
        line-height:40px;
        margin:15px 0;
        img{
          height:40px;
          width:40px;
          border-radius:50%;
          display:inline-block;
          vertical-align:middle;
        }
        span{
          display:inline-block;
          vertical-align:middle;
          color:#7F7E7E;
          &:last-child{
            margin:0 20px;
          }
          &.nickname{
            margin-left:50px;
          }
        }
      }
      ul.operate{
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
      p.tags{
        margin-top:30px;
        a{
          color:$bule;
        }
      }
      p.des{
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
      height:38px;
      padding-left:160px;
      position:relative;
      div{
        height:100%;
        line-height:38px;
        &.left{
          width:160px;
          position:absolute;
          left:0;
          float:left;
          div{
            width:80px;
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
              width:37.5%;
            }
            &.singer,&.album{
              width:25%;
            }
            &.duration{
              width:12.5%;
              border-right:none;
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
