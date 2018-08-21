import api from '@/utils/api'
export default {
  /**
   * 微信登录
   * @returns {Promise<any>}
   * @constructor
   */
  login () {
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
  },
  getUserInfo (iv, encryptedData) {
    return new Promise((resolve, reject) => {
      // 判断是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) { // 已经授权才发送请求
            this.showLoading('登录中...') // 网络延迟提示信息
            this.login()
              .then((res) => {
                api.AuthLogin({
                  code: res,
                  iv: iv,
                  encryptedData: encryptedData
                }).then(res => {
                  wx.setStorageSync('token', res.token)
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
}
