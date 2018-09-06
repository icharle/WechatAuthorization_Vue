import {request, upLoad} from '@/utils/request'

const api = {
  // 微信授权登录
  AuthLogin: (paramObj) => request.post('AuthLogin', paramObj),

  // 获取授权站点详细信息
  GetSiteInfo: (paramObj) => request.post('GetSite', paramObj),

  // 小程序端授予权限
  WxPutAuth: (paramObj) => request.post('WxPutAuth', paramObj),

  // 上传logo
  WxUpload: (file, paramObj) => upLoad('UploadFile', file, paramObj),

  // 保存站点
  SaveSite: (paramObj) => request.post('sites', paramObj),

  // 获取用户所有站点
  GetSite: () => request.get('sites'),

  // 删除某个站点
  DelSite: (id) => request.delete(`sites/${id}`),

  // 更新某个站点
  UpdateSite: (id, paramObj) => request.put(`sites/${id}`, paramObj),

  // 编辑某个站点
  EditSite: (id) => request.get(`sites/${id}/edit`)
}

export default api
