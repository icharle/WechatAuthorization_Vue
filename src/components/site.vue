<template>
  <div class="add">
    <img :src="siteinfo.sitelogo" class="logo" @click="chooseImg">
    <div class="input">
      <input type="text" class="title" placeholder="站点名称" v-model="siteinfo.sitename"/>
      <input type="text" class="desc" placeholder="站点描述" v-model="siteinfo.sitedesc"/>
      <button class="submit" plain="true" @click="upload(siteinfo.type)">{{siteinfo.type == 'add' ? '提交' : '更新'}}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/utils/api'
  import {IMG_API} from '@/utils/request'
  export default {
    data () {
      return {
        siteinfo: {},
        imgsrc: ''
      }
    },
    props: ['siteinfo'],
    methods: {
      chooseImg () {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            this.imgsrc = res.tempFilePaths[0]
            this.siteinfo.sitelogo = res.tempFilePaths[0]
          }
        })
      },
      async upload (data) {
        if (data === 'add') {
          let sitelogo = await api.WxUpload(this.imgsrc, {})
          this.imgsrc = '' // 置空 防止更新数据出现问题
          await api.SaveSite({'sitename': this.siteinfo.sitename, 'sitedesc': this.siteinfo.sitedesc, 'sitelogo': sitelogo})
        } else if (data === 'update' && this.imgsrc !== '') {
          let sitelogo = await api.WxUpload(this.imgsrc, {})
          this.imgsrc = '' // 置空 防止更新数据出现问题
          await api.UpdateSite(this.siteinfo.id, {'sitename': this.siteinfo.sitename, 'sitedesc': this.siteinfo.sitedesc, 'sitelogo': sitelogo})
        } else {
          await api.UpdateSite(this.siteinfo.id, {'sitename': this.siteinfo.sitename, 'sitedesc': this.siteinfo.sitedesc, 'sitelogo': (this.siteinfo.sitelogo).substr((IMG_API.length), (this.siteinfo.sitelogo).length - 1)}) // 去掉前缀
        }
        wx.navigateBack({ delta: 1 }) // 返回主页
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
