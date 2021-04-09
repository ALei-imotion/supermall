<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>

    <tab-control class="home-tab-control" :titles="['流行','新款','精选']"></tab-control>
    
    <ul>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
      <li>wasd</li>
    </ul>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

// 首页组件
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommendView from "./childComponents/HomeRecommendView";
import HomeFeatureView from "./childComponents/HomeFeatureView";

// 方法以及额外的内容
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
}
</style>