<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkBtnClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate">去计算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      // 方式一：使用高阶函数 find 来实现查找过滤
      return !this.$store.state.cartList.find((item) => !item.checked);
      // 方式二：使用高阶函数 filter 来实现查找过滤
      // return !this.$store.state.cartList.filter((item) => !item.checked).length;
      // 方式三：使用普通的遍历来查找过滤
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) {
      //     return isChecked;
      //   }
      // }
      // return true;
    },
  },
  methods: {
    checkBtnClick() {
      // 
      if (this.isSelectAll) {
        // 全部选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        // 部分或全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  background-color: #eee;
  position: absolute;
  bottom: 49px;
  display: flex;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 15px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 70px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.check-content span {
  margin-left: 10px;
}

.price {
  flex: 1;
  text-align: center;
}

.calculate {
  width: 90px;
  color: #eee;
  text-align: center;
  background-color: tomato;
}
</style>