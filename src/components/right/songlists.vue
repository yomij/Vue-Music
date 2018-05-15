<template>
  <div class="songlists" @click="changeTag">
      <div class="now-tag" @click="tagsToggle">
        {{tag}}<i class="iconfont icon-jiantou_down"></i>
      </div>
      <div class="tags"  v-show = "tagsShow">
        <div class="header">选择标签</div>
        <div class="body">
          <div class="all">全部歌单</div>
          <div class="language kind">
            <p class="topic">
              <i class="iconfont icon-diqiuquanqiu"></i>语种
            </p>
            <ul>
              <li class="hasleft">华语</li>
              <li>欧美</li>
              <li>日语</li>
              <li>韩语</li>
              <li >粤语</li>
              <li class="notop hasleft">小语种</li>
            </ul>

          </div>
          <div class="style kind">
            <p class="topic">
              <i class="iconfont icon-fengge"></i>风格
            </p>
            <ul>
             <li v-for="(tag,index) in tags.style" :data-tag="tag" :class="{hasleft:index % 5 === 0,notop:index > 4}">{{tag}}</li>
            </ul>
          </div>
          <div class="scene kind">
            <p class="topic">
              <i class="iconfont icon-dianziqin"></i>场景
            </p>
            <ul>
              <li v-for="(tag,index) in tags.scene" :data-tag="tag" :class="{hasleft:index % 5 === 0,notop:index > 4}">{{tag}}</li>
            </ul>
          </div>
          <div class="emotion kind">
            <p class="topic">
              <i class="iconfont icon-smiling"></i>情感
            </p>
            <ul>
              <li v-for="(tag,index) in tags.emotion" :data-tag="tag" :class="{hasleft:index % 5 === 0,notop:index > 4}">{{tag}}</li>
            </ul>
          </div>
          <div class="theme kind">
            <p class="topic">
              <i class="iconfont icon-fengge"></i>主题
            </p>
            <ul>
              <li v-for="(tag,index) in tags.theme" :data-tag="tag" :class="{hasleft:index % 5 === 0,notop:index > 4}">{{tag}}</li>
            </ul>
          </div>
        </div> 
      </div>
      <div class="hot-tags">
        <span>热门标签:</span>
        <ul>
          <li><a data-tag="华语">华语</a></li>
          <li><a data-tag="流行">流行</a></li>
          <li><a data-tag="摇滚">摇滚</a></li>
          <li><a data-tag="民谣">民谣</a></li>
          <li><a data-tag="电子">电子</a></li>
          <li><a data-tag="轻音乐">轻音乐</a></li>
          <li><a data-tag="影视原声">影视原声</a></li>
          <li><a data-tag="ACG">ACG</a></li>
          <li><a data-tag="怀旧">怀旧</a></li>
          <li><a data-tag="治愈">治愈</a></li>
        </ul>
      </div>
      <loader class="loader" v-if="!songlists.length"></loader>
      <div class="playlists-container" v-if="songlists.length">
        <list-cover class="list" v-for="songlist in songlists" :recommend="songlist"></list-cover>
      </div>
      <page ref="page" :total="300" :onePageNum="30" v-show="songlists.length"  @pageChange="getData"></page>

  </div>
</template>
<script>

import loader from '../loader'
import page from '../page'
import listCover from "./listCover"

import request from '../../request/request'

