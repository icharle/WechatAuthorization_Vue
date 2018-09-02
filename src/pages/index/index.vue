<template>
  <div class="content">
    <ul v-for="(item,index) in info" :key="index">
      <li class="info" @touchstart="touchStart" @touchend="touchEnd($event,index)" :data-type="item.type">
        <img class="sitelogo" :src="item.sitelogo">
        <div class="infotext">
          <p class="sitename">{{item.sitename}}</p>
          <p class="sitedesc">{{item.sitedesc}}</p>
        </div>
        <div class="option">
          <div class="edit">编辑</div>
          <div class="del" @click="del(index)">删除</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      info: [
        {
          sitelogo: 'https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132',
          sitename: '艾超科技',
          sitedesc: '记录点滴，记录生活',
          type: 0
        },
        {
          sitelogo: 'https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132',
          sitename: '艾超博客',
          sitedesc: '记录点滴，记录生活',
          type: 0
        },
        {
          sitelogo: 'https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132',
          sitename: '艾超',
          sitedesc: '记录点滴，记录生活',
          type: 0
        }
      ]
    }
  },

  methods: {
    touchStart (e) {
      this.startX = e.mp.changedTouches[0].clientX
    },
    touchEnd (e, index) {
      this.endX = e.mp.changedTouches[0].clientX
      if (this.startX - this.endX > 20) {
        // 左滑
        this.info[index].type = 1
      } else if (this.endX - this.startX > 20) {
        // 右滑
        this.info[index].type = 0
      }
    },
    del (index) {
      this.info.splice(index, 1)
    }
  },

  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    width 100%
    height 100%
    li[data-type="0"]
      transform: translate3d(0,0,0)
    li[data-type="1"]
      transform: translate3d(-40%,0,0)
    .info
      display flex
      align-items center
      width 100%
      height 75px
      border-bottom 1px solid #e0eef1
      .sitelogo
        width 50px
        height 50px
        border-radius 50%
        overflow hidden
        margin-left 3%
      .infotext
        width 65%
        height 75px
        margin-left 2%
        .sitename
          margin-top 15px
          font-size 18px
        .sitedesc
          margin-top 5px
          color #7c8489
          font-size 12px
      .option
        position absolute
        display flex
        width 40%
        height 75px
        line-height 75px
        right -40%
        text-align center
        font-size 17px
        color #fff
        .edit
          flex 1
          background-color #c4c7cd
        .del
          flex 1
          background-color #ff4949
</style>
