<template>
    <div class="playListBody">
        <div class="playListTable" :class="{hasCover:menuList.cover}">
            <div class="playListRow" v-for="(song,$index) in page.list" :key="'num_'+$index">
                <div class="orderNumber" :class="'width'+menuList.orderNumber" v-show="menuList.orderNumber">
                    <p>{{$index+1}}</p>
                </div>
                <div class="cover" v-show="menuList.cover">
                    <div class="coverImg" :style="{backgroundImage: 'url(' +  ( ( song.album&&song.album.picUrl ) || song.al.picUrl ) + ')'}">
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

        <!-- <p>{{page.list[0].name}}</p> -->
        <div class="page">
            <ul>
                <li v-for="page in this.page.maxPage " @click="setPage(page)">
                    {{ page }}
                </li>
            </ul>
        </div>

    </div>

</template>


<script>

"use strict";

import Vuex , { mapState , mapActions } from 'vuex';

export default {


    computed:{
        page:function(){
            return {
                total:this.list.length,
                limit:30,
                maxPage:Math.ceil(this.list.length/30)||1,
                currentPage:1,
                list:[]
            }
        },
        currentPage:function(){
            return 1;
        },
        ...mapState({
            player(){
                return this.$store.state.player
            }
        })
    },
    props:{
        list:{
            required:true
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
        setPage(page){
            console.log(this);
            this.page.currentPage=page;
            // this.page.list=1;
            this.page.list = this.page.list.slice(this.page.limit*(page-1),this.page.limit*page);
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
    }

}
</style>