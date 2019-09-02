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
  rnd
} from '../../utils/common';
import util from '../../utils/util'
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
    ifYellowWin:false,
    yellowScore:0,
    ifBlueWin:false,
    blueScore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    if (options.matchIngSuccess) {
      var matchIngSuccess = JSON.parse(options.matchIngSuccess)
      that.setData({
        matchIngSuccess: matchIngSuccess,
      });
    }
    var blueScore=that.data.blueScore;
    var ifBlueWin = that.data.ifBlueWin;
    var yellowScore = that.data.yellowScore;
    var ifYellowWin = that.data.ifYellowWin;
    var myUser = that.data.matchIngSuccess.myUser;
    if (myUser != null) {
      blueScore += myUser.score;
    }
    var homeUserList = that.data.matchIngSuccess.homeUserList;
    for (var i = 0; i < homeUserList.length; i++) {
      var homeUser = homeUserList[i];
      if (homeUser != null) {
        blueScore += homeUser.score;
      }
    }
    var awayUserList = that.data.matchIngSuccess.awayUserList;
    for (var i = 0; i < awayUserList.length; i++) {
      var awayUser = awayUserList[i];
      if (awayUser != null) {
        yellowScore += awayUser.score;
      }
    }
    if (yellowScore > blueScore){
      ifYellowWin=true;
    } else if (yellowScore < blueScore){
      ifBlueWin=true;
    }
    that.setData({
      ifYellowWin: ifYellowWin,
      yellowScore: yellowScore,
      ifBlueWin: ifBlueWin,
      blueScore: blueScore
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
  randomMatching: function () {
    wx.reLaunch({
      url: '/pages/randomPKgame/randomPKgame?cmd=1'
    })
  },
  goStartChallengePre: function () {
    wx.reLaunch({
      url: '/pages/StartChallengePre/StartChallengePre'
    })
  },
})


