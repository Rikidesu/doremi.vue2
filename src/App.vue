<template>
  <div id="app">
    <div id="side" class="side">
        <div class="progress" :style="{transform:'rotate('+(audio.currentTime/audio.duration)*360+'deg)'}">
            <i :style="{transform:'rotate(-'+(audio.currentTime/audio.duration)*360+'deg)'}" class="fa fa-music"></i>
            {{audio.currentTime}}
            {{audio.duration}}
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
                    <div>1:29</div>
                    <div>3:27</div>
                </div>
                <div class="other">
                    <i class="fa fa-heart"></i>
                    <i class="fa fa-random"></i>
                    <i class="fa fa-forward"></i>
                </div>

            </div>


        </div>

    </div>

    <div class="lrcboard" :class="{blur:isSearch}" id="lrcboard">
        <ul id="lrc">
            <li style=" line-height: 1000%;">♪~ ゛(´д｀*)゛~♪~♪　ﾌﾝﾌﾝ</li>
        </ul>
    </div>

    <div class="searchBoard" :class="{active:isSearch}">

      <div v-if="showSearch||searchInput||searchResults" @click="closeSearch" style="position:fixed;z-index:2;width:100px;height:80px;line-height:80px;text-align:center;background-color:rgba(0,0,0,.6);font-size:60px;color:#fff;cursor:pointer">
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
                                <i @click="play(x.mp3Url)" class="fa fa-play"></i>
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
export default {
  name: 'app',
  data:function () {
    return {
      audio:document.createElement("audio"),
      showSearch:false,
      searchResults:'',
      isPlay:false,
      currentTime:'',
      searchSongs:{},
      searchInput:"",
      autoplay:false,
      mp3Url:"./src/demo.mp3",
      radio: '1',
      coverUrl:"./src/img/cover.png",
      items: [1,2,3,4,5,6,7,8,9]
    }
  },
  ready:function(){
    this.audio.addEventListener("timeupdate",this.updateLrc);
  },
  computed:{
    isSearch:function(){
      return this.showSearch||this.searchInput||this.searchResults;
    }
  },
  methods:{

    updateLrc:function(){
      this.currentTime=this.audio.currentTime;
      console.log(this.currentTime);

    },
    closeSearch:function(){
      this.showSearch=false;
      this.searchInput="";
      this.searchResults='';
    },
      play:function(url){
        if(url){
            this.audio.src=url;
        }
          this.audio.play();
          this.isPlay=true;
      },
      pause:function(){
          this.audio.pause();
          this.isPlay=false;
      },
      doSearch:function(){
        this.$http.get('http://127.0.0.1/api/search/'+this.searchInput+"/0/10",{})
        .then(function(res){
          this.searchResults=res.data;
            this.searchSongs=res.data.result.songs;
        },function(res){
          console("error");
        })

      }
  }
}
</script>

<style>
#app{
  height:100%;
  overflow-y: auto;
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
