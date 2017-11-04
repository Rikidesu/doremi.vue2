/*
* @Author: Rikiponzu*
* @Date:   2017-11-01 11:43:29
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-11-04 16:43:17
*/


import Vue from 'vue';
import VueRouter from 'vue-router';
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

Vue.use(VueRouter);

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

import searchBoard from './components/searchBoard.vue';
import prePlayingList from './components/prePlayingList.vue';

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: searchBoard },
  { path: '/foo', component: Foo },
  { path: '/prePlayingList', component: prePlayingList },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

export default router