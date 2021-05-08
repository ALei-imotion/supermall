import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toastObj from "components/common/toast"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toastObj)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


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