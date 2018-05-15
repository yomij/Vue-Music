<template>
  <div class="top">
    <h3 class="logo">YomiMus</h3>
    <search url="http://localhost:3000/search/suggest" defaultText="搜索音乐，歌手，歌词，用户" class="searchx"></search>
    <ul class="right">
      <li><img src="" alt=""></li>
      <li>
        <p>yomi<i class="iconfont icon-xiangxia"></i></p>
        <div class="hideInf">
          <div class="login">
                
          </div>
          <div class="userInf">
                
          </div>
        </div>
      </li>
      <li><i class="iconfont icon-huanfu"></i></li>
      <li><i class="iconfont icon-e-mail_icon"></i></li>
      <li><i class="iconfont icon-shezhi"></i></li>
      <li><i class="iconfont icon-xiangxia"></i></li>
      <li><i class="iconfont icon--zuixiao"></i></li>
      <li><i class="iconfont icon-zuixiaohua"></i></li>
      <li><i class="iconfont icon-zuidahua"></i></li>
      <li><i class="iconfont icon-guanbi1"></i></li>
    </ul>  
    </div>
  </div>
</template>

<script>
import search from './top/search'
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
@import '../style/global.scss';

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
