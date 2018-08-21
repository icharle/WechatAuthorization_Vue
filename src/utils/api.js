import request from '@/utils/request'

const api = {
  // 微信授权登录
  AuthLogin: (paramObj) => request.post('AuthLogin', paramObj)
}

export default api
