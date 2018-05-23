<template>
	<div class="comBook">

    <!-- 管理员栏 -->
    <div v-if="bookEditSwitch">
      <div class="partEdit" @click="handleEditPageContent">
        <span class="el-icon-edit-outline"></span>
        <span>编辑本页内容</span>
      </div>
      <ul>注意事项：
        <li>第一条注意事项</li>
        <li>第二条注意事项</li>
      </ul>
    </div>

    <!-- 正文显示内容区域 -->
    <el-row :gutter="24">
			<el-col :span="4" class="navLeft">
				<el-menu
		      default-active="1"
		      @select="handleSelect"
		      @open="handleOpen"
		      @close="handleClose">

          <!-- 根据数据结构自动生成目录侧栏结构： -->
          <span v-for="partItem in bookContent">
            <div v-if="partCheck(partItem)">
              <el-popover
                placement="right"
                trigger="hover"
                :disabled="!bookEditSwitch" >

                <el-menu-item
                  :index="partItem.tag"
                  slot="reference" >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{partItem.title}}</span>
                </el-menu-item>

                <div class="popover-edit-content">
                  <el-button @click="handlePopoverClickAppend" type="primary" icon="el-icon-plus" circle></el-button>
                  <el-button @click="handlePopoverClickEditTitle" type="success" icon="el-icon-edit" circle></el-button>
                  <el-button @click="handlePopoverClickDelete" type="danger" icon="el-icon-delete" circle></el-button>
                </div>

              </el-popover>
            </div>
            <div v-else>
              <el-submenu :index="partItem.tag">
                  <template slot="title">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :disabled="!bookEditSwitch" >
                    <span slot="reference">
                      <i class="el-icon-menu"></i>
                      <span>{{partItem.title}}</span>
                    </span>
                    <div class="popover-edit-content">
                      <el-button @click="handlePopoverClickAppend" type="primary" icon="el-icon-plus" circle></el-button>
                      <el-button @click="handlePopoverClickEditTitle" type="success" icon="el-icon-edit" circle></el-button>
                      <el-button @click="handlePopoverClickDelete" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                    </el-popover>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="sectionItem in partItem.content"
                      :index="sectionItem.tag" >
                      <el-popover
                        placement="right"
                        trigger="hover"
                        :disabled="!bookEditSwitch" >
                        <span slot="reference">
                          {{sectionItem.title}}
                        </span>
                        <div class="popover-edit-content">
                          <el-button @click="handlePopoverClickAppend" type="primary" icon="el-icon-plus" circle></el-button>
                          <el-button @click="handlePopoverClickEditTitle" type="success" icon="el-icon-edit" circle></el-button>
                          <el-button @click="handlePopoverClickDelete" type="danger" icon="el-icon-delete" circle></el-button>
                        </div>
                      </el-popover>
                    </el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
            </div>
          </span>

		    </el-menu>
			</el-col>
      <!-- 具体内容区 -->
			<el-col :span="20">{{contentShown}}</el-col>
		</el-row>
	</div>
</template>

<script>
import store from '../store/store'
import utils from '../utils/index'

export default {
	name: 'BookCollection',
  props:['contentApi'],
	data () {
		return {
      bookContent: {},
      contentShown: '欢迎阅读史志。',
      newBook: {

      }
		}
	},
  created () {
    this.queryData();
  },
  computed: {
    bookEditSwitch: function() {
      if (store.state.group === 'gm') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleEditPageContent () {

    },
    handlePopoverClickAppend() {},
    handlePopoverClickEditTitle() {},
    handlePopoverClickDelete() {},

    handleSelect (key, keyPath) {

      var tmpValues = [],
          tmpContent = '',
          tmpPath = keyPath.slice();

      // 深度优先 遍历
      this.bookContent.forEach(function (value) {
        tmpValues.push(value);
      });
      while (tmpValues.length > 0) {
        if(tmpValues[0].tag === tmpPath[0]){
          tmpPath.shift();
          tmpContent = tmpValues[0].content;
          tmpValues.shift();
          if(typeof tmpContent === 'object'){
            tmpContent.forEach(function(val){
              tmpValues.unshift(val);
            });
          }else {
            this.contentShown = tmpContent;
            break;
          }
        }else {
          tmpValues.shift();
        }
      }

		},
		handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },

    partCheck (item) {
      var tp = typeof item.content;
      if(tp === 'object') {
        return false; // submenu的item
      }else if (tp === 'string') {
        return true; // 普通item
      }else {
        return true;
      }
    },
    queryData () {
      utils.ajax('/api' + this.contentApi, resd => {
        this.bookContent = resd;
      });
    }
  }
}
</script>

<style scoped lang="less">
.comBook{
  .navLeft {
		.el-menu {
			text-align: left;
		}
	}

  .partEdit {
    float: right;
    cursor: pointer;
  }

}
.popover-edit-content {
  text-align: center;
}
</style>
