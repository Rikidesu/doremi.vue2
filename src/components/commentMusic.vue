<template>

</template>


<script>

    "use strict";
    export default {

        name:"commentMusic",
        //props:['data'],
        data:()=>{
            return{
            }
        },
        methods:{


        },
        computed:{
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
            }
        }


    }


</script>


<style>

</style>