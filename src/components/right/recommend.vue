<template>
  <div class="recommend">
    <banner class="banner"></banner>
    <div class="songlist" ref="songList">
      <div class="headline">
        <h2>推荐歌单</h2>
        <p>更多></p>
      </div>
      
      <div class="songlist-container" v-if="songlists.length">
        <div class="daily" ref="daily" >
          <div class="day"  @mouseover="active" @mouseout="unActive">
            <p class="tip" :class="{active:dailyActive}">根据你的口味推荐每日跟新</p>
            <div class="inf">
              <p class="week">{{week}}</p>
              <span>{{new Date().getDate()}}</span>
            </div>
          </div>
          <p class="title"><span>每日推荐歌曲</span></p>
        </div>
    
        <list-cover class="list-cover" v-for="(recommend,index) in songlists"  :recommend="recommend"></list-cover>
      </div>
      
    </div>

    <div class="newest-music" v-if="newSongs.length">
      <div class="headline">
        <h2>最新音乐</h2>
        <p>更多></p>
      </div>
      <div class="newest-music-container" @click="listen">
        <div class="new-song" v-for="(result,index) in newSongs" 
        :class="{lightgray:index % 5 % 2 === 1,noborder:index > 4}">
          <div class="index">{{index < 9? '0' + (index + 1) : index + 1}}</div>
          <div class="cover" :style="{backgroundImage:'url('+result.song.album.picUrl+')'}">
            <i class="play" :index="index"></i> 
          </div>
          <div class="songinf">
            <p>{{result.song.name}}<span class="grayfont" v-if="result.song.alias.length">({{result.song.alias.join('/')}})</span></p>
            <p>{{result.song.artists[0].name}}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import banner from './banner'
import listCover from './listCover'
export default {
  name: 'recommend',
  components:{
    'banner':banner,
    'list-cover':listCover
  },
  data () {
    return {
      dailyActive: false,
      // picWidth: 0,
      timer: null,
      resizeTimer: null,
      newSongs:[],
      songlists:[]
    }
  },
  mounted(){
    // this.picWidth = (this.$refs.songList.offsetWidth - 90)/5

    if(!Object.keys(this.recommends).length){
      this.getData()
    }else{
      this.songlists = this.recommends.songlists
      this.newSongs = this.recommends.newSongs
    }
    
    // window.onresize = () => {     
    //   this.picWidth = (this.$refs.songList.offsetWidth - 90)/5
    // }
  },
  computed:{
    week(){
      return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
    },
    userId(){
      return this.$store.state.userId
    },
    recommends(){
      return this.$store.state.recommends
    }
   
  },
  methods: {
    active(){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.dailyActive = true
      },400)
    },
    unActive(){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.dailyActive = false
      },400)
    },
    getData(){
      this.axios.get('http://musicapi.leanapp.cn/personalized').then(res => {
        console.log('请求推荐歌单');
        this.songlists = [...res.data.result]
        this.$store.commit('addRecommend',{ 
          name: 'songlists',
          recommend: res.data.result
        })
        return this.axios.get('http://musicapi.leanapp.cn/personalized/newsong')
      }).then(res => { 
        console.log('请求推荐歌曲');
        this.newSongs = [...res.data.result]
        this.$store.commit('addRecommend',{ 
          name: 'newSongs',
          recommend: res.data.result
        })
      })
    },
    listen(el){
      let target = el.target
      if(target.className.indexOf('play') > -1){
        this.$store.commit('addSong',this.newSongs[target.getAttribute('index')].song)
      }
    }
  },
  watch:{
    // picWidth (val) {
    //   if (!this.resizeTimer) {
    //     this.picWidth = val
    //     this.resizeTimer = true
    //     let that = this
    //     setTimeout(function () {
    //       console.log(that.picWidth)
    //       that.resizeTimer = false
    //     }, 400)
    //   }
    // },
    userId(val){
      console.log('login userid',val);
      if(val !== 0){
        console.log(val);
        this.axios.get('http://localhost:3000/recommend/resource').then(res => {
          console.log(JSON.stringify(res.data));
          // this.recommends = res.data.recommend.concat(this.recommends.splice(0, 4))

          this.songlists.push(res.data.recommend)

          this.$store.commit('addRecommend',{ 
              name: 'songlists',
              recommend: this.songlists
          })

        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';
.recommend{
  // with:100%;
  height:100%;
  .clean{
    clear:both;
  }
  .banner{
    max-width:1280px;
    margin:0 auto;
    margin-top:30px;
    padding:0 10px;
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
    p{
      float:right;
    }
  }

  .songlist{
    max-width:1280px;
    position:relative;
    top:20px;
    margin:0 auto;
    overflow:hidden;
    .songlist-container{
      width:100%;
      // column-width:auto;
      // column-count: 5;
      // column-gap: 20px;
      // overflow:auto;
      // break-inside: avoid;
      .list-cover{
        break-inside: avoid;
        float:left;
        width:20%;
        float:left;
        padding:0 10px;
      }
      .daily{
        position:relative;
        break-inside: avoid;
        overflow:hidden;
        width:20%;
        float:left;
        padding:0 10px;
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
        .day{
          cursor:pointer;
          background-color:#fff;
                  padding-bottom:100%;
          position:relative;
          .inf{
            height:150px;
            width:150px;
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
          }
          p.tip{
            position:absolute;
            background-color:rgba(0,0,0,.5);
            width:100%;
            left:0;
            text-align:left;
            padding:10px;
            top:0;
            color:#fff;
            transform:translateY(-100%);
            transition:all .3s;
          }
          p.active{
            transform:translateY(0);
          }
          p.week{
            font-size:25px;
          }
          span{
            font-size:110px;
            color:$mainRed;
          }
        }
      }
    }
  }
  .newest-music{
    max-width:1280px;
    position:relative;
    margin:0 auto;
    
    .newest-music-container{
      columns:auto 2;
      column-gap:0;
      border:1px $border solid;
      margin-bottom:30px;
      .new-song{
        height:75px;
        overflow: auto;
        // width:50%;
        line-height:75px;
        text-align:left;
        position:relative;
        border-right:1px $border solid;
        &:hover{
          background-color:$hovergray;
        }
        div{
          position:absolute;
          &.index{
            left:15px;
          }
          &.cover{
            left:50px;
            width:50px;
            top:12.5px;
          }
          &.songinf{
            position:absolute;
            height:50px;
            left:120px;
            top:10px;
            p{
              height:50%;
              line-height:25px;
              max-width:400px;
              white-space:nowrap;
              text-overflow:ellipsis;
              overflow:hidden;
            }
          }
        }
        .cover{
          cursor:pointer;
          width:50px;
          height:50px;
          overflow:hidden;
          border:1px rgb(222,222,222) solid;
          // margin-bottom:10px;
          position:relative;
          background-position:center;
          background-size:100% 100%;
        }
        i.play{
          display:inline-block;
          height:25px;
          width:25px;
          background-color:rgba(0,0,0,.3);
          border:1px #fff solid;
          border-radius:50%;
          position:absolute;
          left:12.5px;
          top:12.5px;
          text-align:center;
          line-height:25px;
          transition:all .3s;
          &:hover{
            background-color:rgba(0,0,0,.5);
          }
          &:after{
            font-family:"iconfont" !important;
            font-size:15px;
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
  }
}
</style>
