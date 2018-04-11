<template>
  <div class="middle-container">
    <div class="left">
      <user-menu></user-menu>
      <small-playing></small-playing>
    </div>
    <div class="right">
      <ul>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import userMenu from './components/left/userMenu'
import smallPlaying from './components/left/smallPlaying'

export default {
  name: 'App',
  data () {
    return {
      imgs: []
    }
  },
  components: {
    'banner': banner,
    'top':top,
    'player':player,
    'user-menu':userMenu,
    'playing':playing,
    'small-playing':smallPlaying
  },
  methods: {
    getBanner () {
      this.axios.get('http://musicapi.leanapp.cn/banner').then((response) => {
        console.log(response.data.banners)
        this.imgs = response.data.banners
      })

    }
  },
  created () {
    this.getBanner();
  }
}
</script>

<style scoped lang="scss">

@import './style/global.scss';
html,body{
  margin:0;
  padding:0;
  box-sizing: border-box;
  
}

#app {
  position:absolute;
  left:0;top:0;
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  // display: inline-block;
  /*background-color: #A19797;*/
  background-color: #fff;
  /*transform: scale(.8);*/
}
#player{
  position: relative;
  top: 0px;
}

.middle-container{
  width: 100%;
  height:710px;
  position:relative;
  padding-left:$userMenuWidth;
  .left{
    width:$userMenuWidth;
    height:100%;
    position:absolute;
    left:0;
    top:0;
  }
  .right{
    width:100%;
    height:100%;
    background-color:red;
    text-align:left;
  }
}
</style>
