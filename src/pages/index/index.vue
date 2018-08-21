<template>
  <div class="container">
    <!--<button open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" class="login"></button>-->
    <div class="userinfo">
      <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="userinfo-nickname" @click="ajax">
        <open-data type="userNickName"></open-data>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
    ajax () {
      wx.request({
        url: 'http://authorization.test/api/CheckAuth',
        method: 'post',
        header: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          'scene': '111'
        },
        success: res => {
          if (res.statusCode === 200) {
            console.log(1)
          } else {
            console.log(2)
          }
        }
      })
    }
  },

  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    width 100%
    height 100vh
    position fixed
    opacity 0
    z-index 0
</style>
