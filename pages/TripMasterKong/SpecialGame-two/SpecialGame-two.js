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
} from '../../../utils/common';
import {
  config,
  cmd
} from '../../../config';
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Isboolean: 2,
    img_url: config.img_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      winflag: options.winflag,
      sumcount: options.sumcount,
    });
    const aUserInfo = getValue('aUserInfo');
    that.setData({
      aUserInfo: aUserInfo,
    });
    if (options.station) {
      that.setData({
        station: JSON.parse(options.station),
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  goTripGame: function () {
    wx.reLaunch({
      url: '/pages/TripMasterKong/SpecialGame/SpecialGame?cmd=' + cmd.continuegame + "&station=" + JSON.stringify(that.data.station)
    })
  },
  goHome: function () {
    wx.reLaunch({
      url: '/pages/Homepage/Homepage'
    })
  },
  goNextGame: function () {
    goPage(1, "/pages/TripMasterKong/SpecialGame-index/SpecialGame-index");
  },
  /**导航返回 */
  onBack() {
    goPage();
  },
})