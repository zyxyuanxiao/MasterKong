// pages/TripMasterKong/SpecialGame-index/SpecialGame-index.js
import {
  post,
  get
} from '../../../utils/http'
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
import util from '../../../utils/util1'
import {
  config,
  cmd
} from '../../../config'
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Site: true,
    img_url: config.img_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var aUserInfo = getValue('aUserInfo');
    that = this;
    that.setData({
      aUserInfo: aUserInfo,
    });
    get('/wx/station/' + config.appkey + '/travelStation', {
      openId: aUserInfo.openid,
    }).then(res => {
      if (res.code == 0) {
        that.setData({
          summaryGameRecordsVo: res.summaryGameRecordsVo,
          travelgamesort: res.summaryGameRecordsVo.travelgamesort,
          topStation: res.topStation,
          stationNodesList: res.stationNodesList,
        })
      } else {

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goTripSpecialGame: function(e) {
    var station;
    if(e.currentTarget.dataset.type){
      station=that.data.topStation
    }else{
      var nodeindex=e.currentTarget.dataset.nodeindex;
      var index=e.currentTarget.dataset.index;
      station = that.data.stationNodesList[nodeindex][index];
    }
    navTo("/pages/TripMasterKong/SpecialGame/SpecialGame?summaryGameRecordsVo=" + JSON.stringify(that.data.summaryGameRecordsVo) + "&station=" + JSON.stringify(station));
    
  },
  onBack: function (e) {
    goPage();
  }
})