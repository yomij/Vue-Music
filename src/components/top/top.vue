<template>
  <div class="top">
    <h3 class="logo">YomiMus</h3>
    <search url="http://musicapi.leanapp.cn/search/suggest" defaultText="搜索音乐，歌手，歌词，用户" class="searchx"></search>
  </div>
</template>

<script>
import search from './search'
export default {
  name: 'top',
  components: {
    'search': search
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';
$topHeight:62px;
.top{
  z-index:100;
  height:$topHeight;
  background-color:rgb(198,47,47);
  position:relative;
  line-height:$topHeight;
  h3{
    color:#ffffff;
    font-size:30px;
    position:absolute;
    left:20px;
    height:100%;
    // line-height:62px;
  }
  .searchx{
    // position:relative;
    left:315px;
    // margin-top:
    top:50%;
    transform:translateY(-50%)
  }
  .name{
    color:#ffffff;
    line-height:$topHeight;
    font-size:$topHeight/2;
    position:absolute;
    left:20px;
  }
}
</style>
