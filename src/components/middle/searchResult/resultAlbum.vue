<template>
  <div class="result-album">
    <loader class="loader" v-if="!albums.length" :bgc="'#6A6969'"></loader>
    <ul v-if="albums.length">
        <li class="album" v-for="(album,index) in albums">
            <router-link :to="{path:'/albumInf?aid=' + album.id}" class="link">
                <div class="img-con">
                    <img :src="album.picUrl">
                </div>
                <div class="inf">
                    <p class="name">
                        <span v-html="transText(album.name)"></span>
                        <span class="grayfont" v-if="album.alias.length">({{ album.alias.join('/') }})</span>
                    </p>
                    <p class="singer gray">
                        {{ album.artist.name }}
                        <span class="grayfont" v-if="album.artist.alias.length">({{ album.artist.alias.join('/') }})</span>
                    </p>
                </div>
            </router-link>
            
            <!-- <span class="create-time">{{singer.recommendReason}}</span> -->
        </li>
    </ul>
    <page 
        :total="albumCount"
        :onePageNum="20"
        @pageChange="searhAlbums"
        v-if="albumCount"
    ></page>
  </div>
</template>
<script>
import loader from '../../loader'
import page from '../../page'

import time from '../../../utility/transTime'
import request from '../../../request/request'

export default {
  name: 'resultAlbum',
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
  		albums: [],
  		albumCount: 0
  	}
  },
  created(){
    console.log('created');
    this.searhAlbums()
  },
  computed:{
  },
  methods: {
    ///search?keywords=啦啦啦&type=100&limit=20

    searhAlbums(page = 1){
        request.searchAll({
            keywords: this.searchText,
            type: 10,
            limit: 20,
            offset: (page - 1) * 20
        }).then(res => {
            console.log(JSON.stringify(res.data.result.albumCount));
        this.albumCount = res.data.result.albumCount
        this.$emit('count', `${this.albumCount}张专辑`)
        this.albums = res.data.result.albums
        })
    },
    transText(text){
        return text.replace(new RegExp(this.searchText, 'gm'), `<span style='color:#2EB7EB'>${this.searchText}</span>`)
    }
  },
  watch:{
  	searchText(val){
  		console.log(val);
  		this.searhAlbums()
  	}
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/global.scss';
.result-album{
    .loader{
        position: relative;
        top:40px;
    }
    li.album{
        position: relative;
        height:80px;
        line-height:80px;
        padding: 0 40px;
        text-align: left;
        cursor:pointer;
        &:hover{
            background-color:rgb(236,237,238);
        }

        &:nth-child(2n){
            background-color:$lightgray;   
        }

              // margin:15px 0;
        .link{
            color:#000;
            display: inline-block;
            height: 100%;
            width: 100%;
        }
        .img-con{
            height: 50px;
            width: 70px;
            display:inline-block;
            vertical-align:middle;
            background-image: url('http://s2.music.126.net/style/web2/img/coverall.png?5b7f8eede90d97b29158643ab0a73839');
            background-size:190px 747.5px ;
            background-position: 0px 462.5px ;
           img{
                height:50px;
                width:50px;
                border:1px $border solid;
            } 
        }
        
        .inf{
            display: inline-block;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding-left: 120px;
            p{
                display:inline-block;
                vertical-align:middle;
                // color:#7F7E7E;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                &.name{
                    // margin-left:10px;
                    width: 50%;
                }
                &.singer{
                    // width: 50%;
                }
            }
        }

    }
}
</style>
