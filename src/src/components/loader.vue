<template>
	<div class="loader">
        <div class="loader-inner ball-beat">
        	<div :style="{backgroundColor: bgc}"></div>
        	<div :style="{backgroundColor: bgc}"></div>
        	<div :style="{backgroundColor: bgc}"></div>
        </div>
        <span class="tip" :style="{color: bgc}">{{tip}}</span>
     </div>
</template>

<script>
export default {
  name: 'loader',
  props:{
  	'bgc':{
  		default:'#000'
  	},
  	'tip':{
  		default:'加载中'
  	}
  }
}
</script>

<style lang="scss" scoped>
@import '../style/global.scss';

.loader {
    transition: opacity .25s linear;
    opacity: 1;
    box-sizing: border-box;
    text-align:center;
}

@keyframes ball-beat {
	50%{
		opacity: 0.2;
   		transform: scale(0.75);
   		transform: scale(0.75);
	}
	100%{
    	opacity: 1;
    	transform: scale(1);
    	transform: scale(1);
  	}
}

.ball-beat > div {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block;
  animation: ball-beat 0.7s 0s infinite linear;
}

.ball-beat > div:nth-child(2n-1) {
    animation-delay: 0.35s !important;
}


.tip{
	position:relative;
	top:5px;
	font-size:18px;
}
</style>
