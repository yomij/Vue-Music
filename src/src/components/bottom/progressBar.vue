<template>
	<div class="progressBar">
		<div class="currentTime">{{currentTime}}</div>
		<div class="progress" ref="progress">
			<div class="bg" 
			@click="adjTimeByClick">
				<div class="nowProgress"
				:style="{width: progress + 'px'}"></div>
				<div class="slider" draggable="true"
				@dragstart="adjTimeBegin"
				@drag="adjTimeByMove"
				@dragend="adjTimeFinish"
				:style="{left:(progress - 7.5) + 'px'}"
				></div>
			</div>
		</div>
		<div class="totalTime">{{ duration }}</div>
	</div>
</template>

<script>
import throttle from '../../utility/throttle'
import time from '../../utility/transTime'
export default {
	name:'progressBar',
	data(){
		return{
			readyToMove:false,
			currentTime:'00:00',
			duration:'00:00',
			isAdjing:false,
			progress:0,//距离
		}
	},
	mounted(){

		this.audio.addEventListener("timeupdate", throttle(() => {
			let width =  this.$refs.progress.offsetWidth
			if(!this.isAdjing){
				this.currentTime = this.transDuration(this.audio.currentTime * 1000)
				console.log(this.currentTime,this.audio.currentTime);
    			this.progress = (this.audio.currentTime / this.audio.duration ) * width //进度
    		}
    	},500).bind(this))
	},
	computed:{
		audio(){
			return this.$store.state.audio
		},
		playingSong(){
			return this.$store.state.playingSong
		},
	},
	methods:{
		transDuration(dura) {
      		return time.transDuration(dura)
    	},
		adjTimeByClick(el){
			this.progress=el.layerX
			this.audio.currentTime= (el.layerX / this.progressWidth) * this.audio.duration
		},
		adjTimeBegin(){
			console.log('test')
			this.readyToMove = true
			this.isAdjing = true
		},
		adjTimeFinish(el){
			if(this.readyToMove){
				this.audio.currentTime= (this.progress /  this.progressWidth) * this.audio.duration
				this.readyToMove = false
			}
			this.isAdjing = false		
		},
		adjTimeByMove(el){
			var left = this.$refs.progress.getBoundingClientRect().left
			if(this.readyToMove && el.clientX > left){
				this.progress = el.clientX - left
			}
			el.cancelBubble = true;
		}
	},
	watch:{
		playingSong(val){
			this.duration = this.transDuration(val.duration)		
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';

.progressBar{
	height: 100%;
	position:relative;
	width:100%;
	padding:0 60px;
	padding-right:60px !important;
	text-align:left;
	.progress{
		position:relative;
		float:left;
		width:100%;
		.bg{
			display:inline-block;
			width:100%;
			height:5px;
			background-color:rgb(222,222,222);
			transform:translateY(-50%);
			border-radius:5px;
		}
		.nowProgress{
			@extend .bg;
			position:absolute;
			width:0;
			left:0;
			top:50%;
			transform:translateY(-50%);
			background-color:rgb(232,60,60);
		}
		.slider{
			position:absolute;
			left:0;
			top:50%;
			transform:translateY(-50%);
			display:inline-block;
			box-shadow:0 0 3px rgba(0,0,0,.5);
			border-radius: 50%;
			height:15px;
			width:15px;
			background-color: #fff;
			cursor:pointer;
			&:hover{
				box-shadow:0 0 8px rgba(0,0,0,.5);
			}
			&:after{
				display:block;
				content:"";
				height:5px;
				width:5px;
				border-radius: 50%;
				background-color:rgb(232,60,60);
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
			}
		}
	}
	.currentTime{
		float:left;
		margin-left:-60px;
		left:-60px;
		width:60px;

	}
	.totalTime{
		float:left;
		width:60px;
		margin-right:-60px;
		right:-60px;
		text-align:right;

		
	}
}
</style>