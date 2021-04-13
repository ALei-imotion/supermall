<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      message: "imotion",
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    /**
     * 尽量避免使用document.querySelector()去获取元素，因为这种方法默认获取的是第一个出现该名字的元素
     * 如果有多个地方出现了重名的情况，那么通过这种方式获取的元素就不一定是我们想要的那个元素
     */
    // this.scroll = new BScroll(document.querySelector(".wrapper"));

    /**
     * ref如果是绑定在组件中，那么通过 this.$refs.refname 获取到的是一个组件对象
     * ref如果是绑定在普通的元素中，那么通过 this.$refs.refname 获取到的是一个元素对象
     */
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
    });

    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>