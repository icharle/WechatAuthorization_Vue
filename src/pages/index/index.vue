<template>
  <div class="content">
    <ul v-for="(item,index) in info" :key="index">
      <li class="info" @touchstart="touchStart" @touchend="touchEnd($event,index)" :data-type="item.type">
        <img class="sitelogo" :src="img_url + item.sitelogo">
        <div class="infotext">
          <p class="sitename">{{item.sitename}}</p>
          <p class="sitedesc">{{item.sitedesc}}</p>
        </div>
        <div class="option">
          <div class="edit" @click="edit(index)">编辑</div>
          <div class="del" @click="del(index)">删除</div>
        </div>
      </li>
    </ul>
    <a class="addsite" id="movesite" href="/pages/add/main" hover-class="none" @touchstart="down" @touchmove="move"  @touchend="end" :style="style">
      <span class="font">添加站点</span>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/utils/api'
  import {IMG_API} from '@/utils/request'

  export default {
    data () {
      return {
        startX: 0, // 触摸位置
        endX: 0, // 结束位置
        info: [], // 站点信息
        img_url: IMG_API, // 图片接口前缀
        flags: false,
        style: '',
        position: {x: 0, y: 0},
        dx: '',
        dy: ''
      }
    },
    async onShow () {
      let info = await api.GetSite()
      this.info = info.data
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
      down (e) {
        this.flags = true
        this.position.x = e.mp.changedTouches[0].clientX
        this.position.y = e.mp.changedTouches[0].clientY
        this.dx = e.mp.currentTarget.offsetLeft
        this.dy = e.mp.currentTarget.offsetTop
      },
      move (e) {
        if (this.flags) {
          let xPum = this.dx + e.mp.changedTouches[0].clientX - this.position.x
          let yPum = this.dy + e.mp.changedTouches[0].clientY - this.position.y
          this.style = 'left: ' + xPum + 'px; top:' + yPum + 'px'
        }
      },
      end () {
        this.flags = false
      },
      async del (index) {
        await api.DelSite(this.info[index].id)
        this.info.splice(index, 1)
      },
      edit (index) {
        wx.navigateTo({
          url: '/pages/add/main?id=' + this.info[index].id
        })
      }
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
    .addsite
      position fixed
      right 10px
      bottom 20px
      .font
        display inline-block
        box-sizing border-box
        width 50px
        height 50px
        line-height 50px
        border-radius 50%
        text-align center
        background-color #338FFC
        z-index 2
        font-size 12px
        color #fff
</style>
