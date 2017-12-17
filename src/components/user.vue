<template>

    <div class="userModule">

        <div v-show="user.show&&!user.isLogin" class="login">

            <form @submit.prevent="login(form)">
                <div class="loginForm">
                    <div>
                        <span>手机号：</span>
                        <span> <input type="tel" name="mobile" v-model="form.mobile" /> </span>
                    </div>
                    <div>
                        <span>密码： </span>
                        <span><input type="password" name="password" v-model="form.password" /></span>
                    </div>
                    <button type="submit">登陆</button>
                </div>
            </form>

        </div>

    </div>

</template>


<script>

"use strict";

import Vuex , { mapState , mapActions } from 'vuex';

export default {

    data(){
        return{
            form:{

            }
        }
    },
    mounted:function(){
        this.restoreLogin();
    },
    computed:mapState({
        config(){
            return this.$store.state.config
        },
        user(){
            return this.$store.state.user
        }
    }),
    methods:mapActions(
        ['login','restoreLogin']
    )




}


</script>


<style lang="sass">

.userModule{
    &{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        display: flex;
        justify-content:center;
        align-items:center;
        pointer-events:none;
    }

    .loginForm{
        width:60%;
        margin: 20px auto;
        display:table;
        text-align: center;
    }
    .loginForm > div{
        display:table-row;
    }
    .loginForm > div > span{
        padding: 20px 0 ;
        display:table-cell;
    }

    *{
        pointer-events:auto;
    }

    .login{
        position:relative;
        height:400px;
        width:500px;
        border:solid 1px #666;
        border-radius:4px;
        background-color: rgba(255,255,255,.9);
    }
}


</style>