<template>
        <div class="lrcboard" :class="{blur:!config.alwaysShow&&(isSearch||routePath!='/'),zoom:config.alwaysShow&&(config.secondScreen||routePath!='/')}" id="lrcboard">
            <ul id="lrc">
                <li v-if="!lrc.result" style=" line-height: 1000%;">ヽ(*´∀｀*)ノ.+ﾟおはよ～♪.+ﾟ</li>
                <li :class="{active:$index==lrc.now-1}" v-for="(x,$index) in lrc.result">
                    <div class="lrc">{{x[1] +" "}}</div>
                    <div class="tLrc" v-if="lrc.tShow&&lrc.tResult">{{ lrc.tResult&&lrc.tResult[x[0]] }}</div>
                </li>
            </ul>
        </div>
</template>


<script>

    "use strict";
    import Vuex , { mapState , mapActions } from 'vuex';
    export default {

        name:"lrcBoard",
        //props:['data'],
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


    }


</script>


<style>

    .lrcboard{
        position: absolute;
        top:0;
        right:0;
        width:100%;
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
        text-align:center;
        font-size: 24px;
        background-color:rgba(255,255,255,.3);
        text-shadow: 0 0 6px rgba(0,0,0,.4);
        -webkit-transition-duration: .6s;
        -moz-transition-duration: .6s;
        -ms-transition-duration: .6s;
        -o-transition-duration: .6s;
        transition-duration: .6s;
        /*transition-delay: .3s;*/
    }
    .lrcboard.zoom{
        width:40%;
        font-size:18px;
        /*border-right:solid 1px #666*/
    }
    .lrcboard.blur{
        -webkit-filter: blur(10px); /* Chrome, Opera */
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
    }
    ul#lrc {
        padding-left:50px;
        padding-right:50px;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        list-style: none;
    }
    .lrcboard li{
        margin:32px 0 32px 0;
        /*white-space:pre-wrap;*/
        -webkit-transition-duration: .6s;
        -moz-transition-duration: .6s;
        -ms-transition-duration: .6s;
        -o-transition-duration: .6s;
        transition-duration: .6s;
    }
    .lrc {
        white-space: pre;
    }
    .tLrc {
        position:absolute;
        left:0;
        right:0;
        font-size:14px;
        color:rgba(64, 77, 91, 0.8)
    }
    .lrcboard li.active .tLrc{
        color:#6698ff;
    }
    /*
    .lrcboard li.hidden{
        opacity: 0;
    }
    */
    .lrcboard li.active{
        /*willchange:transform;*/
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
        color:#6698ff;
        text-shadow: 0 0 6px #6698ff;
    }


</style>