<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import Home from '@/pages/home'
export default {
  name: 'App',
  components: { Home },
  methods: {}
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
