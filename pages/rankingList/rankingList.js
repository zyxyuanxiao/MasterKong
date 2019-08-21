//index.js
//获取应用实例
const app = getApp()

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

  /**
   * 组件的方法列表
   */
  methods: {

  },
  TheTotalListClick: function (e) {
    console.log('11111')
    this.setData({
      isChecked: true,
      isCheckedTwo:false
    })
  },
  TotalListClick: function (e) {
    this.setData({
      isChecked: false,
      isCheckedTwo: true
    })
  }
})