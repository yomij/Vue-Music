<template>
  <div class="default-right" >
    <v-nav class="nav"></v-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import vNav from './vNav'
export default {
  name: 'defaultRight',
  components:{
    'v-nav':vNav
  },
  props: {
    // imgs: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.default-right{
  width:100%;
  height:100%;
  padding:0 30px;
  // overflow:scroll;
  .nav{
    padding:0 10px;
    margin:0 auto;
  }
  .main-content{
    width:100px;
    height:100px;
    border:1px red solid; 
  }
}

</style>
