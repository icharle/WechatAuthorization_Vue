import api from '@/utils/api'
import store from './store'
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
                store.dispatch('refreshToken', res.token)
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

// 封装toast方法
function toast (title = '提示', icon = 'success', duration = 1000, mask = true) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
      mask: mask,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 封装loading状态方法
function showLoading (title = '加载中', mask = true) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: title,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 封装隐藏loading状态方法
function hideLoading () {
  wx.hideLoading()
}

// 导航栏loading
function showNavBarLoad () {
  wx.showNavigationBarLoading()
}

// 导航栏loading隐藏
function hideNavBarLoad () {
  wx.hideNavigationBarLoading()
}

const util = {
  login,
  getUserInfo,
  showLoading,
  hideLoading,
  showNavBarLoad,
  hideNavBarLoad,
  toast
}

export default util
