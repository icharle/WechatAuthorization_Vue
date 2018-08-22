import api from '@/utils/api'
/**
   * 微信登录
   * @returns {Promise<any>}
   * @constructor
   */
function login () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: (res) => {
        if (res.code) {
          resolve(res.code)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
   * 微信用户详细信息
   * @param iv
   * @param encryptedData
   * @returns {Promise<any>}
   */
function getUserInfo (iv, encryptedData) {
  return new Promise((resolve, reject) => {
    // 判断是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) { // 已经授权才发送请求
          this.login()
            .then((res) => {
              api.AuthLogin({
                code: res,
                iv: iv,
                encryptedData: encryptedData
              }).then(res => {
                wx.setStorageSync('token', res.token)
                resolve(res.token)
              }).catch(error => {
                reject(error)
              })
            })
            .catch(error => {
              reject(error)
            })
        }
      }
    })
  })
}

const util = {
  login,
  getUserInfo
}

export default util
