<template>
  <div class="songlist-inf" >
    
    <div class="header">
      <img :src="songlistInf.playlist.coverImgUrl" >
      <div class="inf">
        <p class="title">
          <i class="icon">歌单</i><span class="name">{{songlistInf.playlist.name}}</span>
          <span class="extra">
            <i class="iconfont icon-yinle"></i><span>{{songlistInf.playlist.trackCount}}</span>
            <i class="iconfont icon-bofang1"></i><span>{{songlistInf.playlist.playCount}}</span>
          </span>
        </p>
        <p class="creatInf">
          <img :src="songlistInf.playlist.creator.avatarUrl">
          <span>{{songlistInf.playlist.creator.nickname}}</span>
          <span class="create-time">{{createTime(songlistInf.playlist.createTime)}}</span>
        </p>
        <ul class="operate">
          <li class="btn play">
              <i class="iconfont icon-bofang1"></i>播放全部
          </li>
          <li class="btn add">
            <i class="iconfont icon-jiahao"></i>
          </li>
          <li>
            <i class="iconfont icon-shoucang"></i>收藏
          </li> 
          <li>
            <i class="iconfont icon-fenxiang"></i>分享
          </li> 
          <li>
            <i class="iconfont icon-tubiaozhizuomoban"></i>  下载全部
          </li> 
        </ul>
        <p class="tags">
          <span class="tip">标签:</span><span v-html="tags"></span>
        </p>
        <p class="des" :class="{nodes:!songlistInf.playlist.description}">
          <span class="tip">简介:</span>{{songlistInf.playlist.description ? songlistInf.playlist.description : '添加简介'}}
        </p>
      </div>
    </div>
    
    <div class="main">
      <ul class="nav">
        <li class="active normal">歌曲列表</li>
        <li class="normal">评论(12455)</li>
        <li class="normal">收藏者</li>
        <li class="search"><input type="text" name="" value="" placeholder="搜索歌单音乐"><i class="iconfont icon-search"></i></li>
      </ul>
      <ul class="filter">
        <li></li>
        <li>操作</li>
        <li>音乐标题</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>时长</li>
      </ul>
      <div class="song">
        <div class="song-index"></div>
        <div class="song-op"></div>
        <div class="song-title"></div>
        <div class="singer"></div>
        <div class="album"></div>
        <div class="duration"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songlistInf',
  data(){
    return {
      songlistInf:{"playlist":{"subscribers":[],"subscribed":false,"creator":{"defaultAvatar":false,"province":330000,"authStatus":0,"followed":false,"avatarUrl":"http://p1.music.126.net/A4Y9iDoDc6WNzGu_0Y8q-g==/19098516974745121.jpg","accountStatus":0,"gender":0,"city":330100,"birthday":862329600000,"userId":308176676,"userType":0,"nickname":"瑾酩丶","signature":"听得每首歌的女主角都是你啊。","description":"","detailDescription":"","avatarImgId":19098516974745121,"backgroundImgId":18928092672496010,"backgroundUrl":"http://p1.music.126.net/M14Y4h6LOQ8Lwnk9_7KZjw==/18928092672496010.jpg","authority":0,"mutual":false,"expertTags":null,"experts":null,"djStatus":0,"vipType":10,"remarkName":null,"backgroundImgIdStr":"18928092672496010","avatarImgIdStr":"19098516974745121","avatarImgId_str":"19098516974745121"},"tracks":[{"name":"僕が死のうと思ったのは","id":467011317,"pst":0,"t":0,"ar":[{"id":160729,"name":"中島美嘉","tns":[],"alias":[]}],"alia":[],"pop":100.0,"st":0,"rt":null,"fee":8,"v":8,"crbt":null,"cf":"","al":{"id":35242002,"name":"TOUGH","picUrl":"http://p1.music.126.net/Rv7XgyTNKwJNS-PAtXvRag==/18247494975126406.jpg","tns":["为爱勇敢"],"pic_str":"18247494975126406","pic":18247494975126406},"dt":381921,"h":{"br":320000,"fid":0,"size":15277497,"vd":-1.91},"m":{"br":160000,"fid":0,"size":7638771,"vd":-1.49},"l":{"br":96000,"fid":0,"size":4583280,"vd":-1.5},"a":null,"cd":"1","no":6,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":0,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":7001,"mv":0,"publishTime":1490112000007,"tns":["曾经我也想过一了百了"]},{"name":"君だったら","id":26116370,"pst":0,"t":0,"ar":[{"id":19881,"name":"HAPPY BIRTHDAY","tns":[],"alias":[]}],"alia":[],"pop":100.0,"st":0,"rt":"","fee":0,"v":5,"crbt":null,"cf":"","al":{"id":2389679,"name":"今夜きみが怖い夢を見ませんように","picUrl":"http://p1.music.126.net/PfLFdJg2wKihsac60C-lYA==/2512384069491818.jpg","tns":[],"pic":2512384069491818},"dt":320000,"h":{"br":320000,"fid":0,"size":12848812,"vd":-3.17},"m":{"br":160000,"fid":0,"size":6438363,"vd":-2.76},"l":{"br":96000,"fid":0,"size":3873766,"vd":-2.81},"a":null,"cd":"1","no":4,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":0,"publishTime":1363104000007},{"name":"夕日","id":700032,"pst":0,"t":0,"ar":[{"id":17601,"name":"茶太","tns":[],"alias":[]}],"alia":[],"pop":100.0,"st":0,"rt":"","fee":0,"v":144,"crbt":null,"cf":"","al":{"id":68077,"name":"音楽ピューパとやさしい世界","picUrl":"http://p1.music.126.net/DdEbZlAK7dDUzkDRraDOgQ==/659706976677930.jpg","tns":[],"pic":659706976677930},"dt":192133,"h":{"br":320000,"fid":0,"size":7688403,"vd":2.0},"m":{"br":192000,"fid":0,"size":4613059,"vd":2.0},"l":{"br":128000,"fid":0,"size":3075387,"vd":2.0},"a":null,"cd":"1","no":12,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":0,"publishTime":1304179200000},{"name":"キラメキ-公生とかをりの演奏ver.-","id":29769437,"pst":0,"t":0,"ar":[{"id":22367,"name":"wacci","tns":[],"alias":[]}],"alia":[],"pop":95.0,"st":0,"rt":null,"fee":0,"v":13,"crbt":null,"cf":"","al":{"id":3076076,"name":"キラメキ(期間生産限定盤)","picUrl":"http://p1.music.126.net/kQqkFAqZwOLTLKYDvupdRg==/3233663698631203.jpg","tns":[],"pic":3233663698631203},"dt":279562,"h":{"br":320000,"fid":0,"size":11186716,"vd":-1.5},"m":{"br":160000,"fid":0,"size":5593901,"vd":-1.06},"l":{"br":96000,"fid":0,"size":3356774,"vd":-1.07},"a":null,"cd":"1","no":5,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":0,"publishTime":1417536000007},{"name":"アイロニ","id":31421442,"pst":0,"t":0,"ar":[{"id":191316,"name":"majiko","tns":[],"alias":[]}],"alia":[],"pop":100.0,"st":0,"rt":null,"fee":0,"v":13,"crbt":null,"cf":"","al":{"id":3119399,"name":"Contrast","picUrl":"http://p1.music.126.net/z3DbNjr5UsIR92zl-6L2VQ==/109951163041844005.jpg","tns":[],"pic_str":"109951163041844005","pic":109951163041844005},"dt":244066,"h":{"br":320000,"fid":0,"size":9765660,"vd":-4.23},"m":{"br":160000,"fid":0,"size":4882853,"vd":-3.82},"l":{"br":96000,"fid":0,"size":2929729,"vd":-3.88},"a":null,"cd":"1","no":3,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":0,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":0,"publishTime":1427817600007},{"name":"secret base ~君がくれたもの~ (10 years after Ver.)","id":33911781,"pst":0,"t":0,"ar":[{"id":16906,"name":"茅野愛衣","tns":[],"alias":[]},{"id":17905,"name":"戸松遥","tns":[],"alias":[]},{"id":16501,"name":"早見沙織","tns":[],"alias":[]}],"alia":["TV动画《我们仍未知道那天所看见的花的名字》片尾曲"],"pop":100.0,"st":0,"rt":null,"fee":0,"v":439,"crbt":null,"cf":"","al":{"id":3266177,"name":"secret base～君がくれたもの～","picUrl":"http://p1.music.126.net/daZcHVIJicL3wXJWMIjAng==/7926379325753633.jpg","tns":[],"pic":7926379325753633},"dt":352493,"h":{"br":320000,"fid":0,"size":14101986,"vd":-2.85},"m":{"br":160000,"fid":0,"size":7051015,"vd":-2.42},"l":{"br":96000,"fid":0,"size":4230626,"vd":-2.48},"a":null,"cd":"1","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":0,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":0,"publishTime":1303833600007},{"name":"ありがとう…","id":25638306,"pst":0,"t":0,"ar":[{"id":16686,"name":"KOKIA","tns":[],"alias":[]}],"alia":[],"pop":100.0,"st":0,"rt":"","fee":0,"v":30,"crbt":null,"cf":"","al":{"id":2261097,"name":"ありがとう…","picUrl":"http://p1.music.126.net/RyUJEW4u_Vk65XDSWtn2aA==/6634453162533388.jpg","tns":[],"pic":6634453162533388},"dt":253226,"h":{"br":320000,"fid":0,"size":10131373,"vd":-2.65076E-4},"m":{"br":160000,"fid":0,"size":5065709,"vd":-2.65076E-4},"l":{"br":96000,"fid":0,"size":3039443,"vd":-2.65076E-4},"a":null,"cd":"1","no":1,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"rtype":0,"rurl":null,"mst":9,"cp":663018,"mv":5643707,"publishTime":929548800007}],"trackIds":[{"id":467011317,"v":8},{"id":26116370,"v":5},{"id":700032,"v":144},{"id":29769437,"v":13},{"id":31421442,"v":13},{"id":33911781,"v":439},{"id":25638306,"v":30}],"adType":0,"trackNumberUpdateTime":1523639954534,"subscribedCount":0,"cloudTrackCount":0,"userId":308176676,"coverImgId":18247494975126406,"createTime":1521615795731,"updateTime":1523639954534,"name":"阿里嘎多","id":2150535574,"description":null,"ordered":false,"tags":['我的','你的'],"status":0,"playCount":22,"commentThreadId":"A_PL_0_2150535574","trackUpdateTime":1523639977689,"trackCount":7,"coverImgUrl":"http://p1.music.126.net/Rv7XgyTNKwJNS-PAtXvRag==/18247494975126406.jpg","newImported":false,"specialType":0,"highQuality":false,"privacy":0,"shareCount":0,"coverImgId_str":"18247494975126406","commentCount":0},"code":200,"privileges":[{"id":467011317,"fee":8,"payed":0,"st":0,"pl":128000,"dl":0,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":320000,"fl":128000,"toast":false,"flag":0,"preSell":false},{"id":26116370,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":320000,"fl":320000,"toast":false,"flag":0,"preSell":false},{"id":700032,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":320000,"toast":false,"flag":0,"preSell":false},{"id":29769437,"fee":0,"payed":0,"st":-200,"pl":0,"dl":0,"sp":0,"cp":0,"subp":0,"cs":false,"maxbr":320000,"fl":0,"toast":false,"flag":0,"preSell":false},{"id":31421442,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":320000,"toast":false,"flag":0,"preSell":false},{"id":33911781,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":320000,"toast":false,"flag":0,"preSell":false},{"id":25638306,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":999000,"fl":320000,"toast":false,"flag":0,"preSell":false}]}
    }
    
  },
  computed:{
    id(){
      return this.$route.params.id
    },
    tags(){
      // return this.songlistInf.playlist.tags.join('/')
      return this.songlistInf.playlist.tags[0] ? this.songlistInf.playlist.tags.map(tag =>{
        return `<a class="tag" style="color:rgb(64,158,209);cursor:pointer;">${tag}</a>`
      }).join(' / ') : `<a class="tag" style="color:rgb(64,158,209);cursor:pointer;">添加标签</a>`
    }
  },
  mounted(){
    // console.log(JSON.stringify(this.$route.params));
    // console.log(this.$route);
  },
  methods: {
    active(index){
      console.log('test');
      this.activeIndex = index
    },
    createTime(time){
      var date =new Date(time)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/global.scss';

.songlist-inf{
  // border:1px red solid;
  margin-top:30px;
  // padding:0 40px;
  background-color:$bgColor;
  width:100%;
  position:relative;
  .header{
    min-height:250px;
    width:100%;
    text-align:left;
    position:relative;
    padding:0 40px;
    img{
      height:250px;
      width:250px;
      display:inline-block;
      border:1px $border solid;
      // float:left;
      position:absolute;
    }
    div.inf{
      // position:absolute;
      // width:100%;
      padding-left:280px;
      top:0;
      p.title{
        hieght:35px;
        line-height:35px;
        i.icon{
          display:inline-block;
          height:28px;
          line-height:28px;
          font-size:16px;
          color:#fff;
          background-color:$mainRed;
          font-style:normal;
          padding:0 5px;
          border-radius:4px;
        }
        i.iconfont{
          margin-right:5px;
          margin-left:20px;
          font-size:18px;
          color:#656565;
        }
        span.name{
          font-size:28px;
          font-weight:bold;
          display:inline-block;
          hieght:28px;
          line-height:28px;
          margin-left:20px;
          vertical-align:middle;
        }
        span.extra{
          position:absolute;
          right:40px;
          color:#656565;
        }
      }
      p .tip{
        margin-right:5px;
      }
      p.creatInf{
        height:40px;
        line-height:40px;
        margin:15px 0;
        img{
          height:40px;
          width:40px;
          border-radius:50%;
          display:inline-block;
          vertical-align:middle;
          margin-right:10px;
        }
        span{
          display:inline-block;
          vertical-align:middle;
          color:#7F7E7E;
          &:last-child{
            margin:0 20px;
          }
        }
      }
      ul.operate{
        height:30px;
        li{
          float:left;
          height:30px;
          border:1px solid $border;
          line-height:30px;
          background-color:#fff;
          border-radius:5px;
          padding:0 8px;
          cursor:pointer;
          margin-right:10px;
          &:hover{
            background-color:rgb(245,245,247);
          }
          i{
            font-size:18px;
            font-weight:bold;
          }
          &.btn{
            border:1px $border solod;
            &.play{
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              margin-right:0;
              i{
                color:$mainRed;
              }
            }
            &.add{
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-left:none;
            }
          }
        }
      }
      p.tags{
        margin-top:30px;
        a{
          color:$bule;
        }
      }
      p.des{
        &.nodes{
          color:$bule;
        }
        span{
          color:#000;
        }
        margin-top:15px;
      }
    }
  }

  .main{
    .nav{
      width:100%;
      border-bottom:2px $mainRed solid;
      height:38px;
      margin-top:30px;
      padding:0 40px;
      position:relative;
      li{
        height:100%;
        float:left;
        padding:0 15px;
        border:1px $border solid;
        color:#000;
        background-color:#fff;
        cursor:pointer;        
        line-height:36px;
        &.normal{
          border-bottom:none;margin-right:8px;
          &:hover{
              background-color:rgb(245,245,247);
          }
        }

        
        &.search{
          height:28px;
          display:inline-block;
          vertical-align:middle;
          position:absolute;
          right:40px;
          border-radius:50px;
          top:4px;
          line-height:28px;
          input{
            height:24px;
            line-height:24px;
            position:relative;
            display:inline-block;
            vertical-align:middle;
            top:-2px;
          }
          i{
            font-size:20px;
          }
        }
        &.active{
          background-color:$mainRed;
          color:#fff;
          border:1px $mainRed solid;
          border-bottom:none;
          &:hover{
              background-color:$mainRed;
          }
        }
      }
    }

    .filter{
              width:100%;
      height:38px;
      li{
        height:100%;
        // min-width:60px;
        border-bottom:1px $border solid;
        border-right:1px $border solid;
        float:left;
        line-height:38px;
        padding-left:10px;
      }
    }
  }
}

</style>
