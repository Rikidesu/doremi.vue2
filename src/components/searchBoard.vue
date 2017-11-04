<template>
    <div class="searchBoard" :class="{'active':isSearch}" >
        <div class="closeSearch" v-if="isSearch" @click="closeSearch">
            <i class="fa fa-arrow-left"></i>
        </div>
        <div class="header" :class="{'active':isSearch}">
            <h2 class="domain"> doremi.moe </h2>
        </div>
        <div class="search" :class="{'active':isSearch}">
            <form id="search" @submit.prevent="doSearch(0)" autocomplete="off" novalidate="">
                <input @focus="search.show=true" :autofocus="routePath=='/'" @blur="search.show=false" name="text" v-model="search.input" class="searchInput" id="searchInput" placeholder="这里搜索噢～">
                <label for="searchInput"></label>

                <label for="closeSearch">
                    <i class="fa fa-search"></i>
                    <input id="closeSearch" type="submit" style="display: none" />
                </label>
            </form>
        </div>
        <div id="searchResult" class="body">
            <transition-group name="searchResultAnimation" tag="div" style="padding-bottom:350px;position:relative">
                <div v-if="search.songs" v-for="(x,$index) in search.songs" :key="'num_'+$index" class="result searchResultAnimation" :class="{small:config.secondScreen&&config.alwaysShow}" :style="{transition:'all '+($index+1)*0.2+'s'}">
                    <div class="coverImg">
                        <img width="100%" :src="x.album.picUrl">
                    </div>
                    <div class="resultTitle">
                        <h3>{{x.name}}</h3>
                        <span class="ctrl">
                          <span>
                            <i class="fa fa-heart-o"></i>
                          </span>
                          <span>
                            <i class="fa fa-star-o"></i>
                          </span>
                          <!-- <span>
                            <i @click="download({ ele : x })" class="fa fa-download"></i>
                          </span> -->
                          <span>
                            <i @click="setPlay({ ele : x})" class="fa fa-play"></i>
                          </span>
                        </span>
                    </div>
                    <div class="resultDetail">
                        <span class="singer">
                            <span>歌手：</span><span style="padding-right:5px" v-for="s in x.artists">{{s.name}}</span>
                        </span>
                        <span class="album" :title="x.album.name">
                          专辑：{{x.album.name}}
                        </span>
                    </div>

                </div>

                <div v-show="isSearch&&search.doing" :key="'searching'" class="result" style="text-align: center">搜索中...</div>

            </transition-group>
        </div>
        <div v-if="search.result" class="prevSearchPage" @click="prevSearchPage"><i class="fa  fa-chevron-left"></i></div>
        <div v-if="search.result" class="nextSearchPage" @click="nextSearchPage"><i class="fa  fa-chevron-right"></i></div>
    </div>
</template>


<script>

    "use strict";
    import { mapState , mapActions } from 'vuex';
    export default {

        name:"searchBoard",
        computed:mapState({
            config(){
                return this.$store.state.config
            },
            lrc(){
                return this.$store.state.lrc
            },
            player(){
                return this.$store.state.player
            },
            search(){
                return this.$store.state.search
            },
            isSearch: state => state.config.secondScreen = state.search.show||state.search.input||state.search.result,
            routePath:function(){
                return this.$route.fullPath
            }
        }),
        methods:mapActions(
            ['setPlay','closeSearch','doSearch','prevSearchPage','nextSearchPage','download']
        )


    }


</script>


