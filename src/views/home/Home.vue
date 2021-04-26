<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>

    <scroll
      class="scroll"
      ref="bscroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>

      <tab-control
        class="home-tab-control"
        :titles="['流行', '新款', '精选']"
        @tabItemClick="tabClick"
      ></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 首页组件
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommendView from "./childComponents/HomeRecommendView";
import HomeFeatureView from "./childComponents/HomeFeatureView";

// 方法以及额外的内容
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this._getHomeMultidata();
    // 2.请求商品数据
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  mounted() {
    // 3.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    //   this.$refs.bscroll.refresh();
    // });

    // 3.监听item中图片加载完成
    const refresh = this.debounce(this.$refs.bscroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
    },
    backClick() {
      // 可以通过this.$refs.bscroll直接访问到scroll组件中的属性以及方法
      // console.log(this.$refs.bscroll.message);
      this.$refs.bscroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      this._getHomeGoods(this.currentType);
    },
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    /**
     * 网络请求相关的方法
     */
    _getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 方法一
        // for (let n of res.data.list) {
        //   this.goods[type].list.push(n);
        // }

        // 方法二
        // ...可以将数组中的数据解析遍历，并一个一个的取出来
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.bscroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.home-tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>