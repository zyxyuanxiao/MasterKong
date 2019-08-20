export const config = {
  api_url: 'http://localhost:8080',
  appkey: 'wx0876548ed23bebbf',
    ws_url: 'wss://api.flyun1688.com:9507',
    matching_ws_url: 'wss://api.flyun1688.com:9508',
    main_bg: 'https://api.flyun1688.com/static/mp3/main_bg.mp3',
    dati_bg: 'https://api.flyun1688.com/static/mp3/dati_bg.mp3',
    pk_bg: 'https://api.flyun1688.com/static/mp3/pk_bg.mp3'
}

export const cmd = {
    // 创建房间
    create: 1,
    // 进入游戏
    join: 2,
    // 设置难度
    setDifficult: 3,
    // 开始游戏
    start: 4,
    // 答题
    answer: 5,
    // 发送题目信息
    question: 6,
    // 游戏结束
    end: 8,
    // 获取头像
    getHeadImage: 20,
    // 匹配成功
    matchSuccess: 22
}