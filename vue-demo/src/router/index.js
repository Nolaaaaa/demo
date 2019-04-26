import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import websocket from '@/pages/websocket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: websocket,
    },
  ]
})
