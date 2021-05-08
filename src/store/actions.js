import { ADD_COUNTER, ADD_TO_CART } from "./mutations_type"

export default {
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 2.有的话就将商品数量加一
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        reslove('当前的商品数量+1')
      } else {// 没有的话就就将该商品加到购物车列表中
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        reslove('添加了新的商品')
      }
    })
  }
}