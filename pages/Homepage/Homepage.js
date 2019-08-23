//Homepage.js
//获取应用实例
const app = getApp()
import { get } from '../../utils/http'
import { navTo, setValue, getValue, goPage } from '../../utils/common'
import { Music } from '../../utils/music'
const music = new Music()
var that;
Page({
  data: {
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
  onLoad: function (options) {
    var aUserInfo = JSON.parse(options.aUserInfo);
    const wxuserInfo = getValue('userInfo');

    this.setData({
      aUserInfo: aUserInfo,
      wxuserInfo: wxuserInfo,
    });
    that = this;
  },
  goRankView: function () {
    wx.navigateTo({
      url: '/pages/rankingList/rankingList'
    })
  },
  moreMenuview: function () {
    wx.navigateTo({
      url: '/pages/Moremenu/Moremenu'
    })
  },
  goStartChallenge: function () {
    wx.navigateTo({
      url: '/pages/StartChallengePre/StartChallengePre'
    })
  },
})
