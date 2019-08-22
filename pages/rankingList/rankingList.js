//index.js
//获取应用实例
import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue } from '../../utils/common';
import util from '../../utils/util'
import { config } from '../../config'
const app = getApp()
var that;
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: true,
    isCheckedTwo: false
  },
  onLoad: function () {
    that = this;
    that.getTimespaceCharts();
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  TheTotalListClick: function (e) {
    that.setData({
      isChecked: true,
      isCheckedTwo:false
    })
    that.getTimespaceCharts();
  },
  TotalListClick: function (e) {
    that.setData({
      isChecked: false,
      isCheckedTwo: true
    })
  },
  getTimespaceCharts: function () {
    const openId=getValue('openId');
    get('/wx/charts/' + config.appkey + '/getTImespaceCharts', { 'openId': openId, }).then(res => {
      if(res.code == 0){
      that.setData({
        'chartsData':res.data,
        'myChart': res.ownData[0],
      })
      }
    })
  }
})