//获取应用实例
// start雷达图初始化数据
var sys = wx.getSystemInfoSync();
var windowWidth = sys.windowWidth;
var mW = sys.windowWidth * 0.80;
var mH = sys.windowHeight * 0.80;
var mdData = [['攻击', 80], ['防御', 60], ['推进', 20], ['辅助', 30], ['智力', 40], ['力量', 30]];
var mdData2 = [['攻击', 60], ['防御', 20], ['推进', 80], ['辅助', 50], ['智力', 60], ['力量', 20]];
var mData = [];
var mData2 = [];
var mCount = mdData.length; //边数
var mCenter = ''; //中心点
var mRadius = ''; //半径(减去的值用于给绘制的文本留空间)
var mAngle = Math.PI * 2 / mCount; //角度
var mCtx = null;
var mColorPolygon = '#000000'; //多边形颜色
var mColorLines = '#5e5e5e'; //伞骨颜色
var mColorText = '#000000';//文字颜色
var Interval = '';
var lineInterval = '';
var totalTime = 1000;//总执行时间
var spaceTime = 10;//每隔多久执行一次
var speed = spaceTime / totalTime;//每执行一次完成的进度百分比
var precent = 0;//当前完成的进度百分比
var precent2 = 0;
var lineprecent = 0;
var ctx1 = wx.createCanvasContext('radarcanvas1');
var ctx2 = wx.createCanvasContext('radarcanvas2');
var ctx3 = wx.createCanvasContext('radarcanvas3');
var ctx4 = wx.createCanvasContext('radarcanvas4');
var ctx5 = wx.createCanvasContext('radarcanvas5');
var topText = ["攻击", "防御", "辅助", "推进", "智力", "力量"];
var allSpaceTime = 50;//线程执行间隔时间
Page({
  data: {
    canvasW: mW * 2,
    canvasH: mH * 1.2,
  },
  onLoad: function (options) {
    var m = [];
    for (var i = 0; i < mCount; i++) {
      m[(i + 6) % mCount] = mdData[i];
    }
    mData = m;//内在

    var m2 = [];
    for (var i = 0; i < mCount; i++) {
      m2[(i + 6) % mCount] = mdData2[i];
    }
    mData2 = m2;//外在
    mCenter = this.rpx(mW); //中心点
    mRadius = mCenter - this.rpx(85); //半径(减去的值用于给绘制的文本留空间)
  },
  // 页面显示
  onShow: function () {
    var that = this;
    that.radarcanvas1();//雷达图文字+边框
    that.clickCanvas();//调用画雷达图
  },

  // 单位转换
  rpx: function (param) {

    if (windowWidth == 0) {
      wx.getSystemInfo({
        success: function (res) {
          windowWidth = res.windowWidth;
        }
      });
    }
    return Number((windowWidth / 750 * param).toFixed(2));
  },

  //画雷达
  clickCanvas: function () {
    var that = this;
    precent = 0;
    precent2 = 0;
    lineprecent = 0;
    clearInterval(that.Interval);
    clearInterval(that.lineInterval);
    ctx1.clearRect(0, 0, mW, mH);
    ctx2.clearRect(0, 0, mW, mH);
    ctx3.clearRect(0, 0, mW, mH);
    ctx4.clearRect(0, 0, mW, mH);
    ctx5.clearRect(0, 0, mW, mH);
    var outColor = "#FFB6C1";  // 外层的颜色
    var innerColor = "#FFD39B";  // 内层的颜色
    that.lineInterval = setInterval(function () {//渐进画伞骨
      if (lineprecent <= 1) {
        that.drawLines(ctx2);
        ctx2.draw(0, 0, 500, 500);
      } else {
        clearInterval(that.lineInterval);
      }
    }, spaceTime - 20);

    setTimeout(function () {//渐进画数据区域块
      that.Interval = setInterval(function () {
        if (precent <= 1) {
          that.drawRegion(ctx3, outColor);
          that.drawRegion2(ctx4, innerColor);
        } else {
          clearInterval(that.Interval);
        }
      }, spaceTime - 20);
    }, 10);
    that.drawPhoto(ctx5);
    console.info("我点击canvas")
  },
  radarcanvas1: function () {
    var that = this;
    const ctx1 = wx.createCanvasContext('radarcanvas1');
    precent = 0;
    lineprecent = 0;
    that.drawPolygon(ctx1);//画伞架
    that.drawText(ctx1);//画文字
    ctx1.draw(0, 0, 500, 500);
  },

  // 绘制多边伞架
  drawPolygon: function (ctx) {
    ctx.save();
    ctx.setStrokeStyle(mColorPolygon);
    var r = mRadius / mCount; //单位半径
    //画8个圈
    for (var i = 0; i < mCount; i++) {
      ctx.beginPath();
      var currR = r * (i + 1); //当前半径
      //画8条边
      for (var j = 0; j < mCount; j++) {
        var x = mCenter + currR * Math.cos(mAngle * j);
        var y = mCenter + currR * Math.sin(mAngle * j);

        ctx.lineTo(x, y);
      }
      ctx.closePath()
      ctx.stroke();
      //ctx.draw(0, 0, 500, 500);
    }
    //ctx.restore();
  },

  //绘制伞骨
  drawLines: function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.setStrokeStyle(mColorLines);
    for (var i = 0; i < mCount; i++) {
      var x = mCenter + mRadius * Math.cos(mAngle * i) * lineprecent;
      var y = mCenter + mRadius * Math.sin(mAngle * i) * lineprecent;
      ctx.moveTo(mCenter, mCenter);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    //ctx.restore();
    //ctx.draw(0, 0, 500, 500);
    var oldPrectet = lineprecent;
    lineprecent = lineprecent + speed;
    if (oldPrectet < 1 && lineprecent > 1) {
      lineprecent = 1;
    }
  },

  //绘制顶点文本
  drawText: function (ctx) {
    ctx.save();
    var fontSize = mCenter / 12 * 1;
    // ctx.font = fontSize + 'px Microsoft Yahei';
    ctx.setFontSize(fontSize);
    ctx.setFillStyle(mColorText);
    for (var i = 0; i < mCount; i++) {
      var x = mCenter + mRadius * Math.cos(mAngle * i);
      var y = mCenter + mRadius * Math.sin(mAngle * i);
      //通过不同的位置，调整文本的显示位置
      if (mAngle * i >= 0 && mAngle * i < Math.PI / 2) {
        ctx.fillText(mData[i][0], x + 15, y + fontSize - 5);
      } else if (mAngle * i == Math.PI / 2) {
        ctx.fillText(mData[i][0], x - 10, y + fontSize + 10);
      } else if (mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI) {
        ctx.fillText(mData[i][0], x - 40, y + fontSize - 10);
      } else if (mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2) {
        ctx.fillText(mData[i][0], x - 15, y - 10);
      } else {
        ctx.fillText(mData[i][0], x, y - 8);
      }
    }
    //ctx.restore();
    //ctx.draw(0, 0, 500, 500);
  },

  //绘制用户圆形头像
  drawPhoto: function (ctx) {
    var that = this;
    ctx.save();
    var userInfo = wx.getStorageSync('userInfo')
    that.circleImg(ctx, userInfo.avatarUrl, mCenter - 32, mCenter - 32, 32);
    //ctx5.stroke();
    //ctx5.restore();
    ctx5.draw(0, 0, mW, mH);
  },
  circleImg: function (ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
  },

  //绘制数据区域 外在
  drawRegion: function (ctx, outColor) {
    ctx.save();
    ctx.beginPath();
    for (var i = 0; i < mCount; i++) {
      var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100 * precent;
      var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100 * precent;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.save();
    ctx.setFillStyle(outColor);
    ctx.fill();
    ctx.draw(0, 0, 500, 500);
    var oldPrectet = precent;
    precent = precent + speed;
    if (oldPrectet < 1 && precent > 1) {
      precent = 1;
    }
  },

  //绘制数据区域2 内心
  drawRegion2: function (ctx, innerColor) {
    ctx.save();
    ctx.beginPath();
    for (var i = 0; i < mCount; i++) {
      var x = mCenter + mRadius * Math.cos(mAngle * i) * mData2[i][1] / 100 * precent2;
      var y = mCenter + mRadius * Math.sin(mAngle * i) * mData2[i][1] / 100 * precent2;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.save();
    ctx.setFillStyle(innerColor);
    ctx.fill();
    ctx.draw(0, 0, 500, 500);
    var oldPrectet = precent2;
    precent2 = precent2 + speed;
    if (oldPrectet < 1 && precent2 > 1) {
      precent2 = 1;
    }
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
  }
})
