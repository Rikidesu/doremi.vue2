<template>
    <div class="playListBody">
<!--         <div v-show="selected.length>1">
            <span>已选择 {{ selected.length }} 项</span>
        </div> -->

        <div class="playListTable" :class="{hasCover:menuList.cover}">
            <div class="playListRow" v-for="(song,$index) in page.list" :key="'num_'+$index" :class="{'active':(selected.indexOf($index)!=-1)}">
                <div @click="select(song,$index)" class="orderNumber" :class="'width'+menuList.orderNumber" v-show="menuList.orderNumber">
                    <p>{{ $index+1 + ((page.currentPage-1)*page.limit) }}</p>
                </div>
                <div class="cover" v-show="menuList.cover">
                    <div class="coverImg" :style="{backgroundImage: 'url(' +  ( ( song.album&&song.album.picUrl ) || song.al&&song.al.picUrl ) + ')'}">
                    </div>
                </div>
                <div class="title" :class="'width'+menuList.title" v-show="menuList.title">
                    <span class="titleUnderLine">
                        <div class="controller">

                            <span>
                                <i v-show="player.nowPlaying.id!=song.id" @click="setPlay({ele:song})" title="立即播放" class="fa fa-play"></i>
                                <i v-show="player.nowPlaying.id==song.id&&player.isPlay" @click="pause()" title="播放" class="fa fa-pause"></i>
                                <i v-show="player.nowPlaying.id==song.id&&!player.isPlay" @click="play()" title="暂停" class="fa fa-play"></i>
                            </span>

                            <span title="喜欢">
                                <i @click="likeMusic({ ele:song })" class="fa fa-heart"></i>
                            </span>

                            <span title="收藏">
                                <i @click="setPlay({ })" class="fa fa-star"></i>
                            </span>

                            <span title="下一首播放">
                                <i @click="addToPreplayingList({ ele:song })" class="fa fa-plus"></i>
                            </span>

                            <span title="移除">
                                <i @click="removeFromPreplayingList({ index:$index })" class="fa fa-remove"></i>
                            </span>

                        </div>
                        <div class="songName" :title="song.name">
                            <p>
                                <i v-show="player.nowPlaying.id==song.id&&player.isPlay" class="fa fa-pause moreControl"></i>
                                <i v-show="player.nowPlaying.id==song.id&&!player.isPlay" class="fa fa-play moreControl"></i>
                                {{ song.name }}
                            </p>

                        </div>

                    </span>
                </div>
                <div class="singer" :class="'width'+menuList.singer" v-show="menuList.singer" :title="( song.ar&&song.ar[0].name ) || song.artists[0].name">
                    <span>
                        <p>{{ ( song.ar&&song.ar[0].name ) || song.artists[0].name }}</p>
                    </span>
                </div>
                <div class="album" :class="'width'+menuList.album" v-show="menuList.album" :title="( song.album && song.album.name ) || song.al.name">
                    <span>
                        <p>{{ ( song.album && song.album.name ) || song.al.name }}</p>
                    </span>
                </div>
                <div class="duration" :class="'width'+menuList.duration" v-show="menuList.duration">
                    <span>
                        <p>{{
                            song.duration ?
                            ((song.duration/60000)<10?"0":"")+parseInt(song.duration/60000)+":"+(parseInt((song.duration/1000)%60)<10?"0":"")+parseInt((song.duration/1000)%60)
                            :
                            ((song.dt/60000)<10?"0":"")+parseInt(song.dt/60000)+":"+(parseInt((song.dt/1000)%60)<10?"0":"")+parseInt((song.dt/1000)%60)
                        }}</p>
                    </span>
                </div>


            </div>
        </div>

        <!-- <p>{{ page.list[0].name }}</p> -->
        <div class="page">
            <ul>
                <li @click="setPage(page.currentPage-1)" :class="{'disabled':page.currentPage<=1}">
                    上一页
                </li>
                <li v-for="p in this.page.pageArr " @click="setPage(p)" :class="{'active':page.currentPage==p}">
                    {{ p }}
                </li>
                <li @click="setPage(page.currentPage+1)" :class="{'disabled':page.currentPage>=page.maxPage}">
                    下一页
                </li>
            </ul>
        </div>

    </div>

