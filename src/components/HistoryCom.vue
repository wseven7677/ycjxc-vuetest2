<template>
	<div class="pageContentWrap pageHistory">
		<h4>主站 / 迎机史志</h4>
    <BookCollection :contentApi="historyApi" />
	</div>
</template>

<script>
import BookCollection from './BookCollection'

export default {
	name: 'HistoryCom',
  components: {
    BookCollection
  },
	data () {
		return {
			historyApi: '/history'
		}
	},
	methods: {

	},
  created () {

  }
}
</script>

<style scoped lang="less">
.pageHistory{

}
</style>
