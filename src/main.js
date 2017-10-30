import Vue from 'vue';
// import Vuex from 'vuex';
import store from './store'
//import ElementUI from 'element-ui';
require("./assets/font-awesome/css/font-awesome.css");
require("./default.css");
require("./jquery.js");
import App from './App.vue';
import vueResource from 'vue-resource';

Vue.use(vueResource);
// Vue.use(Vuex)


//Vue.use(ElementUI);
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});


//Vue.use(fontAwesome);
