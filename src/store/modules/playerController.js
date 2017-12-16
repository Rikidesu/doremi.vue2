/*
* @Author: Rikiponzu*
* @Date:   2017-10-27 10:15:59
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-12-16 15:41:51
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
        },
        updateTime:'',
        updateTimeDelay:200,
    },
    mutations:{
        _play:function( state , { url }={}){
            !this.state.player.isPlay&&this.state.player.audio.play();
            this.state.player.isPlay=!this.state.player.audio.paused;
            this.dispatch("setLrcUpdate");
            this.commit("_setUpdateTime");

            this.state.config.debug && console.log("commit _play");
            this.state.config.debug && console.log("audio paused:"+this.state.player.audio.paused);

        },
        _pause:function( state  ){
            this.state.player.isPlay&&this.state.player.audio.pause();
            this.state.player.isPlay=!this.state.player.audio.paused;
            this.dispatch("cancelLrcUpdate");
            this.commit("_cancelUpdateTime");

            this.state.config.debug && console.log("commit _pause");
            this.state.config.debug && console.log("audio paused:"+this.state.player.audio.paused);
        },
        // _playNext:function( state  ){
        //     this.state.player.playRandom();
        // },
        // _playRandom:function( state ){
        //     this.state.player.setPlay(this.state.player.randomList[Math.floor(Math.random()*(this.state.player.randomList.length))]);
        // },
        _setPlay:function( state , { res , ele }){
            if(!res.data.data[0].url){
                this.dispatch("playNext");
            };
            if(!res.data.data[0].url){
                this.state.config.debug && console.log("_setPlay: url is empty");
                this.dispatch( "playNext" );
                return false;
            }
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
        _setUpdateTime:function( ){
            this.commit("_cancelUpdateTime");
            this.state.player.updateTime = setInterval(function(){
                this.commit("_updateTime");
            }.bind(this),this.state.player.updateTimeDelay);
        },
        _cancelUpdateTime:function({ }){
            this.state.player.updateTime && clearInterval(this.state.player.updateTime);
        },
        _getRandomList:function( {} , { list } ){
            this.state.player.randomList = list;
        }
    },
    actions:{
        play( { commit , dispatch } , { url }={} ) {
            if(this.state.player.nowPlaying){
                commit("_play" , { url });
            }else{
                dispatch("playNext");
            }
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
        },
        playRandom( { commit , state , dispatch} ) {
            dispatch("setPlay" , { ele : this.state.player.randomList[Math.floor(Math.random()*(this.state.player.randomList.length))] });
        },
        setPlay( { commit } , { ele , url }){
            commit("_pause");
            this.state.player.nowPlaying = ele;
            if(url){
                this.state.player.audio.src=url;
            } else if (!ele){
                alert('没有给我歌曲参数啊！！！');
            }
            else {
                this.state.player.coverUrl = ele.album&&ele.album.blurPicUrl||ele.al&&ele.al.picUrl||this.state.player.coverUrl;
                this.state.player.backgroundUrl=this.state.player.coverUrl;

                Vue.http.get(this.state.config.host +'/music/url?id='+ele.id,{})
                    .then(function(res){

                        commit("_setPlay" , { res , ele } );

                    },function(res){
                        console.info(res)
                    })
            }
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