<template>
  <div class="banner" >
    <div class="imgs-container">
      <ul @mouseover="movePause"
          @mouseout="moveBegin">
          <li
          @click="picMoveRight"
          class="prePic"
          :class="{
            prePicJump:isJumpAnimation,
            prePicMoveLeft:isMoveLeft,
            nextPicMoveLeft:isMoveRight
          }">
            <img
              :src="imgs[(activedImg-1)>=0?activedImg-1:imgs.length-1].pic">
          </li>
          <li
            class="nowPic"
            :class="{
              nowPicJump:isJumpAnimation,
              nowPicMoveLeft:isMoveLeft,
              nowPicMoveRight:isMoveRight
            }">
            <!-- <span class="mask" v-show="isMoveLeft"></span> -->
            <img
              :src="imgs[activedImg].pic">
          </li>
          <li
            class="nextPic"
            @click="picMoveLeft"
            :class="{
            nextPicJump:isJumpAnimation,
            nextPicMoveLeft:isMoveLeft,
            prePicMoveLeft:isMoveRight
          }"
          >
            <img
              :src="imgs[(activedImg+imgs.length+1)%imgs.length].pic">
          </li>
      </ul>
    </div>
    <div class="imgs-control">
        <ul>
          <li
            v-for="(img, index) in imgs"
            :class="{activate:index==activedImg}"
            @mouseover="jump(index)"
            @mouseout="moveBegin"></li>
        </ul>
    </div>
    <!-- <span><i class="iconfont icon-jiantou_down"></i></span> -->
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    imgs: {
      type: Array,
      default: () => [{"targetType":10,"titleColor":"red","typeTitle":"新碟首发","encodeId":"3165446","adid":null,"adLocation":null,"targetId":3165446,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"","pic":"http://p3.music.126.net/s25q2x5QyqsAzilCurD-2w==/7973658325212564.jpg"},{"targetType":1005,"titleColor":"blue","typeTitle":"专栏","encodeId":"170001","adid":null,"adLocation":null,"targetId":170001,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"http://music.163.com/m/topic/170001","pic":"http://p4.music.126.net/V9-MXz6b2MNhEKjutoDWIg==/7937374441542745.jpg"},{"targetType":1005,"titleColor":"blue","typeTitle":"专栏","encodeId":"169001","adid":null,"adLocation":null,"targetId":169001,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"http://music.163.com/m/topic/169001","pic":"http://p4.music.126.net/CTU5B9R9y3XyYBZXJUXzTg==/2897213141428023.jpg"},{"targetType":1000,"titleColor":"red","typeTitle":"歌单","encodeId":"81662699","adid":null,"adLocation":null,"targetId":81662699,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"","pic":"http://p4.music.126.net/tGPljf-IMOCyPvumoWLOTg==/7987951976374270.jpg"},{"targetType":3000,"titleColor":"blue","typeTitle":"广告","encodeId":"0","adid":null,"adLocation":null,"targetId":0,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"http://wlj2015.qq.com/","pic":"http://p4.music.126.net/mp2Y2n4ueZzIj6JSnUOdtw==/7875801790676538.jpg"},{"targetType":10,"titleColor":"red","typeTitle":"新碟首发","encodeId":"3165337","adid":null,"adLocation":null,"targetId":3165337,"exclusive":false,"monitorClick":null,"monitorImpress":null,"monitorType":null,"monitorBlackList":null,"adSource":null,"extMonitor":null,"extMonitorInfo":null,"monitorClickList":[],"monitorImpressList":[],"url":"","pic":"http://p3.music.126.net/e0gGadEhjur2UuUpDF9hPg==/7788940372125389.jpg"}]
    }
  },
  data () {
    return {
      imgList: this.imgs,
      activedImg: 0,
      isJumpAnimation: false,
      isMoveLeft: false,
      isMoveRight: false,
      timer: null
    }
  },
  created () {
    this.moveBegin()
  },
  methods: {
    jump (index) {
      this.movePause()
      if (Math.abs(index - this.activedImg) > 1) {
        this.isJumpAnimation = true
        setTimeout(() => {
          this.isJumpAnimation = false
          this.activedImg = index
          this.moveBegin()
        }, 200)
      } else if (index - this.activedImg === 1) {
        this.picMoveLeft()
        this.moveBegin()
      } else if (index - this.activedImg === -1) {
        this.picMoveRight()
        this.moveBegin()
      }
    },
    moveBegin () {
      this.movePause()
      this.timer = setInterval(() => {
        this.picMoveLeft()
      }, 4000)
    },
    movePause () {
      window.clearInterval(this.timer)
    },
    picMoveLeft () {
      this.isMoveLeft = true
      var a = this.activedImg
      this.activedImg = (a + 1) % this.imgs.length
      setTimeout(() => {
        this.isMoveLeft = false
      }, 400)
    },
    picMoveRight () {
      this.isMoveRight = true
      var a = this.activedImg
      this.activedImg = (a - 1) < 0 ? this.imgs.length - 1 : a - 1 % this.imgs.length
      setTimeout(() => {
        this.isMoveRight = false
      }, 400)
    }

  }
}
</script>
<style lang="scss" scoped>
  @import '../../style/global.scss';
  $nowPicWidth: 670px;
  $nowPicHeight: 250px;
  $sidePicDistance: 144px;
  $sidePicWidth: $nowPicWidth * 0.9375;
  $sidePicHeight: $nowPicHeight * 0.9375;
  .banner{
    width:100%;
    height: $nowPicHeight;
    position: relative;
    .imgs-container{
      position: relative;
      width: 100%;
      height: 100%;
      ul{
        width:100%;
        height:100%;
        li img{
          width:100%;
          height:100%;
        }
      }
    }
    .pic{
      display:block;
      -webkit-transition: all .5s ease-in-out;
      -moz-transition: all .5s ease-in-out;
      -o-transition: all .5s ease-in-out;
      -ms-transition: all .5s ease-in-out;
      transition: all .5s ease-in-out;
      // border:5px red solid;
    }
    .nowPic{
      // display:none;
      height: 100%;
      width: $nowPicWidth;
      position: relative;
      // left: $sidePicDistance;
      bottom: 0;
      margin:0 auto;
      z-index: 10;
      // filter: grayscale(100%);
      @extend .pic;
      cursor:pointer;
    }
    .prePic{
      position: absolute;
      left: 0;
      bottom: 0;
      width: $sidePicWidth;
      height: $sidePicHeight;
      z-index:5;
      @extend .pic;
      &:after{
        content:"";
        display: block;
        width:100%;
        height:100%;
        position:absolute;
        background-color:#000000;
        filter:alpha(50%);
        bottom:0;
        z-index:20;
     }

    }
    span.mask{
      display: block;
      width:100%;
      height:100%;
      position:absolute;
      background-color:rgba(0,0,0,.5);
      bottom:0;
    }
    .nextPic{
      position: absolute;
      right: 0;
      bottom: 0;
      width: $sidePicWidth;
      height: $sidePicHeight;
      z-index: 5;
      @extend .pic;
      &:after{
        content:"";
        display: block;
        width:100%;
        height:100%;
        position:absolute;
        background-color:#000000;
        filter:alpha(50%);
        bottom:0;
        z-index:20;
     }
    }
    .imgs-control ul{
      display: table;
      text-align: center;
      margin:0 auto;
      :last-child {
        margin-right:0 !important;
      }
      li {
        list-style: none;
        float: left;
        height: 3px;
        width: 20px;
        background-color: #A09B9B;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
        border-radius:5px;
      }
    }
    ul>li.activate{
      background-color: $mainRed;
    }
  }

  .prePicJump{
    animation:prePicJump .5s ease-in-out;
  }
  .nowPicJump{
    animation:nowPicJump .5s ease-in-out;
  }
  .nextPicJump {
    animation:nowPicJump .5s ease-in-out;
  }
  @keyframes prePicJump{
    0%{
      transform:translateX(0) scale(1,1);
    }
    50%{
      transform: translateX(0) scale(.90, .90) translateY(0%) ;
    }
    100%{
      transform:translateX(0) scale(1,1);
    }
  }
  @keyframes nowPicJump{
    0%{
      transform: scale(1,1);
    }
    50%{
      transform: scale(.85, .85) ;
    }
    100%{
      transform:scale(1,1);
    }
  }

  @keyframes nextPicJump{
    0%{
      transform:translateX(0) scale(1,1);
    }
    50%{
      transform: translateX(-3%) scale(.90, .90) translateY(5%);
    }
    100%{
      transform:translateX(0) scale(1,1);
    }
  }
  .prePicMoveLeft{
    animation:prePicMoveLeft .5s ease-in-out;
  }
  .nowPicMoveLeft{
    animation:nowPicMoveLeft .5s ease-in-out;
  }
  .nextPicMoveLeft{
    animation:nextPicMoveLeft .5s ease-in-out;
  }

  @keyframes prePicMoveLeft{
    0%{
      transform: translateX(40px)  scale(1.07, 1.07);
      opacity:0
    }
    100%{
      transform:translateX(0) scale(1, 1);
      opacity:1;
    }
  }

   @keyframes nowPicMoveLeft{
    0%{
      transform: translateX(80px) translateY(12px) scale(0.9375,0.9375);
      opacity:1;
      // bottom:0
    }
    100%{
    // transform:  scale(0.9375, 0.9375);
      opacity:1;
    }
  }
  @keyframes nextPicMoveLeft{
    0%{
      transform: translateX(-40px);
      opacity:0
    }
    100%{
      transform:translateX(0);
      opacity:1;
    }
  }

  .nowPicMoveRight{
    animation:nowPicMoveRight .5s ease-in-out;
  }

   @keyframes nowPicMoveRight{
    0%{
      transform: translateX(-80px) translateY(10px) scale(0.9375,0.9375);
      opacity:1;
      // bottom:0
    }
    100%{
    // transform:  scale(0.9375, 0.9375);
      opacity:1;
    }
  }

</style>
