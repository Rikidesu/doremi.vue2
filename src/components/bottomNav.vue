<template>

    <div id="menu" class="menu">

        <div class="menu-tip">
            menu
        </div>
        <div class="menu-content">
            <ul class="menu-nav" ref="menu">
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">
                        <router-link to="/">首页</router-link>
                    </div>
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">
                        <router-link to="/foo">音乐库</router-link>
                    </div>
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">
                        <router-link to="/bar">我喜欢的</router-link>
                    </div>
                    <!--  -->
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">我的收藏</div>
                    <!-- <router-link to="/bar">Go to Bar</router-link> -->
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">其他</div>
                    <!-- <router-link to="/bar">Go to Bar</router-link> -->
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">其他</div>
                    <!-- <router-link to="/bar">Go to Bar</router-link> -->
                </li>
                <li class="menu-nav-li">
                    <div class="menu-nav-li-bg">其他</div>
                    <!-- <router-link to="/bar">Go to Bar</router-link> -->
                </li>
            </ul>
        </div>

    </div>

</template>


<script>

    "use strict";
    export default {

        // name:"leftnav",
        //props:['data'],
        data:()=>{
            return{
            }
        },
        methods:{

        }


    }


</script>


<style>
    .menu{
        position:fixed;
        bottom:0;
        left:0;
        margin-left: 250px;
        width:calc( 100% - 250px );
        height:60px;
        /*padding:60px 0 200px 0;*/
        z-index:1000;
        display: flex;
        box-sizing:border-box;
        align-items: center;
    }
    .menu:hover .menu-content{
        opacity: 1;
        pointer-events: auto;
    }
    .menu-content{
        margin-top: -85px;
        width:100%;
        overflow-x: auto;
        overflow-y: hidden;
        pointer-events: none;
        opacity: 0;
        transition-duration: 0.3s;
    }
    .menu-nav{
        /*width:240px;*/
        white-space: nowrap;
        list-style:none;
        transform-origin: left;
        transition-duration: 0.3s;
        /*transform: rotateY(90deg);*/
        transform-style: preserve-3d;
        transition-timing-function: ease;
    }
    .menu:hover .menu-nav{
        /*transform: rotateY(0deg);*/
    }
    .menu:hover .menu-nav-li{
        opacity: 1;
        transform: rotateZ(-8deg) translateY(0px);
    }
    .menu-nav-li{
        display: inline-block;
        padding:20px 60px;
        font-size: 30px;
        color: rgba(81,81,81,.8);
        opacity: 0;
        transform: rotateZ(0deg) translateY(30px);
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transform-style: preserve-3d;
        text-shadow: 1px 1px 1px 1px rgba(222,222,222,.3);
    }
    .menu-nav-li-bg{
        border-radius: 50px;
        padding: 3px 15px;
        background-color: rgba(255,255,255,.9);
        box-shadow: 0px 0px 10px 9px rgba(255,255,255,.9);
    }
    .menu-tip{
        position:absolute;
        bottom:-1px;
        left:calc( 50% - 130px );
        border:solid 1px rgba(66,66,66,.4);
        padding:1px 4px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        background-color:rgba(233,233,233,.5);
        transition:all .4s;
        transition-timing-function: ease;
        opacity: 1;
    }
    .menu:hover .menu-tip{
        bottom:-5px;
        opacity: 0;
    }
</style>