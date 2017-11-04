/*
* @Author: Rikiponzu*
* @Date:   2017-11-03 13:44:30
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-11-04 17:53:50
*/
export default {
    state:{
        list: localStorage.prePlayingList ? JSON.parse(localStorage.prePlayingList) : [] ,
        historyList: localStorage.historyPlayingList ? JSON.parse(localStorage.historyPlayingList) : []
    },
    mutations:{

        _addToPreplayingList( state , { ele } ){
            this.state.prePlayingList.list.unshift(ele);
            localStorage.prePlayingList = JSON.stringify(this.state.prePlayingList.list);
        },
        _removeFromPreplayingList( state , { index } ){
            this.state.prePlayingList.list.splice(index,1);
            localStorage.prePlayingList = JSON.stringify(this.state.prePlayingList.list);
        },
        _addToHistoryPlayingList( state , { ele } ){
            this.state.prePlayingList.historyList.unshift(ele);
            localStorage.historyPlayingList = JSON.stringify(this.state.prePlayingList.historyList);
        }

    },
    actions:{
        addToPreplayingList( { commit } , { ele } ){
            commit("_addToPreplayingList" , { ele } );
        },
        removeFromPreplayingList( { commit } , { index } ){
            commit("_removeFromPreplayingList" , { index } );
        },
        addToHistoryPlayingList( { commit } , { ele } ){
            commit("_addToHistoryPlayingList" , { ele } );
        }

    }
}