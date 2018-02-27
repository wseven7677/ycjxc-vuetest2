<template>
	<div 
		class="comOneCard"
		@mouseenter="handleHover"
		@mouseleave="handleHover">

		<el-card :body-style="{ padding: '0px' }">
      <img :src="require('../assets/'+cardContent.img)" class="image">
      <div style="padding: 14px;">
        <span>{{cardContent.title}}</span>
      </div>
    </el-card>

    <div class="partEdit" v-if="oneEdit && hoverEdit">
    	<span class="edit-del" @click="handleDel">删除</span>
    	<span class="edit-change-img" @click="handleImg">更换图片</span>
    	<span class="edit-text" @click="handleText">编辑描述</span>
    </div>

	</div>
</template>

<script>
export default {
	name: 'OneCard',
	props: ['cardContent', 'oneEdit'],
	data () {
		return {
			hoverEdit: false
		}
	},
	methods: {
		handleHover () {
			var tmpHover = this.hoverEdit;
			this.hoverEdit = ! tmpHover;
		},
		handleDel () {
			if(!confirm('确定删除该项目吗？')){
				return;
			}
			alert('deleted.');
		},
		handleImg () {},
		handleText () {
			
		}
	}
}
</script>

<style scoped lang="less">
.comOneCard{

	position: relative;

  .image {
    width: 100%;
    display: block;
  }

  .el-card {
  	margin-bottom: 10px;
  }

  .partEdit {
  	position: absolute;
  	top: 5px;
  	right: 5px;

  	text-align: right;

  	span {
  		cursor: pointer;
  		font-size: 14px;
  		display: block;
  	}
		.edit-del {
			color: #F56C6C;
		}
		.edit-change-img {
			color: #67C23A;
		}
		.edit-text {
			color: #409EFF;
		}
  }
}
</style>