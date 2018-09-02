<template>
  <div class="add">
    <img :src="imgsrc" class="logo" @click="chooseImg">
    <div class="input">
      <input type="text" class="title" placeholder="站点名称" v-model="sitename"/>
      <input type="text" class="desc" placeholder="站点描述" v-model="sitedesc"/>
      <button class="submit" plain="true" @click="upload">提交</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/utils/api'

  export default {
    data () {
      return {
        imgsrc: '/static/image/add.png',
        sitename: '',
        sitedesc: ''
      }
    },
    methods: {
      chooseImg () {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            this.imgsrc = res.tempFilePaths[0]
          }
        })
      },
      async upload () {
        let sitelogo = await api.WxUpload(this.imgsrc, {})
        await api.SaveSite({'sitename': this.sitename, 'sitedesc': this.sitedesc, 'sitelogo': sitelogo})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .add
    .logo
      width 100px
      height 100px
    .input
      width 80%
      font-size 16px
      margin 0 auto
      .title
        height 40px
        line-height 40px
        padding 0 5px
        border-bottom: 1rpx solid #b2b2b2;
        margin-top 20px
      .desc
        height 40px
        line-height 40px
        padding 0 5px
        border-bottom: 1rpx solid #b2b2b2;
        margin-top 20px
    .submit
      margin-top 60px
      color #338FFC
      border-color #338FFC
</style>
