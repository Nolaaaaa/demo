Page({
  data: { 
  },
  onLoad() {
  },
  getuserinfo(e) {
    wx.setStorageSync('userInfo', e.detail.userInfo)
  }
})