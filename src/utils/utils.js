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

// 调用微信获取用户详细信息 button权限
function UserInfo () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: res => resolve(res),
            fail: err => reject(err)
          })
        }
      }
    })
  })
}

/**
 * 微信用户详细信息
 * @returns {Promise<any>}
 */
function getUserInfo () {
  return new Promise((resolve, reject) => {
    let code = null
    return util.login().then(res => {
      code = res
      return util.UserInfo()
    }).then(userInfo => {
      util.showLoading('登录中...')
      api.AuthLogin({
        code: code,
        iv: userInfo.iv,
        encryptedData: userInfo.encryptedData
      }).then(result => {
        store.dispatch('refreshToken', result.token)
        resolve(result.token)
        util.hideLoading()
        util.toast('登录成功！')
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
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
  UserInfo,
  getUserInfo,
  showLoading,
  hideLoading,
  showNavBarLoad,
  hideNavBarLoad,
  toast
}

export default util
