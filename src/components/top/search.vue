
<template>
  <div class="search">
    <div class="search-box" :class="{focus:isSearching}">
      <input
      @focus="test"
      @keydown="search"
      @blur="leave"
      type="text" v-model="searchText"
      :class="{focus:isSearching||searchedText}">
      <i class="iconfont icon-search"></i>
    </div>
    
    <div class="result-box" v-show="isChoose||isSearching" @mouseover="chooseResults" @mouseout="chooseResultsOver">

      <div class="search-results">

        <ul v-if="!searchText" class="hot-search">
          <li>热门搜索</li>
          <li
            v-for="item in hotSearch" :key="item">
            {{ item }}
          </li>
        </ul>

        <div v-if="searchText" class="results">
          <div class="search-user">搜与"<span class="search-text">{{ searchText }}</span>"相关用户<i class="iconfont icon-jiantou"></i></div>

          <ul v-if="searchResults.artists">
            <li class="search-tip"><i class="iconfont icon-ren icon"></i>歌手</li>
            <li
              @click="setSinger(item.id)"
              v-for="item in searchResults.artists"
              class="get-list">
                <span v-html="item.name"></span>
<!--                 <span v-if="item.alias[0]" class="grayfont">({{item.alias[0]}})</span>-
                <span v-html="item.artists[0].name"></span></li> -->
              </li>
          </ul>

          <ul v-if="searchResults.songs">
            <li class="search-tip"><i class="iconfont icon-yinle icon"></i>单曲</li>
            <li
              @click="setSong(item)"
              v-for="item in searchResults.songs"
              class="get-list">
                <span v-html="item.name"></span>
                <span v-if="item.alias[0]" class="grayfont">({{item.alias[0]}})</span>-
                <span v-html="item.artists[0].name"></span></li>
          </ul>

          <ul v-if="searchResults.albums">
            <li class="search-tip"><i class="iconfont icon-tubiaozhizuomoban1 icon"></i>专辑</li>
            <li
              v-for="item in searchResults.albums"
              class="get-list"
              v-html="item.name"></li>
          </ul>

          <ul v-if="searchResults.mvs">
            <li class="search-tip"><i class="iconfont icon-MV icon"></i>MV</li>
            <li
              v-for="item in searchResults.mvs"
              class="get-list"
              v-html="item.name"
              ></li>
          </ul>

          <ul v-if="searchResults.playlists">
            <li class="search-tip"><i class="iconfont icon-liebiao icon"></i>歌单</li>
            <li
              v-for="item in searchResults.playlists"
              @click="setPlaylist(item.id)"
              class="get-list"
              v-html="item.name"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import request from '../../request/request'

export default {
  name: 'search',
  data () {
    return {
      searchText: this.defaultText,
      isSearching: false,
      isChoose: false,
      timeout: null,
      hotSearch: ['yomi',...'是个大笨蛋'],
      searchResults: {},
      searchedText: ''
    }
  },
  props: {
    defaultText: {
      type: String,
      default: '输入要搜索的内容'
    }
  },
  methods: {
    test () {
      this.searchText = this.searchedText
      this.isSearching = true
    },
    leave () {
      this.searchedText = this.searchText
      this.isSearching = false
    },
    chooseResults () {
      this.isChoose = true
    },
    chooseResultsOver () {
      this.isChoose = false
    },
    search (e) {
      if(e.keyCode === 13 && this.searchText){
        this.isSearching = false
        this.$router.push({ name: 'resultSong', query: { st: this.searchText }})
        return
      }
      window.clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (this.searchText && this.searchText !== this.defaultText) {
          request.search({
            keywords: this.searchText
          }).then(res => {
            let result = JSON.stringify(res.data.result)
            result = result.replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`)
            this.searchResults = JSON.parse(result)
          }).catch(e => {
            console.log(e)
          })

        }
      }, 300)
    },
    setSong (song) {
      request.songInf({
        ids: song.id
      }).then(res => {
        song.album.picUrl = res.data.songs[0].al.picUrl
        song.name = res.data.songs[0].name        
        this.$store.dispatch('searchSongAndPlay', song) 
      }).catch(() => {
        console.log('搜索播放歌曲失败');
      })
    },
    setPlaylist(id){
      this.$store.commit('minimize')
      this.$router.push({ name: 'songlist',query:{id:id}})
    },
    setSinger(id){
      this.$router.push({ name: 'singerInf',query:{sid:id}})
    }
  },
  directives: {}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';

$searchWidth:270px;
$boxHeight:28px;
$boxColor:rgb(168,40,40);
$boxFontColor:rgb(194,104,104);

.search{
  width:$searchWidth;
  height:$boxHeight;
  position:relative;
  z-index:500;
  .search-box{
    position:relative;
    width:$searchWidth;
    height:$boxHeight;
    background-color:$boxColor;
    color:$boxFontColor;
    border-radius:$boxHeight;
    line-height:$boxHeight;
    z-index:500;
    &.focus{
      color: #ffffff;
    }

    input{
      position:absolute;
      left:$boxHeight/2;
      background-color:$boxColor;
      color:$boxFontColor;
      height:$boxHeight;
      font-size:.9rem;
      width:230px;
      &.focus{
        color:#ffffff;
      }

    }
    i{
      position:absolute;
      right:$boxHeight/2;
      font-size:20px;
    }

  }

  .result-box{
    z-index:500;
    position:relative;
    width: $searchWidth;
    background-color: rgb(250,250,250);
    box-shadow: 1px 1px 10px rgba(0,0,0,.4);
    border-radius: 5px;
    position: relative;
    color: rgb(110,110,110);
    top: 17px;
    transform:none !important;
    padding-bottom: 15px;
    font-size: .9rem;

    &:before {
      position: absolute;
      content: "";
      display: block;
      border: 13px solid rgb(250,250,250);
      border-top: none;
      border-bottom-color: rgb(250,250,250);
      border-left-color: transparent;
      border-right-color: transparent;
      left: 50%;
      transform: translate(-50%,-95%);
    }
    .search-results ul{

      width:100%;

      li{
        width: 100%;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        height:35px;
        line-height:35px;
        text-align:left;
        padding-left:15px;

        &:hover{
          background-color:rgb(227,228,229);
          cursor:pointer;
        }

        &:first-child{
          border-bottom:1px #CECECE solid;
          color:rgb(150,150,150);
          &:hover{
            background-color:rgb(250,250,250);
            cursor:default;
            border-radius:5px 5px 0 0;
          }
        }

        &.search-tip{
          border:none;
          color:#393939;
          background-color:rgb(245,245,247);
          &:hover{
            background-color:rgb(245,245,247);
            cursor:pointer;
          }
        }

      }
    }

    .results{

      .search-user{
        height:35px;
        line-height:35px;
        text-align:left;
        padding-left:15px;
        &:hover{
          cursor:pointer;
        }

      }

      span.search-text{
        color:#2EB7EB;
      }

      ul{
        li{
          i.icon{
            // border:1px red solid;
            margin-right:5px;
          }
          &.get-list{
            padding-left:35px;
          }
        }
      }

    }

  }

}
</style>
