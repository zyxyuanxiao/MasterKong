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
var choiceClass = ['HaveChoice', 'Selected', 'wrong'];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startspecial: true,
    getready: false,
    starting: false,
    prepariCountdown: 3,
    answerCountdown: 15,
    gamenumber: 0,
    choiceClass: ['HaveChoice', 'Selected', 'wrong'],
    answerA: choiceClass[0],
    answerB: choiceClass[0],
    answerC: choiceClass[0],
    answerD: choiceClass[0],
    questions: [],
    kClientAnswerDto: {},
    kClientAnswerArr: [],
    sumcount: 0,
    winflag:true,
    BackgroundImg:'',
    img_url: config.img_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    const aUserInfo = getValue('aUserInfo');
    this.setData({
      aUserInfo: aUserInfo,
      typeId: options.typeId,
      thumbs: options.thumbs,
    });
    get('/wx/question/' + config.appkey + '/special', {
      'typeId': options.typeId,
       openId: aUserInfo.openid,
    }).then(res => {
      if(res.code == 0){
      that.setData({
        questions: res.questions,
        dailyGameRecordsVo: res.dailyGameRecordsVo,
        summaryGameRecordsVo: res.summaryGameRecordsVo,
      })
      }else{

      }
    });
    if (options.cmd){
      if (cmd.continuegame == options.cmd){
        that.getready();
      }
    }

    if (options.iuQuestionType) {
      that.setData({
        iuQuestionType: JSON.parse(options.iuQuestionType)
      })
    }
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
  getready: function() {
    that.setData({
      startspecial: false,
      getready: true,
    });
    that.countdown();
  },
  countdown: function() {
    var that = this
    var prepariCountdown = this.data.prepariCountdown
    if (prepariCountdown == 0) {
      that.setData({
        getready: false,
        starting: true,
      });
      //答题倒计时
      that.answerCountdown();
      return
    }
    var time = setTimeout(function() {
      that.setData({
        prepariCountdown: prepariCountdown - 1,
      })
      that.countdown(that)
    }, 1000);
  },
  //答题倒计时
  answerCountdown: function() {
    that = this
    var answerCountdown = this.data.answerCountdown
    if (answerCountdown == 0 || that.data.myselect) {
      //失败
        if(!that.data.winflag){
        //分享弹框按钮显示
        that.shareBtn();
        return;
      }
      that.cleanOldData();
      return
    }
    var time = setTimeout(function() {
      that.setData({
        answerCountdown: answerCountdown - 1,
      })
      that.answerCountdown(that);
    }, 1000)
  },
  //选择选项触发事件 
  selectChoose: function(e) {
    //答过题不予再次点击
    if (that.data.myselect) {
      return;
    }
    that.setData({
      myselect: true,
    });
    var useranswer = e.currentTarget.dataset.answer;
    //局数
    var gamenumber = that.data.gamenumber
    const kClientAnswerDto = {};
    // kClientAnswerDto.gameCount = gamenumber;
    kClientAnswerDto.questionId = that.data.questions[gamenumber].id;
    kClientAnswerDto.useranswer = useranswer;
    if (that.data.questions[gamenumber].answer == useranswer) {
      kClientAnswerDto.yes = true;
      kClientAnswerDto.score = (that.data.answerCountdown * (20));
    } else {
      kClientAnswerDto.yes = false;
      kClientAnswerDto.score = 0;
      that.setData({
        winflag: false,
      });
    }
    var sumcount = that.data.sumcount;
    var kClientAnswerArr = that.data.kClientAnswerArr;
    kClientAnswerArr.push(kClientAnswerDto);
    sumcount += kClientAnswerDto.score
    that.setData({
      kClientAnswerDto: kClientAnswerDto,
      kClientAnswerArr: kClientAnswerArr,
      myselect: true,
      sumcount: sumcount,
    });
    if (useranswer == 'A') {
      if (that.data.questions[gamenumber].answer == useranswer) {
        that.setData({
          answerA: choiceClass[1]
        });
      } else {
        that.setData({
          answerA: choiceClass[2]
        });
      }
    } else if (useranswer == 'B') {
      if (that.data.questions[gamenumber].answer == useranswer) {
        that.setData({
          answerB: choiceClass[1]
        });
      } else {
        that.setData({
          answerB: choiceClass[2]
        });
      }
    } else if (useranswer == 'C') {
      if (that.data.questions[gamenumber].answer == useranswer) {
        that.setData({
          answerC: choiceClass[1]
        });
      } else {
        that.setData({
          answerC: choiceClass[2]
        });
      }
    } else if (useranswer == 'D') {
      if (that.data.questions[gamenumber].answer == useranswer) {
        that.setData({
          answerD: choiceClass[1]
        });
      } else {
        that.setData({
          answerD: choiceClass[2]
        });
      }
    }
    //选择正确答案
    that.chooseTheRightAnswer();

  },
  //清楚历史数据
  cleanOldData: function() {
    //下一轮答题开始
    var gamenumber = that.data.gamenumber;
    if (gamenumber < 4) {
      var time = setTimeout(function() {
        that.setData({
          gamenumber: gamenumber + 1,
          answerA: choiceClass[0],
          answerB: choiceClass[0],
          answerC: choiceClass[0],
          answerD: choiceClass[0],
          myselect: false,
          answerCountdown: 15,
        });
        that.answerCountdown(that);
      }, 2500);
    } else {
      that.saveSpecialGameInfo();
      navTo('/pages/resultMatch/resultMatch?winflag=' + that.data.winflag + '&sumcount=' + that.data.sumcount + "&typeId=" + that.data.typeId);
    }
  },
  //分享弹窗
  shareBtn: function() {
    this.setData({
      showModal: true
    })
  }, //退出弹窗
  exitBtn: function() {
    this.setData({
      exitModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function() {},
  // 分享弹窗关闭
  cancelShare: function() {
    this.setData({
      showModal: false
    })
  },
  // 退出弹窗关闭
  cancelexit: function() {
    this.setData({
      exitModal: false
    })
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
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
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false,
          exitModal: false
        });
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true,
        exitModal: true
      });
    }
  },
  /**导航返回 */
  onBack() {
    if (that.data.starting){
      util.showModal('系统提示', '确定要退出比赛吗', true, '确定', function (res) {
        !res.cancel && goPage()
      })
    }else{
      goPage();
    }
  },
  //选择正确答案
  chooseTheRightAnswer: function () {
    var gamenumber = that.data.gamenumber;
    var rightanswer = that.data.questions[gamenumber].answer;
    if (rightanswer == 'A') {
      that.setData({
        answerA: choiceClass[1]
      });
    } else if (rightanswer == 'B') {
      that.setData({
        answerB: choiceClass[1]
      });
    } else if (rightanswer == 'C') {
      that.setData({
        answerC: choiceClass[1]
      });
    } else if (rightanswer == 'D') {
      that.setData({
        answerD: choiceClass[1]
      });
    }
  },
  cancelShareBtn: function () {
    that.saveSpecialGameInfo();
    navTo('/pages/resultMatch/resultMatch?winflag=' + that.data.winflag + '&sumcount=' + that.data.sumcount + "&typeId=" + that.data.typeId);
  },
  goSpecialGame: function () {

  },
  goHome: function() {
  },
  //保存游戏数据
  saveSpecialGameInfo: function() {
    const aUserInfo = getValue('aUserInfo');
    post('/wx/gameInfo/' + config.appkey + '/saveSpecialGameInfo', { openId: aUserInfo.openid,
      winflag: that.data.winflag, sumcount: that.data.sumcount, gametype:'4',
      answerResultList: that.data.kClientAnswerArr,
      summaryGameRecordsVo: that.data.summaryGameRecordsVo,
      dailyGameRecordsVo: that.data.dailyGameRecordsVo }).then(res => {
        
      var bUserScoreVo = res.bUserScoreVo;
      if (bUserScoreVo) {
        this.setData({
          bUserScoreVo: bUserScoreVo,
        });
      }
    })
  },
})