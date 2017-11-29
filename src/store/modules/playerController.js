/*
* @Author: Rikiponzu*
* @Date:   2017-10-27 10:15:59
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-11-29 15:59:16
*/

"use strict";
import Vue from 'vue';
export default {
    state:{
        audio:document.createElement("audio"),
        isPlay:false,
        backgroundUrl:"./src/img/default.jpg",
        randomList:[],
        currentTime:{
            original:0,
            real:"00:00"
        },
        duration:{
            original:0,
            real:"00:00"
        },
        autoplay:false,
        nowPlaying:'',
        mp3Url:"./src/demo.mp3",
        radio: '1',
        coverUrl:"./src/img/default.jpg",
        state:{
            rotate:false
        }
    },
    mutations:{
        _play:function(state , { url }={}){
            !this.state.player.isPlay&&this.state.player.audio.play();
            this.state.player.isPlay=true;
        },
        _pause:function(state  ){
            this.state.player.isPlay&&this.state.player.audio.pause();
            this.state.player.isPlay=false;
        },
        _playNext:function( state  ){
            this.state.player.playRandom();
        },
        _playRandom:function( state ){
            this.state.player.setPlay(this.state.player.randomList[Math.floor(Math.random()*(this.state.player.randomList.length))]);
        },
        _setPlay:function( state , { res , ele }){
            if(!res.data.data[0].url){
                this.dispatch("playNext");
            };
            this.state.player.audio.src = res.data.data[0].url;
            !this.state.player.isPlay && this.commit("_play");
            this.dispatch( "addToHistoryPlayingList", { ele } );
            // this.$emit('getLrc');    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.dispatch("getLrc");
        },
        _updateTime:function( { state , dispatch , commit }  ){
            this.state.player.isPlay = !this.state.player.audio.paused;
            this.state.player.currentTime.original=this.state.player.audio.currentTime;
            this.state.player.currentTime.real = this.state.player.audio.duration ? ((this.state.player.audio.currentTime/60)<10?"0":"")+parseInt(this.state.player.audio.currentTime/60)+":"+(parseInt(this.state.player.audio.currentTime%60)<10?"0":"")+parseInt(this.state.player.audio.currentTime%60) : "_(:з」∠)_";
            this.state.player.duration.original=this.state.player.audio.duration;
            this.state.player.duration.real = this.state.player.audio.duration ? ((this.state.player.audio.duration/60)<10?"0":"")+parseInt(this.state.player.audio.duration/60)+":"+(parseInt(this.state.player.audio.duration%60)<10?"0":"")+parseInt(this.state.player.audio.duration%60) : "(>^ω^<)喵";

        },
        _getRandomList:function( {} , { list } ){
            this.state.player.randomList = list;
        }
    },
    actions:{
        play( { commit } , { url }={} ) {
            commit("_play" , { url });
        },
        pause( { commit } ){
            commit("_pause");
        },
        playNext({ commit , state , dispatch} ) {

            if(this.state.prePlayingList.list.length>0){
                dispatch("setPlay" , { ele:this.state.prePlayingList.list[0] } ).then(function(){
                    dispatch("removeFromPreplayingList" , { index:0 } );
                });
            }else{
                dispatch("playRandom");
            }

            // let a = dispatch("playRandom");
        },
        playRandom( { commit , state , dispatch} ) {
            dispatch("setPlay" , { ele : this.state.player.randomList[Math.floor(Math.random()*(this.state.player.randomList.length))] });
        },
        setPlay( { commit } , { ele , url }){
            commit("_pause");
            this.state.player.nowPlaying = ele;
            if(url){
                this.state.player.audio.src=url;
            } else {

                this.state.player.coverUrl = ele.album&&ele.album.blurPicUrl||ele.al&&ele.al.picUrl||this.player.coverUrl;
                this.state.player.backgroundUrl=this.state.player.coverUrl;

                Vue.http.get(this.state.config.host +'/music/url?id='+ele.id,{})
                    .then(function(res){

                        commit("_setPlay" , { res , ele } );

                    },function(res){
                        console.info(res)
                    })
            }
        },
        updateTime( { commit } , { $refs }={} ){
            commit("_updateTime" );
            this.state.lrc&&this.state.lrc.result&&commit("_updateLrc" , { $refs });
        },
        download( { commit } , { ele,url }={}){
            let that = this;
            let name = ele.name;
            let artist = ele.artists&&ele.artists[0].name||ele.ar&&ele.ar[0].name;
            if(url){
                window.open(url);
            } else {

                Vue.http.get(that.state.config.host +'/music/url?id='+ele.id,{})
                    .then(function(res){

                        let src = res.data.data[0].url;

                        location.href = that.state.config.host +'/download/' + name + "-" + artist + ".mp3?url=" + src + "&name=" + name + "-" + artist;

                    },function(res){
                        console.info(res)
                    })
            }
        },
        getRandomList( { commit }){
            let that = this;
            Vue.http.get(that.state.config.host + "/playlist/detail?id=324617415",{})
                .then(function(data){

                    commit("_getRandomList" , { list:data.data.playlist.tracks })


                },function(data){

                });
        },
        likeMusic( { commit } , { ele }){
            Vue.http.get(this.state.config.host + "/like?id="+ele.id,{})
            .then(function(res){

                console.log(res);


            },function(data){

            });

        }
    },
    getters:{
        // randomList(){
        //     return this.state.player.randomList;
        // }
        // audio(){
        //     console.log(this);
        //     this.player.currentTime.original=this.player.audio.currentTime;
        //     this.player.currentTime.real = parseInt(this.player.audio.currentTime/60)+this.player.audio.currentTime%60;
        //     this.player.duration.original=this.player.audio.duration;
        //     this.player.duration.real = ((this.player.audio.duration/60)<10?"0":"")+parseInt(this.player.audio.duration/60)+this.player.audio.duration%60;
        // }
    }
}