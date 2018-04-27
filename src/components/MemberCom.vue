<template>
	<div class="pageContentWrap pageMember">
		<h4>主站 / 迎机人物</h4>
		<CardCollection :cardData="cardMemData" />
	</div>
</template>

<script>
import CardCollection from './CardCollection'
import utils from '../utils/index'

export default {
	name: 'MemberCom',
	components: {
		CardCollection
	},
	data () {
		return {
			cardMemData: []
		}
	},
	methods: {
		queryData () {
			utils.ajax('/api/members',resd => {
				// console.log(resd);
				this.cardMemData = resd;
			});
		}
	},
	created () {
		this.queryData();
	}
}
</script>

<style scoped lang="less">
.pageMember{

}
</style>
