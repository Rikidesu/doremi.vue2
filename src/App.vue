<template>
    <div id="app">
        <div id="background" :style="{backgroundImage:'url('+backgroundUrl+')'}"></div>
        <div id="side" class="side">
            <div class="progress" :style="{transform:'rotate('+(audio.currentTime/audio.duration)*360+'deg)'}">
                <i :style="{transform:'rotate(-'+(audio.currentTime/audio.duration)*360+'deg)'}" class="fa fa-music"></i>
            </div>
            <!-- 这里做成3D的， 反面可以翻过来，进行下载、评星等操作-->
            <div class="cover">

                <img width="100%" :src="coverUrl">

                <div class="controller">

                    <div class="coverModel">

                    </div>

                    <div @click="isPlay?pause():play()" class="play">
                        <i class="fa" :class="{'fa-pause':isPlay,'fa-play':!isPlay}"></i>
                    </div>
                    <div class="time">
                        <div>{{currentTime.real}}</div>
                        <div>{{duration.real}}</div>
                    </div>
                    <div class="other">
                        <i class="fa fa-heart"></i>
                        <i class="fa fa-random"></i>
                        <i class="fa fa-forward"></i>
                    </div>

                </div>


            </div>

        </div>

        <div ref="lrcboard" class="lrcboard" :class="{blur:isSearch}" id="lrcboard">
            <ul ref="lrc" id="lrc">
                <li v-if="!lrc.result" style=" line-height: 1000%;">♪~ ゛(´д｀*)゛~♪~♪　ﾌﾝﾌﾝ</li>
                <li :class="{active:$index==lrc.now-1}" v-for="(x,$index) in lrc.result">{{x[1] +" "}}</li>
            </ul>
        </div>

        <div class="searchBoard" :class="{active:isSearch}">

            <div v-if="showSearch||searchInput||searchResults" @click="closeSearch" style="position:fixed;top:0;left:0;z-index:2;width:100px;height:80px;line-height:80px;text-align:center;background-color:rgba(0,0,0,.6);font-size:60px;color:#fff;cursor:pointer">
                <i class="fa fa-arrow-left"></i>
            </div>

            <div class="header" :class="{'active':isSearch}">
                <h2 class="domain"> doremi.moe </h2>
            </div>
            <div class="search" :class="{'active':isSearch}">

                <form id="search" @submit.prevent="doSearch">
                    <input @focus="showSearch=true" @blur="showSearch=false" name="text" v-model="searchInput" class="searchInput" id="searchInput" placeholder="这里搜索噢～">
                    <label for="searchInput"></label>
                </form>

                <i class="fa fa-search"></i>

            </div>

            <div id="searchResult" class="body">
                <transition-group name="searchResultAnimation">
                    <div v-if="searchResults" v-for="(x,$index) in searchSongs" :key="'num_'+$index" class="result searchResultAnimation" :style="{transition:'all '+($index+1)*0.2+'s'}">
                        <div class="coverImg">
                            <img width="100%" :src="x.album.picUrl">
                        </div>
                        <div class="resultTitle">
                            <h3>{{x.name}}</h3>
                            <span class="ctrl">
                              <span>
                                <i class="fa fa-heart-o"></i>
                              </span>
                              <span>
                                <i class="fa fa-star-o"></i>
                              </span>
                              <span>
                                <i @click="setPlay(x.id)" class="fa fa-play"></i>
                              </span>
                            </span>
                        </div>
                        <div class="resultDetail">
              <span class="singer">
                <span>歌手：</span><span style="padding-right:5px" v-for="s in x.artists">{{s.name}}</span>
              </span>
                            <span class="album" :title="x.album.name">
                专辑：album{{x.album.name}}
              </span>


                        </div>

                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    "use strict";
    export default {
        name: 'app',
        data:function () {
            return {
                audio:document.createElement("audio"),
                backgroundUrl:"",
                showSearch:false,
                searchResults:'',
                isPlay:false,
                currentTime:{
                    original:0,
                    real:"00:00"
                },
                duration:{
                    original:0,
                    real:"00:00"
                },
                searchSongs:{},
                searchInput:"",
                lrc:{
                    result:"",
                    now:0,
                    dom:''
                },
                autoplay:false,
                mp3Url:"./src/demo.mp3",
                radio: '1',
                coverUrl:"./src/img/cover.png",
                items: [1,2,3,4,5,6,7,8,9]
            }
        },
        mounted:function(){
            setInterval(this.updateLrc,100);
            this.audio.addEventListener("onloadstart",function(data){
                console.log("onloadstart");
                console.log(data)
            })
        },
        computed:{
            isSearch:function(){
                return this.showSearch||this.searchInput||this.searchResults;
            }
        },
        watch:{
            audio:function(){
                this.currentTime.original=this.audio.currentTime;
                this.currentTime.real = parseInt(this.audio.currentTime/60)+this.audio.currentTime%60;
                this.duration.original=this.audio.duration;
                this.duration.real = ((this.audio.duration/60)<10?"0":"")+parseInt(this.audio.duration/60)+this.audio.duration%60;
            }
        },
        methods:{
            closeSearch:function(){
                this.showSearch=false;
                this.searchInput="";
                this.searchResults='';
            },
            setPlay:function(id,url){

                let that = this;
                if(url){
                    this.audio.src=url;
                } else {
                    this.$http.get('/api/song/'+id,{})
                        .then(function(res){
                            that.audio.src = res.data.songs[0].mp3Url;
                            that.coverUrl = res.data.songs[0].album.picUrl;
                            that.play();
                            that.getLrc(id);
                            that.backgroundUrl=that.coverUrl;
                            that.lrc.now=0;
                        },function(res){
                            console.info(res)
                        })
                }
            },
            play:function(url){
                this.audio.play();
                this.isPlay=true;
            },
            pause:function(){
                this.audio.pause();
                this.isPlay=false;
            },
            doSearch:function(){
                this.$http.get('/api/search/'+this.searchInput+"/0/10",{})
                    .then(function(res){
                        this.searchResults=res.data;
                        this.searchSongs=res.data.result.songs;
                    },function(res){
                        console.log("error");
                    })

            },
            getLrc:function(id){
                this.$http.get('/api/lrc/'+id,{})
                    .then(function(res){
                        if(res.data.code==200){
                            this.parseLrc(res.data.lrc.lyric)
                        }
                    },function(res){
                        console.log('error')
                    })
            },
            parseLrc:function(text){
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
                    this.lrc.result = result;
                }catch(e){

                    console.info(e)

                }
            },
            updateLrc:function(){
                //this.currentTime=this.audio.currentTime;
                this.isPlay = !this.audio.paused;
                this.currentTime.original=this.audio.currentTime;
                this.currentTime.real = ((this.audio.currentTime/60)<10?"0":"")+parseInt(this.audio.currentTime/60)+":"+(parseInt(this.audio.currentTime%60)<10?"0":"")+parseInt(this.audio.currentTime%60);
                this.duration.original=this.audio.duration;
                this.duration.real = ((this.audio.duration/60)<10?"0":"")+parseInt(this.audio.duration/60)+":"+(parseInt(this.audio.duration%60)<10?"0":"")+parseInt(this.audio.duration%60);
                if(this.lrc.result){
                    for(let i=this.lrc.now;i<this.lrc.result.length;i++){
                        if(this.audio.currentTime>=this.lrc.result[i][0]){
                            this.lrc.now=i+1;


                            let el = this.$refs.lrcboard;
                            let from = this.$refs.lrcboard.scrollTop;
                            let toEl = this.$refs.lrc.querySelector(".active");
                            let to = toEl.offsetTop-this.$refs.lrcboard.clientHeight/2+toEl.clientHeight*3;
                            let dur = (to-from)/30;
                            let scrollTo = function(){
                                from+=dur;
                                el.scrollTop = from;
                                console.log(from+" -> "+to +"  :"+dur);
                                if(dur>0&&from<to){
                                    requestAnimationFrame(scrollTo);
                                }else if(dur<0&&from>to){
                                    requestAnimationFrame(scrollTo);
                                }
                            };

                            requestAnimationFrame(scrollTo);

                            //this.$refs.lrcboard.scrollTop = this.$refs.lrc.querySelector(".active").offsetTop;

                            console.log(this.$refs.lrc.querySelector(".active").offsetTop);

                            break;
                        }
                    }
                }
            }
        }
    }
</script>

<style>
    #app{
        height:100%;
        overflow-y: auto;
        color:#404d5b;
        font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;
    }
    #background{
        position:fixed;
        width:100%;
        height:100%;
        background-size: cover;
        z-index: -1;
        -webkit-filter: blur(20px); /* Chrome, Opera */
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        filter: blur(20px);
        opacity:.4;
    }
    .searchResultAnimation{
        opacity:1;
    }
    .searchResultAnimation-enter{
        transform: scale(.8) rotateY(90deg);
        opacity:0;
    }
    .searchResultAnimation-enter-active{
    }
    .searchResultAnimation-leave{
        opacity:0;
    }

    .searchResultAnimation-leave-active{
        transition: all .3s!important;
        opacity:0;
    }

</style>