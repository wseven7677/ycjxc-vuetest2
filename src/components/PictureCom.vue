<template>
	<div class="pageContentWrap pagePicture">
		<h4>主站 / 迎机图片</h4>
		<CardCollection :cardData="cardPicData" :editAuth="cardEdit" />
	</div>
</template>

<script>
import CardCollection from './CardCollection'
import utils from '../utils/index'

export default {
	name: 'PictureCom',
	components: {
		CardCollection
	},
	data () {
		return {
			cardPicData: [],
			cardEdit: true
		}
	},
	methods: {
		queryData () {
			utils.ajax('/mock/pictures',resd => {
				// console.log(resd);
				this.cardPicData = resd;
			});
		}
	},
	created () {
		this.queryData();
	}
}
</script>

<style scoped lang="less">
.pagePicture{

}
</style>
