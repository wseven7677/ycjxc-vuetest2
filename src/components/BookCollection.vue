<template>
	<div class="comBook">
    <el-row :gutter="20">
			<el-col :span="4" class="navLeft">
				<el-menu
		      default-active="1"
		      @select="handleSelect"
		      @open="handleOpen"
		      @close="handleClose">

<!-- 根据数据结构自动生成目录侧栏结构： -->
          <span v-for="partItem in bookContent">
            <el-menu-item v-if="partCheck(partItem)" :index="partItem.tag">
              <i class="el-icon-menu"></i>
              <span slot="title">{{partItem.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="partItem.tag">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{partItem.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="sectionItem in partItem.content" :index="sectionItem.tag">{{sectionItem.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </span>

		    </el-menu>
			</el-col>
			<el-col :span="20">{{contentShown}}</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'BookCollection',
  props:['bookContent'],
	data () {
		return {
      contentShown: 'wel.'
		}
	},
  computed: {

  },
  methods: {
    handleSelect (key, keyPath) {
			// console.log(key, keyPath);

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
}
</style>
