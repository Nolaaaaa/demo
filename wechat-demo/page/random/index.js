// page/random/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          width: res.windowWidth / 3,
          height: res.windowHeight / 5
        })
      }
    })
  },

  onReady: function () {
    this.randomBlock(10, this.data.endIndex)
  },
  
  /**
   * 随机选择一个内容，可指定最终位置
   * @times: 跳动次数（选填，初始值为 9）
   * @endIndex: 最终位置（选填）
   */
  randomBlock(times = 9, endIndex) {
    let randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    let i = 0, timeId = setInterval(() => {
      this.setData({
        curIndex: endIndex ? i == (times + 1) ? endIndex : randomNum(0, 14) : randomNum(0, 14)
      })
      i > times ? clearInterval(timeId) : i++
    }, 200)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})