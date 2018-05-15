<template>
  <div class="dj-inf" >
    <div class="header" v-if="djRadio.id">
      <img :src="djRadio.picUrl" >
      <div class="inf">
        <p class="title">
          <i class="icon">电台</i><span class="name">{{djRadio.name}}</span>
        </p>
        <p class="creatInf">
          <img :src="djRadio.dj.avatarUrl">
          <span class="nickname">{{djRadio.dj.nickname}}</span>
        </p>
        <ul class="operate">
          <li>
            <i class="iconfont icon-xingxing1"></i>订阅{{djRadio.subCount}}
          </li>
          <li class="btn play" @click="playAll">
              <i class="iconfont icon-bofang1"></i>播放全部
          </li> 
          <li>
            <i class="iconfont icon-fenxiang"></i>分享{{djRadio.shareCount}}
          </li> 
        </ul>

        <p class="des" :class="{nodes:!djRadio.desc}" v-if="djRadio.desc" ref="desContainer">
          <span class="tip">{{djRadio.category}}</span>
          <span v-html="descript" class="descript" ref="descript">
            <!-- {{songlistInf.description ? songlistInf.description : '添加简介'}} -->
          </span>
        </p>
      </div>
    </div>

    <div class="main">
      <ul class="nav">
        <li class="normal" 
        :class="{active:0 === activeIndex}">
          节目列表
        </li>
        <li class="normal"
        :class="{active:2 === activeIndex}">
          收藏者
        </li>
      </ul>

      <div class="songs" v-show="0 === activeIndex">
        <div class="filter">
          <div class="left">
            <div class="count">共{{djRadio.programCount}}期</div>
          </div>
          <div class="right">
            <div class=""><i class="iconfont icon-paixu-jiang"></i></div>
            <div class="singer"><i class="iconfont icon-paixu-sheng"></i></div>
          </div>
        </div>
      </div>

      <loader class="load" v-if="!programs.length"></loader>

      <div class="program" v-for="(program,index) in programs" :class="{single: index & 1}" v-if="programs.length" @click="listen">
          <div class="left">
            <div class="list index gray">{{djRadio.programCount - (page - 1) * 30 - index}}</div>
            <div  class="list cover">
              <img :src="program.coverUrl">
              <i class="play" :data-index="index"></i>
            </div>

          </div>
          <div class="right">
            <div class="list name">{{program.name}}</div>
            <div class="list playcount gray">
              播放：{{program.listenerCount < 100000 ? program.listenerCount : (program.listenerCount / 10000).toFixed(0)}}
            </div>
            <div class="list like gray">赞：{{program.likedCount}}</div>
            <div class="list create gray">{{getTime(program.createTime)}}</div>
            <div class="list dura gray">{{transDuration(program.duration)}}</div>
          </div>
        </div>
      </div>

      <page :total="djRadio.programCount" :onePageNum="30" v-if="djRadio.programCount > 30" @pageChange="pageChange"></page>

      
      
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
  name: 'DJInf',
  components:{
    'single-comment': singleComment,
    'loader': loader,
    'page': page
  },
  data(){
    return {
      activeIndex:0,
      page:1,
      djRadio:{
        id:0,
      },
      programs:[],
    }
  },
  computed:{
    descript(){
      if(this.djRadio.desc){
        var des =new String(this.djRadio.desc)
        return des.replace(/\n/g,'<br>')
      }else{
        return ''
      }      
    }
  },
  created(){ 

  },
  methods: {
    getTime(t){
      return time.formatDate(t, '-')
    },
    transDuration(dura) {
      return time.transDuration(dura)
    },
    getData(){
      request.djDetial({
        rid: this.$route.query.rid
      }).then(res => {
        this.djRadio = res.data.djRadio
        this.count = res.data.djRadio.programCount
        console.log('test',res.data.djRadio.programCount);
        return  request.djProgram({
          rid: this.$route.query.rid,
          limit: 30
        })
      }).then(res => {
        this.programs = res.data.programs
        this.programs.forEach((item,index) => {
          item.mainSong['programId'] = item.id
        })
      })
    },
    pageChange(page){
      this.page = page
      request.djProgram({
        rid: this.$route.query.rid,
        limit: 30,
        offset: (page - 1) *30
      }).then(res => {
        this.programs = res.data.programs
      })
    },
    listen(el){
      let index = el.target.dataset.index
      if(index){
        this.$store.dispatch('searchSongAndPlay', this.programs[index].mainSong)
      }
    },
    playAll(){
      let list = []
      this.programs.forEach(item => {
        list.push(item.mainSong)
      })
      this.$store.commit('changeListeningList', list)
      this.$store.commit('changePlayingIndex', 0)
    }
  },
  created(){ 
    this.getData()

  },
  watch:{
    '$route' (to, from) {
      this.getData()
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.dj-inf{
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
      p.title{
        hieght:35px;
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
          hieght:28px;
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
              i{
                color:$mainRed;
              }
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
          font-size:14px;
          color:$mainRed;
          border:1px $mainRed solid;
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
  
  .load{
    position:relative;
    top:60px;
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
  
    

   .program{
      height:70px;
      line-height:70px;
      position:relative;
      width:100%;
      padding-left:150px;
      position:relative;
      div{
        height:100%;  
        &.left{
          width:150px;
          position:absolute;
          left:0;
          float:left;
          div{
            // width:60px; 
            &.index{
              text-align:left;
              padding-left:40px;
              width:80px;
            }
          }
          .cover{
            position:relative;
            img{
              height:50px;
              width:50px;
              position:relative;
              top:10px;
            }
            i.play{
              display:block;
              height:30px;
              width:30px;
              background-color:rgba(0,0,0,.3);
              border:1px #fff solid;
              border-radius:50%;
              position:absolute;
              top:20px;
              left:10px;
              text-align:center;
              line-height:30px;
              transition:all .3s;
              &:hover{
                background-color:rgba(0,0,0,.5);
              }
              &:after{
                font-family:"iconfont" !important;
               font-size:18px;
               font-style:normal;
               -webkit-font-smoothing: antialiased;
               -moz-osx-font-smoothing: grayscale;
                content:"\e61c";
                position:relative;
                left:1px;
                color:#fff;
              }
            }
          }
        }
        &.right{
          width:100%;
          float:left;
          div{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.name{
              width:50%;

            }
            &.playcount{
              width:12.5%;
            }
            &.like,&.create{
              width:12.5%;
            }
            &.dura{
              width:12.5%;
            }
          }
          
        }
        &.list{
          text-align:left;
          float:left;
        }
      }

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

















    .filter{
      width:100%;
      height:38px;
      position:relative;
      border-bottom:1px $border solid;
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
            &.count{
              text-align:left;
              position:relative;
              left:40px;
            }
          }
        }
        &.right{
          width:100px;
          float:right;
          div{
            float:right;
          }
          
        }

      }
    }

 


  }
}

</style>
