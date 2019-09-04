// pages/WrongTopic/WrongTopic.js
import {
  post,
  get
} from '../../utils/http'
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
import util from '../../utils/util1'
import {
  config,
  cmd
} from '../../config'
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: true,
    isCheckedTwo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.getTodayQ();
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
  TheTotalListClick: function (e) {
    that.setData({
      isChecked: true,
      isCheckedTwo: false
    })
    if (!that.data.currentQ) {
      that.getTodayQ();
    }
  },
  TotalListClick: function (e) {
    that.setData({
      isChecked: false,
      isCheckedTwo: true
    })
    var aUserInfo = getValue('aUserInfo');
    if (!that.data.allQuestion){
      get('/wx/gameInfo/' + config.appkey + '/getWrongTopic', { 'openId': aUserInfo.openid, 'type': '2' }).then(res => {
        var allQuestion = res.allQuestion;
        if (allQuestion) {
          this.setData({
            allQuestion: allQuestion,
          });
        }
      })
    }
  },
  getTodayQ: function (e) {
    var aUserInfo = getValue('aUserInfo');
    get('/wx/gameInfo/' + config.appkey + '/getWrongTopic', { 'openId': aUserInfo.openid, 'type': '1' }).then(res => {
      var currentQ = res.currentQ;
      if (currentQ) {
        this.setData({
          currentQ: currentQ,
          allQuestion:''
        });
      }
    });
  }
})