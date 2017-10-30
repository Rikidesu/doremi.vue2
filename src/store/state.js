/*
* @Author: Rikiponzu*
* @Date:   2017-10-16 12:21:59
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-10-27 14:27:15
*/


export const state = {
    config:{
        host:{ local:"" , doremi:"http://doremi.moe" , dev:"http://127.0.0.1:3000"}.dev,
        secondScreen:false,

        items: [1,2,3,4,5,6,7,8,9]
    },
    player:{

    },
    lrc:{

    },
    search:{

    }

}

export const mutations = {
        // PLAYER:{PLAY (state , { url }){
        //     !state.player.isPlay&&state.player.audio.play();
        //     state.player.isPlay=true;
        // }},
    player:{

    }

}

export const actions = {
    play({ commit }){
        commit("PLAY");
    }
}