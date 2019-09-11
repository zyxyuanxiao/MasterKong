export const config = {
  api_url: 'https://tsapzdt.masterkong.com.cn',
  appkey: 'wx0876548ed23bebbf',
  ws_url: 'wss://tsapzdt.masterkong.com.cn',
  img_url: 'https://tsapzdt.masterkong.com.cn/img',
    matching_ws_url: 'wss://api.flyun1688.com:9508',
    main_bg: 'https://api.flyun1688.com/static/mp3/main_bg.mp3',
    dati_bg: 'https://api.flyun1688.com/static/mp3/dati_bg.mp3',
    pk_bg: 'https://api.flyun1688.com/static/mp3/pk_bg.mp3'
}

export const cmd = {
    // 随机匹配
    randomPK: 1,
    // 邀请进入游戏
    join: 2,
    // 通知下一轮答题
    setNextQuestion: 3,
    // 开始游戏
    start: 4,
    // 答题
    answer: 5,
    // 发送题目信息
    question: 6,
    // 机器人对战
    robot: 7,
    // 机器人答题请求
    robotreq: 8,
  // 机器人答题请求
    end: 9,
    continuegame:10,
    // 获取头像
    getHeadImage: 20,
    // 匹配成功
    matchSuccess: 22
}