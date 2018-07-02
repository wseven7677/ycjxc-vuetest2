<template>
<div class="comBook">

  <!-- 管理员栏 -->
  <div v-if="bookEditSwitch">
    <ul>注意事项：
      <li>所有的改动只会在点击保存后提示“更改成功”之后才生效，所以如果改一半不想改了点击取消就可以还原了</li>
      <li>编辑正文时，如果不想编辑了，再去点一次那个按钮就好了。</li>
      <li>【添加项目的圆形按钮】的作用是：在该项后面添加一个跟该项同级的项目。所以如果想添加子项，请去右侧按钮里找。</li>
    </ul>
    <div class="partEdit">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <span class="el-icon-edit-outline"></span>
                <span>编辑页面区域内容</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加一个子项</el-dropdown-item>
              <el-dropdown-item command="edit">编辑正文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </div>
    <div class="part-post">
         <el-button size="mini" type="primary" @click="postData">保存</el-button>
         <el-button size="mini" @click="queryData;editState=false;">取消</el-button>
    </div>
  </div>

  <!-- 正文显示内容区域 -->
  <el-row :gutter="24">
    <el-col :span="4" class="navLeft">
      <el-menu default-active="1"
               @select="handleSelect"
               @open="handleOpen">

        <!-- 根据数据结构自动生成目录侧栏结构： -->
        <span v-for="(partItem, itemId) in bookContent">
                <div v-if="partCheck(partItem)">
                  <el-popover placement="right"
                              trigger="hover"
                              :disabled="!bookEditSwitch" >

                    <el-menu-item :index="partItem.tag"
                                  slot="reference" >
                                  <i class="el-icon-menu"></i>
                                  <span slot="title">{{partItem.title}}</span>
                    </el-menu-item>

                    <div class="popover-edit-content">
                      <el-button size="mini" @click="handlePopoverClickAppend(itemId, bookContent)" type="primary" icon="el-icon-plus" circle></el-button>
                      <el-button size="mini" @click="handlePopoverClickEditTitle(partItem)" type="success" icon="el-icon-edit" circle></el-button>
                      <el-button size="mini" @click="handlePopoverClickDelete(itemId, bookContent)" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>

                  </el-popover>
                </div>
                <div v-else>
                  <el-submenu :index="partItem.tag">
                    <template slot="title">
                        <el-popover placement="right"
                                    trigger="hover"
                                    :disabled="!bookEditSwitch" >
                            <span slot="reference">
                              <i class="el-icon-menu"></i>
                              <span>{{partItem.title}}</span>
                            </span>
                            <div class="popover-edit-content">
                              <el-button size="mini" @click="handlePopoverClickAppend(itemId, bookContent)" type="primary" icon="el-icon-plus" circle></el-button>
                              <el-button size="mini" @click="handlePopoverClickEditTitle(partItem)" type="success" icon="el-icon-edit" circle></el-button>
                              <el-button size="mini" @click="handlePopoverClickDelete(itemId, bookContent)" type="danger" icon="el-icon-delete" circle></el-button>
                            </div>
                        </el-popover>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item v-for="(sectionItem, sectionId) in partItem.content" :index="sectionItem.tag">
                        <el-popover placement="right" trigger="hover" :disabled="!bookEditSwitch">
                          <span slot="reference">
                                              {{sectionItem.title}}
                                            </span>
                          <div class="popover-edit-content">
                            <el-button size="mini" @click="handlePopoverClickAppend(sectionId, partItem.content)" type="primary" icon="el-icon-plus" circle></el-button>
                            <el-button size="mini" @click="handlePopoverClickEditTitle(sectionItem)" type="success" icon="el-icon-edit" circle></el-button>
                            <el-button size="mini" @click="handlePopoverClickDelete(sectionId, partItem.content)" type="danger" icon="el-icon-delete" circle></el-button>
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
   <el-col :span="20">
       <span v-if="typeof currentBook.content === 'string' && !editState">
           {{currentBook.content}}
       </span>
       <el-input v-if="typeof currentBook.content === 'string' && editState"
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-model="currentBook.content">
        </el-input>
   </el-col>
 </el-row>

