<template>
  <div class="auth">
    <div class="warn">
      <img src="/static/image/nullauth.png" class="nullauth" >
      <p class="authtext">需要您的授权才能使用哦！</p>
    </div>
    <div class="btn">
      <button class="accept" open-type="getUserInfo" @getuserinfo="GetUserInfo" plain="true">确认授权</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import util from '@/utils/utils'
  export default {
    data () {
      return {
        redirect_url: ''
      }
    },
    onLoad () {
      let options = this.$root.$mp.query
      this.redirect_url = decodeURIComponent(options.redirect_url) // 保存原页面 授权完成后跳转
    },
    methods: {
      async GetUserInfo (e) {
        let data = e.mp.detail
        util.showLoading('登录中...')
        await util.getUserInfo(data.iv, data.encryptedData) // 登录完成跳转
        util.hideLoading()
        util.toast('登录成功！')
        wx.reLaunch({ url: this.redirect_url })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .auth
    .warn
      margin-top 20%
      width 100%
      height 200px
      .nullauth
        display block
        margin 0 auto
        width 128px
        height 128px
      .authtext
        margin-top 10px
        font-size 14px
        text-align center
    .btn
      width 85%
      margin 5% auto
      .accept
        color #338FFC
        border 1px solid #338FFC
</style>
