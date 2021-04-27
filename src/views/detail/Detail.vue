<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";

import { getDetail, Goods } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  created() {
    // 1.保存传入的商品iid
    this.iid = this.$route.params.iid;

    // 2.根据对应的iid请求对应的详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 2.1 先获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    });
  },
};
</script>

<style scoped>
</style>