</template>


<script>

"use strict";

import Vuex , { mapState , mapActions } from 'vuex';

export default {


    data(){
        return {
            // list:this.list,
            page:{
                total:this.list.length,
                limit:10,
                maxPage:1,
                currentPage:1,
                list:[],
                pageArr:[1]
            },
            selected:[]
        }
    },
    mounted:function(){
        this.page.total = this.list.length;
        this.page.maxPage = Math.ceil(this.list.length/this.page.limit)||1;
        this.page.list = this.list.slice(0,this.page.limit);
        this.page.cuurentPage = 1;
        this.page.limit = this.page.limit;
        this.page.pageArr = this.setPage(1);
    },
    watch:{
        'list':{
            handler: function (newVal) {
                console.log("musicList:  list change");
                console.log(newVal);
                this.page.total = newVal.length;
                this.page.maxPage = Math.ceil(newVal.length/this.page.limit)||1;
                this.page.list = newVal.slice(0,this.page.limit);
                this.page.cuurentPage = 1;
                this.page.limit = this.page.limit;
                this.page.pageArr = this.setPage(1);
            },
            deep: true
        }
    },
    computed:{
        ...mapState({
            player(){
                return this.$store.state.player
            },
            config(){
                return this.$store.state.config
            }
        })
    },
    props:{
        list:{
            required:true,
            // default:false
        },
        menuList:{
            default(){
                return {
                    orderNumber:5,
                    cover:true,
                    title:45,
                    singer:25,
                    album:20,
                    duration:5
                }
            }
        }
    },
    methods:{
        setPage(p){
            if(p<1||p>this.page.maxPage){
                alert("页数不对呀");
                return false
            }
            this.page.currentPage=p;
            // this.page.list=1;
            this.page.list = this.list.slice(this.page.limit*(p-1),this.page.limit*p);
            let arr = this.page.maxPage;
            if(this.page.maxPage>10){
                let num = 1;
                arr = [p];
                while(num<9){
                    if(arr[Math.ceil(arr.length/2)-1] >= ( ( arr[0] + arr[arr.length-1] ) / 2) ){
                        if(arr[0]>1){
                            arr.unshift(arr[0]-1)
                        }else{
                            arr.push(arr[arr.length-1]+1)
                        }
                    }else{
                        if(arr[arr.length-1]>=this.page.maxPage){
                            arr.unshift(arr[0]-1)
                        }else{
                            arr.push(arr[arr.length-1]+1)
                        }
                    }
                    num++;
                }
                arr[0] == 1 ? '' : arr.unshift(1);
                arr[arr.length-1] == this.page.maxPage ? '' : arr.push(this.page.maxPage);
                this.page.pageArr = arr;
            }
            return arr
        },
        select(song,$index){
            this.selected.indexOf($index)!=-1 ? this.selected.splice(this.selected.indexOf($index),1) : this.selected.push($index);
        },
        ...mapActions(['setPlay','play','pause','addToPreplayingList','removeFromPreplayingList','likeMusic'])
    }




}

</script>


