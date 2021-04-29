import { debounce } from "common/utils";

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

