// pages/AnswerQuestions/AnswerQuestions.js
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showModal: false,
    exitModal: false
  },
  onLoad: function () {

  },//分享弹窗
  shareBtn: function () {
    this.setData({
      showModal: true
    })
  },//退出弹窗
  exitBtn: function () {
    this.setData({
      exitModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },
  // 分享弹窗关闭
  cancelShare: function () {
    this.setData({
      showModal: false
    })
  },
  // 退出弹窗关闭
  cancelexit: function () {
    this.setData({
      exitModal: false
    })
  }
  ,
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            exitModal: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          exitModal: true
        }
      );
    }
  }
})
