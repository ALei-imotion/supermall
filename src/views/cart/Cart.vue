<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav-bar">
      <div slot="middle">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

import { mapGetters } from "vuex"; // mapGetters 辅助函数仅仅是将store中的getter映射到局部计算属性

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 第一种语法，指定需要将哪些getters转换成计算属性（数组方式，表示是一一对应关系，名字是不变的）
    // ...mapGetters(['cartLength']),
    // 第二种语法，指定需要将哪些getters转换成计算属性（对象方式，表示是一一对应关系，名字是可变的）
    ...mapGetters({ length: "cartLength" }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>