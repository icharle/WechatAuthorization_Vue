<template>
  <div class="add">
    <site :siteinfo="siteinfo"></site>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/utils/api'
  import util from '@/utils/utils'
  import site from '@/components/site'
  import {IMG_API} from '@/utils/request'

  export default {
    data () {
      return {
        siteinfo: {},
        default: {
          sitelogo: '/static/image/add.png',
          sitename: '',
          sitedesc: '',
          type: 'add'
        }
      }
    },
    async onLoad () {
      let options = this.$root.$mp.query
      if (options.id) {
        util.showNavBarLoad()
        let info = await api.EditSite(options.id)
        util.hideNavBarLoad()
        this.siteinfo = info.data
        this.siteinfo.sitelogo = IMG_API + info.data.sitelogo
        this.siteinfo.type = 'update'
      } else {
        this.siteinfo = this.default
      }
    },
    methods: {
    },
    components: {
      site
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
