<template>
	<div class="pageContentWrap pagePicture">
		<h4>主站 / 迎机图片</h4>
		<CardCollection :cardData="cardPicData" @cardEditEvent="handleEventEdit" />
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
			cardPicData: []
		}
	},
	methods: {
		queryData () {
			utils.ajax('/api/pictures',resd => {
				// console.log(resd);
				this.cardPicData = resd;
			});
		},
    handleEventEdit (payload) {
      // console.log(payload);

      utils.ajax('/api/pictures',resd => {
        this.queryData();
      },'post',{
        extitle: payload.extitle,
        title: payload.title,
        demand: 'm' // m-modify, a-add, d-delete, q-query(default)
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
