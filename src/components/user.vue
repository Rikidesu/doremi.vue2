<template>

    <div class="userModule">

        <div v-show="!user.isLogin&&false" class="login">

            <form @submit.prevent="login(form)">
                手机号：<input type="tel" name="mobile" v-model="form.mobile" />
                密码： <input type="password" name="password" v-model="form.password" />

                <button type="submit">登陆</button>
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