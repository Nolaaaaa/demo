<template>
  <div class="game-area">
    <canvas id="canvas" style="border:2px solid #67c23a;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: '',
      context: '',
      gameData: '',  // 游戏数据
      curData: '',   // 当前棋子
      location: '',  // 棋子下落的位置
    }
  },
  mounted() {
    // 初始化canvas
    const canvas = document.getElementById("canvas")
    if (canvas === null) return false
    if (canvas.getContext) {
      const context = canvas.getContext('2d')
      this.canvas = canvas
      this.context = context

      // 动态设置棋盘宽高
      this.setCanvas()

      // 画棋盘上的格子、游戏数据初始
      const height = canvas.height/20
      const width = canvas.width/10
      const gameData = new Array()

      for (let i = 0; i < 20; i++) {
        gameData[i] = new Array()
        for (let j = 0; j < 10; j++) {
          gameData[i][j] = 0
          this.gameData = gameData
          // this.updataData()
          if(gameData[i][j] != 0) {
            context.fillStyle = "#67c23a"
            context.fillRect(width * j, height * i, width, height);
          }
        }
      }
    }
  },
  methods: {
    setCanvas() {
      let viewHeight = Math.floor(window.innerHeight||document.documentElement.clientHeight)
      let viewWidth = Math.floor(window.innerWidth||document.documentElement.clientWidth)
      let canvas = this.canvas
      canvas.height = Math.min(viewWidth, viewHeight) - 200
      canvas.width =  canvas.height/2
    },
    updataData() {      
      const curData = [
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ]
      const location = {
        x: 0,
        y: 4
      }      
      for (let i = 0; i < curData.length; i++) {
        for (let j = 0; j < curData[i].length; j++) {
          this.gameData[location.x + i][location.y+j] = curData[i][j]
        }
      }
    }
  }
}
</script>

<style lang="less">
</style>
