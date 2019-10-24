<template>
  <div id="app">
    <Tetris/>
  </div>
</template>

<script>
import Tetris from '@/pages/Tetris'
export default {
  name: 'App',
  components: {
    Tetris,
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
