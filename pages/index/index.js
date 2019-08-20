import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue } from '../../utils/common';
import util from '../../utils/util'
import { config } from '../../config'
//index.js
//获取应用实例
const app = getApp()
var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        get('/wx/user/' + config.appkey + '/login', { 'code': code, }).then(res => {
          this.setData({
            openId: res.openid
          })
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    that=this;
  },
  getUserInfo: function(e) {
    console.log(e)
    var userInfo = e.detail.userInfo;
    app.globalData.userInfo = userInfo;
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    })
    setValue('userInfo', userInfo)
    console.log(this.data.userInfo);
    post('/system/aUserInfo/wxRegister', {
      openid: this.data.openId,
      // session_key: o,
      name: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender, //性别 0：未知、1：男、2：女
      province: userInfo.province,
      city:  userInfo.city,
      country: userInfo.country
     })
      .then(res => {
        if (res.code === 0) {
          // if (gameId) {
          //   console.log(gameId)
          //   redirectTo(`/pages/`)
          // } else {
            console.log('去首页');
          redirectTo('/pages/Homepage/Homepage?aUserInfo=' + JSON.stringify(res.aUserInfo));
          }
      })
  }
})
