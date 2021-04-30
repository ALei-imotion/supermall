import Vue from "vue"
import Vuex from "vuex"

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {  
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点 
    addCart(state, payload) {
      // payload:指新添加的商品
      let oldProduct = null;
      // 数组常用的方法有哪些？ push/pop/shift/unshift/sort/reverse/map/join/filter/reduce/find
      // 遍历已经添加到cartList中的商品
      // for (let item of state.cartList) {
      //   // 判断传过来的商品的iid是否有和已经添加到cartList中的商品的iid一致的情况
      //   // 如果有的话，就将该商品取出来，然后在下面给数量加一
      //   // 如果没有的话，就直接给新商品数量加一，然后将该商品push到cartList数组中
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      oldProduct = state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload)
      }
    }
  }
})

// 3.将Vuex挂载到Vue实例上
export default store