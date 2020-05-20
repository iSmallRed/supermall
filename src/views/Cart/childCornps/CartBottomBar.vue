<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-botton" @click.native="checkClick" :is-checked="isSekectAll"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSekectAll() {
      //  return !(this.$store.state.cartList.filter(item => item.checked).length)
     if (this.$store.state.cartList.length === 0) return false
     return !this.$store.state.cartList.find(item => !item.checked)
    } 
  },
  methods: {
    checkClick() {
      if (this.isSekectAll) { //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    //this.$store.state.cartList.forEach(item => !item.checked)
    calcClick() {
      if (!this.isSekectAll) {
         this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    /* height: 40px; */
    /* background-color: red; */
    /* position: relative; */
    /* line-height: 40px; */

    /* display: flex; */
        width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-botton {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: deeppink;
    color: #fff;
    text-align: center;
  }
</style>