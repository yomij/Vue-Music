<template>
	<div class="comment">
		<div class="write-comment">
			<span>听友评论</span><span>(已有3333条评论)</span>
			<div>
				<div>
					<i></i>发表评论
					<i></i>
					<i></i>
				</div>
			</div>
		</div>
		
		<div class="brilliants">
			<div class="tag">
				精彩评论
			</div>
			<single-comment comment="comments[0]">
				
			</single-comment>
			</div>
			<div class="tag">
				查看更多精彩评论
			</div>
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
			comments:[{},{}]
		}
	}
}	
</script>

<style lang="scss" scoped>
	
</style>