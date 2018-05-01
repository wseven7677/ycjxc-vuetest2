<template>
	<div class="comCard">
		<!-- 分页页码 上 -->
		<el-pagination
	    layout="prev, pager, next"
	    :page-size="defaultPageSize"
	    :total="cardData.length"
	    :current-page="currentPageName"
	    @current-change="funPageChange">
	  </el-pagination>
		<!-- card集合区 -->
		<el-row :gutter="20">
			<el-col :span="4" v-for="item in currentPageCardData" :key="item.title">
				<OneCard
					:cardContent="item" />
			</el-col>
		</el-row>
		<!-- 分页页码 下 -->
		<el-pagination
	    layout="prev, pager, next"
	    :page-size="defaultPageSize"
	    :total="cardData.length"
	    :current-page="currentPageName"
	    @current-change="funPageChange">
	  </el-pagination>
		<!-- 点击预览 doing（相当于将预览内容传给预览器CardView） -->
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
	props: ['cardData'],
	components: {
		OneCard,
		CardView
	},
	data () {
		var tmpPageSize = 6 * 3;

		return {
			boolView: false,
			currentPageName: 1,
			defaultPageSize: tmpPageSize,
			pageStart: 0
		}
	},
	methods: {
		funPageChange (val) {
			console.log(val);
			var tmpCardData = this.cardData,
					tmpPageSize = this.defaultPageSize,
					tmpPageStart = (val - 1)* tmpPageSize;

			// 切换页面只改变pageStart：
			this.pageStart = tmpPageStart;
		}
	},
	computed: {
		currentPageCardData: function () {
			return this.cardData.slice(this.pageStart,this.pageEnd);
		},
		pageEnd: function () {
			var cardDataLen = this.cardData.length,
					tmpPageSize = this.defaultPageSize,
					theSize;
			theSize = cardDataLen>tmpPageSize?tmpPageSize:cardDataLen;
			return this.pageStart + theSize;
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
