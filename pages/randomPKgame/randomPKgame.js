import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue, showToast, showModal, navTo } from '../../utils/common';
import util from '../../utils/util'
import { config, cmd } from '../../config'
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
    var aUserInfo = getValue('aUserInfo');
    that = this;
    that.setData({
      aUserInfo: aUserInfo,
    });
    if (options.cmd) {
      that.setData({
        cmd: options.cmd,
      });
    }
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
      const data = JSON.parse(onMessage.data);
      if (data.code === 1) {
        showToast(data.msg)
        return
      }
      console.log(data.cmd);
      switch (data.cmd) {
        case cmd.randomPK:
          // this.createGame(data.data);
          this.sendSocketMessage({ cmd: cmd.randomPK });
          break;
        case cmd.join:
          // this.joinGame(data.data.join);
          break;
        case cmd.start:
          // this.startGame();
          break;
        case cmd.setDifficult:
          // showToast('设置难度成功', 'success')
          break;
        case cmd.robot:
          navTo('/pages/AnswerQuestions/AnswerQuestions?cmd=7&matchIngSuccess=' + JSON.stringify(data.matchIngSuccess) + '&uQuestions=' + JSON.stringify(data.uQuestions));
          break;
        default:
          console.log('开始答题了')
          break;
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    if (!socketOpen) {
      this.webSocket()
      app.globalData.SocketTask = SocketTask;
    }
  },
  webSocket: function () {
    // 创建Socket
    const openId = getValue('openId');
    SocketTask = wx.connectSocket({
      url: config.ws_url + "/wx/websocket/" + openId + "/1/" + that.data.cmd,
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
  goback: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    });
  },
  onHide: function () {

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
    // SocketTask.close(function (close) {
    //   console.log('关闭 WebSocket 连接。', close)
    // });
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