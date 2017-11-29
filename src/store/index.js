/*
* @Author: Rikiponzu*
* @Date:   2017-10-16 12:18:49
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-11-29 14:50:05
*/
import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config'
import player from './modules/playerController'
import lrc from './modules/lrcBoard'
import search from './modules/searchBoard'
import prePlayingList from './modules/prePlayingList'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({

    modules:{
        config,
        player,
        lrc,
        search,
        prePlayingList,
        user
    }



})