/*
* @Author: Rikiponzu*
* @Date:   2017-10-27 14:19:57
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-12-17 22:58:15
*/
"use strict";
import Vue from "vue";
export default {
    state:{
        tShow:true,//是否显示翻译
        tResult:"",//翻译的歌词
        result:"",
        now:0,
        dom:'',
        alwaysShow:false, //歌词始终显示
        lrcboard:"",
        lrc:"",
        lrcUpdate:'',
        lrcScroll:true,
        lrcOnScrollTimeout:'',
        lrcReScrollDelay:3000,
    },
    mutations:{
        _getLrc:function( state , { res } = {} ){
            let lrc = res.data.lrc&&res.data.lrc.lyric;
            let tLrc = res.data.tlyric&&res.data.tlyric.lyric;
            let that = this;
            // this.state.player.lrc.result = this.parseLrc(lrc);
            let getLrcPromise = this.dispatch("parseLrc" , { text:lrc });
            getLrcPromise.then(function(data){
                that.state.lrc.result = data;
            }).then(function(data){
                return that.dispatch("parseLrc" , { text:tLrc } );
            }).then(function(data){
                tLrc = data || "";
                return that.dispatch("parseTLrc" , { lrc:tLrc } );
            }).then(function(data){
                that.state.lrc.tResult = data ;
            })
            // tLrc = this.parseLrc(tLrc) || "";
            // tLrc&&this.parseTLrc(tLrc);
        },
        _updateLrc:function( state , { $refs }  ){
            if(this.state.lrc.result){
                // let that = this;
                for(let i=this.state.lrc.now;i<this.state.lrc.result.length;i++){
                    if(this.state.player.audio.currentTime>=this.state.lrc.result[i][0]){
                        this.state.lrc.now=i+1;
                        try{
                            this.state.lrc.lrcboard = this.state.lrc.lrcboard || document.querySelector("#lrcboard");
                            this.state.lrc.lrc = this.state.lrc.lrc || document.querySelector("#lrc");
                            this.state.lrc.scroller = this.state.lrc.scroller || document.querySelector("#scroller");
                            let el = this.state.lrc.lrcboard;
                            let lrc = this.state.lrc.lrc;
                            let scroller = this.state.lrc.scroller;
                            // let from = this.state.lrc.lrcboard.scrollTop;
                            let toEl = this.state.lrc.lrc.querySelector(".active");
                            let to = toEl.offsetTop-this.state.lrc.lrcboard.clientHeight/2+toEl.clientHeight*8;
                            // let dur = (to-from)/20;
                            // let scrollTo = function(){
                            //     from+=dur;
                            //     // el.scrollTop = from;
                            //     if(dur>0&&from<to){
                            //         requestAnimationFrame(scrollTo);
                            //     }else if(dur<0&&from>to){
                            //         requestAnimationFrame(scrollTo);
                            //     }
                            // };
                            // this.state.lrc.lrcScroll && requestAnimationFrame(scrollTo);
                            // this.$refs.lrcboard.scrollTop = this.$refs.lrc.querySelector(".active").offsetTop;

                            this.state.lrc.lrcScroll && requestAnimationFrame(function(){
                                lrc.style.transform = "translateY(-"+ to +"px)"
                                lrc.style.webkitTransform = "translateY(-"+ to +"px)";
                                lrc.style.oTransform = "translateY(-"+ to +"px)";
                                scroller.style.transform = "translateY("
                                  + ((to/lrc.clientHeight) * el.clientHeight
                                  - (to/lrc.clientHeight) * scroller.clientHeight )
                                +"px";
                            })




                        }catch(e){
                        }
                        break;
                    } else if(this.state.player.audio.currentTime<=0.5){
                        this.state.lrc.now=0;
                        this.state.lrc.lrcboard.scrollTop=0;
                    }
                }
            }
        },
        _setLrcUpdate:function( state , { onlyScroll }={} ){
            let that = this;
            if(onlyScroll){
                this.state.lrc.lrcScroll = true;
                return;
            }
            this.state.lrc.lrcScroll = true;
            if(this.state.lrc.lrcUpdate){ this.commit("_cancelLrcUpdate") }
            this.state.lrc.lrcUpdate = setInterval(function(){
                that.dispatch('updateLrc',{$refs:that.$refs});
            },this.state.config.updateDelay||200);
        },
        _cancelLrcUpdate:function( state , { onlyScroll }={ onlyScroll:true }){
            if(onlyScroll){
                this.state.lrc.lrcScroll = false;
                return;

            }
            console.log("cancel?"+onlyScroll);
            this.state.lrc.lrcUpdate&&clearInterval(this.state.lrc.lrcUpdate);

            this.state.config.debug && console.log(this.state.lrc.lrcUpdate);
        },
        _lrcOnScroll:function(){
            console.log('scrolling');
            this.commit('_cancelLrcUpdate',{ onlyScroll:true });
            this.state.lrc.lrcOnScrollTimeout && clearTimeout(this.state.lrc.lrcOnScrollTimeout);
            this.state.lrc.lrcOnScrollTimeout = setTimeout(function(){
                this.commit("_setLrcUpdate");
            }.bind(this),this.state.lrc.lrcReScrollDelay);
        }
    },
    actions:{
        updateLrc( { commit } , { $refs } ){
            commit("_updateLrc" , { $refs } );
        },
        getLrc( { commit } , { id } = {} ){
            this.state.lrc.now = 0 ;
            id = id ||this.state.player.nowPlaying.id;
            let that = this;
            Vue.http.get(that.state.config.host +'/lyric?id='+id,{})
                .then(function(res){
                    if(res.data.code==200){
                        commit("_getLrc" , { res } );
                    }
                },function(res){
                    console.log('error')
                })
        },
        parseTLrc( { commit } , { lrc } ){
            if(!lrc){ return "" };
            let tLrc = {};
            lrc.forEach(function(el,id){
                tLrc[el[0]] = el[1];
            });
            return tLrc;
        },
        parseLrc:function( state , { text }){
            try{
                let lines = text.split('\n'),
                    pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
                    pattern2 = /\[\d{2}:\d{2}.\d{3}\]/g,
                    result = [];
                result.splice(0,result.length);
                let max_lrc_row = 0;
                for(let i=0;i<=lines.length;i++){
                    if (pattern2.test(lines[i])){
                        lines[i] = lines[i].substring(0, 9) + lines[i].substring(10);
                        i--;
                    }
                }
                while (!pattern.test(lines[0])) {
                    lines = lines.slice(1);
                    max_lrc_row += 1;
                    if (max_lrc_row > 10000) {
                        console.log("歌词超过10000！！");
                        break;
                    }
                }
                lines[lines.length - 1].length === 0 && lines.pop();
                for(let i=lines.length-1;i!=1;i--){
                    if(!lines[i][1]){
                        lines.pop();
                    }
                    else {break;}
                }
                lines.forEach(function(v  , i  , a  ) {
                    pattern.lastIndex=0;
                    pattern2.lastIndex=0;
                    if (pattern.test(lines[i])||pattern2.test(lines[i])){
                        let time = v.match(pattern),
                            value = v.replace(pattern, '');
                        time.forEach(function (v1, i1, a1) {
                            let t = v1.slice(1, -1).split(':');
                            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                        });
                    }
                });
                result.sort(function(a, b) {
                    return a[0] - b[0];
                });
                let riki = [];
                let desu = [];
                let rikidesu = [];
                riki.splice(0,riki.length);
                result.forEach(function(v  , i  , a ){
                    let Static = /\[static\].*\[\/static\]/g,
                        effect = /\[effect\].*\[\/effect\]/g,
                        godlrc = /\[\{.*\}\]/g;
                    riki[i] = [];
                    desu[i] = [];
                    a[i][3] = [];
                    a[i][3][0] = 0;
                    if(godlrc.test(v)){
                        if(Static.test(v)){
                            a[i][3] = [];
                            a[i][2] = a[i][1].match(Static);
                            a[i][2] = String(a[i][2]).slice(+8,-9);
                            a[i][1] = a[i][1].replace(Static,"");
                            riki[i] = String(a[i][2]).split(";");
                            for(let j=0;j<riki[i].length;j++){
                                a[i][3][j]= String(riki[i][j]).split(":");
                            }
                        }
                        a[i][1] = a[i][1].replace(godlrc,"");
                    }
                });
                //this.lrc.result = result;
                result.unshift([-1,'']);
                result.unshift([-1,'']);
                result.push([99999,''],[99999,'']);
                result.push([99999,''],[99999,'']);
                return result
            }catch(e){
                console.info(e)
            }
        },
        setLrcUpdate:function({ commit } , onlyScroll ){
            commit("_setLrcUpdate" , { onlyScroll:onlyScroll } = {} );
        },
        cancelLrcUpdate:function({ commit } , onlyScroll ){
            console.log(onlyScroll);
            commit("_cancelLrcUpdate" , { onlyScroll:onlyScroll } = { onlyScroll:true });
        },
        lrcOnScroll:function({ commit }){
            commit("_lrcOnScroll");
        }

    }

}