</div>
</template>

<script>
import store from '../store/store'
import utils from '../utils/index'
import uuidv4 from 'uuid/v4'

export default {
  name: 'BookCollection',
  props: ['contentApi'],
  data() {
    return {
      bookContent: {},
      currentBook: {},
      editState: false // 正文编辑状态
    }
  },
  created() {
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
    handleCommand(val) {
      if (val === 'add') {
        this.handleAddSubItem();
      } else if (val === 'edit') {
        this.handleEditPage();
      }
    },
    handleAddSubItem() {
      let currentContent = this.currentBook.content;

      if (typeof currentContent === 'string') {
        this.$confirm('添加子项会导致当前文本内容丢失, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentBook.content = [];
          this.currentBook.content.push({
            title: 'new one',
            tag: uuidv4(),
            content: ''
          });
        })
      }
      if (typeof currentContent === 'object') {
        this.currentBook.content.push({
          title: 'new one',
          tag: uuidv4(),
          content: ''
        });
      }

    },
    handleEditPage() {
      this.editState = !this.editState;
    },
    handlePopoverClickAppend(childId, parentnode) {
      parentnode.splice(childId + 1, 0, {
        title: 'new one',
        tag: uuidv4(),
        content: ''
      });
      // this.postData();
    },
    handlePopoverClickEditTitle(childnode) {
      this.$prompt('请输入新的标题', '旧标题：' + childnode.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,8}/,
        inputErrorMessage: '字数在1-8区间内'
      }).then(({
        value
      }) => {
        childnode.title = value;
        // this.postData();
      });
    },
    handlePopoverClickDelete(childId, parentnode) {
      this.$confirm('此操作将永久删除' + parentnode[childId].title + '及其内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        parentnode.splice(childId, 1);
        // this.postData();
      });
    },

    handleSelect(key, keyPath) {
      this.bfs(this.bookContent, (one) => {
        if (one.tag === key && typeof one.content === 'string') {
          this.currentBook = one;
        }
      });
    },
    handleOpen(key) {
      this.bfs(this.bookContent, (one) => {
        if (one.tag === key) {
          this.currentBook = one;
        }
      });
    },

    partCheck(item) {
      var tp = typeof item.content;
      if (tp === 'object') {
        return false; // submenu的item
      } else if (tp === 'string') {
        return true; // 普通item
      } else {
        return true;
      }
    },

    postData() {
      utils.ajax('/api/book4' + this.contentApi, resd => {
        if (resd) {
          this.$message({
            message: '更改成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '啊哦，出现问题了',
            type: 'danger'
          });
        }
        this.queryData();
      }, 'post', this.bookContent);
    },
    queryData() {
      let that = this;
      utils.ajax('/api' + this.contentApi, resd => {
        that.bookContent = resd;
      });
    },
    /**
     * 优先广度遍历bfs
     * @param  {Object}   obj      被遍历的对象
     * @param  {Function} callback 对每个项目对具体处理
     * @return {Null}            已直接对object中对项目进行了修改
     */
    bfs(obj, callback) {
      var tmpQueue = [], // 遍历用临时队列
        tmpPointer = {}; // 遍历用临时指针

      // 队列添加初始元素
      obj.forEach(function(oneSub) {
        tmpQueue.push(oneSub);
      });

      // 遍历循环
      while (tmpQueue.length > 0) {
        // 临时指针得到队列中的第一项
        tmpPointer = tmpQueue.shift();
        // 如果该项目仍含有子目录，将子目录加入遍历队列
        if (typeof tmpPointer.content === 'object') {
          tmpPointer.content.forEach(function(oneSub) {
            tmpQueue.push(oneSub);
          });
        }
        // 具体操作
        callback(tmpPointer);
      }
    },
  }
}
</script>

<style scoped lang="less">
.comBook {
    .navLeft {
        .el-menu {
            text-align: left;
        }
    }

    .partEdit {
        float: right;
        cursor: pointer;
        margin: 10px 0;
    }
    .part-post {
        margin: 10px 0;
    }

}
.popover-edit-content {
    text-align: center;
}
</style>
