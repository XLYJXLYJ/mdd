<template>
  <div>
      <router-view name='header'></router-view>
      <router-view name='main' class="main">
      </router-view>
      <router-view name='footer'></router-view>
  </div>
</template>

<script>
import store from '@/vuex/store'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations(["setuserid"]),
  },
  mounted () {
    if(localStorage) {
      if(localStorage.getItem("modelUserid")) {
        this.setuserid(localStorage.getItem("modelUserid"));
      }
    }
  }
}
</script>
<style scoped>
  .main{
    margin-top: 70px;
    min-height: calc(100vh - 194px);
    /* background-color: #f2f2f2; */
  }
</style>


