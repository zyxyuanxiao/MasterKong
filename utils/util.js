const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const promisify = api => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
        });
    }
}
const getTouchData = (endX, endY, startX, startY) => {
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) { //右滑
        turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) { //左滑
        turn = "left";
    }
    return turn;
}

module.exports = {
    formatTime,
    promisify,
    getTouchData
}