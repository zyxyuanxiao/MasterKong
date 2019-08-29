// pages/AnswerQuestions/AnswerQuestions.js
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
  rnd
} from '../../utils/common';
import util from '../../utils/util'
import {
  config,
  cmd
} from '../../config'
var that;
var frameBuffer_Data, session, SocketTask;
var app = getApp();
var choiceClass = ['HaveChoice', 'Selected', 'wrong'];
var kClientAnswerDto = {};
var robotClientAnswerDto = {};
//机器人回答
var robotReq = {};
var myselect = false;
kClientAnswerDto.score = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prepariCountdown: 3,
    answerCountdown: 15,
    showView: true,
    showModal: false,
    gamenumber: 0,
    choiceClass: choiceClass,
    answerA: choiceClass[0],
    answerB: choiceClass[0],
    answerC: choiceClass[0],
    answerD: choiceClass[0],
    kClientAnswerDto: kClientAnswerDto,
    robotClientAnswerDto: robotClientAnswerDto,
    answeroption: ['A', 'B', 'C', 'D'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    that = this;
    if (options.cmd) {
      that.setData({
        cmd: options.cmd,
      });
    }
    if (options.matchIngSuccess) {
      var matchIngSuccess = JSON.parse(options.matchIngSuccess)
      that.setData({
        matchIngSuccess: matchIngSuccess,
        question: JSON.parse(options.uQuestions),
      });
    }
    const aUserInfo = getValue('aUserInfo');
    kClientAnswerDto.openId = aUserInfo.openid;
    kClientAnswerDto.avatarurl = aUserInfo.avatarurl;

    kClientAnswerDto.score = 0;
    that.setData({
      kClientAnswerDto: kClientAnswerDto,
      aUserInfo: aUserInfo
    });
    // switch (data.cmd) {
    //   case cmd.randomPK:
    //     that.sendSocketMessage();

    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
          this.sendSocketMessage({
            status: cmd.randomPK
          });
          break;
        case cmd.join:
          // this.joinGame(data.data.join);
          break;
        case cmd.start:
          // this.startGame();
          break;
        case cmd.setNextQuestion:
          // showToast('设置难度成功', 'success')
          //清楚上一轮数据
          that.cleanOldData(data);
          break;
        case cmd.robot:
          that.setData({
            enemyUser: data.enemyUser
          });
          navTo('/pages/AnswerQuestions/AnswerQuestions?cmd=7');
          break;
        case cmd.robotreq:
          robotReq = data.robotReq;

          that.changeOtherScore(robotReq);
          //自己选择后改变选项背景样式
          if (myselect) {
            that.changeSelectChooseClass(robotReq);
            that.judgeAnswered();
          }
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
  onShow: function() {
    // wx.onSocketMessage(res => {
    //   const data = JSON.parse(res.data);
    //   if (data.status === 1) {
    //     showToast(data.msg);
    //     return
    //   }
    //   if (data.cmd === cmd.question) {
    //     const { title, options, answer_type } = data.data.question_info;
    //     const { questions_seconds: downTime, join, games_id } = data.data;
    //     const selectOptions = options.map(item => {
    //       return {
    //         text: item,
    //       }
    //     })
    //     if (this.selectComponent('#vs-head')) {
    //       // 设置头像和倒计时
    //       this.setData({
    //         showHead: true
    //       })
    //       this.selectComponent('#vs-head').countDown(downTime);
    //       this.setHead(join);
    //     }
    //     // 出题重置选择
    //     resultSelect = [];
    //     hasSelect = false;
    //     this.setData({
    //       title,
    //       type: answer_type,
    //       selectOptions,
    //       downTime,
    //       gameId: games_id
    //     })
    //   } else if (data.cmd === cmd.answer) {
    //     // 答题后返回的结果
    //     const { answer, options } = data.data.questions_info;
    //     const { answers, join, question_number } = data.data;
    //     const my = answers.find(item => item.member_no === member_no);
    //     const you = answers.find(item => item.member_no !== member_no);
    //     const resultOptions = [];
    //     // 返回结果更新分数
    //     this.updateScore(join, question_number);
    //     if (answers.length === 1) {
    //       options.forEach((text, index) => {
    //         resultOptions.push({
    //           text,
    //           my: my ? my : {},
    //           answer,
    //           myMember: my ? my.member_no : '',
    //           mySelect: my ? my.answer.includes(index) : false,
    //           showRight: answer.includes(index),
    //           showWhiteText: my ? answer.concat(my.answer).includes(index) : '',
    //           showAllError: my ? my.answer.filter(item => !answer.includes(item)).includes(index) : false
    //         })
    //       });

    //     } else if (answers.length === 2) {
    //       // 当二者都有结果的时候 还原选择
    //       options.forEach((text, index) => {
    //         resultOptions.push({
    //           text,
    //           my,
    //           you,
    //           answer,
    //           mySelect: my.answer.includes(index),
    //           youSelect: you.answer.includes(index),
    //           showRight: answer.includes(index),
    //           showColor: my.answer.concat(you.answer, answer).includes(index),
    //           showAllRight: answer.includes(index),
    //           showAllError: my.answer.concat(you.answer).filter(item => !answer.includes(item)).includes(index)
    //         })
    //       });
    //     }
    //     if (my) {
    //       this.setData({
    //         selectOptions: resultOptions
    //       })
    //     }
    //   } else if (data.cmd === cmd.end) {
    //     showToast('正在计算结果...', 'loading', true);
    //     app.globalData.result = data.data;
    //     goPage(2, '/pages/fight/result-fight/index');
    //   }
    // })
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
    SocketTask.close(function(close) {
      console.log('关闭 WebSocket 连接。', close)
    });
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

  }, //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
  sendSocketMessage: function(msg) {
    console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    SocketTask.send({
      data: JSON.stringify(msg)
    }, function(res) {
      console.log('已发送', res)
    })
  },
  //准备倒计时
  countdown: function() {
    var that = this
    var prepariCountdown = this.data.prepariCountdown
    if (prepariCountdown == 0) {
      // that.setData({
      //   prepariCountdown: 3
      // })
      that.setData({
        showView: false,
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
    if (answerCountdown == 0) {
      // that.setData({
      //   answerCountdown: 15
      // })
      // that.setData({
      //   showView: false,
      // })
      return
    }
    var answertime = rnd(10, 13);
    if (answerCountdown == 15) {
      var delaytime = answerCountdown - answertime;
      setTimeout(function() {
        that.robotSelectChoose(answertime);
      }, delaytime * 1000);
    }
    var time = setTimeout(function() {
      that.setData({
        answerCountdown: answerCountdown - 1,
      })
      that.answerCountdown(that);
    }, 1000)
  },
  showMessageDialog: function() {
    this.setData({
      showModal: true
    })
  }, // 弹出层里面的弹窗
  ok: function() {
    this.setData({
      showModal: false
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
  //选择选项触发事件 
  selectChoose: function(e) {
    var useranswer = e.currentTarget.dataset.answer;
    //局数
    var gamenumber = that.data.gamenumber
    kClientAnswerDto.gameCount = gamenumber;
    kClientAnswerDto.answer = useranswer;
    if (that.data.question[gamenumber].answer == useranswer) {
      kClientAnswerDto.yes = true;
      kClientAnswerDto.score += (that.data.answerCountdown * (20));
    } else {
      kClientAnswerDto.yes = false;
    }
    that.setData({
      kClientAnswerDto: kClientAnswerDto
    });
    myselect = true;
    that.changeSelectChooseClass(kClientAnswerDto, true);
    //机器人回答不为空
    if (JSON.stringify(robotReq) != "{}") {
      that.changeSelectChooseClass(robotReq, false);
      robotReq = {}
    }


    //begin 判断是否全部答题完成
    that.judgeAnswered();
  },

  //选择选项后改变自己的分数，颜色  自己的手机,
  changeSelectChooseClass: function(e, ismyphone) {
    var useranswer = e.answer;
    var gamenumber = that.data.gamenumber
    if (useranswer == 'A') {
      if (that.data.question[gamenumber].answer == useranswer) {
        that.setData({
          answerA: choiceClass[1]
        });
      } else {
        that.setData({
          answerA: choiceClass[2]
        });
      }

    } else if (useranswer == 'B') {
      if (that.data.question[gamenumber].answer == useranswer) {
        that.setData({
          answerB: choiceClass[1]
        });
      } else {
        that.setData({
          answerB: choiceClass[2]
        });
      }
    } else if (useranswer == 'C') {
      if (that.data.question[gamenumber].answer == useranswer) {
        that.setData({
          answerC: choiceClass[1]
        });
      } else {
        that.setData({
          answerC: choiceClass[2]
        });
      }
    } else if (useranswer == 'D') {
      if (that.data.question[gamenumber].answer == useranswer) {
        that.setData({
          answerD: choiceClass[1]
        });
      } else {
        that.setData({
          answerD: choiceClass[2]
        });
      }
    }
    var currentopenId = e.openId;
    var myUser = that.data.matchIngSuccess.myUser;
    if (myUser != null && myUser.openid == currentopenId) {
      if (ismyphone) {
        myUser.score += e.score;
      }
      myUser.useranswer = useranswer;
      myUser.avatarifhidden = false;
      this.setData({
        ['matchIngSuccess.myUser']: myUser
      });

      return;
    }

    var homeUserList = that.data.matchIngSuccess.homeUserList;
    for (var i = 0; i < homeUserList.length; i++) {
      var homeUser = homeUserList[i];
      if (homeUser.openid == currentopenId) {
        if (ismyphone) {
          homeUser.score += e.score;
        }
        homeUser.avatarifhidden = false;
        homeUser.useranswer = useranswer;
        homeUserList[i] = homeUser;
        this.setData({
          ['matchIngSuccess.homeUserList']: homeUserList
        });
        return;
      }
    }
    var awayUserList = that.data.matchIngSuccess.awayUserList;
    for (var i = 0; i < awayUserList.length; i++) {
      var awayUser = awayUserList[i];
      if (awayUser.openid == currentopenId) {
        if (ismyphone) {
          awayUser.score += e.score;
        }
        awayUser.avatarifhidden = false;
        awayUser.useranswer = useranswer;
        awayUserList[i] = awayUser;
        this.setData({
          ['matchIngSuccess.awayUserList']: awayUserList
        });
        return;
      }
    }
  },
  //机器人选择事件
  robotSelectChoose: function(answertime) {
    if (that.data.cmd == cmd.robot) {
      var awayUserList = that.data.matchIngSuccess.awayUserList;
      var gamenumber = that.data.gamenumber;
      if (awayUserList && awayUserList.length > 0) {
        var index = rnd(0, 3);
        var robot = awayUserList[0];
        //选项
        var answer = that.data.answeroption[index];
        if (that.data.question[gamenumber].answer == answer) {
          robotClientAnswerDto.yes = true;
          robotClientAnswerDto.score += (answertime * (20));
        } else {
          robotClientAnswerDto.yes = false;
        }
        robotClientAnswerDto.openId = robot.openid;
        robotClientAnswerDto.avatarurl = robot.avatarurl;


        robotClientAnswerDto.gameCount = that.data.gamenumber;
        robotClientAnswerDto.answer = answer;

        that.sendSocketMessage({
          cmd: cmd.robotreq,
          kClientAnswerDto: robotClientAnswerDto,
        });
      }
    }
  },
  //改变其他人的分数
  changeOtherScore: function(e) {
    var currentopenId = e.openId;
    var myUser = that.data.matchIngSuccess.myUser;
    if (myUser != null && myUser.openid == currentopenId) {
      myUser.score += e.score;
      that.setData({
        ['matchIngSuccess.myUser']: myUser
      });
      return;
    }
    var homeUserList = that.data.matchIngSuccess.homeUserList;
    for (var i = 0; i < homeUserList.length; i++) {
      var homeUser = homeUserList[i];
      if (homeUser.openid == currentopenId) {
        homeUser.score += e.score;
        homeUserList[i] = homeUser;
        this.setData({
          ['matchIngSuccess.homeUserList']: homeUserList
        });
        return;
      }
    }
    var awayUserList = that.data.matchIngSuccess.awayUserList;
    for (var i = 0; i < awayUserList.length; i++) {
      var awayUser = awayUserList[i];
      if (awayUser.openid == currentopenId) {
        awayUser.score += e.score;
        awayUserList[i] = awayUser;
        this.setData({
          ['matchIngSuccess.awayUserList']: awayUserList
        });
        return;
      }
    }
  },
  //判断是否全部回答完成
  judgeAnswered: function() {
    var answered = true;
    var myUser = that.data.matchIngSuccess.myUser;
    if (myUser != null && myUser.useranswer == '') {
      answered = false;
    }
    var homeUserList = that.data.matchIngSuccess.homeUserList;
    for (var i = 0; i < homeUserList.length; i++) {
      var homeUser = homeUserList[i];
      if (homeUser != null && homeUser.useranswer == '') {
        answered = false;
      }
    }
    var awayUserList = that.data.matchIngSuccess.awayUserList;
    for (var i = 0; i < awayUserList.length; i++) {
      var awayUser = awayUserList[i];
      if (awayUser != null && awayUser.useranswer == '') {
        answered = false;
      }
    }
    that.sendcleanOldDataMessage(answered);
  },
  sendcleanOldDataMessage: function (answered){
    if (answered) {
      //   myUser.useranswer='';
      //   for (var i = 0; i < homeUserList.length; i++) {
      //     var homeUser = homeUserList[i];
      //     if (homeUser != null && homeUser.useranswer == '') {
      //       homeUser.useranswer = ''
      //       awayUserList[i] = homeUser;
      //     }
      //   }
      //   for (var i = 0; i < awayUserList.length; i++) {
      //     var awayUser = awayUserList[i];
      //     if (awayUser != null && awayUser.useranswer == '') {
      //       awayUser.useranswer = ''
      //       awayUserList[i] = awayUser;
      //     }
      //   }

      that.sendSocketMessage({
        cmd: cmd.setNextQuestion,
        matchIngSuccess: that.data.matchIngSuccess,
      });
    }
  },
  //清楚历史数据
  cleanOldData: function (data) {
    that.setData({
      // ['matchIngSuccess.myUser']: myUser,
      matchIngSuccess: data.matchIngSuccess,
      gamenumber: that.data.gamenumber+1,
      answerA: choiceClass[0],
      answerB: choiceClass[0],
      answerC: choiceClass[0],
      answerD: choiceClass[0],
      answerCountdown: 15,
    });
    
  }
})