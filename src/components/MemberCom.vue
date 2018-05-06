<template>
<div class="pageContentWrap pageMember">
  <h4>主站 / 迎机人物</h4>
  <CardCollection :apiUrl="memberUrl" />
</div>
</template>

<script>
import CardCollection from './CardCollection'

export default {
  name: 'MemberCom',
  components: {
    CardCollection
  },
  data() {
    return {
      memberUrl: '/members'
    }
  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped lang="less">
.pageMember {
    }
</style>
