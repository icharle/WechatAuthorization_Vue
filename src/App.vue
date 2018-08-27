<script type="text/ecmascript-6">
export default {
  // 运行拦截未授权登录
  onLaunch (path) {
    let query = '' // 链接参数
    let redirecturl = '' // 跳转原本页面

    // 判断URL中是否带有参数 若有则拼接成字符串
    for (let i in path.query) {
      if (i) {
        query = query + i + '=' + path.query[i] + '&'
      }
    }
    if (query) {
      redirecturl = path.path + '?' + query.substring(0, query.length - 1) // 去掉最后一个&符号
    } else {
      redirecturl = path.path
    }
    // 强制跳转至授权页面
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({
        url: '/pages/auth/main?redirect_url=' + encodeURIComponent(`/${redirecturl}`)
      })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
