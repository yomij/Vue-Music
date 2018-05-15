<template>
  <div class="v-nav" >
    <ul>
      <li :class="{active:index === activeIndex}" @click="active(index)" v-for="(option,index) in options" :key="option.name">
        <router-link :to="{name:'songlist',params:{id:'111111'}}" class="link" :class="{active:index === activeIndex}">{{option.name}}</router-link>
      </li> 
    </ul>
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
          link: ''
        },
        {
          name: '歌单',
          link: '/songlist'
        },
        {
          name: '主播电台',
          link: ''
        },
        {
          name: '排行榜',
          link: ''
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
  data () {
    return {
      activeIndex:0
    }
  },
  methods: {
    active(index){
      console.log('test');
      this.activeIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';
.v-nav{
  position:relative;
  border-bottom:2px rgb(229,229,230) solid;  
  width:100%;
  height:60px;
  text-align:center;
  ul{
    display:inline-block;
    overflow:auto;

    li{
      float:left;
      cursor:pointer;
      display:inline-block;
      line-height:60px;
      height:60px;
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
