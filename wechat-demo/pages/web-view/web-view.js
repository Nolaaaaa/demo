// pages/web-view/web-view.js
Page({
  data: {
    url: '',
  },
  onShow() {
    this.setData({
      url: 'https://miniapi.yourgenex.com/h5/#/activity/eat-animal/home?token=1111'
    })
  }
})