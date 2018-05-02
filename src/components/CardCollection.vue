<template>
	<div class="comCard">
    <div v-if="cardEditSwitch" class="partEdit" @click="funAddNewCard">
      <span class="el-icon-circle-plus-outline"></span>
      <span>添加一项</span>
    </div>
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
					:cardContent="item"
          @editEvent="handleEventEdit"
          @delEvent="handleEventDel" />
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

	</div>
</template>

<script>
import OneCard from './OneCard'
import store from '../store/store'

export default {
	name: 'CardCollection',
	props: ['cardData'],
	components: {
		OneCard
	},
	data () {
		var tmpPageSize = 6 * 3;

		return {
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
		},
    funAddNewCard () {
      this.$emit('cardAddNewEvent');
    },
    handleEventEdit (payload) {
      this.$emit('cardEditEvent',payload);
    },
    handleEventDel (payload) {
      this.$emit('cardDelEvent',payload);
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
		},
    cardEditSwitch: function () {
      if(store.state.group === 'gm') {
        return true;
      }else {
        return false;
      }
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

  .partEdit {
    float: right;
    cursor: pointer;
  }
}
</style>
