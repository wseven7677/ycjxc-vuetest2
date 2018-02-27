<template>
	<div class="pageContentWrap pagePicture">
		<h4>主站 / 迎机图片</h4>
		<CardCollection :cardData="cardPicData" :editAuth="cardEdit" />
	</div>
</template>

<script>
import CardCollection from './CardCollection'

export default {
	name: 'PictureCom',
	components: {
		CardCollection
	},
	data () {
		return {
			cardPicData: [{
				'img': 'imgIndexShow_1.jpg','title': 'aaa'
			},{
				'img': 'imgIndexShow_2.jpg','title': 'bbb'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_2.jpg','title': 'bbb'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_2.jpg','title': 'bbb'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			},{
				'img': 'imgIndexShow_3.jpg','title': 'ccc'
			}],
			cardEdit: true
		}
	}
}
</script>

<style scoped lang="less">
.pagePicture{
	
}
</style>