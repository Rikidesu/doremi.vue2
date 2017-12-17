<template>
    <div id="app">
        <bottomNav></bottomNav>
        <div id="background" :style="{backgroundImage:'url('+player.backgroundUrl+')'}"></div>
        <player></player>
        <lrcBoard></lrcBoard>
        <div class="songInfo">
            <div class="songTitle">
                <h3 title="temp">{{user.info&&user.info.nickname}}</h3>
                <h3 title="歌名">{{player.nowPlaying.name}}</h3>
            </div>
            <div class="songSinger">
                <ul style="list-style: none">
                    <li title="歌手" v-for="x in player.nowPlaying.ar||player.nowPlaying.artists">
                        {{x.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="routerView" :class="{active:routePath!='/',zoom:config.alwaysShow}">
            <router-link to="/">
            <div class="closeRoute" v-show="routePath!='/'">
                <i class="fa fa-close"></i>
            </div>
            </router-link>
            <router-view></router-view>
        </div>
        <user></user>
    </div>
</template>

<script>
    "use strict";
    import {mapState} from 'vuex';
    import player from './components/playerController.vue';
    // import commentMusic from './components/commentMusic.vue';
    import bottomNav from './components/bottomNav.vue';
    // import searchBoard from './components/searchBoard.vue';
    import lrcBoard from './components/lrcBoard.vue';
    import user from './components/user.vue';
    export default {
        components:{
            player,
            bottomNav,
            // searchBoard,
            lrcBoard,
            user
        },
        name: 'app',
        computed:mapState({
            player: state => state.player,
            user: state => state.user,
            config: state => state.config,
            routePath:function(){
                return this.$route.fullPath
            }
        })
    }
</script>

<style lang="sass">
    #app{
        height:100%;
        overflow-y: auto;
        color:#404d5b;
        font-family: "Microsoft YaHei","微软雅黑","Segoe UI", "Lucida Grande", Helvetica, Arial,  FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;
    }
    #background{
        position:fixed;
        width:100%;
        height:100%;
        background-size: cover;
        z-index: -1;
        -webkit-filter: blur(15px); /* Chrome, Opera */
        -moz-filter: blur(15px);
        -ms-filter: blur(15px);
        filter: blur(15px);
        opacity:.4;
    }
    html,body{
        margin:0;
        padding:0;
        height:100%;
    }
    body{
        background-color: #F5F5F5;
    }
    a{
        color:#666;
        text-decoration: none
    }
    a:active {
        color:#666
    }
    a:visited{
        color:#666
    }
    *::-webkit-scrollbar-thumb{
        background-color:rgba(102,102,102,.6);
        color:red;
        height:6px;
        width:6px;
        border-radius:10px;
    }
    *::-webkit-scrollbar{
        width:8px;
        height:8px;

    }
    .closeRoute{
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
    .routerView{
        position:absolute;
        height:100%;
        width:100%;
        overflow: hidden;
        transition:all .3s;
        pointer-events:none;
        // opacity:0;
    }
    .routerView.active{
        background-color:rgba(255,255,255,.6);
        pointer-events:auto;
        opacity:1;
    }
    .routerView.zoom{
        width:60%;
        left:0;
    }
    .songInfo{
        position: absolute;
        right: 30px;
        text-align: right;
    }
    .songTitle{

    }
    .songSinger{
        text-align: right;

    }
    .header{
        position:relative;
        text-align: center;
        padding:5px 20px;
        transition: all .6s;
        opacity: 0;
    }
    .header.active{
        // will-change:transform;
        transform: translateY(0) scale(1);
        opacity:1;
    }
    .suki{
        position: relative;
        text-align: center;
        cursor: pointer;
        top:-85px;
        margin-right:1px;
        width: 50px;
        height: 50px;
        display: inline-block;
    }
    .next{
        position: relative;
        text-align: center;
        cursor: pointer;
        top:-25px;
        width: 50px;
        height: 50px;
        display: inline-block;
    }
    .kirai {
        position: relative;
        width: 50px;
        height: 50px;
        top:-85px;
        margin-left:1px;
        cursor: pointer;
        display: inline-block;
    }
    .suki img{
        -webkit-transition: transform .5s,opacity .5s;
        -moz-transition: transform .5s,opacity .5s;
        -ms-transition: transform .5s,opacity .5s;
        -o-transition: transform .5s,opacity .5s;
        transition: transform .5s,opacity .5s;
    }
    .suki img:nth-child(1){
        position: absolute;
        top:0;
        left:0;
        z-index: 2;
    }
    .suki.hover img:nth-child(1){
        opacity: 0;
    }
    .suki.sukidesu img:nth-child(1) {
        opacity: 0;
    }
    .suki.sukidesu img:nth-child(2) {
        opacity: 1;
    }
    .suki img:nth-child(2){
        position: absolute;
        top:0;
        left:0;
        z-index: 1;
        opacity: 0;
    }
    .suki img:nth-child(5){
        position: absolute;
        top:0;
        left:0;
        z-index: 3;
        opacity: 0;
    }
    .suki.click img:nth-child(5){
        -webkit-animation: sukiclick 3s linear;
        -o-animation: sukiclick 3s linear;
        animation: sukiclick 3s linear;
    }
    .suki.hover img:nth-child(2){
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
        opacity: 1;
    }
    .kirai .mid{
        position: absolute;
        width: 50px;
        height: 50px;
    }
    .kirai .right,.left{
        -webkit-transition: transform 1s,opacity .5s;
        -moz-transition: transform 1s,opacity .5s;
        -ms-transition: transform 1s,opacity .5s;
        -o-transition: transform 1s,opacity .5s;
        transition: transform 1s,opacity .5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
    }
    .kirai.hover .left{
        -webkit-transform: rotateZ(-15deg) translateX(-5px);
        -moz-transform: rotateZ(-15deg) translateX(-5px);
        -ms-transform: rotateZ(-15deg) translateX(-5px);
        -o-transform: rotateZ(-15deg) translateX(-5px);
        transform: rotateZ(-15deg) translateX(-5px);
    }
    .kirai.hover .right{
        -webkit-transform: rotateZ(15deg) translateX(5px);
        -moz-transform: rotateZ(15deg) translateX(5px);
        -ms-transform: rotateZ(15deg) translateX(5px);
        -o-transform: rotateZ(15deg) translateX(5px);
        transform: rotateZ(15deg) translateX(5px);
    }
    .kirai.click .left{
        -webkit-animation: kiraiclickL 3s ;
        -o-animation: kiraiclickL 3s ;
        animation: kiraiclickL 3s ;
    }
    .kirai.click .right{
        -webkit-animation: kiraiclickR 3s ;
        -o-animation: kiraiclickR 3s ;
        animation: kiraiclickR 3s ;
    }
    .kirai.click .mid  {
        -webkit-animation: kiraiclickM 3s linear;
        -o-animation: kiraiclickM 3s  linear;
        animation: kiraiclickM 3s  linear;
    }
    .kirai.hover .left span,.kirai.hover .right span{
        opacity: .8;
    }
    .kirai.hover .mid span{
        opacity: .8;
        top:-5px;
    }
    .suki span:nth-child(3){
        -webkit-transition:opacity .8s;
        -moz-transition:opacity .8s;
        -ms-transition: opacity .8s;
        -o-transition: opacity .8s;
        transition:opacity .8s;
        position: absolute;
        line-height: 40px;
        color:rgba(0,0,0,.6);
        top:0;
        left:5px;
        opacity: 0;
    }
    .suki.hover span:nth-child(3){
        opacity: 1;
        z-index: 3;
    }
    .suki span:nth-child(4){
        -webkit-transition:opacity .8s;
        -moz-transition:opacity .8s;
        -ms-transition: opacity .8s;
        -o-transition: opacity .8s;
        transition:opacity .8s;
        position: absolute;
        line-height: 40px;
        color:rgba(0,0,0,.6);
        top:0;
        right:5px;
        opacity: 0;
    }
    .suki.hover span:nth-child(4){
        opacity: 1;
        z-index: 3;
    }
    .kirai span span{
        -webkit-transition: opacity .5s,top .5s;
        -moz-transition: opacity .5s,top .5s;
        -ms-transition: opacity .5s,top .5s;
        -o-transition: opacity .5s,top .5s;
        transition: opacity .5s,top .5s;
        color:rgba(0,0,0,.6);
        position: absolute;
        line-height: 40px;
        opacity: 0;
    }
    .kirai .left span{
        top:0;
        left: 5px;
    }
    .kirai .mid span{
        top:0;
        left: 16px;
    }
    .kirai .right span{
        top:0;
        right: 5px;
    }


    @keyframes kiraiclickL
    {
        30%{
            -webkit-transform: rotateZ(-40deg) translateX(-25px) translateY(10px);
            -moz-transform: rotateZ(-40deg) translateX(-25px) translateY(10px);
            -ms-transform: rotateZ(-40deg) translateX(-25px) translateY(10px);
            -o-transform: rotateZ(-40deg) translateX(-25px) translateY(10px);
            transform: rotateZ(-40deg) translateX(-25px) translateY(10px);
            opacity: 0;
        }
        50%{
            opacity: 0;
        }
        80%{
            -webkit-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -moz-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -ms-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -o-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            transform: rotateZ(0deg) translateX(0px) translateY(0px);
        }

        100%{
            opacity: 1;
        }
    }
    @keyframes kiraiclickM
    {
        20%{
            opacity: 0;
        }
        85%{
            -webkit-transform: rotateZ(1440deg) translateY(80px) scale(0);
            -moz-transform: rotateZ(720deg) translateY(80px) scale(0);
            -ms-transform: rotateZ(720deg) translateY(80px) scale(0);
            -o-transform: rotateZ(720deg) translateY(80px) scale(0);
            transform: rotateZ(1440deg) translateY(80px) scale(0);
        }
        99%{
            -webkit-transform: rotateZ(0deg) translateY(0px) scale(1);
            -moz-transform: rotateZ(0deg) translateY(0px) scale(1);
            -ms-transform: rotateZ(0deg) translateY(0px) scale(1);
            -o-transform: rotateZ(0deg) translateY(0px) scale(1);
            transform: rotateZ(0deg) translateY(0px) scale(1);
            opacity: 0;
        }

        100%{
            opacity: 1;
        }
    }
    @keyframes kiraiclickR
    {
        30%{
            -webkit-transform: rotateZ(-40deg) translateX(25px) translateY(10px);
            -moz-transform: rotateZ(40deg) translateX(25px) translateY(10px);
            -ms-transform: rotateZ(40deg) translateX(25px) translateY(10px);
            -o-transform: rotateZ(40deg) translateX(25px) translateY(10px);
            transform: rotateZ(40deg) translateX(25px) translateY(10px);
            opacity: 0;
        }
        50%{
            opacity: 0;
        }
        80%{
            -webkit-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -moz-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -ms-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            -o-transform: rotateZ(0deg) translateX(0px) translateY(0px);
            transform: rotateZ(0deg) translateX(0px) translateY(0px);
        }

        100%{
            opacity: 1;
        }
    }
    @keyframes sukiclick
    {
        20%{
            -webkit-transform:  scale(1.4);
            -moz-transform:  scale(1.4);
            -ms-transform:  scale(1.4);
            -o-transform:  scale(1.4);
            transform: scale(1.4);
            opacity: 1;
        }
        35%{
            -webkit-transform:rotateY(0deg) translateY(0px) scale(1.4);
            -moz-transform:rotateY(0deg) translateY(0px) scale(1.4);
            -ms-transform:rotateY(0deg) translateY(0px) scale(1.4);
            -o-transform:rotateY(0deg) translateY(0px) scale(1.4);
            transform:rotateY(0deg) translateY(0px) scale(1.4);
            opacity: 1;
        }
        50%{
            -webkit-transform:rotateY(180deg) translateY(-30px) scale(.3);
            -moz-transform:rotateY(180deg) translateY(-30px) scale(.3);
            -ms-transform:rotateY(180deg) translateY(-30px) scale(.3);
            -o-transform:rotateY(180deg) translateY(-30px) scale(.3);
            transform:rotateY(180deg) translateY(-30px) scale(.3);
        }
        60%{
            -webkit-transform:rotateY(360deg) translateY(-25px)  scale(.1);
            -moz-transform:rotateY(360deg) translateY(-25px)  scale(.1);
            -ms-transform:rotateY(360deg) translateY(-25px)  scale(.1);
            -o-transform:rotateY(360deg) translateY(-25px)  scale(.1);
            transform:rotateY(360deg) translateY(-25px)  scale(.1);
        }
        80%{
            -webkit-transform: rotateY(540deg) translateY(-50px)  scale(.1);
            -moz-transform: rotateY(540deg) translateY(-50px) scale(.1);
            -ms-transform: rotateY(540deg) translateY(-50px) scale(.1);
            -o-transform: rotateY(540deg) translateY(-50px)  scale(.1);
            transform: rotateY(540deg) translateY(-50px)  scale(.1);
            opacity: 0;
        }
        99%{
            -webkit-transform: rotateY(540deg) translateY(-70px)  scale(.1);
            -moz-transform: rotateY(540deg) translateY(-70px) scale(.1);
            -ms-transform: rotateY(540deg) translateY(-70px) scale(.1);
            -o-transform: rotateY(540deg) translateY(-70px)  scale(.1);
            transform: rotateY(540deg) translateY(-70px)  scale(.1);
            opacity: 0;
        }
        100%{
            -webkit-transform: rotateZ(0deg) translateX(0px) translateY(0px) scale(1);
            -moz-transform: rotateZ(0deg) translateX(0px) translateY(0px) scale(1);
            -ms-transform: rotateZ(0deg) translateX(0px) translateY(0px) scale(1);
            -o-transform: rotateZ(0deg) translateX(0px) translateY(0px) scale(1);
            transform: rotateZ(0deg) translateX(0px) translateY(0px) scale(1);
        }

    }

</style>
