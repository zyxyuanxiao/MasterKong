// pages/NewAddress/NewAddress.js
import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue, showToast, showModal, navTo, reLanchTo, rnd, goPage } from '../../utils/common';
import util from '../../utils/util1'
import { config, cmd } from '../../config'
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Numbertrue: false,
    color:'#F04451',
    province:'',
    city:'',
    area:'',
    show:false
  },
  // 手机号验证
  blurPhone: function (e) {
    var phone = e.detail.value;
    let that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone.length <10){
      this.setData({
        ajxtrue: false,
        color: "#F04451"
      })
    }else{
      if (myreg.test(phone)){
        this.setData({
          ajxtrue: true,
          color: "#FFFFFF"
        })
      }else{
        this.setData({
          ajxtrue: false,
          color: "#F04451 "
        })
      }
    }
  },
  // 表单提交
  formSubmit(e) {
    let that = this
    let val = e.detail.value
    let ajxtrue = this.data.ajxtrue
    if (ajxtrue == true) {
      //表单提交进行
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aUserInfo = getValue('aUserInfo');
    this.setData({
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
  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  chooseAddress: function () {
    console.log("xuanzedizhi")
    var that = this;
    that.setData({
      show: true
    })
  },
  /**导航返回 */
  onBack() {
    goPage();
  },
  goMyPointsDetails: function () {
    navTo('/pages/MyPointsDetails/MyPointsDetails');
  },
  
})