<template>
  <div id="app">
    <about class="about"></about>
    <div id="top">
      <top></top>
    </div>
    <div id="middle">
      <div class="left" :class="{haspadding:playingSong.id}">
        <user-menu class="um"></user-menu>
        <small-playing class="sp" v-if="playingSong.id"></small-playing>
      </div>
      <div class="right" ref="right">
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

import about from './components/about'

//request
import request from './request/request'

import throttle from './utility/throttle'

export default {
  name: 'App',
  data () {
    return {
      imgs: [],
      isPlaying:false,
      hasScroll: null
    }
  },
  components: {
    'banner': banner,
    'top': top,
    'player': player,
    'user-menu': userMenu,
    'play-interface': playingInterface,
    'small-playing': smallPlaying,
    'about':about
  },
  computed:{
    maximize(){
      return this.$store.state.maximize
    },
    playingSong(){
      return this.$store.state.playingSong
    },
    // navIndex(){
    //   return this.$store.state.navIndex
    // }
  },
  mounted (){
    this.$on('maximize',() => {
      this.maximize = true
    })
    this.hasScroll = throttle(() => {
      console.log('scroll',this.$refs.right.scrollTop);
      this.$store.commit('scroll',this.$refs.right.scrollTop)
    },100)
  },
  methods:{
  },
  watch:{
    '$route' (val) {
      let right = this.$refs.right
      if(val.name === 'dj' || val.name === 'singerInf'){
        right.addEventListener('scroll', this.hasScroll)
      }else{
        right.removeEventListener('scroll', this.hasScroll)
      }
    }
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
  .about{
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
#top{
  height:62px;
  position:absolute;
  top:0;
  width:100%;
  z-index:10;
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
    &.haspadding{
      padding-bottom:$smallPlayingHeight;
    }
    
    .sp{
      position:absolute;
      bottom:0;
    }
    .um{
      height:100%;
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
    // padding:0 40px;
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
