<template>
	<div class="pageContentWrap pageMember">
		<h4>主站 / 迎机人物</h4>
		<CardCollection :cardData="cardMemData" :editAuth="cardEdit" />
	</div>
</template>

<script>
import CardCollection from './CardCollection'

export default {
	name: 'MemberCom',
	components: {
		CardCollection
	},
	data () {
		return {
			cardMemData: [{
				'img': 'imgIndexShow_1.jpg','title': '张三'
			},{
				'img': 'imgIndexShow_2.jpg','title': '李四'
			},{
				'img': 'imgIndexShow_3.jpg','title': '王五'
			},{
				'img': 'imgIndexShow_3.jpg','title': '赵六'
			},{
				'img': 'imgIndexShow_3.jpg','title': '刘七'
			}],
			cardEdit: true
		}
	}
}
</script>

<style scoped lang="less">
.pageMember{
	
}
</style>