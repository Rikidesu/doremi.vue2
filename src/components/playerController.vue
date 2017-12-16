<template>

    <div class="side player">
        <div class="progress" :style="{transform:'rotate('+(player.currentTime.original/player.audio.duration)*360+'deg)'}">
            <i :style="{transform:'rotate(-'+(player.currentTime.original/player.audio.duration)*360+'deg)'}" class="fa fa-music"></i>
        </div>
        <!-- 这里做成3D的， 反面可以翻过来，进行下载、评星等操作-->



        <div class="cover-container" :class="{'rotate-back':player.state.rotate}">
            <div class="cover">

                <div class="playingImg" :style="{backgroundImage: 'url('+player.coverUrl+')'}" ></div>

                <div class="controller">

                    <div class="coverModel">

                    </div>

                    <div :title="player.isPlay?'暂停':'播放'" @click="player.isPlay?pause():play()" class="play">
                        <i class="fa" :class="{'fa-pause':player.isPlay,'fa-play':!player.isPlay}"></i>
                    </div>
                    <div class="time">
                        <div>{{player.currentTime.real}}</div>
                        <div>{{player.duration.real}}</div>
                    </div>
                    <div class="other">
                        <i title="添加到最爱" class="fa fa-heart"></i>
                        <i title="设置" @click="player.state.rotate=!player.state.rotate" class="fa fa-gear"></i>
                        <i title="下一首" @click="playNext()" class="fa fa-forward"></i>
                    </div>

                </div>


            </div>
            <div class="cover cover-back">
                <div class="playingImg" :style="{backgroundImage: 'url('+player.coverUrl+')'}" ></div>


                <div class="controller">

                    <div @click="player.state.rotate=!player.state.rotate" class="back-ctrl-left">
                        <i class="fa fa-arrow-left rotate-button"></i>
                    </div>
                    <div class="back-ctrl-right">
                        <ul>
                            <li>
                                <label class="pointer" for="tLrcShow">
                                    <input style="display: none" id="tLrcShow" type="checkbox" v-model="lrc.tShow" />
                                    <i v-if="lrc.tShow" class="fa fa-check-square-o"></i>
                                    <i v-if="!lrc.tShow" class="fa fa-square-o"></i>
                                    <span>显示翻译</span>
                                </label>
                            </li>
                            <li>
                                <label class="pointer" for="tLrcShowTop">
                                    <input style="display: none" id="tLrcShowTop" type="checkbox" v-model="config.alwaysShow" />
                                    <i v-if="config.alwaysShow" class="fa fa-check-square-o"></i>
                                    <i v-if="!config.alwaysShow" class="fa fa-square-o"></i>
                                    <span>歌词始终显示</span>
                                </label>
                            </li>
                            <li>
                                <i v-if="player.audio.volume==0" class="fa fa-volume-off"></i>
                                <i v-if="player.audio.volume>0&&player.audio.volume<=0.6" class="fa fa-volume-down"></i>
                                <i v-if="player.audio.volume>0.6" class="fa fa-volume-up"></i>
                                <input style="width:70px" type="range" step="any" v-model="player.audio.volume" min="0" max="1" />
                            </li>
                            <li><i class="fa fa-list"></i> 播放列表 </li>
                            <li><i class="fa fa-user-circle-o"></i> 登陆 </li>
                            <li><i class="fa fa-heart"></i> 最爱 </li>
                            <li><i class="fa fa-list-ul"></i> 歌单 </li>
                            <li><i class="fa fa-gear"></i> 页面设置 </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                            <li><i class="fa fa-heart"></i> hello </li>
                        </ul>
                    </div>


                </div>


            </div>
        </div>

    </div>

</template>

<script>
    "use strict";
    import Vuex , { mapState , mapActions } from 'vuex';
    export default{
        // name:"player",
        mounted:function(){
            let that = this;
            // this.lrc.lrcUpdate =
            // this.setLrcUpdate();
            this.getRandomList();
            this.player.audio.addEventListener("play",function(data){
            });
            this.player.audio.addEventListener("ended",that.playNext);
        },
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
            }
        }),
        methods:mapActions(
            ['setPlay','play','pause','playNext','playRandom','updateTime' , 'getRandomList','addToHistoryPlayingList' ]
        )
    }

