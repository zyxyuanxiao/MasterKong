//Homepage.js
//获取应用实例
const app = getApp()
import { get } from '../../utils/http'
import { navTo, setValue, getValue, goPage } from '../../utils/common'
import { Music } from '../../utils/music'
import {
  config,
  cmd
} from '../../config'
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
    duration: 1000,
    img_url: config.img_url,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var aUserInfo = getValue('aUserInfo');
    const wxuserInfo = getValue('userInfo');

    this.setData({
      aUserInfo: aUserInfo,
      wxuserInfo: wxuserInfo,
    });
    
    get('/wx/question/' + config.appkey + '/getQuestionType', { }).then(res => {
      var iuQuestionTypeList = res.iuQuestionTypeList;
      if (iuQuestionTypeList) {
        this.setData({
          iuQuestionTypeList: iuQuestionTypeList,
        });
      }
     
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
  goStartChallengePre: function () {
    wx.navigateTo({
      url: '/pages/StartChallengePre/StartChallengePre'
    })
  },
  //专题赛
  goSpecialGame: function (e) {
    // navTo('/pages/SpecialGame/SpecialGame?item=' + JSON.stringify(item))
    var index = e.currentTarget.dataset.index;
    var typeId=e.currentTarget.dataset.type;
    navTo('/pages/SpecialGame/SpecialGame?typeId=' + typeId + "&iuQuestionType=" + JSON.stringify(that.data.iuQuestionTypeList[index]));
    
  },
  goMyDetails: function (e) {
    navTo('/pages/MyDetails/MyDetails');
  },
  goTripMasterKong: function (e) {
    navTo('/pages/TripMasterKong/SpecialGame-index/SpecialGame-index');
  },
  /**导航返回 */
  onBack() {
    goPage();
  },
  goMyPointsDetails: function () {
    navTo('/pages/MyPointsDetails/MyPointsDetails');
  },
})
