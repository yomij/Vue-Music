<template>
	<div class="dj" ref="dj" @click="doThings">
		<ul class="icons">
			<li v-for="(icon,index) in icons" >
				<div class="item" :class="{active: icon.id == nowKind}" :data-type="icon.id">
					<div class= "bg" :style="{backgroundImage:'url('+icon.picWebUrl+')'}"></div>
					<p>{{icon.name}}</p>
				</div>
			</li>
		</ul>


		<div class="kind" v-if="nowKind > 0">
			<div class="headline">
	        	<h2>推荐新电台</h2>
	      	</div>

	      	<ul class="handpick-container">
	      		<li class="list-cover" v-for="djRadio in handpickRadios">
					<div class="cover" :data-rid="djRadio.id" :style="{backgroundImage:'url('+ djRadio.picUrl +')'}">
					    <p class="playcount">
					    	<i class="iconfont icon-xingxing1"></i>
					    	{{djRadio.subCount > 100000 ? (djRadio.subCount / 10000).toFixed(0) + '万' : djRadio.subCount.toFixed(0)}}
					    </p>
		    		</div>
					<p class="title"><span :data-rid="djRadio.id">{{djRadio.name}}</span></p> 
				</li>
	      	</ul>
		</div>
		
		<div class="default" v-if="nowKind < 0">
			<div class="headline">
	        	<h2>精选电台-订阅更精彩</h2>
	      	</div>

	      	<ul class="handpick-container">
	      		<li class="list-cover" v-for="djRadio in handpickRadios">
					<div class="cover" :data-rid="djRadio.id" :style="{backgroundImage:'url('+ djRadio.picUrl +')'}">
					    <p class="playcount">
					    	<i class="iconfont icon-xingxing1"></i>
					    	{{djRadio.subCount > 100000 ? (djRadio.subCount / 10000).toFixed(0) + '万' : djRadio.subCount.toFixed(0)}}
					    </p>
		    		</div>
					<p class="title"><span :data-rid="djRadio.id">{{djRadio.name}}</span></p> 
				</li>
	      	</ul>

			<div class="headline">
	        	<h2>热门电台</h2>
	      	</div>

	      	<ul class="djRadios-container">
	      		<li class="list-cover" :class="{'dj-radios-flag':index === djRadios.length - 3}" v-for="(djRadio,index) in djRadios" ref="djRadios">
					<div class="cover" :data-rid="djRadio.id" :style="{backgroundImage:'url('+ djRadio.picUrl +')'}">
					    <p class="playcount">
					    	<i class="iconfont icon-xingxing1"></i>
					    	{{djRadio.subCount > 100000 ? (djRadio.subCount / 10000).toFixed(0) + '万' : djRadio.subCount.toFixed(0)}}
					    </p>
		    		</div>
					<p class="title"><span :data-rid="djRadio.id">{{djRadio.name}}</span></p> 
				</li>
	      	</ul>	
		</div>

	</div>
</template>

<script>
import request from '../../request/request'
export default {
	name: 'dj',
	props:{
	},
	data(){
		return {
			icons:[],
			djRadios:[],
			handpickRadios:[],
			times:0,
			isReqing:false,
			nowKind:-1
		}
	},
	computed:{
		scrollTop(){
			return this.$store.state.scrollTop
		},
		DJKinds(){
			return this.$store.state.DJKinds
		}
	},
	mounted(){
		this.init()
	},
	destroyed(){
		console.log('destroy');
		this.$store.commit('initDJKind')
	},
	methods:{
		doThings(el){
			let ds = el.target.dataset
			let type = ds.type || el.target.parentNode.dataset.type

			if(ds.rid){
				this.$router.push({ name: 'djInf', query: { rid: ds.rid }})
				return
			}
			if(type){
				console.log('test',type);
				if(this.nowKind == type){
					return
				}
				this.$store.commit('addDJkind', type)
			}
		},
		getDJdataByKind(kind){
			request.recommendDjWithType({
				type:kind,
				limit:20
			}).then(res => {
				this.handpickRadios = res.data.djRadios
			})
		},
		init(){
			this.nowKind = -1
			request.djcatelist().then(res => {
				this.icons = res.data.categories
				return request.hotDJ({
					limit:20
				})
			}).then(res => {
				this.djRadios = res.data.djRadios
				return request.recommendDj()
			}).then(res => {
				this.handpickRadios = res.data.djRadios.splice(0,5)
			})
		}
	},
	watch:{
		scrollTop(val){
			var len = this.djRadios.length
			var flag = document.getElementsByClassName('dj-radios-flag')[0]
			console.log(val + window.innerHeight - 120,flag.offsetTop);
			if(len > 0 && this.nowKind < 0){
				if(val + window.innerHeight - 120 > flag.offsetTop && !this.isReqing){
					this.isReqing = true
					setTimeout(() => {
						request.hotDJ({
							limit:20,
							offset:this.times++ * 20
						}).then(res => {
							this.isReqing = false
							res.data.djRadios.forEach( radio => {
								this.djRadios.push(radio)
							})
						})
					}, 30)
				}
			}
		},
		DJKinds(val,oldval){
			if(val.length){
				this.nowKind = val[val.length - 1]
				this.getDJdataByKind(val[val.length - 1])
			}else{

				this.init()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/global.scss';

.dj{
	max-width:1280px;
	margin:0 auto;
	min-height:500px;
	.headline{
	    height:50px;
	    line-height:50px;
	    // margin-top:20px;
	    border-bottom:rgb(229,229,230) solid 1.2px;
	    margin:20px 10px;
	    h2{
	      float:left;
	    }
	    p{
	      float:right;
	    }
  	}

  	.handpick-container {
  		overflow:auto;
  	}
  	.djRadios-container {
  		overflow:auto;
  	}

	ul.icons{
		overflow:auto;		
		li{
			float:left;
			height:100px;
			width:11.11%;
			text-align:center;

			div.item{
				width:fit-content;
				margin:0 auto;
				padding:10px 15px;
				border-radius:5px;
				&:hover{
					background-color:$clickGray;
				}
				&.active{
					background-color:$clickGray;
				}
				&>p{
					color:#888383;
				}
			}
			div.bg{
				// margin:0 20px;
				margin:0 auto;
				height:55px;
				width:55px;
				background-size:110px 55px;
			
			}
		}
	}

	.list-cover{
		float:left;
		padding:0 10px;
  		width:20%;
		.cover{
			cursor:pointer;
			width:100%;
	    	padding-bottom: 100%;
			height:100%;
			overflow:hidden;
			border:1px rgb(222,222,222) solid;
			position:relative;
			background-position:center;
			background-size:100% 100%;
	    	p{
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

}
</style>