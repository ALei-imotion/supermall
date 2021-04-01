// 给插槽外面加一层div，用于设置样式，也是为了防止在内容被替换时，if-else或class属性不会生效
// 不活跃时显示item-icon插槽内的内容，活跃时显示item-active-icon插槽内的内容
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <!-- <div v-bind:style="this.isActive ? {color: this.activeColor} : {}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  // data() {
  //   return {
  //     isActive: true,
  //   };
  // },
  computed: {
    isActive() {
      // 可以取到当前活跃的路由，看是否和当前item中的路由一致，一致则返回true，否则返回false
      // eg：如果this.$route.path取到的路径为/home,则对于/home路由来说 this.$route.path.indexOf(this.link)返回值为0，其余三个返回值则是-1
      // console.log(this.link) ===> /home /category /cart /profile
      // console.log(this.$route.path) ===> /home
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-top: 5px;
  margin-bottom: 2px;
}

.active {
  color: red;
}
</style>