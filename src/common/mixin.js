import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/utils";
import { BACK_POSITION } from "common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.bscroll.refresh, 100);
    this.itemImageListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  // components: {},
  // methods: {},
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // 可以通过this.$refs.bscroll直接访问到scroll组件中的属性以及方法
      this.$refs.bscroll.scrollTo(0, 0, 300);
    },
    listenIsShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION;
    },
  }
}

