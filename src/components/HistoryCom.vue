<template>
	<div class="pageContentWrap pageHistory">
		<h4>主站 / 迎机史志</h4>
    <BookCollection :bookContent="historyContent" />
	</div>
</template>

<script>
import BookCollection from './BookCollection'
import utils from '../utils/index'

export default {
	name: 'HistoryCom',
  components: {
    BookCollection
  },
	data () {
		return {
			historyContent: ''
		}
	},
	methods: {
    queryData () {
      utils.ajax('/api/history', resd => {
        this.historyContent = resd;
      });
    }
	},
  created () {
    this.queryData();
  }
}
</script>

<style scoped lang="less">
.pageHistory{

}
</style>
