<template>
  <div class="v-nav" >
   <div class="con">
      <ul>
        <li :class="{active:index === navAcive}" v-for="(option,index) in options" :key="option.name">
          <router-link :to="{path:option.link}" class="link" :class="{active:index === navAcive}">{{option.name}}</router-link>
        </li> 
      </ul>
   </div>
  </div>
</template>
<script>
export default {
  name: 'vNav',
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: '个性推荐',
          link: '/'
        },
        {
          name: '歌单',
          link: '/songlists'
        },
        {
          name: '主播电台',
          link: '/dj'
        },
        {
          name: '排行榜',
          link: '/ranking'
        },
        {
          name: '歌手',
          link: ''
        },
        {
          name: '最新音乐',
          link: ''
        },
        ]
    }
  },
  data(){
    return {
      navAcive: 0,
      navName: ['default', 'songlists', 'dj','ranking']
    }
  },
  // computed:{
  //   navIndex(){
  //     return this.$store.state.navIndex
  //   }
  // },
  created(){
    this.navAcive = this.navName.indexOf(this.$route.name || 'default')
  },
  methods: {
    // active(index){
    //   this.$store.commit('navAcive',index)
    // },
  },
  watch:{
    '$route'(val){
      this.navAcive = this.navName.indexOf(val.name || 'default')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';
.v-nav{
  position:relative;
  
  .con{
    border-bottom:1.5px rgb(229,229,230) solid;  
    width:100%;
    height:56.75px;
    text-align:center;
    // padding: 10px;
  }
  ul{
    display:inline-block;
    overflow:auto;

    li{
      float:left;
      cursor:pointer;
      display:inline-block;
      line-height:56px;
      height:100%;
      font-size:20px;
      margin: 0 13px;
      min-width:80px;
      color:black;
      &:hover{
        color:$mainRed;
        // background-color:red;
      }
      &.active{
        border-bottom:2px $mainRed solid;
        
      }
      .link{
        display:inline-block;
        height:100%;
        width:100%;
        text-decoration: none;
        color:black;
        &:hover{
          color:$mainRed;
        }
        &.active{
          color:$mainRed;
        }
      }
    }
  }
}
</style>
