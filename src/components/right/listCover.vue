<template>
	<div class="list-cover" :style="{width:picWidth+'px'}" @mouseover="active" @mouseout="unActive">
		<div class="cover" :style="{height:picWidth+'px',backgroundImage:'url('+recommend.picUrl+')'}">
            <p class="tip" :class="{active:isActive}">{{recommend.copywriter}}</p>
            <p class="playcount" v-show="!isActive"><i class="iconfont icon-headset"></i>{{recommend.playcount > 100000 ? (recommend.playcount / 10000).toFixed(0) + '万' : recommend.playcount}}</p>
            <i class="play" v-show="isActive1"></i> 
        </div>
		<p class="title">{{recommend.name}}</p> 
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
	methods:{
		active(){
			if(this.timer) clearTimeout(this.timer)
			this.isActive1 = true
			this.timer = setTimeout(()=>{
				this.isActive = true
			},400)
		},
		unActive(){
			if(this.timer) clearTimeout(this.timer)
			this.isActive1 = false
			this.timer = setTimeout(()=>{
				this.isActive = false
			},400)
		}
	}
}	
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';
.list-cover{
	.cover{
		cursor:pointer;
		width:100%;
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