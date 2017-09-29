<template>

    <div @mousemove="mouseMoveOnMenu()" id="menu" class="menu">

        <div class="menu-content">
            <ul class="menu-nav" ref="menu">
                <li class="menu-nav-li">
                    <h1>列表</h1>
                </li>
                <li class="menu-nav-li">
                    <h1>另一个菜单</h1>
                </li>
                <li class="menu-nav-li">
                    <h1>凑一下</h1>
                </li>
                <li class="menu-nav-li">
                    <h1>我的</h1>
                </li>
            </ul>
        </div>

    </div>

</template>


<script>

    "use strict";
    export default {

        name:"leftnav",
        //props:['data'],
        data:()=>{
            return{
            }
        },
        methods:{
            mouseMoveOnMenu(el){
                console.log(event);
                var x = event.clientX;  //max 240
            }
        }


    }


</script>


<style>
    .menu{
        position:fixed;
        top:0;
        left:0;
        width:30px;
        height:100%;
        padding:60px 0 200px 0;
        z-index:1000;
        display: flex;
        box-sizing:border-box;
        align-items: center;
    }
    .menu:hover .menu-content{
        pointer-events: auto;
    }
    .menu-content{
        width:240px;
        pointer-events: none;
    }
    .menu-nav{
        width:240px;
        list-style:none;
        transform-origin: left;
        transition-duration: 0.3s;
        transform: rotateY(90deg);
        transform-style: preserve-3d;
    }
    .menu:hover .menu-nav{
        transform: rotateY(0deg);
    }
    .menu:hover .menu-nav-li{
        transform: rotateZ(0deg);
    }
    .menu-nav-li{
        padding:5px;
        color: rgba(51,102,204,.8);
        transform: rotateZ(-30deg);
        transition-duration: 0.3s;
        transform-style: preserve-3d;
        text-shadow: 1px 1px 1px 1px rgba(222,222,222,.3);
    }
</style>