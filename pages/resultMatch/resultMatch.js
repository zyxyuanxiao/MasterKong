// pages/resultMatch/resultMatch.js
import {
  setValue,
  redirectTo,
  getValue,
  showToast,
  showModal,
  navTo,
  reLanchTo,
  rnd,
  goPage
} from '../../utils/common';
import {
  config,
  cmd
} from '../../config';
var that;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showModal: false
  },
  onLoad: function (options) {
    that=this;
    that.setData({
      winflag: options.winflag,
      sumcount: options.sumcount,
    });
    const aUserInfo = getValue('aUserInfo');
    this.setData({
      aUserInfo: aUserInfo,
      typeId: options.typeId,
    });

  },//分享弹窗
  Btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
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
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  goSpecialGame: function () {
    wx.reLaunch({
      url: '/pages/SpecialGame/SpecialGame?cmd=' + cmd.continuegame + "&typeId=" + that.data.typeId
    })
  },
  goHome: function () {
    wx.reLaunch({
      url: '/pages/Homepage/Homepage'
    })
  },
})
