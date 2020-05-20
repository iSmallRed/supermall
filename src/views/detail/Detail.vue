<template>
    <div id="detail" class="wrapper">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment"  :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addCart="addToCart"/>
        <!-- <toast :message="message" :show="show"/> -->
    </div>
</template>

<script>
import DetailNavBar from './childCornps/DetailNavBar'
import DetailSwiper from './childCornps/DetailSwiper'
import DetailBaseInfo from './childCornps/DetailBaseInfo'
import DetailShopInfo from './childCornps/DetailShopInfo'
import DetailGoodsInfo from './childCornps/DetailGoodsInfo'
import DetailParamInfo from './childCornps/DetailParamInfo'
import DetailCommentInfo from './childCornps/DetailCommentInfo'
import DetailBottomBar from './childCornps/DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {mapActions} from 'vuex'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast
    },
    mixins: [itemListenerMixin ,backTopMixin],
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
            themeTopYs: [],
            currentIndex: 0,
            // ItemImgListener: null,
            // message: '',
            // show: false
        }
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {

            // 1.获取顶部的图片轮播数据
            this.topImages = res.result.itemInfo.topImages

            const data = res.result;

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            
            //3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
       
            // 6.获取评论的信息 
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            // this.$nextTick(() => {
                // this.themeTopYs = []

                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themeTopYs);
            
            // })
      }),

       getRecommend().then(res => {
            this.recommends = res.data.list
       })
    },

    updated() {

    }, 
    mounted(){
        // let newRefresh = debounce(this.$refs.scroll.refresh,100)

        // this.ItemImgListener = () => {
        //     newRefresh()
        // }

        // this.$bus.$on('itemImgLoad', this.ItemImgListener)
         
    },
    destroyed() {
        this.$bus.$off('itemImgLoad', this.ItemImgListener)
    },
    methods: {
        ...mapActions([
            'addCart'
        ]),
        imageLoad() {
            this.$refs.scroll.refresh()

            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            
            console.log(this.themeTopYs);

           

        },
        titleClick(index) {

            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
            
        },
        contentscroll(position) {
            // 1.获取y值
            const positionY = -position.y

            // 2.positionY和主题中值进行对比
            // [0, 7938, 9120, 9452]
            // positionY 在 0 和 7938 之间,index = 0
            // positionY 在 7938 和 9120 之间,index = 1
            // positionY 在 9120 和 9452 之间,index = 2
            // positionY 超过 9120 值,index = 3

            // for(let i in this.thenmeTopYs){  // i = string
            //     if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            //         console.log(i);
            //     }
            // }
            let length = this.themeTopYs.length
            // for (let i = 0; i < length; i++) {
            //     if(this.currentIndex !== i &&
            //      ((i < length - 1 && positionY >= this.themeTopYs[i] &&
            //       positionY < this.themeTopYs[i+1]) ||
            //        (i === length - 1 && positionY >= this.themeTopYs[i]))){
                       
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex
            //     }
            // }
            for (let i = 0; i < length-1; i++) {
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }


            // backTop是否显示回到顶部
             this.isShowBackTop = (-position.y) > 1000
        },
        addToCart(){
            // 1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            // 2.将商品添加到购物车里
            // this.$store.cartList.push(product)

            // this.$store.commit('addCart', product)
            // 1.
            this.$store.dispatch('addCart', product).then(res => {
                // this.show = true;
                // this.message = res;
                
                // setTimeout(() => {
                //     this.show = false
                //     this.message = ''
                // },1500)
                this.$toast.show(res, 2000)
                // this.$toast.show(res, 2000)
            })
            // 2.
            //  this.addCart(product).then(res => {
            //     console.log(res);
            // })
        },
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height:7.8vh;
    }

    .content {
        height: calc(100% - 44px - 49px);
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>