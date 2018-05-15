<template>
  <div class="disc" >
    <img src="/static/img/holder.png" class="holder" :class="{ onPlaying:isPlaying}">
    <div class="discx" :style="{transform:'rotate('+rotateDeg+'deg)',backgroundImage:'url('+pic+')'}">
      <img src="/static/img/disc.png" class="song-pic"> <!--专辑图片 -->
    </div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'disc',
  props:{
    pic:{
      type: String,
      default: 'http://p1.music.126.net/kQqkFAqZwOLTLKYDvupdRg==/3233663698631203.jpg'
    }
  },
  data(){
    return{
      rotateDeg:0,
      raf:null,
    }
  },
  computed:{
    isPlaying(){
      return this.$store.state.isPlaying
    }
  },
  methods: {
    step(){
      this.rotateDeg = (this.rotateDeg + 0.3) % 360
      this.raf = requestAnimationFrame(()=>{
        this.step()
      })
    }
  },
  watch:{
    isPlaying(val){
      // if(val){
      //   clearInterval(this.interval)
      //   this.interval=setInterval(()=>{
      //     this.rotateDeg = (this.rotateDeg + 0.5) % 360
      //   }, 1000 / 60)
      // }else{
      //   clearInterval(this.interval)
      // }
      if(val){
         requestAnimationFrame(this.step)   
      }else {
        cancelAnimationFrame(this.raf)
      }
      
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.disc{
  text-align:center;
  z-index:2;
  width:100%;
  height:100%;
  position:relative;
  .discx{
    background-repeat:no-repeat;
    background-size:270px 270px;
    height:420px !important;
    width:420px  !important;
    background-position:center center;
    position:relative;
    margin:0 auto;
    top:-130px;
    .song-pic{
      height:420px;
      width:420px;
      position:absolute;
      left:50%;
      // top:50px;
      transform:translateX(-50%);
    }
  }
  .holder{
    height:172px;
    width:115px;
    position:relative;
    top:-15px;
    transform:rotate(-40deg);
    transform-origin:8% 8%;
    transition:all .3s;
    z-index:5;
    &.onPlaying{
      transform:rotate(-15deg);
      top:-20px;
    }
  }
}
</style>
