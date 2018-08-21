<template>
  <div class="scan">
    <div class="header">
      <div>
        <img class="logo" src="https://p.qpic.cn/qqconnect_app_logo/NZwLatZ1GTF9cu0uCYpYNuK3vIR3QgepIYzWaY4diciaU/0?876.8045970597293">
        <p class="logo_name">速腾科技</p>
      </div>
    </div>
    <div class="message">
      <div class="title">该程序将获得以下信息</div>
      <div class="prompt">· 获得您的公开信息（昵称、头像等）</div>
    </div>
    <div class="btn">
      <button class="accept" open-type="getUserInfo" @getuserinfo="GetUserInfo">确认登录</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      }
    },
    onLoad () {
      let options = this.$root.$mp.query
      console.log(decodeURIComponent(options.redirect_url))
    },
    methods: {
      GetUserInfo (e) {
        let data = e.mp.detail
        console.log(data)
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
