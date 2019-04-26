<template>
  <div class="container">
    <!-- 消息展示区 -->
    <div id="chat-area"></div>
  
    <!-- 发送消息区 -->
    <div class="input-container">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="inputValue">
      </el-input>
      <div id="submit" @click="sendMessage()">发送</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chatList: '',
      inputValue: ''
    }
  },

  created() {
    const ws = new WebSocket('ws://121.40.165.18:8080')

    // 检查当前状态
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        // ...
        break;
    
      case WebSocket.OPEN:
        // ...
        break;
    
      case WebSocket.CLOSING:
        // ...
        break;
    
      case WebSocket.CLOSED:
        // ...
        break;
    
      default:
        // this never happens
        break;
    }
    // 获得信息
    getMessage()

    
  },

  methods: {  
    sendMessage() {
      ws.send(inputValue)
    },
    getMessage() {
      // 获取服务器发来的消息
      ws.onmessage = function(e) {
        console.log(e)
      }
    }
  }

}
</script>
