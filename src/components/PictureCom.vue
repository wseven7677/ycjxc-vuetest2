<template>
<div class="pageContentWrap pagePicture">
  <h4>主站 / 迎机图片</h4>
  <CardCollection :apiUrl="picUrl" />
</div>
</template>

<script>
import CardCollection from './CardCollection'

export default {
  name: 'PictureCom',
  components: {
    CardCollection
  },
  data() {
    return {
      picUrl: '/pictures'
    }
  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped lang="less">
.pagePicture {
    }
</style>
