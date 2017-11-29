/*
* @Author: Rikiponzu*
* @Date:   2017-11-29 14:39:02
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-11-29 18:09:16
*/
"use strict";
import Vue from 'vue';
export default {
    state:{
        isLogin:false,
        info:{},
    },
    mutations:{

        _login( state , { profile } ){
            this.state.user.info = profile;
            this.state.user.isLogin = true;
            sessionStorage.userInfo = JSON.stringify(profile);
        },
        _restoreLogin( state , restore){
            restore && sessionStorage.userInfo && ( this.state.user.info = JSON.parse(sessionStorage.userInfo) );
            restore && sessionStorage.userInfo && ( this.state.user.isLogin = true );
            !restore && ( delete sessionStorage.userInfo );
            !restore && ( this.state.user.isLogin = false );
        }

    },
    actions:{
        login( { commit } , form ){

            let that = this;
            let url = "/login/cellphone?phone="+form.mobile+"&password="+form.password;

            let request = Vue.http.get(that.state.config.host + url,{});
            request.then(function(res){
                if(res.data.code==200){
                    commit("_login" , { profile:res.data.profile } );
                }
            },function(res){

            });


            // commit("_login", { form });
        },
        restoreLogin( { commit } ){
            let request = Vue.http.get(this.state.config.host + "/login/refresh",{});
            request.then(function(res){

                if(res.data.code==200){
                    commit("_restoreLogin" , true)
                }else{
                    commit("_restoreLogin" , false)
                }

            },function(res){
            });


        }
    }
}