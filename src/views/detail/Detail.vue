<template>
  <div id="detail">
    <detail-nav-bar
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll
      class="scroll"
      ref="bscroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin } from "common/mixin";
import { debounce } from "common/utils";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: null,
    };
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    // 1.保存传入的商品iid
    // this.iid = this.$route.params.iid;  // 动态路由方式
    this.iid = this.$route.query.iid; // query传递方式

    // 2.根据对应的iid请求对应的详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
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

      // 2.5 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.6 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 第一次获取，取到的值为undefined，是因为this.$refs.params.$el根本还没有来得及渲染，所以获取不到
      // this.themeTopY = [];
      // this.themeTopY.push(0);
      // this.themeTopY.push(this.$refs.params.$el.offsetTop);
      // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);

      // 第二次获取，取到的值不一定正确，是因为图片还没有全部渲染，高度计算错误
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来的，但是图片依然还没有加载完全（目前获取到的offsetTop是不包含其中的图片高度的）
      //   // 注意：offsetTop的值不对的时候，一般都是因为图片的问题
      //   this.themeTopY = [];
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    // 3.获取详情页最下方的推荐信息
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给this.getThemeTopY赋值(对给this.themeTopY赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);

      this.themeTopY.push(Number.MAX_VALUE);
    });
  },
  destroyed() {
    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    detailImageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.bscroll.scrollTo(0, -this.themeTopY[index], 300);
    },
    contentScroll(position) {
      // 1.获取Y值
      const positionY = -position.y;

      // 2.positionY和各组件距离顶部的值进行比较
      // positionY 在 0 和 this.$refs.params.$el.offsetTop 之间，则令 index=0
      // positionY 在大于等于 this.$refs.params.$el.offsetTop 和 this.$refs.comment.$el.offsetTop 之间，则令 index=1
      // positionY 在大于等于 this.$refs.comment.$el.offsetTop 和 this.$refs.recommend.$el.offsetTop 之间，则令 index=2
      // positionY 大于等于 this.$refs.recommend.$el.offsetTop ，则令 index=3

      let length = this.themeTopY.length;
      // 普通做法
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopY[i] &&
      //       positionY < this.themeTopY[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopY[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.detailNavBar.currentIndex = this.currentIndex;
      //   }
      // }
      // hack做法（条件简化方法）：给themeTopY数组中添加一个假的最大值，这样就可以大大优化判断逻辑
      // 虽然这样会多占据一些内存，但是这样可以优化代码的执行速度（用空间换时间）
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      }
    },
  },
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