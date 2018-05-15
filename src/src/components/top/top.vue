<template>
  <div class="top">
    <h3 class="logo">
      <router-link
        class="link" 
        :to="{path:'/'}">Music</router-link>
    </h3>

    <div class="navigation">
      <i class="iconfont icon-jiantou_zuo" @click="back"></i>
      <i class="iconfont icon-jiantou" @click="forward"></i>
    </div>

    <search defaultText="搜索音乐，歌手，歌词，用户" class="searchx"></search>
    <ul class="right">
      <li class="avatar"><img :src="avatar" alt=""></li>
      <li class="nickname">
        <p @click="hideInfShow"><span class="namex">{{username}}</span><i class="iconfont icon-xiangxia"></i></p>
        <div class="hideInf" v-show="isHideInfShow" @mouseover="inBox" @mouseout="outBox">
          <div class="login" v-if="!userId">
            <div class="tip">
              <i class="iconfont icon-yinle"></i>
            </div>
            <div class="input">
              <div>
                <i class="iconfont icon-shouji"></i>
                <input type="tel" v-model="tel" placeholder="请输入手机号">
              </div>
              <div>
                <i class="iconfont icon-icon-"></i>
                <input type="password" v-model="password" placeholder="请输入密码">
              </div>
              <span class="msg" v-show="msg"><i class="iconfont icon-jinggao"></i>{{msg}}</span>      
            </div>
           
            
            <button type="button" @click="login">登陆</button>
          </div>
          <div class="userInf">
                
          </div>
        </div>
      </li>
      <li><i class="iconfont icon-huanfu"></i></li>
      <li><i class="iconfont icon-e-mail_icon"></i></li>
      <li><i class="iconfont icon-shezhi"></i></li>
      <li><i class="iconfont "></i>1</li>
      <li><i class="iconfont icon--zuixiao"></i></li>
      <li><i class="iconfont icon-zuixiaohua"></i></li>
      <li><i class="iconfont icon-zuidahua"></i></li>
      <li><i class="iconfont icon-guanbi1"></i></li>
    </ul>
  </div>
</template>

<script>
import search from './search'
export default {
  name: 'top',
  components: {
    'search': search,
  },
  data () {
    return {
      tel: '',
      password: '',
      msg: '',
      isHideInfShow:false,
      hideInfTimer:false,
      username:'登陆',
      avatar:'/static/img/avatar.jpg'
    }
  },
  computed:{
    userId(){
      return this.$store.state.userId
    }
  },
  methods:{
    back(){
      console.log(this.$router);
      console.log(this.$router.go(-1))

    },
    forward(){
      console.log(this.$router);
      this.$router.go(1)
    },
    hideInfShow(){
      this.isHideInfShow = !this.isHideInfShow
    },
    inBox(){
      if(this.hideInfTimer){
        this.hideInfTimer = false
      }
    },
    outBox(){
      this.hideInfTimer = true
      setTimeout(()=>{
        if(this.hideInfTimer){
           this.isHideInfShow = false
        }
      },2000)
    },
    login(){
      if(!new RegExp(/^\d{11}$/g).test(this.tel)){
        this.msg='请输入11位数字手机号'
      }else if(this.password.length === 0){
        this.msg='请输入登陆密码'
      }else{
        this.msg = ''
        this.axios.get(`http://localhost:3000/login/cellphone?phone=${this.tel}&password=${this.password}`).then(res => {

          if(res.data.code === 502 || res.data.code === 501){
            this.msg = res.data.msg
          }else if(res.data.code === 200){
            console.log(JSON.stringify(res.data));
            this.$store.commit('login',res.data.account.id)
            this.isHideInfShow = false
            this.username = res.data.profile.nickname
            this.avatar = res.data.profile.avatarUrl
          }

        })
      }
    }
  },
  watch:{

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
    a{
      color:#fff;
    }
  }
  .navigation{
    // width:62px;
    position:absolute;
    left:220px;
    top:50%;
    transform:translateY(-50%);
    border:1px #a82828 solid;
    border-radius:4px;
    i{
      display:inline-block;
      // vertical-align:middle;
      color:#fff;
      font-size:20px;
      font-weight:bold;
      height:25px;
      line-height:28px;
      width:30px;
      float:left;
      &:last-child{
        border-left:1px #a82828 solid;
      }
    }
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
  ul.right{
    // float:right;
    position:absolute;
    top:0;
    right:15px;
    height:100%;
    li{
      float:left;
      margin-left:20px;
      height:100%;
      max-height:100%;
      position:relative;
      color:#E1B2B2;
      min-width:20px;
      i{
        font-size:20px;
        color:#E1B2B2;
        cursor:pointer;
        &:hover{
          color:#EFDDDD;
        }
      }
      &.avatar{
        height:100%;
        img{
          width:35px;
          height:35px;
          border-radius:50%;
          display:inline-block;
          vertical-align: middle;
          cursor:pointer; 
        }
      }
      &.nickname{
        span.namex{
          display:inline-block;
          cursor:pointer;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          width:50px;
          margin-right:30px;
          &:hover{
            color:#EFDDDD;
          }
        }
        i.icon-xiangxia{
          position:absolute;
          font-size:10px;
          margin-left:-20px;
          display:inline-block;
          vertical-align: middle;
        }
      }

      .hideInf{
        position:absolute;
        left:-150px;
        width:380px;
        top:$topHeight;
        box-shadow: 1px 1px 10px rgba(0,0,0,.4);
        border-radius: 5px;
        background-color: rgb(250,250,250);
        padding:15px 0;
        &:before {
          position: absolute;
          content: "";
          display: block;
          border: 13px solid rgb(250,250,250);
          border-top: none;
          border-bottom-color: rgb(250,250,250);
          border-left-color: transparent;
          border-right-color: transparent;
          left: 50%;
          top:0;
          transform: translate(-50%,-95%);
        }
        .login{
          text-align:center;
          background-color: rgb(250,250,250);
          .tip{
            height:80px;
            line-height:100px;
            position:relative;
            left:50%;
            transform:translateX(-50%);
            width:80px;
            border-radius:80px;
            background-color:#F86363;
            color:white;
            text-align:center;
            font-size:20px;
            box-shadow: 1px 1px 3px rgba(123,123,123,.2);
            i{
              color:#fff;
              font-size:40px;
            }
            
          }
          .input{
            border:1px $border solid;
            border-radius:5px;
            width:70%;
            margin:30px auto;
            background-color:#fff;
            // margin:20px 0;
            div{
              text-align:left;
              height:50px;
              position:relative;
              line-height:50px;
              padding:0 10px;
              &:first-child{
                border-bottom:1px $border solid;
              }
              i{
                color:$border;
                display:inline-block;
                height:30px;
                font-size:18px;
                transform:translateY(3px);
                margin-right:10px;
              }
            }
            input{
              height:30px;
              width:80%;
              display:inline-block;
              // position:absolute;top:0;
              background-color:#fff;
              vertical-align:middle;
              font-size:15px;
            }
          }
          span.msg{
            display:inline;
            color:$mainRed;
            position:relative;
            float:right;
            line-height:16px;
            margin-top:15px;
            i{
              color: $mainRed;
              font-size:18px;
              margin-right:5px;
            }
          }
          button{
            border:none;
            outline:none;
            background-color:#F86363;
            width:70%;
            height:40px;
            color:white;
            font-size:20px;
            border-radius:5px;
            cursor:pointer;
            margin-bottom:30px;
            &:hover{
              background-color:$mainRed;
            }

          }
        }
      }
    }
  }
}
</style>
