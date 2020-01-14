<template>
  <div id="home">
    <div @click="toPage('tetris')">五子棋</div>
    <div @click="toPage('card')">抽卡</div>
  </div>
</template>

<script>
export default {
  methods: {
    toPage(to) {
      switch(to) {
        case 'tetris':
          this.$router.push('/tetris')
          break
      
        case 'card':
          this.$router.push('/card')
          break
      }
    }
  }
}
</script>

<style  lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
div:hover {
  cursor: pointer;
}
</style>
