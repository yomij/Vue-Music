<template>
  <div class="recommend">
    <banner class="banner"></banner>
    <div class="songList" ref="songList">
      <div class="headline">
        <h2>推荐歌单</h2>
        <p>更多></p>
      </div>

      <div class="daily" ref="daily" :style="{width:picWidth+'px'}">
          <div class="day" :style="{height:picWidth+'px'}" @mouseover="active" @mouseout="unActive">
            <p class="tip" :class="{active:dailyActive}">根据你的口味推荐每日跟新</p>
            <div class="inf">
              <p class="week">{{week}}</p>
              <span>{{new Date().getDate()}}</span>
            </div>
          </div>
          <p class="title">每日推荐歌曲</p>
      </div>
    
      <list-cover class="list-cover" :class="{noMargin:index===3||index===8}" v-for="(recommend,index) in recommends"  :recommend="recommend" :picWidth="picWidth"></list-cover>
    </div>

    <div class="headline">
        <h2>推荐歌单</h2>
        <p>更多></p>
    </div>


  </div>
</template>

<script>
import banner from './banner'
import listCover from './listCover'
export default {
  name: 'recommend',
  components:{
    'banner':banner,
    'list-cover':listCover
  },
  data () {
    return {
      dailyActive: false,
      picWidth: 0,
      timer: null,
      resizeTimer: null,
      recommends:[{"id":984577647,"type":1,"name":"备胎独白 | “喜欢你 认真且怂 从一而终”","copywriter":"根据你喜欢的单曲《也罢》推荐","picUrl":"http://p4.music.126.net/KJFaQEKzXuIH7pUwr0vmlQ==/18919296579566869.jpg","playcount":3290596,"createTime":1509800306334,"creator":{"backgroundImgIdStr":"109951163165496162","avatarImgIdStr":"18678503535355516","gender":1,"userType":0,"nickname":"子瞻大魔王","signature":"努力做个善良的人 会分享自己的画 迷恋女声，目前准高三党","authority":0,"description":"","accountStatus":0,"userId":115260210,"remarkName":null,"avatarUrl":"http://p3.music.126.net/IBYUWSpxnIgkd42pMtwc1w==/18678503535355516.jpg","backgroundUrl":"http://p1.music.126.net/BEpJutyOp6wItEPL27va7A==/109951163165496162.jpg","avatarImgId":18678503535355516,"backgroundImgId":109951163165496160,"birthday":984848274000,"city":440600,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":["华语"],"djStatus":0,"followed":false,"vipType":0,"province":440000,"mutual":false},"trackCount":47,"userId":115260210,"alg":"itembased"},{"id":80317792,"type":1,"name":"写入人心的［那些民谣］","copywriter":"根据你喜欢的单曲《借我》推荐","picUrl":"http://p4.music.126.net/rLVIhvRniYWvD_uw8Yik-Q==/1368891982396145.jpg","playcount":830278,"createTime":1433936951478,"creator":{"backgroundImgIdStr":"18703792302016355","avatarImgIdStr":"18884112207582978","gender":1,"userType":0,"nickname":"那有一只长颈鹿","signature":"♥","authority":0,"description":"","accountStatus":0,"userId":42781188,"remarkName":null,"avatarUrl":"http://p4.music.126.net/YyWisZXx--dOclhaNHJG_A==/18884112207582978.jpg","backgroundUrl":"http://p1.music.126.net/YGJxYlwbhIn-TjH02TETvQ==/18703792302016355.jpg","avatarImgId":18884112207582976,"backgroundImgId":18703792302016356,"birthday":769104000000,"city":350100,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":null,"djStatus":0,"followed":false,"vipType":10,"province":350000,"mutual":false},"trackCount":160,"userId":42781188,"alg":"itembased"},{"id":97030999,"type":1,"name":"100首美到深入灵魂的民谣","copywriter":"根据你喜欢的单曲《北方》推荐","picUrl":"http://p3.music.126.net/QxaXSYGU6zy_f_NHsHeglQ==/7998947093877729.jpg","playcount":1274647,"createTime":1439255236083,"creator":{"backgroundImgIdStr":"1369991501207176","avatarImgIdStr":"3432675308360359","gender":1,"userType":0,"nickname":"i乔小木","signature":"汉有游女，不可求思。","authority":0,"description":"","accountStatus":0,"userId":85365685,"remarkName":null,"avatarUrl":"http://p3.music.126.net/mi7pR3j07YZqoawBkgQcSA==/3432675308360359.jpg","backgroundUrl":"http://p1.music.126.net/Frc-5YMfvAbAui-lT5l3Eg==/1369991501207176.jpg","avatarImgId":3432675308360359,"backgroundImgId":1369991501207176,"birthday":-607173114076,"city":1010000,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":null,"djStatus":0,"followed":false,"vipType":11,"province":1000000,"mutual":false},"trackCount":106,"userId":85365685,"alg":"itembased"},{"id":692659541,"type":1,"name":"『日系翻唱』惊艳双耳的国人翻唱！","copywriter":"根据你可能喜欢的单曲《Alice（Cover 古川本舗）》推荐","picUrl":"http://p3.music.126.net/riqStNN8e1bcGoNIycIgHA==/19132601835001829.jpg","playcount":4408009,"createTime":1491799248304,"creator":{"backgroundImgIdStr":"18759867395301630","avatarImgIdStr":"1410673432348525","gender":1,"userType":0,"nickname":"右心丶","signature":"可以卑微如蝼蚁，不可扭曲如蛆虫。","authority":0,"description":"","accountStatus":0,"userId":267679591,"remarkName":null,"avatarUrl":"http://p4.music.126.net/YQpQHA449oz3Xa2yYvSDqw==/1410673432348525.jpg","backgroundUrl":"http://p1.music.126.net/Hih-v2fFz6o8ShUZav1uKQ==/18759867395301630.jpg","avatarImgId":1410673432348525,"backgroundImgId":18759867395301630,"birthday":888681600000,"city":411700,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":["轻音乐"],"djStatus":10,"followed":false,"vipType":11,"province":410000,"mutual":false},"trackCount":24,"userId":267679591,"alg":"qrt_itembased1"},{"id":2051073118,"type":1,"name":"于文文 - 体面","copywriter":"根据你喜欢的单曲《云烟成雨》推荐","picUrl":"http://p3.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg","playcount":85661,"createTime":1515474043331,"creator":{"avatarImgId":18686200114669624,"backgroundImgId":2002210674180204,"birthday":-2209017600000,"city":350300,"authStatus":0,"detailDescription":"","defaultAvatar":true,"expertTags":null,"djStatus":0,"followed":false,"mutual":false,"remarkName":null,"avatarUrl":"http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg","backgroundUrl":"http://p1.music.126.net/5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg","avatarImgIdStr":"18686200114669622","backgroundImgIdStr":"2002210674180204","accountStatus":0,"userId":85860173,"vipType":10,"province":350000,"userType":0,"nickname":"shaofan_wan","signature":"","authority":0,"description":"","gender":0},"trackCount":95,"userId":85860173,"alg":"contextbased"},{"id":574892459,"type":1,"name":"淳美民谣 I 宛若游丝般的如兰气息","copywriter":"根据你喜欢的单曲《不及》推荐","picUrl":"http://p4.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg","playcount":2569401,"createTime":1484790543906,"creator":{"avatarImgId":109951163141407470,"backgroundImgId":109951163141421810,"birthday":788025600000,"city":230100,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":["另类/独立","华语","欧美"],"djStatus":10,"followed":false,"mutual":false,"remarkName":null,"avatarUrl":"http://p3.music.126.net/xjWRb3_bDWJ6IuQP0PrGyQ==/109951163141407470.jpg","backgroundUrl":"http://p1.music.126.net/wHAOoqVB3ytbHJoP8_QZ-g==/109951163141421808.jpg","avatarImgIdStr":"109951163141407470","backgroundImgIdStr":"109951163141421808","accountStatus":0,"userId":7394345,"vipType":10,"province":230000,"userType":0,"nickname":"朩朩青尘","signature":"动态里热爱分享优质视频、摄影美图、精选音乐。如有侵权，请私信我删除。","authority":0,"description":"","gender":1},"trackCount":53,"userId":7394345,"alg":"itembased"},{"id":800916579,"type":1,"name":"看书写作业（纯音乐）","copywriter":"根据你喜欢的单曲《The truth that you leave》推荐","picUrl":"http://p3.music.126.net/rEkio6bMKSP7kujxEzDtDg==/18626826488108339.jpg","playcount":171707,"createTime":1499359582909,"creator":{"avatarImgId":109951163234726380,"backgroundImgId":109951163234705100,"birthday":1006963200000,"city":1010000,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":null,"djStatus":0,"followed":false,"mutual":false,"remarkName":null,"avatarUrl":"http://p3.music.126.net/OGQpy8vPTcojXILvr_0AtA==/109951163234726377.jpg","backgroundUrl":"http://p1.music.126.net/FBKUXKOwD3pYgf9O_gaYwQ==/109951163234705098.jpg","avatarImgIdStr":"109951163234726377","backgroundImgIdStr":"109951163234705098","accountStatus":0,"userId":367331054,"vipType":0,"province":1000000,"userType":0,"nickname":"Firefans丶绊","signature":"德智体美全面发展的六边形战士！","authority":0,"description":"","gender":1},"trackCount":188,"userId":367331054,"alg":"itembased"},{"id":703114327,"type":1,"name":"快乐男声2017参赛歌曲集","copywriter":"根据你喜欢的单曲《便宜的幸福》推荐","picUrl":"http://p3.music.126.net/bxz7B7CZZBUCQMlk9GfoBg==/109951163050443579.jpg","playcount":140329,"createTime":1492703284762,"creator":{"avatarImgId":528865154765530,"backgroundImgId":2002210674180203,"birthday":606240000000,"city":110101,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":null,"djStatus":10,"followed":false,"mutual":false,"remarkName":null,"avatarUrl":"http://p3.music.126.net/1I1tse1D4V5osDMRBr63Bg==/528865154765530.jpg","backgroundUrl":"http://p1.music.126.net/bmA_ablsXpq3Tk9HlEg9sA==/2002210674180203.jpg","avatarImgIdStr":"528865154765530","backgroundImgIdStr":"2002210674180203","accountStatus":0,"userId":247522961,"vipType":0,"province":110000,"userType":0,"nickname":"苗文Music","signature":"暂时还没想好","authority":0,"description":"","gender":1},"trackCount":290,"userId":247522961,"alg":"itembased"},{"id":692659541,"type":1,"name":"『日系翻唱』惊艳双耳的国人翻唱！","copywriter":"根据你可能喜欢的单曲《Alice（Cover 古川本舗）》推荐","picUrl":"http://p3.music.126.net/riqStNN8e1bcGoNIycIgHA==/19132601835001829.jpg","playcount":4408009,"createTime":1491799248304,"creator":{"backgroundImgIdStr":"18759867395301630","avatarImgIdStr":"1410673432348525","gender":1,"userType":0,"nickname":"右心丶","signature":"可以卑微如蝼蚁，不可扭曲如蛆虫。","authority":0,"description":"","accountStatus":0,"userId":267679591,"remarkName":null,"avatarUrl":"http://p4.music.126.net/YQpQHA449oz3Xa2yYvSDqw==/1410673432348525.jpg","backgroundUrl":"http://p1.music.126.net/Hih-v2fFz6o8ShUZav1uKQ==/18759867395301630.jpg","avatarImgId":1410673432348525,"backgroundImgId":18759867395301630,"birthday":888681600000,"city":411700,"authStatus":0,"detailDescription":"","defaultAvatar":false,"expertTags":["轻音乐"],"djStatus":10,"followed":false,"vipType":11,"province":410000,"mutual":false},"trackCount":24,"userId":267679591,"alg":"qrt_itembased1"}]
    }
  },
  mounted(){
    console.log('mounted');
    this.picWidth = (this.$refs.songList.offsetWidth - 90)/5
    window.onresize = () => {     
      this.picWidth = (this.$refs.songList.offsetWidth - 90)/5
    }
  },
  computed:{
    week(){
      return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
    },
    userId(){
      return this.$store.state.userId
    }
  },
  methods: {
    active(){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.dailyActive = true
      },400)
    },
    unActive(){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.dailyActive = false
      },400)
    }
  },
  watch:{
    picWidth (val) {
      if (!this.resizeTimer) {
        this.picWidth = val
        this.resizeTimer = true
        let that = this
        setTimeout(function () {
          console.log(that.picWidth)
          that.resizeTimer = false
        }, 400)
      }
    },
    userId(val){
      if(val){
        console.log(val);
        this.axios.get('http://localhost:3000/recommend/resource').then(res => {
          console.log(JSON.stringify(res.data));
          this.recommends = res.data.recommend.concat(this.recommends.splice(0, 4))
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';
.recommend{
  with:100%;
  height:100%;
  .banner{
    max-width:1280px;
    margin:0 auto;
    margin-top:30px;
  }
  .headline{
    height:50px;
    line-height:50px;
    margin-top:20px;
    border-bottom:rgb(229,229,230) solid 2px;
    margin-bottom:20px;
    h2{
      float:left;
    }
    p{
      float:right;
    }
  }
  .list-cover{
    float:left;
    margin-right:20px;
    &.noMargin{
      margin-right:0 !important;
    }
  }
  .songList{
    max-width:1280px;
    position:relative;
    margin:0 auto;
    .daily{
      overflow:hidden;
      position:relative;
      float:left;
      margin-right:20px;
      p.title{
        cursor:pointer;
        text-align:left;
        width:100%;
        height:80px;
        padding:10px 0;
        color:#515050;
        &:hover{
          color:#000;
        }
      }
      .day{
        cursor:pointer;
        background-color:#fff;
        position:relative;
        .inf{
          height:150px;
          width:150px;
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
        }
        p.tip{
          position:absolute;
          background-color:rgba(0,0,0,.5);
          width:100%;
          left:0;
          text-align:left;
          padding:10px;
          top:0;
          color:#fff;
          transform:translateY(-100%);
          transition:all .3s;
        }
        p.active{
          transform:translateY(0);
        }
        p.week{
          font-size:25px;
        }
        span{
          font-size:110px;
          color:$mainRed;
        }
      }
    }
  }
}
</style>
