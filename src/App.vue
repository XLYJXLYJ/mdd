<template>
  <div id="app">
    <!-- 顶部导航 -->
    <!-- <topNav></topNav>
    <main> -->
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- </main> -->
    <!-- 底部导航 -->
    <!-- <footerNav></footerNav> -->
  </div>
</template>

<script>
// import topNav from '@/components/header'
// import footerNav from '@/components/footer'
export default {
  name: 'App',
  components: {
    // topNav,
    // footerNav
  }
}
</script>

<style lang="less">
  @import "./assets/css/reset.less";
  @import "./assets/css/common.less";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    min-height: 100%;
    position: relative;
    main{
      background: #eee;
      margin-top: 70px;
      // height: 500px;
    }
  }
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .5s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
</style>
