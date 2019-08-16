import { config } from '../config.js'
import { showToast } from './common.js';

const baseRestUrl = config.api_url

export function request(params) {
    return new Promise((resolve, reject) => {
        wx.showLoading({ title: '加载中', });
        wx.request({
            url: `${baseRestUrl}${params.url}`,
            data: params.data,
            method: params.method || 'GET',
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function(res) {
                wx.hideLoading()
                // if (res.status === 0) {
                resolve(res.data)
                // }
            },
            fail: function(err) {
                wx.hideLoading()
                console.log(err.msg)
                showToast('通讯异常，请联系管理员!')
                // showToast(err.msg)
                // reject(err)
            }
        });
    })
}

export function get(url, data) {
    return request({
        url,
        data
    })
}

export function post(url, data) {
    return request({
        url,
        data,
        method: 'POST'
    })
}