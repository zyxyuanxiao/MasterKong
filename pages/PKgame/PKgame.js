import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue } from '../../utils/common';
import util from '../../utils/util'
import { config } from '../../config'
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
    var that = this;
    SocketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      // this.webSocket()
    });
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
      var onMessage_data = JSON.parse(onMessage.data)
      if (onMessage_data.cmd == 1) {
        that.setData({
          link_list: text
        })
        console.log(text, text instanceof Array)
        // 是否为数组
        if (text instanceof Array) {
          for (var i = 0; i < text.length; i++) {
            text[i]
          }
        } else {

        }
        that.data.allContentList.push({ is_ai: true, text: onMessage_data.body });
        that.setData({
          allContentList: that.data.allContentList
        })
        that.bottom()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    if (!socketOpen) {
      this.webSocket()
    }
  },
  webSocket: function () {
    // 创建Socket
    const openId = getValue('openId');
    SocketTask = wx.connectSocket({
      url: config.ws_url + "/wx/websocket/" + openId,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  submitTo: function (e) {
    let that = this;
    var data = {
      body: that.data.inputValue,
    }
    if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      this.sendSocketMessage(data)
      this.data.allContentList.push({ is_my: { text: this.data.inputValue } });
      this.setData({
        allContentList: this.data.allContentList,
        inputValue: ''
      })

      that.bottom()
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  goback: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    });
  },
  onHide: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    });
  },
  upimg: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: function (res) {
        that.setData({
          img: res.tempFilePaths
        })
        wx.uploadFile({
          url: upload_url,
          filePath: res.tempFilePaths,
          name: 'img',
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '图片发送成功！',
              duration: 3000
            });
          }
        })
        that.data.allContentList.push({ is_my: { img: res.tempFilePaths } });
        that.setData({
          allContentList: that.data.allContentList,
        })
        that.bottom();
      }
    })
  },
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })

  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    this.setData({
      scrollTop: 1000000
    })
  },

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
  sendSocketMessage: function (msg) {
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  SocketTask.send({
    data: JSON.stringify(msg)
  }, function (res) {
    console.log('已发送', res)
  })
},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    });
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