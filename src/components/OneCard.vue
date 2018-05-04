<template>
	<div
		class="comOneCard"
		@mouseenter="hoverEdit = true"
		@mouseleave="hoverEdit = false">

		<el-card :body-style="{ padding: '0px' }">
      <img :src="require('../assets/'+cardContent.img)" class="image">
      <div style="padding: 14px;">
        <span v-if="!titleEditSwitch" >{{cardContent.title}}</span>
        <span v-else >
          <el-input
            v-model="titleEditContent" >
          </el-input>
        </span>
      </div>
    </el-card>

		<!-- 工具栏 -->
    <div class="partEdit" v-if="oneEdit && hoverEdit">
    	<span class="edit-del" @click="handleDel">删除</span>
    	<span class="edit-change-img" @click="dialogClipPicVisible = true">更换图片</span>
    	<span class="edit-text" @click="handleText">{{btnText}}</span>
    </div>
    <!-- 图片剪裁工具 -->
    <el-dialog class="partClipPic" title="更换图片" :visible.sync="dialogClipPicVisible">
      <croppa
      v-model="theCroppa"
      :width="411"
      :height="385"
      placeholder="选择图片"
      :placeholder-font-size="16"
      :prevent-white-space="true" >
    </croppa>
    <el-button @click="handleImg" class="pBtn" type="primary">更换</el-button>
    </el-dialog>
	</div>
</template>

<script>
import store from '../store/store'

export default {
	name: 'OneCard',
	props: ['cardContent'],
	data () {
		return {
			hoverEdit: false,
      titleEditContent: this.cardContent.title,
      titleEditSwitch: false,
      btnText: '',
      btnText_EDIT: '编辑描述',
      btnText_SAVE: '保存描述',
      theCroppa: {},
      dialogClipPicVisible: false
		}
	},
	methods: {
    handleDel () {
    	if(!confirm('确定删除该项目吗？')){
    		return;
    	}
      this.$emit('delEvent',{title: this.cardContent.title});
    },
    handleImg () {
      this.theCroppa.generateBlob(blob => {
        var url = URL.createObjectURL(blob)
        console.log(url)
      }, 'image/jpeg', 1);
    },
		handleText () {
      var tmpText = this.titleEditSwitch;

      if(tmpText) {
        this.btnText = this.btnText_EDIT;
        // 发起传输数据：
        this.$emit('editEvent',{
          extitle: this.cardContent.title,
          title: this.titleEditContent
        });
      }else {
        this.btnText = this.btnText_SAVE;
      }
      this.titleEditSwitch = ! tmpText;
		}
	},
  computed: {
    oneEdit: function () {
      if(store.state.group === 'gm') {
        return true;
      }else {
        return false;
      }
    }
  },
  created () {
    this.btnText = this.btnText_EDIT;
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

  .partClipPic {
    .pBtn {
      margin: 50px;
    }
  }
}
</style>
