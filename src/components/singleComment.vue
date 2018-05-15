<template>
	<div class="single-comment">
		<img class="user-avatar" :src="comment.user.avatarUrl">
		<div class="content">
			<div class="main-content">
				<p class="user-comment"><a class="user-name">{{comment.user.nickname}}:</a>{{comment.content}}</p>
				<p class="reply" v-if="comment.beReplied[0]"><a class="user-name">@{{comment.beReplied[0].user.nickname}}:</a>{{comment.beReplied[0].content}}</p>
			</div>
			<div class="extra">
				<p class="time">{{time}}</p>	
				<ul>
					<li v-show="reportShow">举报</li>
					<li><i class="iconfont icon-unie60b"></i>({{comment.likedCount}})</li>
					<li>分享</li>
					<li class="last">回复</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'singleComment',
	props: {
		comment: {
			type: Object,
			required: true,
			default:() => {}
		},
		reportShow: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		time() {
			var date = new Date(this.comment.time)
			var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
			var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
			if(new Date() - date > 86400000){
				return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes} `
			}else if(new Date() - date > 86400000 && new Date() - date < 86400000 * 2 ){
				return `昨天 ${hours}:${minutes}`
			}else if(new Date() - date < 3600000){
				return `${Math.floor((new Date() - date)/1000/60)}分钟前`
			}else if(new Date() - date > 3600000){
				return `${hours}:${minutes}`
			}
		}
	}
}	
</script>

<style lang="scss" scoped>
@import '../style/global.scss';

.single-comment{
	width:100%;
	border-top:1px rgb(227,226,228) solid;
	padding:20px 0;
	text-align:left !important;
	.user-avatar{
		height:45px;
		width:45px;
		float:left;
		border-radius:50%;
		top:3px;
	}
	.content{

		position:relative;
		width:100%;
		padding-left:60px;
		
		.main-content{
			.user-name{
				color:rgb(90,141,223);
			}
			.user-comment{
				display:inline-block;
				margin-bottom:10px;
			
			}
			.reply{
				background-color:rgb(241,241,244);
				padding:8px;
				margin-bottom:10px;
			}
		}
		
		.extra{
			.time{
				width:200px;
				display:inline-block;
				color:rgb(180,180,182)
			}
			ul{
				position:absolute;
				right:0;
				bottom:0;
				font-size:16px;
				li{
					float:left;
					// margin-left:10px;
					padding:0 10px;
					border-right:1px rgb(180,180,182) solid;
					color:rgb(180,180,182)

				}
				.last{
					border-right:none !important;
					padding-right:0;
					// background-color:red;
				}
				
			}
		}
		
	}
}
</style>