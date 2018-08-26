<template>
  <div class="user">
    <div class="userinfo">
      <div>
        <div class="userinfo-avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="userinfo-nickname">
          <open-data type="userNickName"></open-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user
    .userinfo
      display flex
      flex-direction row
      align-items center
      justify-content center
      width 100%
      height 200px
      background-color #338FFC
      .userinfo-avatar
        width 75px
        height 75px
        border-radius 50%
        overflow hidden
        box-shadow 0 0 0 5px rgba(255, 255, 255, 0.6)
      .userinfo-nickname
        margin-top 8px
        text-align center
        color #fff
</style>
