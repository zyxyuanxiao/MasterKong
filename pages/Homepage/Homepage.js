//Homepage.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [{
        src: '../../assets/images/Homepage/专题1@2x.png',
      theTitle: '学食品安全知识赢好礼',
        text: '风靡朋友圈的网红雪糕是否安全，隔夜茶是否健康？快来一起边答边学吧！',
    }, {
        src: '../../assets/images/Homepage/专题二@2x.png',
        theTitle: '学食品安全知识赢好礼',
        text: '风靡朋友圈faffafaf的网红雪糕是否安全，隔夜茶是否健康？快来一起边答边学吧！',
    }, {
        src: '../../assets/images/Homepage/专题三@2x.png',
        theTitle: '学食品安全知识赢好礼',
        text: '风靡朋友圈的网红雪糕是否安全，隔夜茶是否',
    }, {
        src: '../../assets/images/Homepage/专题4@2x.png',
        theTitle: '标题04',
        text: '风靡朋友圈的网红雪糕是否安全，隔夜茶是否',
    }, {
        src: '../../assets/images/Homepage/专题5@2x.png',
        theTitle: '标题05',
        text: '风靡朋友圈的网红雪糕是否安全，隔夜茶是否',
    }, {
        src: '../../assets/images/Homepage/专题6@2x.png',
        theTitle: '标题06',
        text: '风靡朋友圈的网红雪糕是否安全，隔夜茶是否',
    },],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