export default {
  name: 'songlists',
  components:{
    'loader': loader,
    'page': page,
    'list-cover': listCover,
  },
  data () {
    return {
      songlists:[],
      tag:'华语',
      tags:{
        language: ['华语', '欧美', '日语', '韩语', '粤语', '小语种'],
        style: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类/独立', 'New Age', '古风', '后摇', 'Bossa Nova'],
        scene: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧'],
        emotion: ['怀旧', '清新', '浪漫', '性感', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念'],
        theme: ['影视原声', 'ACG', '校园', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', '钢琴', '器乐', '儿童', '榜单', '00后']
      },
      tagsShow:false,
    }
  },
  mounted(){
      this.getData(0)
  }
  ,
  methods: {
    getData(page){
      this.songlists = []
      request.topPlaylists({
        limit:50,
        cat:this.tag,
        offset:page * 50,
      }).then(res => {
        this.songlists = [...res.data.playlists]
      })
    },
    changeTag(el){
      // if(this.tagsShow){
      //   this.tagsShow = false
      // }
      let tag = el.target.dataset.tag
      if(tag){
        this.tag = tag
        this.tagsShow = false
      }
    },
    tagsToggle(){
      if(this.tagsShow){
        this.tagsShow = false
      }else{
        this.tagsShow = true
      }
    }
  },
  watch:{
    tag(val){
      this.$refs.page.init()
      this.getData(0)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.songlists{
  width:100%;
  // padding:0 30px;
  max-width:1280px;
  margin:0 auto;
  position:relative;
  .now-tag{
    background-color:#fff;
    height:32px;
    line-height:32px;
    width:fit-content;
    padding:0 10px;
    border-radius:5px;
    border:1px solid $border;
    font-weight:500;
    position:relative;
    left:10px;
    margin:30px 0 15px;
    cursor:pointer;
    &:hover{
      background-color:$lightgray;
    }
    i{
      font-size:18px;
      font-weight:900;
    }

  }
  .tags{
    border:1px $border solid;
    border-radius:5px;
    box-shadow:-2px -2px 5px $border;
    height:450px;
    width:643px;
    position:absolute;
    left:10px;
    z-index:100;
    background-color:$bgColor;
    text-align:left;
    &:before {
      position: absolute;
      content: "";
      display: block;
      border: 13px solid rgb(250,250,250);
      border-top: none;
      border-bottom-color: rgb(250,250,250);
      border-left-color: transparent;
      border-right-color: transparent;
      left: 50px;
      transform: translate(-50%,-95%);
    }
    .header{
        padding:0 20px;
      height:60px;
      line-height:60px;
      border-bottom:1px solid $border;
    }
    .body{
      overflow:scroll;
      height:390px;
      padding-left:20px;
      position:relative;
      .all{
        width:600px;
        border:1px solid $border;
        text-align:center;
        padding:10px;
        margin:10px 0;
        color:#8C8686;
        cursor:pointer;
        &:hover{
          background-color:$lightgray;
        }
      }
      .topic{
        color:#F17F7F;
        font-size:20px;
        display:inline-block;
        width:100px;
        height:40px;
        line-height:40px;
        font-size:22px;
        i{
          font-size:30px;
          margin-right: 10px;
          height:40px;
        }
      }
      .kind{
        width:100%;
        margin-bottom:10px;
        ul{
          position:absolute;
          left:120px;
          // top:-40px;
          display:inline-block;
          color:#8C8686;
          width:500px;
          li{
            cursor:pointer;
            border:1px solid $border;
            height:40px;
            line-height:40px;
            width:100px;
            float:left;
            border-left:none;
            text-align:center;
            &.hasleft{
              border-left:1px solid $border;
            }
            &.notop{
              border-top:none;
            }
            &:hover{
              background-color:$lightgray;
            }
          }
        }

        &.language{
          height:80px;
        }
        &.style{
          height:200px;
        }
        &.scene{
          height:120px;
        }
        &.emotion{
          height:120px;
        }
      }
    }
  }
  .hot-tags{
    height:17px;
    line-height:17px;
    position:relative;
    left:10px;
    span{
      float:left;
    }
    ul{
      display:inline-block;
      vertial-align:middle;
      float:left;
      height:16px;
      li{
        height:16px;
        float:left;
        padding:0 18px;
        border-right:2px solid $border;
        color:#A7A7A7;
        &:last-child{
          border:none;
        }
        a{
          cursor:pointer;
          &:hover{
            color:#000;
          }
        }

      }
    }
  }
  .loader{
    margin-top:100px;
  }

  .playlists-container{
     margin-top:20px;
      overflow:hidden;
      .list{
        width:20%;
        float:left;
        padding:0 10px;
      }
  }

}
</style>
