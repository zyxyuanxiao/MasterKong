// pages/MyDetails/MyDetails.js
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
    img_url: config.img_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aUserInfo = getValue('aUserInfo');
    this.setData({
      aUserInfo: aUserInfo,
    });

    get('/wx/gameInfo/' + config.appkey + '/getUserScore', { 'openId': aUserInfo.openid, }).then(res => {
      var bUserScoreVo = res.bUserScoreVo;
      if (bUserScoreVo){
        this.setData({
          bUserScoreVo: bUserScoreVo,
        });
      }
    })
    that = this;
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
    /**导航返回 */
  onBack() {
    goPage();
  },
  goMyPoints: function () {
    navTo('/pages/MyPoints/MyPoints?bUserScoreVo=' + JSON.stringify(that.data.bUserScoreVo));
  }, 
  goWrongTopic: function (e) {
    navTo('/pages/WrongTopic/WrongTopic');
  },
})