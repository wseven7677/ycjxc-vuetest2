<template>
	<div class="comCard">

		<el-pagination
	    layout="prev, pager, next"
	    :page-size="defaultPageSize"
	    :total="cardData.length"
	    :current-page="currentPageName"
	    @current-change="funPageChange">
	  </el-pagination>

		<el-row :gutter="20">
			<el-col :span="4" v-for="item in currentPageCardData">
				<OneCard
					:cardContent="item"
					:oneEdit="editAuth" />
			</el-col>
		</el-row>

		<el-pagination
	    layout="prev, pager, next"
	    :page-size="defaultPageSize"
	    :total="cardData.length"
	    :current-page="currentPageName"
	    @current-change="funPageChange">
	  </el-pagination>

		<CardView
			v-if="boolView"
			:viewData="cardData[0]" />
	</div>
</template>

<script>
import OneCard from './OneCard'
import CardView from './CardView'

export default {
	name: 'CardCollection',
	props: ['cardData', 'editAuth'],
	components: {
		OneCard,
		CardView
	},
	data () {
		var cardDataLen = this.cardData.length,
				tmpPageSize = 6 * 3;

		return {
			boolView: false,
			currentPageName: 1,
			defaultPageSize: tmpPageSize,
			currentPageCardData: this.cardData.slice(0,cardDataLen>tmpPageSize?tmpPageSize:cardDataLen)
		}
	},
	methods: {
		funPageChange (val) {
			console.log(val);
			var tmpCardData = this.cardData,
					tmpPageSize = this.defaultPageSize,
					pageStart = (val - 1)* tmpPageSize,
					pageEnd = val * tmpPageSize;

			this.currentPageCardData = tmpCardData.slice(pageStart,pageEnd);
		}
	}
}
</script>

<style scoped lang="less">
.comCard{
	.el-pagination {
		text-align: center;
		margin: 20px 0;
	}
}
</style>