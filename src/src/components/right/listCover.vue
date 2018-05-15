<template>
	<div class="list-cover"  >
		<div class="cover"
    @mouseover="active" @mouseout="unActive"
    :style="{backgroundImage:'url('+ picUrl +'?param=300y300)'}"
    @click="songlistInf(recommend.id)">
      <p class="tip" :class="{active:isActive}" v-if="recommend.copywriter">{{recommend.copywriter}}</p>
      <p class="playcount" v-show="!isActive"><i class="iconfont icon-headset"></i>{{recommend.playCount > 100000 ? (recommend.playCount / 10000).toFixed(0) + '万' : recommend.playCount.toFixed(0)}}</p>
      <p class="creator" v-if="recommend.creator"><i class="iconfont icon-ren"></i>{{recommend.creator.nickname}}</p>
      <i class="play" v-show="isActive1"></i>
    </div>
		<p class="title"><span  @click="songlistInf(recommend.id)">{{recommend.name}}</span></p> 
	</div>
</template>

<script>


export default {
	name:'listCover',
	props:{
		picWidth:{
			type:Number,
			default:244,
			timer:null
		},
		recommend:{
			type:Object,
			default:() => {}
		}
	},
	data(){
		return {
			'isActive':false,
			'isActive1':false
		}
	},
  computed:{
      picUrl(){
        // console.log(this.recommend.picUrl ? this.recommend.picUrl : this.recommend.coverImgUrl);
        return this.recommend.picUrl ? this.recommend.picUrl : this.recommend.coverImgUrl
      }
  },
	methods:{
		active(){
			if(this.timer) clearTimeout(this.timer)
			this.isActive1 = true
			if(this.recommend.copywriter){
        this.timer = setTimeout(()=>{
          this.isActive = true
        },400)
      }
		},
		unActive(){
			if(this.timer) clearTimeout(this.timer)
			this.isActive1 = false
			

      if(this.recommend.copywriter){
        this.timer = setTimeout(()=>{
          this.isActive = false
        },400)
      }
		},
    songlistInf(id){
      this.$router.push({ name: 'songlist', query: { id: id }})
    }
	}
}	
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';
.list-cover{
  width:100%;
  height:100%;
	.cover{
		cursor:pointer;
		width:100%;
    padding-bottom: 100%;
		height:100%;
   	overflow:hidden;
    border:1px rgb(222,222,222) solid;
    // margin-bottom:10px;
    position:relative;
    background-position:center;
    background-size:100% 100%;
    p{
     	&.tip{
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
      &.active{
        transform:translateY(0);
      }
      &.playcount{
        text-align:right;
        width:60%;
        position:absolute;
        right:0;
        padding:5px;
        background:linear-gradient(left, transparent , rgba(0,0,0,.15));
        color:#fff;
        font-size:15px;
        i{
          margin-right:5px;
        }
      }
      &.creator{
        color:#fff;
        position:absolute;
        bottom:0px;
        padding:10px;
        text-align:left;
        width:100%;
        height:40px;
        background:linear-gradient(top, transparent , rgba(0,0,0,.15));
        i{
          font-size:20px;
          margin-right:5px;
        }
      }

    }
    i.play{
    	display:block;
    	height:30px;
    	width:30px;
    	background-color:rgba(0,0,0,.3);
    	border:1px #fff solid;
    	border-radius:50%;
    	position:absolute;
    	bottom:10px;
    	right:10px;
    	line-height:30px;
    	transition:all .3s;
    	&:hover{
    		background-color:rgba(0,0,0,.5);
    	}
    	&:after{
    		font-family:"iconfont" !important;
			 font-size:18px;
			 font-style:normal;
			 -webkit-font-smoothing: antialiased;
			 -moz-osx-font-smoothing: grayscale;
    		content:"\e61c";
    		position:relative;
    		left:1px;
    		color:#fff;
    	}
    }
  }
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
}
</style>