/*
* @Author: Rikiponzu*
* @Date:   2017-10-27 14:26:42
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-10-30 15:19:53
*/
"use strict";
import Vue from "vue";
export default {
    state:{
        show:false,
        result:"",
        songs:{},
        input:"",
        doing:false,
        nowPage:0,
        totalPage:0
    },
    mutations:{
        _closeSearch(){
            this.state.search.show=false;
            this.state.search.input="";
            this.state.search.result='';
            this.state.search.songs='';
            this.state.config.secondScreen=false;
        },
        _prevSearchPage(){
            if(this.search.nowPage>0){
                this.doSearch(--this.state.search.nowPage);
            }
        },
        _nextSearchPage(){
            this.doSearch(++this.state.search.nowPage);
        }
    },
    actions:{
        closeSearch( { commit }){
            commit("_closeSearch");
        },
        doSearch( { commit } , { page }){
            this.state.search.nowPage = page||0;
            this.state.search.doing=true;
            this.state.search.songs={};
            let that = this;
            Vue.http.get(that.state.config.host + '/search?keywords='+that.state.search.input+"&offset="+(that.state.search.nowPage*10)+"&limit=10",{})
                .then(function(res){
                    that.state.search.result=res.data;
                    that.state.search.songs=res.data.result.songs;
                    that.state.search.doing=false;
                },function(res){
                    console.info("error");
                    that.state.search.doing=false;
                })
        },
        prevSearchPage({ commit }){
            commit("_prevSearchPage")
        },
        nextSearchPage({ commit }){
            commit("_nextSearchPage")
        }
    }
}