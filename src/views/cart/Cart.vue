<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="middle">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";  // mapGetters 辅助函数仅仅是将store中的getter映射到局部计算属性

export default {
  name: "Cart",
  components: {
    NavBar,
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
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>