<style lang="sass">
.playListBody{

    p{
        margin:0;
        padding:0;
    }

    @for $i from 1 through 20 {
        .width#{$i*5} {
            width: 4.8% * $i;
        }
    }
    .width3{
        width:3%;
    }
    .width2{
        width:2%;
    }

    & {
        position:relative;
        left:10%;
        width:80%;
        padding-bottom: 300px;
        margin:0 0 0 0;
    }

    .hasCover{
        margin:50px 0 0 50px;
    }
    .playListTable{
        border-radius: 5px;
        border: solid 1px rgba(222,222,222,.8);
        box-shadow: 0 0 1px 1px rgba(222,222,222,.8);
    }
    .playListRow:nth-child(odd){
        background-color: rgba(203,229,255,.3);
    }
    .playListRow:nth-child(even){
        background-color: rgba(255,255,255,.3);
    }
    .playListRow{
        &{
            position:relative;
            height: 40px;
            width:100%;
            line-height: 40px;
            border: solid 1px transparent;
            border-left: none;
            border-right:none;
            transition-delay: 0s;
            box-shadow: 1px 2px 3px 2px transparent;
        }
        .orderNumber , .cover , .title , .singer , .album , .duration{
            position: relative;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            box-sizing:border-box;
        }
        .cover{
            &{
                position:absolute;
                top:-2px;
                left:-102px;
                height: 40px;
                width:100px;
                overflow: visible;
            }
            .coverImg{
                position:relative;
                bottom:0;
                left: 0;
                height: 100px;
                width: 100px;
                opacity: 0;
                border: solid 1px rgba(222,222,222,.8);
                border-radius:5px;
                border-top-right-radius: 0;
                background-repeat: no-repeat;
                background-size: cover;
                pointer-events : none;
            }
        }
        .orderNumber{
            text-align: center
        }
        .title{
            .controller{
                position:absolute;
                display:inline-flex;
                justify-content: space-around;
                align-items: center;
                height: 40px;
                left:0;
                width:200px;
                opacity:0;
                pointer-events : none;
                // transition: all 0.3s;
                transform:scale(0.01);
                &>span{
                    display:inline-block;
                    height:26px;
                    line-height: 26px;
                    margin:0 5px;
                    padding:0 6px;
                    box-sizing: border-box;
                    font-size: larger;
                    color:#41a1ff;
                    cursor:pointer;
                    border-radius:2px;
                }

            }
            .titleUnderLine{
                padding:0 0 208px 0;
                border-bottom:solid 2px rgba(102, 204, 255, 0 );
                // transition:all 0.3s;
            }
            .moreControl{
                display:inline-block;
                height:26px;
                line-height: 26px;
                margin:0 5px;
                padding:0 6px;
                box-sizing: border-box;
                font-size: larger;
                color:#41a1ff;
                border-radius:2px;
            }
        }
        .songName{
            display:inline-block;
        }
        .singer{
            color:rgb(100,110,120);
        }
        .album{
            color:rgb(100,110,120);
        }
        .duration{
            color:rgb(133,134,135);
        }

        &:hover{
            &{
                border: solid 1px rgba(211,211,211,.95);
                box-shadow: 0 3px 5px 2px rgba(211,211,211,.95);
                background-color:rgba(203,229,255,.65);
            }
            .moreControl{
                display:none;
            }
            .cover{
                .coverImg{
                    opacity: 1;
                    pointer-events : auto;
                }
            }
            .controller{
                opacity: 1;
                pointer-events : auto;
                transform:scale(1);
            }
            .songName{
                transform:translateX(200px);
            }
            .titleUnderLine{
                padding:0 220px 8px 0;
                border-color: rgba(102, 204, 255,.95);
            }
        }
        &.active{
            border: solid 1px #66ccff;
            box-shadow: 0 0 3px 1px #66ccff;
            background-color:rgba(102, 204, 255,.2)
        }
    }
    .page ul{
        list-style: none;
        display:flex;
        justify-content:center;
    }
    .page ul li{
        display:inline-block;
        padding:5px 12px;
        margin:0 5px;
        height:20px;
        line-height:20px;
        border:solid 1px #666;
        border-radius:2px;
        cursor: pointer;
        transition:all 0.3s;
    }
    .page ul li:hover{
        background-color:#fff;
        color:#6cf;
    }
    .page ul li.active{
        background-color:#6cf;
        color:#fff;
    }
    .page ul li.disabled{
        border:solid 1px #ddd!important;
        color:#ddd!important;
        pointer-events:none;
    }

}
</style>