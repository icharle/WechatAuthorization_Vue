import {request, upLoad} from '@/utils/request'

const api = {
  // 微信授权登录
  AuthLogin: (paramObj) => request.post('AuthLogin', paramObj),

  // 小程序端授予权限
  WxPutAuth: (paramObj) => request.post('WxPutAuth', paramObj),

  WxUpload: (file, paramObj) => upLoad('UploadFile', file, paramObj)
}

export default api
