<template>
	<div class="pageContentWrap pageMember">
		<h4>主站 / 迎机人物</h4>
		<CardCollection
      :cardData="cardMemData"
      @cardEditEvent="handleEventEdit"
      @cardDelEvent="handleEventDel"
      @cardAddNewEvent="handleEventAdd"
    />
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
		},
    handleEventEdit (payload) {
      // console.log(payload);
      utils.ajax('/api/members',resd => {
        this.queryData();
      },'post',{
        extitle: payload.extitle,
        title: payload.title,
        demand: 'm' // m-modify, a-add, d-delete, q-query
      });
    },
    handleEventDel (payload) {
      utils.ajax('/api/members',resd => {
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
    handleEventAdd () {
      utils.ajax('/api/members',resd => {
        this.queryData();
      },'post',{
        demand: 'a' // m-modify, a-add, d-delete, q-query
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
