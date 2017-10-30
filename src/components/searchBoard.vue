<template>
    <div class="searchBoard" :class="{active:isSearch,zoom:lrc.alwaysShow}">
        <div class="closeSearch" v-if="isSearch" @click="closeSearch">
            <i class="fa fa-arrow-left"></i>
        </div>
        <div v-if="search.result" class="prevSearchPage" @click="prevSearchPage"><i class="fa  fa-chevron-left"></i></div>
        <div v-if="search.result" class="nextSearchPage" @click="nextSearchPage"><i class="fa  fa-chevron-right"></i></div>
        <div class="header" :class="{'active':isSearch}">
            <h2 class="domain"> doremi.moe </h2>
        </div>
        <div class="search" :class="{'active':isSearch}">
            <form id="search" @submit.prevent="doSearch(0)" autocomplete="off" novalidate="">
                <input @focus="search.show=true" autofocus="autofocus" @blur="search.show=false" name="text" v-model="search.input" class="searchInput" id="searchInput" placeholder="这里搜索噢～">
                <label for="searchInput"></label>

                <label for="closeSearch">
                    <i class="fa fa-search"></i>
                    <input id="closeSearch" type="submit" style="display: none" />
                </label>
            </form>
        </div>
        <div id="searchResult" class="body">
            <transition-group name="searchResultAnimation">
                <div v-if="search.songs" v-for="(x,$index) in search.songs" :key="'num_'+$index" class="result searchResultAnimation" :class="{small:config.secondScreen&&lrc.alwaysShow}" :style="{transition:'all '+($index+1)*0.2+'s'}">
                    <div class="coverImg">
                        <img width="100%" :src="x.album.picUrl">
                    </div>
                    <div class="resultTitle">
                        <h3>{{x.name}}</h3>
                        <span class="ctrl">
                          <span>
                            <i class="fa fa-heart-o"></i>
                          </span>
                          <span>
                            <i class="fa fa-star-o"></i>
                          </span>
                          <span>
                            <i @click="download({ ele : x })" class="fa fa-download"></i>
                          </span>
                          <span>
                            <i @click="setPlay({ ele : x})" class="fa fa-play"></i>
                          </span>
                        </span>
                    </div>
                    <div class="resultDetail">
                        <span class="singer">
                            <span>歌手：</span><span style="padding-right:5px" v-for="s in x.artists">{{s.name}}</span>
                        </span>
                        <span class="album" :title="x.album.name">
                          专辑：{{x.album.name}}
                        </span>
                    </div>

                </div>

                <div v-show="isSearch&&search.doing" :key="'searching'" class="result" style="text-align: center">搜索中...</div>

            </transition-group>
        </div>
    </div>
</template>


<script>

    "use strict";
    import { mapState , mapActions } from 'vuex';
    export default {

        name:"searchBoard",
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
            isSearch: state => state.config.secondScreen = state.search.show||state.search.input||state.search.result
        }),
        methods:mapActions(
            ['setPlay','closeSearch','doSearch','prevSearchPage','nextSearchPage','download']
        )


    }


</script>


<style>


</style>