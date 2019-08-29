import { config } from '../config'
import { get } from './http'
/**获取用户信息 */
export function getUserInfo() {
    return wx.getStorageSync('userInfo')
}
/**显示提示信息 loading success */
export function showToast(title, icon, showMask) {
    wx.showToast({
        title: title,
        icon: icon ? icon : 'none',
        duration: 1500,
        mask: showMask
    })
}
/**显示loadding */
export function showLoading(title) {
    wx.showLoading({
        title
    })
}
/**关闭显示loadding */
export function hideLoading() {
    wx.hideLoading()
}

/**显示弹框 */
export function showModal(options) {
    wx.showModal({
        title: options.title,
        content: options.content,
        showCancel: options.showCancel || true, //是否显示取消按钮
        cancelText: options.cancelText || '取消', //默认是“取消”
        cancelColor: options.cancelColor || '#666', //取消文字的颜色
        confirmText: options.confirmText || '确定', //默认是“确定”
        confirmColor: options.confirmColor || '#444', //确定文字的颜色
        success: function(res) {
            if (res.cancel) {
                options.cancel()
            } else {
                options.sure()
            }
        },
        fail: function(res) {
            console.log(res)
        },
        complete: function(res) {
            console.log(res)
        }
    })
}
/**页面跳转 */
export function navTo(url) {
    wx.navigateTo({
        url
    })
}
/**返回上一页 */
export function back() {
    wx.navigateBack({
        delta: 1
    })
}
/**关闭当前页面，跳转到应用内的某个页面。 */
export function redirectTo(url) {
    wx.redirectTo({
        url
    })
}

/** 关闭所有页面，打开到应用内的某个页面。*/
export function reLanchTo(url) {
    wx.reLaunch({
        url
    })
}

/**存 */
export function setValue(key, value) {
    wx.setStorageSync(key, value)
}
/**取 */
export function getValue(key) {
    return wx.getStorageSync(key)
}

/**播放背景音乐 */
export function playMusic() {
    wx.playBackgroundAudio({
        dataUrl: config.musicUrl,
        title: '背景音乐',
        coverImgUrl: ''
    })
}
/**暂停背景音乐 */
export function pauseMusic() {
    wx.pauseBackgroundAudio()
}
/**关闭背景音乐 */
export function stopMusic() {
    wx.stopBackgroundAudio()
}
/**
 * 根据类型使用跳转方式
 * @param {} type  1 为导航跳转 2 为关闭当前页 3 为关闭所有跳转到指定页 都不指定就去首页
 * @param {*} url  跳转页面   /pages/index/index
 */
export function goPage(type, url) {
    switch (type) {
        case 1:
            navTo(url)
            break
        case 2:
            redirectTo(url)
            break
        case 3:
            reLanchTo(url)
            break
        default:
            reLanchTo('/pages/index/index')
            break
    }
}
export function refreshGold() {
    const app = getApp()
    return get('api/Account/info').then(res => {
        if (res.status === 0) {
            var gold = parseInt(res.data.balance_coins)
            app.globalData.userInfo.balance_coins = gold
            return gold
        } else {
            return app.globalData.userInfo.balance_coins
        }
    })
}
/**获取memberNo */
export function getMemberNo() {
    return new Promise((resolve, reject) => {
        get('api/Account/info').then(res => {
            if (res.status === 0) {
                setValue('userInfo', res.data);
                resolve(res.data.member_no)
            } else {
                showToast(res.msg);
            }
        })
    })
}
export function rnd(n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}