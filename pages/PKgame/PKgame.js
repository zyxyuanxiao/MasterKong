import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue, showToast, showModal, navTo } from '../../utils/common';
import util from '../../utils/util'
import { config, cmd } from '../../config'
var that;
var frameBuffer_Data, session, SocketTask;
var app = getApp();
var socketOpen = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aUserInfo=getValue('aUserInfo');
    that=this;
    that.setData({
      aUserInfo: aUserInfo,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
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

})