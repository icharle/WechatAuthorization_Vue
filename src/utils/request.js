import Fly from 'flyio/dist/npm/wx'
import store from './store'

const request = new Fly()

const APP_API = 'http://authorization.test/api/' // api

const IMG_API = 'http://authorization.test/' // 图片接口

// 设置请求基地址
request.config.baseURL = `${APP_API}`

// 添加请求拦截器
request.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers['Authorization'] = store.state.token
  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
request.interceptors.response.use(
  (response) => {
    // 无痛刷新生成token值保存
    if (response.headers.authorization) {
      store.dispatch('refreshToken', response.headers.authorization)
    }
    // 只将请求结果的data字段返回
    return Promise.resolve(response.data)
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
    // 无痛刷新生成token值保存(防止非401错误时刚好刷新token)
    if (err.response.headers.authorization) {
      store.dispatch('refreshToken', err.response.headers.authorization)
    }
    return Promise.resolve()
  }
)

// 封装图片上传
const upLoad = (fileurl, filePath, formData) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${APP_API}` + fileurl,
      filePath: filePath, //  本地路径名
      name: 'logo',
      formData: formData,
      success: (res) => {
        resolve(res.data)
      },
      fail: err => reject(err)
    })
  })
}
export { request, upLoad, IMG_API }
