<template>
  <div id="app">
    <div id="side" class="side">
        <div class="progress">
            <i class="fa fa-music"></i>
        </div>
        <!-- 这里做成3D的， 反面可以翻过来，进行下载、评星等操作-->
        <div class="cover">

            <img width="100%" src="dist/img/cover.png">

            <div class="controller">

                <div class="coverModel">

                </div>

                <div @click="play()" class="play">
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

    <div class="main">

        <div class="header">
            <h1> doremi.moe </h1>
        </div>
        <div class="search">

            <form id="search" onsubmit="event.preventDefault();return search.text();">
                <input name="text" class="searchInput" id="searchInput" placeholder="这里搜索噢～">
                <label for="searchInput"></label>
            </form>

            <i class="fa fa-search"></i>

        </div>

        <div id="searchResult" class="body">

        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      audio:document.createElement("audio"),
      isPlay:false,
      autoplay:false,
      mp3Url:"demo.mp3",
    }
  },
  methods () {
    return {
      play:function(){
        if(this.audio.paused){
          if(!this.audio.src){
            this.audio.src="demo.mp3";
          }
          this.audio.play();
          this.isPlay=true;
        }else{
          this.audio.pause();
          this.isPlay=false;
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
