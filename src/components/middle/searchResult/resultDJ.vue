<template>
  <div class="result-DJ" ref="rd">
    <loader class="loader" v-if="!djRadios.length"></loader>
    <div class="line">主播电台</div>
    <ul class="djRadios-container" @click="showDJ($event.target)">
        <li class="list-cover"  v-for="(djRadio,index) in djRadios"
        :class="{nomargin:(index + 1) % x === 0}" 
        :style="{'marginRight':margin+'px'}">
            <div class="cover" :data-rid="djRadio.id" :style="{backgroundImage:'url('+ djRadio.picUrl +')'}">
                <p class="playcount">
                    <i class="iconfont icon-xingxing1"></i>
                    {{djRadio.subCount > 100000 ? (djRadio.subCount / 10000).toFixed(0) + '万' : djRadio.subCount.toFixed(0)}}
                </p>
            </div>
            <div class="title">
                <p class="name" :data-rid="djRadio.id" v-html="djRadio.name"></p> 
                <p class="creator">
                    <span class="gray">by</span>
                    <span class="gray" v-html="djRadio.dj.nickname"></span> 
                </p>
                
            </div>
            <!-- <p class="creator grayfont"><span :data-rid="djRadio.id">{{djRadio.name}}</span></p> -->

        </li>
    </ul>        
  </div>
</template>
<script>
import loader from '../../loader'
// import page from '../../page'

import time from '../../../utility/transTime'
import throttle from '../../../utility/throttle'
import request from '../../../request/request'

export default {
  name: 'resultSong',
  components:{
    'loader': loader,
    // 'page': page
  },
  props: {
  	searchText:{
  		type: String,
  		default: '我'
  	}
  },
  data(){
  	return {
  		djRadios: [],
  		DJsCount: 0,
        margin: 20,
        x:5,
        debounceFunc: null
  	}
  },
  created(){
    this.searhDJs()
    const MIN_MARGIN = 20
    const COVER_WIDTH = 180
    this.debounceFunc = this.debounce(()=>{
        let rd = this.$refs.rd.offsetWidth - 80
        let x = ~~((this.$refs.rd.offsetWidth + 20) / 200)
        this.x = x
        this.margin = (rd - 180 * x) / (x - 1)
        console.log('计算margin');
    },300)
    this.debounceFunc()
    window.addEventListener("resize", this.debounceFunc)
  },
  destroyed(){
    console.log('destroyed');
    window.removeEventListener("resize", this.debounceFunc) 
  },
  computed:{

  },
  methods: {
  	searhDJs(page = 1){
  		request.searchAll({
  			keywords: this.searchText,
  			type: 1009,
            limit: 10
  		}).then(res => {
        this.DJsCount = res.data.result.djRadiosCount
        this.$emit('count', `${this.DJsCount}个电台`)
        this.djRadios = JSON.parse(JSON.stringify(res.data.result.djRadios.slice(0,10)).replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`))
  		})
  	},
    debounce(fn, delay) {
      let timer
      return function () {
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout( () => {
          fn.apply(this, args)
        }, delay)
      }
    },
    showDJ(node){
        let rid = node.dataset.rid
        if(rid){
            this.$router.push({name:'djInf',query:{rid:rid}})
        }
    }
  },
  watch:{
  	searchText(val){
  		console.log(val);
  		this.searhSongs()
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.result-DJ{
    overflow: auto;
    .nomargin{
        margin: 0 !important;
    }
    .loader{
        position: relative;
        top: 40px;
    }
    .line{
        color:#7A7979;
        width: 100%;
        height: 40px;
        line-height: 40px;
        // margin-left: 30px;
        padding-left: 40px;
        border-bottom: 1.2px rgb(207,206,208) solid;
        margin-bottom: 20px;
        text-align: left;
    }
    .djRadios-container{
        padding: 0 40px;
        overflow: auto;
    }
    .list-cover{
        float: left;
        // padding:0 10px;
        width: 180px;
        // margin-right: 1%;
        // height: 200px;
        &:first-child{
            padding-left: 0 !important;
        }
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
        div.title{
            cursor:pointer;
            text-align:left;
            width:100%;
            height:100px;
            padding:8px 0;
            color:#515050;
            .name{
                @extend .text-over;
                // display: inline-block;
                max-height: 40px;
                margin-bottom: 5px
            }
            .creator{
                @extend .text-over;
                max-height: 40px;
            }
            &:hover{
                color:#000;
            }
        }
    }
}

</style>
