import Vue from 'vue';
import ElementUI from 'element-ui';
require("./assets/font-awesome/css/font-awesome.min.css");
require("./default.css");
import App from './App.vue';
import vueResource from 'vue-resource';

Vue.use(vueResource);

Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
});


//Vue.use(fontAwesome);
