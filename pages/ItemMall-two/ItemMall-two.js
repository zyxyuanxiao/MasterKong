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
  data: {
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    showModal: false,
    exchangeSuccess:false,
    backgroundcolor: 'rgba(31, 204, 102, 1)',
    img_url: config.img_url,
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
   
    var num = this.data.num;
    if ((num+1) * this.data.good.marketprice > this.data.bUserScoreVo.canexchangscore){
      return;
    }
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },//弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  cancel: function () {
    this.setData({
      showModal: false
    })
  }
  ,
  powerDrawer: function (e) {

    var currentStatu = e.currentTarget.dataset.statu;

    this.util(currentStatu)

  },

  util: function (currentStatu) {

    var animation = wx.createAnimation({

      duration: 200,

      timingFunction: "linear",

      delay: 0

    });

    this.animation = animation;

    animation.opacity(0).rotateX(-100).step();

    this.setData({

      animationData: animation.export()

    })

    setTimeout(function () {

      animation.opacity(1).rotateX(0).step();

      this.setData({

        animationData: animation

      })

      if (currentStatu == "close") {

        this.setData(

          {

            showModalStatus: false

          }

        );

      }

    }.bind(this), 200)

    if (currentStatu == "open") {

      this.setData(

        {

          showModalStatus: true

        }

      );

    }

  },
  onLoad :function(options){
    that=this;
    if (options.bUserScoreVo) {
      that.setData({
        bUserScoreVo: JSON.parse(options.bUserScoreVo),
      });
    }
    if (options.good) {
      that.setData({
        good: JSON.parse(options.good),
      });
    }
  },
  exchangeGood: function (options) {
    var aUserInfo = getValue('aUserInfo');
    if (that.data.num * this.data.good.marketprice <= this.data.good.canexchangscore){
    var exchangedscore= that.data.num * this.data.good.marketprice;
    get('/wx/gameShop/' + config.appkey + '/exchangeGood', {
       openId: aUserInfo.openid,
      exchangedscore: exchangedscore,
      goodid: that.data.good.id,
      num: that.data.num, }).then(res => {
      var bUserScoreVo = res.bUserScoreVo;
      if(res.code =='0'){
        if (bUserScoreVo) {
          that.setData({
            bUserScoreVo: bUserScoreVo,
            showModal: false
          });
        }
        if (that.data.num * that.data.good.marketprice > that.data.good.canexchangscore){
          that.setData({
            backgroundcolor: 'rgba(90, 90, 102, 1)'
          });
        }
      }
    });
    }
  },
  /**导航返回 */
  onBack() {
    goPage();
  },
  goMyPointsDetails: function () {
    navTo('/pages/MyPointsDetails/MyPointsDetails');
  },
})  