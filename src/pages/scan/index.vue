<template>
  <div class="scan">
    <div class="header">
      <div>
        <img class="logo" :src="siteinfo.sitelogo">
        <p class="logo_name">{{siteinfo.sitename}}</p>
      </div>
    </div>
    <div class="message">
      <div class="title">该程序将获得以下信息</div>
      <div class="prompt">· 获得您的公开信息（昵称、头像等）</div>
    </div>
    <div class="btn">
      <button class="accept" @click="accept">确认登录</button>
      <!--<button class="reject" @click="">拒绝</button>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/utils/api'
  import util from '@/utils/utils'
  import {IMG_API} from '@/utils/request'
  export default {
    data () {
      return {
        scene: '',
        siteinfo: ''
      }
    },
    async onLoad () {
      let options = this.$root.$mp.query
      this.scene = options.scene
      util.showNavBarLoad()
      let siteinfo = await api.GetSiteInfo({scene: options.scene})
      util.hideNavBarLoad()
      this.siteinfo = siteinfo.data
      this.siteinfo.sitelogo = IMG_API + siteinfo.data.sitelogo
    },
    methods: {
      async accept () {
        util.showLoading('授权中...')
        await api.WxPutAuth({scene: this.scene})
        util.hideLoading()
        wx.reLaunch({ url: '/pages/index/main' })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .scan
    .header
      display flex
      flex-direction row
      justify-content center
      align-items center
      margin 0 auto
      width 80%
      height 200px
      border-bottom 2px solid #f4f4f4
      .logo
        width 100px
        height 100px
        border-radius 5px
      .logo_name
        text-align center
        padding-top 5px
        font-size 22px
    .message
      width 80%
      margin 30px auto
      .title
        font-size 18px
      .prompt
        margin-top 8px
        font-size 12px
        color #8e8e8e
    .btn
      width 80%
      margin 0 auto
      .accept
        color white
        background-color #04be02
      .reject
        margin-top 20px
        color white
        background-color #E64340
</style>
