import Fly from 'flyio'

const request = new Fly()

// 设置请求基地址
request.config.baseURL = 'http://authorization.test/api/'

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
    // 只将请求结果的data字段返回
    return Promise.resolve(response.data)
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
    return Promise.resolve()
  }
)
export default request
