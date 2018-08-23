import request from '@/utils/request'

const api = {
  // 微信授权登录
  AuthLogin: (paramObj) => request.post('AuthLogin', paramObj),

  // 小程序端授予权限
  WxPutAuth: (paramObj) => request.post('WxPutAuth', paramObj)
}

export default api
