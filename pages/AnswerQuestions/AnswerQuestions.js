// pages/AnswerQuestions/AnswerQuestions.js
import { post, get } from '../../utils/http'
import { setValue, redirectTo, getValue, showToast, showModal, navTo } from '../../utils/common';
import util from '../../utils/util'
import { config, cmd } from '../../config'
var that;
var frameBuffer_Data, session, SocketTask;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prepariCountdown:3,
    answerCountdown: 15,
    showView: true,
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if (options.cmd) {
      that.setData({
        cmd: options.cmd,
    });
    }
    if (options.matchIngSuccess) {
      that.setData({
        matchIngSuccess: JSON.parse(options.matchIngSuccess)
    });
    }
    // switch (data.cmd) {
    //   case cmd.randomPK:
    //     that.sendSocketMessage();

    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    SocketTask = app.globalData.SocketTask;
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
          this.sendSocketMessage({ status: cmd.randomPK });
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
          that.setData({
            enemyUser: data.enemyUser
          });
          navTo('/pages/AnswerQuestions/AnswerQuestions?cmd=7');
          break;
        default:
          console.log('开始答题了')
          break;
      }
    });

    that.countdown();
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

  },//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
  sendSocketMessage: function (msg) {
    console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    SocketTask.send({
      data: JSON.stringify(msg)
    }, function (res) {
      console.log('已发送', res)
    })
  }, countdown: function () {
    var that = this
    var prepariCountdown = this.data.prepariCountdown
    if (prepariCountdown == -1) {
      // that.setData({
      //   prepariCountdown: 3
      // })
      that.setData({
        showView: false,
      })
      return
    }
    var time = setTimeout(function () {
      that.setData({
        prepariCountdown: prepariCountdown - 1,
      })
      that.countdown(that)
    }, 1000)
  }, 
  showMessageDialog: function() {
    this.setData({
      showModal: true
    })
  },  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  }
})