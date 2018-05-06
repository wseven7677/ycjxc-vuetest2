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
          @delEvent="handleEventDel"
          @imgEvent="handleEventImg" />
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
import utils from '../utils/index'

export default {
	name: 'CardCollection',
	props: ['apiUrl'],
	components: {
		OneCard
	},
	data () {
		var tmpPageSize = 6 * 3;

		return {
      cardData: [],
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
      utils.ajax('/api' + this.apiUrl,resd => {
        this.queryData();
      },'post',{
        demand: 'a' // m-modify, a-add, d-delete, q-query
      });
    },
    handleEventImg (payload) {

      // ajax. todo
    },
    handleEventEdit (payload) {
      if(payload.extitle === payload.title) {
        return;
      }
      utils.ajax('/api' + this.apiUrl,resd => {
        this.queryData();
      },'post',{
        extitle: payload.extitle,
        title: payload.title,
        demand: 'm' // m-modify, a-add, d-delete, q-query
      });
    },
    handleEventDel (payload) {
      utils.ajax('/api' + this.apiUrl,resd => {
        if(resd){
          alert('删除成功。');
        }else {
          alert('删除失败。');
        }
        this.queryData();
      },'post',{
        title: payload.title,
        demand: 'd' // m-modify, a-add, d-delete, q-query
      });
    },
    queryData () {
      utils.ajax('/api' + this.apiUrl,resd => {
        // console.log(resd);
        this.cardData = resd;
      });
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
	},
  created () {
		this.queryData();
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
