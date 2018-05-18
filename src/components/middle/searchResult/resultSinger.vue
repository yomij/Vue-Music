<template>
  <div class="result-singer">
    <loader class="loader" v-if="!singers.length" :bgc="'#6A6969'"></loader>
    <ul v-if="singers.length">
        <li class="singer" v-for="(singer,index) in singers">
            <router-link :to="{path:'/singerInf?sid='+singer.id}" class="link">
                <img :src="singer.picUrl +'?param=50y50'">
                <p class="name">
                    <span v-html="transText(singer.name)"></span>
                    <span class="grayfont" v-if="singer.alias.length">({{ singer.alias.join('/') }})</span>
                </p>
                <i  v-if="singer.accountId"></i>
            </router-link>
            
            <!-- <span class="create-time">{{singer.recommendReason}}</span> -->
        </li>
    </ul>

    <page
        class="page"
        :total="singersCount"
        :onePageNum="20"
        @pageChange="searhSingers"
        v-if="singersCount"
    ></page> 
  </div>
</template>
<script>
import loader from '../../loader'
import page from '../../page'

import time from '../../../utility/transTime'
import request from '../../../request/request'

export default {
  name: 'resultSinger',
  components:{
    'loader': loader,
    'page': page
  },
  props: {
  	searchText:{
  		type: String,
  		default: '我'
  	}
  },
  data(){
  	return {
  		singers: [],
  		singersCount: 0
  	}
  },
  created(){
    console.log('created');
    this.searhSingers()
  },
  computed:{
  },
  methods: {
    ///search?keywords=啦啦啦&type=100&limit=20

    searhSingers(page = 1){
        request.searchAll({
            keywords: this.searchText,
            type: 100,
            limit: 20,
            offset: (page - 1) * 20
        }).then(res => {
            console.log(JSON.stringify(res.data.result.artists));
        this.singersCount = res.data.result.artistCount
        this.$emit('count', `${this.singersCount}个歌手`)
        this.singers = res.data.result.artists
        })
    },
    transText(text){
        return text.replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`)
    }
  },
  watch:{
  	searchText(val){
  		console.log(val);
  		this.searhSingers()
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.result-singer{
    li.singer{
        padding: 0 40px;
        text-align: left;
        cursor:pointer;
        &:hover{
            background-color:rgb(236,237,238);
        }
        &:nth-child(2n){
            background-color:$lightgray;   
        }
        height:80px;
        line-height:80px;
              // margin:15px 0;
        .link{
            color:#000;
            display: inline-block;
            height: 100%;
            width: 100%;
        }
        img{
            height:50px;
            width:50px;
            // border-radius:50%;
            display:inline-block;
            vertical-align:middle;
            border:1px $border solid;
        }
        p{
            display:inline-block;
            vertical-align:middle;
            // color:#7F7E7E;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.name{
                margin-left:10px;
            }
            
        }
        i{
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px !important;
            border-radius: 50%;
            border:.5px $mainRed solid;
            position: relative;
            line-height: 20px;
            &:hover{
                background-color: $clickGray;
            }
            &:after{
                display: inline-block;
                height: 100%;
                font-family:"iconfont" !important;
                font-weight: bold;                
                color: $mainRed;
                font-style:normal;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                content:"\e62f";
                position: absolute;
                left:1px;
            }
        }
    }
    .loader{
        position: relative;
        top:40px;
    }
}
</style>
