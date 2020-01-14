<template>
  <div id="home">
    <el-button @click="toPage('tetris')">俄罗斯方块</el-button>
    <el-button @click="toPage('card')">抽卡</el-button>
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
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 40px;
  .el-button {
    margin: 10px;
  }
}
</style>
