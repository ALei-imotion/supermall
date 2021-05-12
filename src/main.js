import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import toastObj from "components/common/toast"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toastObj)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// 解决移动端的300ms延迟
FastClick.attach(document.body)

// ES6 继承
// class Animal {
//   run() {
//   }
// }

// class Person extends Animal {
//   run()
// }

// class AAA extends Animal {
//   run()
// }