<template>
  <div>
    <button type="primary">登录</button>
    <button type="warn">取消</button>
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
      console.log(options.scene)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
