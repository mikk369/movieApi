<template>
  <router-view></router-view>
</template>

<style>
@import './../src/assets/styles.css';
</style>



<script>
  import Header from "./views/Header.vue"
  
export default {
  name: 'App',
  components: {
    Header
  }
};
</script>