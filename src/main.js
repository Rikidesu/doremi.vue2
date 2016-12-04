import Vue from 'vue'
import ElementUI from 'element-ui'
import fontawesome from 'font-awesome-webpack'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(ElementUI)
