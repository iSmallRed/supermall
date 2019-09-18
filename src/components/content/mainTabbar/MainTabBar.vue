<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="deeppink">
			  <img slot="item-icon" src="~assets/img/tabbar/home.png">
			  <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png">
			  <div slot="item-text">首页</div>
			</tab-bar-item>
      <tab-bar-item path="/classify" activeColor="deeppink">
				<img slot="item-icon" src="~assets/img/tabbar/category.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.png">
				<div slot="item-text">分类</div>
				</tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deeppink">
				<img slot="item-icon" src="~assets/img/tabbar/cart.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.png">
			  <div slot="item-text">购物车</div>
				</tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deeppink">
				<img slot="item-icon" src="~assets/img/tabbar/profile.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.png">
				<div slot="item-text">我的</div>
			</tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
    name: 'MainTabBar',
    components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
img{
		height: 24px;
		width: 24px;
		margin-top: 3px;
		vertical-align: middle;
	}
</style>