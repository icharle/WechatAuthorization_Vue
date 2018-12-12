# 基于mpvue + Vuex + Promise + flyio『AuthenticatorX』小程序

> 基于微信小程序登录授权机制延伸第三方平台小程序

## 小程序体验
![小程序码](/docs/qrcode.jpg)

## 安装使用

```bash
# 从仓库中下载
$ git clone https://github.com/icharle/WechatAuthorization_Vue.git

# 进入代码根目录安装依赖
$ npm install

# 修改utils文件夹中request.js接口地址
$ APP_API = // 接口
$ IMG_API = // 图片

# 调试模式运行
$ npm run dev

# 打包发布
$ npm run build
```

## 效果图
  * 小程序主页
  
    ![小程序主页](/docs/index.png)
    
  * 模态框显示站点ID
  
    ![模态框显示站点ID](/docs/model.png)
    
  * 仿QQ左滑编辑、删除功能
  
    ![仿QQ左滑编辑、删除功能](/docs/left.png)
    
  * 添加站点功能
  
    ![添加站点功能](/docs/add.png)
