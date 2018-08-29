import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

const APP_API = 'http://authorization.test/api/' // api

// 设置请求基地址
request.config.baseURL = `${APP_API}`

// 添加请求拦截器
request.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers['Authorization'] = wx.getStorageSync('token')
  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
request.interceptors.response.use(
  (response) => {
    // 无痛刷新生成token值保存
    if (response.headers.authorization) {
      wx.setStorageSync('token', response.headers.authorization)
    }
    // 只将请求结果的data字段返回
    return Promise.resolve(response.data)
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
    return Promise.resolve()
  }
)

// 封装图片上传
const upLoad = (fileurl, filePath, formData) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${APP_API}` + fileurl,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      filePath: filePath, //  本地路径名
      name: 'logo',
      formData: formData,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
export {request, upLoad}
