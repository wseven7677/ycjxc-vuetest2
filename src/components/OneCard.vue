<template>
<div class="comOneCard" @mouseenter="hoverEdit = true" @mouseleave="hoverEdit = false">

  <el-card :body-style="{ padding: '0px' }">
    <!-- <img :src="require('../assets/'+cardContent.img)" class="image"> -->
    <img :src="'/static/img/'+cardContent.img" class="image">
    <div style="padding: 14px;">
      <span v-if="!titleEditSwitch">{{cardContent.title}}</span>
      <span v-else>
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
      placeholder="选择图片"
      :placeholder-font-size="16"
      :width="411"
      :height="385"
      accept=".jpeg,.png"
      :prevent-white-space="true"
      :file-size-limit="1024 * 1024 * 2"
      @file-size-exceed="onFileSizeExceed" >
    </croppa>
    <el-button @click="handleImg" class="pBtn" type="primary" :disabled="btnUploading">更换</el-button>
  </el-dialog>
</div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'OneCard',
  props: ['cardContent'],
  data() {
    return {
      hoverEdit: false,
      titleEditContent: this.cardContent.title,
      titleEditSwitch: false,
      btnText: '',
      btnText_EDIT: '编辑描述',
      btnText_SAVE: '保存描述',
      theCroppa: {},
      dialogClipPicVisible: false,
      btnUploading: false
    }
  },
  methods: {
    handleDel() {
      if (!confirm('确定删除该项目吗？')) {
        return;
      }
      this.$emit('delEvent', {
        title: this.cardContent.title
      });
    },
    handleImg() {
      var that = this;
      that.btnUploading = true;
      setTimeout(function(){
        that.btnUploading = false;
      },5000);

      this.theCroppa.generateBlob(blob => {
        if(! blob){
          return;
        }
        this.$message({
          message: '图片开始上传了～关闭窗口不影响上传，若长时间未收到成功提示且图片未改变则请重新上传',
          showClose: true,
          duration: 4000
        });
        this.$emit('imgEvent', {
          title: this.cardContent.title,
          imgObj: blob
        });
      });
    },
    onFileSizeExceed() {
      this.$message({
        message: '图片不得超过2M',
        type: 'warning'
      });
    },
    handleText() {
      var tmpSwitch = this.titleEditSwitch;

      if (tmpSwitch) {
        
        if(this.titleEditContent.length > 8){
          this.$message({
            message: '标题不得超过8个字',
            type: 'warning'
          });
          return;
        }

        this.btnText = this.btnText_EDIT;
        // 发起传输数据：
        this.$emit('editEvent', {
          extitle: this.cardContent.title,
          title: this.titleEditContent
        });
      } else {
        this.btnText = this.btnText_SAVE;
      }
      this.titleEditSwitch = !tmpSwitch;
    }
  },
  computed: {
    oneEdit: function() {
      if (store.state.group === 'gm') {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.btnText = this.btnText_EDIT;

    // if(this.cardContent.img.split('-')[0] !== 'upload'){
    //   this.cardContent.img = 'default-error.png';
    // }
  }
}
</script>

<style scoped lang="less">
.comOneCard {

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