<style>

    .searchResultAnimation{
        opacity:1;
    }
    .searchResultAnimation-enter{
        transform: scale(.8) rotateY(90deg);
        opacity:0;
    }
    .searchResultAnimation-enter-active{
    }
    .searchResultAnimation-leave{
        opacity:0;
    }

    .searchResultAnimation-leave-active{
        transition: all .3s!important;
        opacity:0;
    }
    .prevSearchPage{
        position:absolute;
        left:0;
        top:0;
        height:100%;
        font-size:100px;
        width:100px;
        cursor:pointer;
    }
    .nextSearchPage{
        position:absolute;
        right:0;
        top:0;
        height:100%;
        font-size:100px;
        width:100px;
        cursor:pointer;
    }
    .prevSearchPage i,.nextSearchPage i{
        position:absolute;
        top:50%;
        margin-top:-80px;
    }
    .searchBoard{
        height:100%;
        pointer-events: none;
    }
    .searchBoard.active{
        pointer-events: auto;
    }
    .searchBoard.zoom{
        width:60%;
        left:0;
    }

    .domain{
        font-size: x-large;
    }
    .search{
        position:relative;
        width:200px;
        padding:5px 10px;
        transition: all .6s;
        left:0;
        transform: translateY(-70px) scale(1);
        pointer-events: auto;
    }
    .closeSearch{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: rgba(0, 0, 0, .6);
        font-size: 60px;
        color: #fff;
        cursor: pointer
    }
    .search.active{
        /*will-change:transform,left;*/
        left:calc(50% - 210px);
        width:400px;
        transform: translateY(0) scale(1.2);
    }
    .search i.fa-search{
        position:absolute;
        right:-2px;
        bottom:15px;
        font-size: 24px;
        color:#666666;
        cursor: pointer;
    }
    .searchInput{
        width:100%;
        height:30px;
        padding:5px 10px;
        font-weight:normal;
        font-size:18px;
        border:none;
        border-bottom:solid 2px #66ccff;
        outline: none;
        background-color: transparent;

    }
    .body{
        min-height:400px;
        height:100%;
        margin:30px auto;
        padding-bottom: 300px;
        border-radius:4px;
        border:solid 1px transparent;
        right:0;
        overflow-y: auto;
        /*box-shadow: 1px 1px 1px 1px rgba(153,153,153,.2);
        background-color: #fff;*/
    }
    .searchBoard.zoom .body{
        width:900px;
    }
    .results{
        position:relative;
        margin:10px auto;
        width:800px;
        height:120px;
        background-color: #fff;
        border-radius:3px;
        border:solid 1px rgba(204,204,204,.2);
        box-shadow:2px 2px 1px 1px rgba(204,204,204,.3);
    }
    .result{
        position:relative;
        margin:30px auto;
        width:800px;
        height:110px;
    }
    .result.small{
        width:600px;
    }
    .result .coverImg{
        position:absolute;
        bottom:-2px;
        left:-60px;
        width:120px;
        height:120px;
        overflow: hidden;
        border-radius: 50%;
        border:solid 2px rgba(222,222,222,.8);
        background-color: rgba(244,244,244,1);
    }
    .resultTitle{
        position:relative;
        margin-left:80px;
        h3{
             max-width: calc( 100% - 160px );
             text-overflow: ellipsis;
             white-space: nowrap;
             overflow: hidden;
         }
    }
    .resultTitle .ctrl {
        position:absolute;
        top:5px;
        right:5px;
    }
    .resultTitle .ctrl span{
        display: inline-block;
        margin:0 15px;
        font-size: larger;
        color:#41a1ff;
        cursor:pointer;
    }
    .resultDetail{
        height:35px;
        line-height: 35px;
        padding-left:100px;
        border-radius: 5px;
        background-color: rgba(251,251,251,.8);
        border:solid 1px rgba(222,222,222,.8);
        box-shadow: 0 0 1px 1px rgba(222,222,222,.8);
    }
    .resultDetail .singer{
        position:relative;
        width:50%;
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
    }
    .resultDetail .singer::before{
        position:absolute;
        top:15%;
        left: -15px;
        height:70%;
        width:4px;
        background-color: #66ccff;
        content: "";
    }
    .resultDetail .album{
        position:relative;
        width:45%;
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
    }
    .resultDetail .album::before{
        position:absolute;
        top:15%;
        left: -15px;
        height:70%;
        width:4px;
        background-color: #66ffcc;
        content: "";
    }
    .rCover{
        margin-left:1px;
        width:100px;
        height:100px;
        display: inline-block;
        box-shadow:4px 0 0 0 rgba(102,204,255,.5);
    }
    .rCover img{
        width:100px;
        height:100px;
    }
    .rDetail{
        position:relative;
        overflow: hidden;
        width:650px;
        height:100%;
        display: inline-block;
        vertical-align: top;
        padding-left:20px;
    }
    .rDetail .title{
        font-size: large;
    }
    .rCtrl{
        position:absolute;
        top:20px;
        right:40px;
        font-size:80px;
        color:#666;
    }

</style>