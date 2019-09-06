// components/page-container/index.js
import { Music } from '../../utils/music'
const music = new Music()
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: '标题'
        },
        showTopImg: {
         type: Boolean,
          value: false
        },
        Imgsrc: {
          type: String,
          value: '路径'
        },
        showTopImgPK: {
         type: Boolean,
          value: false
        },
        ImgsrcPK: {
          type: String,
          value: '路径'
        },
        showBotImg: {
            type: Boolean,
            value: true
        },
        textLeft: {
            type: Boolean,
            value: false
        },
        showBack: {
            type: Boolean,
            value: true
        },
        showBg2: {
            type: Boolean,
            value: false
        },
        height: {
            type: String,
            value: ''
        },
        defindBack: {
            type: Boolean,
            value: false
        },
        custom: {
            type: Boolean,
            value: false
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        // topHeight: 0,
        // titleHeight: 0,
        navH: 0
    },
    attached: function() {
        // this.setData({
        //     topHeight: app.globalData.statusBarHeight,
        //     titleHeight: app.globalData.titleBarHeight
        // })
        this.setData({
            navH: app.globalData.navHeight
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navBack: function() {
            music.play()
            if (this.properties.defindBack) {
                //  使用自定义的方式跳转
                this.triggerEvent('defindBack', {}, {})
            } else {
                // 不使用自定义的方式跳转
                var arr = getCurrentPages()
                var prePage = arr[arr.length - 2]
                if (!arr.length) {
                    // 如果页面栈为空返回首页
                    wx.reLaunch({
                        url: '/pages/index/index'
                    })
                    return
                }
                if (prePage.route === 'pages/index/index') {
                    console.log(5555555555)

                    // 如果返回首页，刷新onload（刷新金币数）
                    wx.reLaunch({
                        url: '/pages/index/index'
                    })
                    prePage.onLoad()
                    return
                }
                wx.navigateBack({
                    delta: 1
                })
            }
        }
    }
})