</script>

<style lang="sass">

.player{

    &.side{
        position:fixed;
        bottom:20px;
        left:30px;
        z-index: 10;
    }
    .cover{
        position:relative;
        margin:0 auto;
        width:160px;
        height:160px;
        border-radius:100%;
        border:solid 4px #fff;
        overflow:hidden;
        box-shadow:0 0 3px 3px rgba(51,51,51,.06);
        transform: rotateY(0deg) translateZ(2px);
        backface-visibility: hidden;
    }
    .cover-back{
        position:absolute;
        left:0;
        top:0;
        margin:0 auto;
        transform: rotateY(180deg) translateZ(1px);
        backface-visibility: hidden;
    }
    .cover-back>.playingImg{
        transform: rotateY(180deg);
    }
    .cover-back>.controller{
        background-color: rgba(250,250,250,.9);
    }

    &:hover .controller{
        transform: scale(1) translateY(0);
        opacity:.93
    }
    .cover-container{
        -webkit-transition: .8s;
        -moz-transition: .8s;
        -ms-transition: .8s;
        -o-transition: .8s;
        transition: .8s;
        transition-timing-function: ease-in-out;
        perspective: 202px;
        transform-style: preserve-3d;
    }
    .rotate-back{
        transform: rotateY(180deg);
    }
    .back-ctrl-left{
        position:relative;
        float: left;
        box-sizing: border-box;
        width:20%;
        height:100%;
        background-color: rgba(102,102,102,.95);
        border-right:solid 1px #eeeeee;
        text-align: center;
        cursor:pointer;
    }
    .back-ctrl-left>.rotate-button{
        position:relative;
        font-size:30px;
        text-align: center;
        top:50%;
        margin-top:-15px;
        color: #fff;
    }
    .back-ctrl-right{
        position:relative;float: left;
        box-sizing: border-box;
        width:79%;
        height:100%;
        overflow-x: hidden;
        overflow-y: auto ;
        overflow-scrolling: touch;
    }
    .back-ctrl-right>ul{
        padding: 5px 0 5px 8px;
        list-style: none;
    }

    .back-ctrl-right>ul>li{
        padding: 8px 0 8px 0;
    }

    .back-ctrl-right::-webkit-scrollbar-thumb{
        background-color:transparent;
        height:0;
        width:0;
    }
    .back-ctrl-right::-webkit-scrollbar{
        width:0;
        height:0;

    }
    .pointer{
        cursor:pointer
    }
    .progress{
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        border-radius:100%;
    }
    .progress i{
        position: absolute;
        color: #111;
        font-size: 20px;
        margin-left:-10px;
        top: -23px;
        left: 50%;
    }
    .controller{
        position:absolute;
        top:0;
        width:100%;
        height:100%;
        bottom:10px;
        opacity: 0;
        border-radius:100%;
        overflow: hidden;
        transform: scale(1.2) translateY(-5px);
        transition: all .3s;
    }
    .play{
        position:relative;
        margin:25px auto -15px auto;
        text-align: center;
        color:#FFF;
        font-size: 50px;
        cursor:pointer;
        text-shadow: 0 0 3px rgba(51,51,51,.6);
    }
    .coverModel{
        position: absolute;
        top: 80px;
        width: 380px;
        left: -111px;
        height: 300px;
        border-radius: 100%;
        background-color: rgba(102,204,255,0.7);
    }
    .playingImg{
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .time{
        position:relative;
        top:14px;
        height:22px;
        color:#eee;
        font-size:small;
        text-align: center;
    }
    .time div:first-child{
        margin-bottom:2px;
        display: inline-block;
        border-bottom: solid 2px rgba(255,204,255,0.8);
    }
    .other{
        position:relative;
        margin:0 auto 10px auto;
        text-align: center;
        color:#FFF;
        font-size: 26px;
        text-shadow: 0 0 3px rgba(51,51,51,.6);
    }
    .other i{
        margin:10px;
        position:relative;
        cursor: pointer;
    }
    .other .fa-gear{
        top:26px;
    }
    .other .fa-heart{
    }
    .other .fa-forward{
    }

}

</style>
