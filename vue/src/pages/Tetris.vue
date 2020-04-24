<template>
  <div class="game-area">
    <canvas id="canvas" style="border: 4px solid #458B00;"></canvas>
  </div>
</template>

<script>
import {square,squareColor} from '@/assets/js/Tetris/square.js'
export default {
  data() {
    return {
      canvas: '',
      context: '',
      gameData: '',  // 游戏数据
      curData: [],   // 当前棋子
      position: { x: 0,y: 0 }   ,  // 棋子下落的位置
    }
  },
  mounted() {
    const canvas = document.getElementById("canvas")
    if (canvas === null) return false
    if (canvas.getContext) {
      const context = canvas.getContext('2d')
      this.canvas = canvas
      this.context = context

      this.setCanvas()

      const gameData = new Array()
      for (let i = 0; i < 20; i++) {
        gameData[i] = new Array()
        for (let j = 0; j < 10; j++) {
          gameData[i][j] = 0
        }
      }
      this.gameData = gameData  

      this.randomSquare()
      this.squareMove()
    }
  },
  methods: {
    // 动态设置游戏区宽高
    setCanvas() {
      const viewHeight = Math.floor(window.innerHeight||document.documentElement.clientHeight)
      const viewWidth = Math.floor(window.innerWidth||document.documentElement.clientWidth)
      const canvas = this.canvas
      canvas.height = Math.min(viewWidth, viewHeight) - 140
      canvas.width =  canvas.height/2
    },

    // 更新游戏数据
    updataData() {  
      const gameData =  this.gameData
      const canvas = this.canvas
      const context = this.context
      const height = canvas.height/20
      const width = canvas.width/10  
      const position = this.position
      const curData = this.curData

      for (let i = 0; i < curData.length; i++) {
        for (let j = 0; j < curData[i].length; j++) {
          if(this.checkValid(i,j) && curData[i][j] !== 0) {
            gameData[position.y + i][position.x + j] = curData[i][j] 
          } else if(!this.checkValid(i,j)) {
            this.pauseGame()
            this.nextSquare()
          }
        }
      }

      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
          if(gameData[i][j] != 0) {
            context.fillStyle = squareColor[gameData[i][j]]
            context.fillRect(width * j, height * i, width, height)
            context.strokeStyle = "white"
            context.strokeRect(width * j, height * i, width, height)
          } else {
            context.fillStyle = "white"
            context.fillRect(width * j, height * i, width, height)
          }
        }
      }
    },
    
    // 随机生成方块和位置
    randomSquare() {
      let pos = random(0,6)
      let kind = random(0,6)
      let index = random(0,3)
      this.curData = square[kind][0]
      this.position.x = pos
      function random(min,max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
    },

    // 下落前清除原来位置的方块
    clearOld() {
      let curData = this.curData
      let position = this.position
      let gameData = this.gameData
      for (let i = 0; i < curData.length; i++) {
        for (let j = 0; j < curData[i].length; j++) {
          gameData[position.y + i][position.x + j] = 0
        }
      }
    },

    // 计算一个值在数组中的个数
    count(arr,num){
      var i = 0;
      arr.find((item) => {
        item === num ? i++ : ''
      })
      return i
    },

    // 方块下落
    squareMove() {
      let curData = this.curData
      if(curData.length > 0) {
        for (let i = 3; i >= 0; i--) {
          let arr = curData[i]
          if(this.count(arr,0) == arr.length) curData.splice(i,1)
        }
      }

      this.timer = setInterval(()=>{
        this.clearOld()
        this.position.y += 1
        this.updataData()
      },100)
    },
    // 暂停游戏
    pauseGame() {
      let timer = this.timer
      if (timer) {
        clearInterval(timer)
      }
    },
    nextSquare() {
      // this.curData = []
      this.position = { x: 0,y: 0 }
      this.randomSquare()
      this.squareMove()
    },
    // 检查数据是否有效
    checkValid(i,j) {
      let gameData = this.gameData
      let cur = this.curData
      let pos = this.position
      if (pos.x + j < 0) {
        return false
      } else if (pos.y + i < 0) {
        return false
      }else if (pos.y + i >= gameData.length) {
        return false
      }else if (pos.x + j > gameData[0].length) {
        return false
      }else if (gameData[pos.y + i][pos.x + j] > 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
</style>
