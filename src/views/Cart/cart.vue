<template>
  <div id="cart" class="wrapper">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" :probeType="3" :pullUpLoad="true" ref="scroll">
    <!-- 商品列表 -->
    <cart-list />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childCornps/CartList";
import CartBottomBar from "./childCornps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.content {
  margin-top: 44px;
  height: calc(100vh - 44px - 84px -44px);
  overflow: hidden;
}

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>