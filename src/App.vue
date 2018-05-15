<template>
  <div id="app">
    <!-- <banner :imgs="imgs"></banner> -->
<!--     <img src="./assets/logo.png">
    <router-view/> -->
    <!-- <loader ></loader> -->
    <div id="top">
      <top></top>
    </div>
    <div id="middle">
      <div class="left">
        <user-menu class="um"></user-menu>
        <small-playing class="sp"></small-playing>
      </div>
      <div class="right">
        <!-- <v-nav></v-nav> -->
            <!-- <banner :imgs="imgs"></banner> -->
        <!-- <view></view> -->
<!--         <default-right></default-right> -->
        <router-view></router-view>
      </div>
      <transition name="playing-inter" >
        <play-interface class="PI" v-show="maximize"></play-interface>
      </transition>
    </div>
    <div id="bottom">
      <player></player>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable */
import banner from './components/right/banner'
import top from './components/top/top'
import player from './components/bottom/player'
import userMenu from './components/left/userMenu'
import smallPlaying from './components/left/smallPlaying'
import playingInterface from './components/middle/playInterface/playInterface'

//test
import vNav from './components/right/vNav'

import defaultRight from './components/right/defaultRight'
export default {
  name: 'App',
  data () {
    return {
      imgs: [],
    }
  },
  components: {
    'banner': banner,
    'top':top,
    'player':player,
    'user-menu':userMenu,
    'play-interface':playingInterface,
    'small-playing':smallPlaying,
    'v-nav':vNav,
    'default-right':defaultRight,
    // 'loader':loader
  },
  computed:{
    maximize(){
      return this.$store.state.maximize
    }
  },
  methods: {
    getBanner () {
      this.axios.get('http://musicapi.leanapp.cn/banner').then((response) => {
        // console.log()
        this.imgs = response.data.banners
        console.log(JSON.stringify(response.data.banners));
      })

    }
  },
  created () {
    this.getBanner();
    this.$on('maximize',function () {
      this.maximize = true
      console.log('aaaaa')
    })
  }
}
</script>

<style scoped lang="scss">
@import '/style/global.scss';

#app {
  position:absolute;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: inline-block;
  background-color: $bgColor;
  padding:$topHeight 0 $playerHeight 0;
  overflow:hidden;
  min-width:$mainWidth;
}
#top{
  height:62px;
  position:absolute;
  top:0;
  width:100%;
  z-index:1000;
}
#player{
  position: absolute;
  bottom:0;
  height:$playerHeight;
  width:100%;
}
#middle{
  // height:710px;
  height:100%;
  position:relative;
  width:100%;
  padding-left:$userMenuWidth;
  .left{
    height:100%;
    position:absolute;
    left:0;
    width:$userMenuWidth;
    padding-bottom:$smallPlayingHeight;
    .sp{
      position:absolute;
      bottom:0;
    }
  }
  .right{
    overflow-y:scroll;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    max-width:1700px;
    min-width:1000px;
    width:100%;
    position:relative;
    margin:0 auto; 
  }
}
.PI{
  position:absolute;
  transform-origin:0 0;
  width:100%;
  height:100%;
  top:0;
  left:0;
  opacity:1;
}


.playing-inter-enter-active,.playing-inter-leave-active{
  transition: all .3s linear;
 
} 
.playing-inter-enter,.playing-inter-leave-to{
  transform:scale(0,0);
  top:100%;
  left:0;
  opacity:0;
  width:0;
  height:0;
}

</style>
