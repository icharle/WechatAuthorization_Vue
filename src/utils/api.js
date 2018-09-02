import {request, upLoad} from '@/utils/request'

const api = {
  // 微信授权登录
  AuthLogin: (paramObj) => request.post('AuthLogin', paramObj),

  // 小程序端授予权限
  WxPutAuth: (paramObj) => request.post('WxPutAuth', paramObj),

  // 上传logo
  WxUpload: (file, paramObj) => upLoad('UploadFile', file, paramObj),

  // 保存站点
  SaveSite: (paramObj) => request.post('SaveSite', paramObj),

  // 获取用户所有站点
  GetSite: () => request.get('GetSite')
}

export default api
