<template>
  <div class="page">
    <ul v-if="total > onePageNum">
      <li class="tally-down icon" @click="tallyDown">
        <i class="iconfont icon-jiantou_zuo"></i>
      </li>
      <li :class="{num: pageNum && index !== nowPageIndex , active: index  === nowPageIndex }"
      v-for="(pageNum,index) in pages"
      @click=pageChange(pageNum,index)>
        {{ pageNum ? pageNum : '...' }}
      </li>
      <li class="plus-one icon" @click="plusOne">
        <i class="iconfont icon-jiantou"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: {
    total: {
      type: Number,
      default: 0
    },
    onePageNum: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      pageCount: 0,
      pages: [],
      nowPageIndex: 0,
      nowPageNum: 0,
      timer: -1
    }
  },
  mounted(){
    this.getPages(this.total)
  },
  methods: {
    transPage (num, index) {
      var pages,i
      if (num < 6 || this.total < this.onePageNum * 10) {
        this.nowPageIndex = index
        return [1, 2, 3, 4, 5, 6, 7, 8, 0, this.pageCount]
      }else if (num > this.pageCount - 6) {
        pages = [1, 0]
        i = this.pageCount - 7
        for (; i <= this.pageCount; i++) {  
          pages.push(i)
        }
        this.nowPageIndex = 9 - (this.pageCount - num)
      }else if (num >= 6 && this.total >= this.onePageNum * 10) {
        pages = [1, 0], i = num - 3
        for (; i <= num + 3; i++) {
          pages.push(i)
        }
        pages.push(0)
        pages.push(this.pageCount)
        this.nowPageIndex = 5
      }
      return pages
    },
    pageChange (num, index) {
      console.log(num,index);
      if(this.nowPageNum === num){
        return
      }else{
        this.nowPageNum = num
        if(this.total > this.onePageNum * 8){
          this.pages = this.transPage(num, index) //获取新的页码
        }else if(num !== 0){
          this.nowPageIndex = index
        }
        this.$emit('pageChange', num)      
      }
    },
    tallyDown () {
      if (!(this.nowPageNum - 1)) {
        return
      }
      this.pageChange(this.nowPageNum - 1,this.nowPageIndex - 1)
    },
    plusOne () {
      if (this.pageCount === this.nowPageNum || !this.pageCount) {
        return
      }
      this.pageChange(this.nowPageNum + 1,this.nowPageIndex + 1)
    },
    getPages(val){
      var i = 1
      this.pages = []
      this.pageCount = Math.ceil(val / this.onePageNum)
      if (val < this.onePageNum * 10) {
        for (; i <= val / this.onePageNum + 1; i++) {
          this.pages.push(i)
        }
      } else {
        this.pages = [1, 2, 3, 4, 5, 6, 7, 8, 0, this.pageCount]
      } 
    },
    init(){
      this.pageCount = 0
      this.nowPageIndex = 0
      this.nowPageNum = 0
    }
  },
  watch:{
    total (val) {
      this.getPages(val)
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../style/global.scss';
.page {
  text-align:center; //居中
  width:100%;
  min-height:60px;
  ul{
    margin:30px 0;
    display: inline-block; //居中
      overflow: auto; //居中
    min-height:30px;
    text-align:center;
    min-width:90px;
    li {
      display: inline; //居中
      float:left; //居中
      margin:0 5px;
      height:30px;
      min-width:30px;
      text-align:center;
      line-height:30px;
      border:1px transparent solid;
      color:#585858;

      &.num:hover{
        background-color:rgb(240,240,242);
        border:1px rgb(207,206,208) solid;
        color:black;
        cursor:pointer;
      }
      &.active{
        text-decoration:underline;
        color:rgb(198,47,47);
      }
      &.icon{
        border:1px rgb(207,206,208) solid;
        cursor:pointer;
        i{
          font-size:20px;
        }
        &:hover{
          background-color:rgb(240,240,242);
        }
      }
    }
  }

}
</style>
