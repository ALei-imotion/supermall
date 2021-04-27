<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll class="scroll" ref="bscroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
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
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.4 获取商品的详情信息
      this.detailInfo = data.detailInfo;
    });
  },
  methods: {
    detailImageLoad() {
      this.$refs.bscroll.refresh();
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.scroll {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>