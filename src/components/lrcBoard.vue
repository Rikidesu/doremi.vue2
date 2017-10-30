<template>
        <div class="lrcboard" :class="{blur:isSearch&&!lrc.alwaysShow,zoom:lrc.alwaysShow&&config.secondScreen}" id="lrcboard">
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
        }),


    }


</script>


<style>

</style>