<template>
	<div class="comments">

		<div class="brilliants" v-if="hotComments[0]">
			<loader v-if="!dataReady" :bgc="'#6A6969'"></loader>
			<div class="tag">
				精彩评论
			</div>
			<single-comment  v-if="dataReady" v-for="hotComment in hotComments" :comment="hotComment"></single-comment>

			<div class="more">
				查看更多精彩评论<i class="iconfont icon-jiantou	"></i>
			</div>
		</div>

		<div class="lately-comments">
			<div class="tag">
				最新评论({{ total }})
			</div>
			<single-comment  v-if="dataReady" v-for="comment in latelyComments" :comment="comment"></single-comment>
			<page :total="total" @pageChange="updateComment"></page>
		</div>
	</div>
</template>

<script>

import singleComment from './singleComment'

export default {
	name:'comment',
	components:{
		'single-comment':singleComment
	},
	data(){
		return {
			hotComments: [],
			latelyComments: [],
			dataReady: true,
			total: 0,
			commentsCache:{
				length:0
			}
		}
	},
	methods:{
		getData () {
			this.dataReady = false
			this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}`).then((res)=>{
				//获取评论
				this.hotComments = res.data.hotComments
				this.latelyComments = res.data.comments
				this.total = res.data.total
				this.dataReady = true
				// console.log(JSON.stringify(res.data.comments));
			})
		},
		updateComment (page) {
			this.latelyComments = []
			if(page in this.commentsCache){
				this.latelyComments = this.commentsCache[page]
			}else{
				this.axios.get(`http://musicapi.leanapp.cn/comment/music?id=${this.playingSongId}&limit=20&offset=${page - 1}`).then(res =>{
					console.log('请求更新评论');
	          		//更新数据

	          		// res.data.comments.map( comment => {
	            // 		this.latelyComments.push(comment)
	          		// })
	          		this.latelyComments = res.data.comments
	          		this.commentsCache[page] = this.latelyComments
        		})
			}
		}
	}
}	
</script>

<style lang="scss" scoped>
	
</style>