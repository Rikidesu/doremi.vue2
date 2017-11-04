<template>
    <div class="prePlayingList">

        <div class="prePlayingListMenu">
<!--
            <router-link to="/prePlayingList/prePlayingList">
                <div >播放列表</div>
            </router-link>
            <router-link to="/prePlayingList/defaultPlayingList">
                <div >默认播放</div>
            </router-link>
            <router-link to="/prePlayingList/historyPlayingList">
                <div >历史播放</div>
            </router-link> -->
            <div @click="current='prePlayingList'" :class="{now : current=='prePlayingList'}">播放列表</div>
            <div @click="current='defaultPlayingList'" :class="{now : current=='defaultPlayingList'}">默认播放</div>
            <div @click="current='historyPlayingList'" :class="{now : current=='historyPlayingList'}">历史播放</div>

        </div>

<!--
        <router-view>

        </router-view> -->

        <musicList v-show="current=='prePlayingList'" :list="prePlayingList.list"></musicList>
        <musicList v-show="current=='defaultPlayingList'" :list="player.randomList"></musicList>
        <musicList v-show="current=='historyPlayingList'" :list="prePlayingList.historyList"></musicList>

    </div>


</template>


<script>

"use strict";

import Vuex , { mapState , mapActions } from 'vuex';
import musicList from './musicList.vue';

export default {

    data(){
        return{
            current:"prePlayingList"
        }
    },
    components:{
        musicList
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
        },
        prePlayingList(){
            return this.$store.state.prePlayingList
        },
        // randomList(){
        //     return this.$store.getters.player.randomList
        // }
    }),
    methods:mapActions(
        ['setPlay']
    )




}


</script>


<style lang="sass">

.prePlayingList{
    position: relative;
    width:100%;
    height:100%;
    overflow:auto
}

.prePlayingListMenu{
    position:relative;
    width:80%;
    margin:50px auto 10px auto;
    display:flex;
    justify-content:space-around;

}
.prePlayingListMenu > div{
    position:relative;
    display: inline-block;
    height:80px;
    line-height: 80px;
    font-size: larger;
    width:200px;
    border:solid 2px #eee;
    border-radius: 5px;
    background-color: rgba(102,204,255,.5);
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    &.now{
        background-color: rgba(102, 204, 255, 0.9);
        color: #fff;
    }
}
</style>