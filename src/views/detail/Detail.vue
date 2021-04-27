<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  created() {
    // 1.保存传入的商品iid
    this.iid = this.$route.params.iid;

    // 2.根据对应的iid请求对应的详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 2.1 先获取顶部轮播图数据
      this.topImages = res.result.itemInfo.topImages;
    });
  },
};
</script>

<style scoped>
</style>