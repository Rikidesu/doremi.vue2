<template>
        <div class="lrcboard" :class="{blur:!config.alwaysShow&&(isSearch||routePath!='/'),zoom:config.alwaysShow&&(config.secondScreen||routePath!='/')}"  ref="lrcboard" id="lrcboard">
            <ul id="lrc" ref="lrc">
                <li v-if="!lrc.result" style=" line-height: 1000%;">ヽ(*´∀｀*)ノ.+ﾟおはよ～♪.+ﾟ</li>
                <li :class="{active:$index==lrc.now-1}" v-for="(x,$index) in lrc.result">
                    <div class="lrc">{{x[1] +" "}}</div>
                    <div class="tLrc" v-if="lrc.tShow&&lrc.tResult">{{ lrc.tResult&&lrc.tResult[x[0]] }}</div>
                </li>
            </ul>
            <div class="scroller" ref="scroller">
                <div id="scroller" class="pannel" @mousedown="start()"></div>
            </div>
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
        methods:{
            start(e1){
                e1 = e1 || event;
                e1.preventDefault();
                let that = this;
                let parent = this.$refs.scroller;
                let target = event.target;
                let lrc = this.$refs.lrc;
                let lrcboard = this.$refs.lrcboard;
                that.cancelLrcUpdate(true);
                window.onmousemove = function(e){
                    e=e||event;
                    if(e.clientY<0||e.clientY>parent.clientHeight){
                        return false;
                    }
                    target.classList.add("scrolling");
                    lrc.classList.add("scrolling");
                    let to = e.clientY - ( e.clientY/target.clientHeight )/2 ;
                    requestAnimationFrame(function(){
                        lrc.style.transform = "translateY(-"+ (to/parent.clientHeight) * lrc.clientHeight +"px)";
                        lrc.style.webkitTransform = "translateY(-"+ (to/parent.clientHeight) * lrc.clientHeight +"px)";
                        lrc.style.oTransform = "translateY(-"+ (to/parent.clientHeight) * lrc.clientHeight +"px)";
                        target.style.transform = "translateY(" + to +"px ) ";
                    })

                    window.onmouseup = function(){
                        window.onmousemove = undefined;
                        window.onmouseup = undefined;
                        target.classList.remove("scrolling");
                        lrc.classList.remove("scrolling");
                        that.lrcOnScroll(true);
                    }
                };
            },
            ...mapActions(
                [ 'lrcOnScroll','setLrcUpdate','cancelLrcUpdate' ]
            )
        }


    }


</script>


<style lang="sass">
    .lrcboard{
        position: absolute;
        top:0;
        right:0;
        width:100%;
        height:100%;
        /*overflow-y: auto;*/
        overflow: hidden;
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

        &.zoom{
            width:40%;
            font-size:18px;
            /*border-right:solid 1px #666*/
        }
        &.blur{
            -webkit-filter: blur(10px); /* Chrome, Opera */
            -moz-filter: blur(10px);
            -ms-filter: blur(10px);
            filter: blur(10px);
        }
        #lrc {
            padding-left:50px;
            padding-right:50px;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -ms-transform-style: preserve-3d;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            list-style: none;
            transition: all 0.15s;
        }
        #lrc.scrolling{
            transition: all 0s;

        }
        li{
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
        li.active{
            /*willchange:transform;*/
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -ms-transform: scale(1.1);
            -o-transform: scale(1.1);
            transform: scale(1.1);
            color:#6698ff;
            text-shadow: 0 0 6px #6698ff;
        }
        li.active .tLrc{
            color:#6698ff;
        }
        .scroller{
            position:absolute;
            right:0;
            top:0;
            width:12px;
            height:100%;
            background-color: rgba(233,233,233,0);
            transition: all 0.3s;
        }
        .scroller:hover{
            background-color: rgba(233,233,233,.666);
        }
        .scroller .pannel{
            position:absolute;
            top:0;
            right:0;
            height:20px;
            width:100%;
            border-radius: 12px;
            background-color:rgba(33,33,3,.8);
            transition:all 0.3s;
            cursor:pointer;
        }
        .scroller .pannel.scrolling{
            transition: all 0s;
        }
    }


</style>