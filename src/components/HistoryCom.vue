<template>
	<div class="pageContentWrap pageHistory">
		<h4>主站 / 迎机史志</h4>
		<el-row :gutter="20">
			<el-col :span="4" class="navLeft">
				<el-menu
		      default-active="1"
		      @select="handleSelect"
		      @open="handleOpen"
		      @close="handleClose">

		      <el-menu-item index="preface">
		        <i class="el-icon-menu"></i>
		        <span slot="title">前言</span>
		      </el-menu-item>

		      <el-menu-item index="general">
		        <i class="el-icon-menu"></i>
		        <span slot="title">总述</span>
		      </el-menu-item>

		      <el-submenu index="part1">
		        <template slot="title">
		          <i class="el-icon-menu"></i>
		          <span>第一章 地理环境</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="part1-section1">地理位置</el-menu-item>
		          <el-menu-item index="part1-section2">地形地貌</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
			</el-col>
			<el-col :span="20">{{historyContentShown}}</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'HistoryCom',
	data () {
		return {
			historyContent: {
				'preface': '这里是前言。',
				'general': '这里是总述。',
				'part1-section1': '地理位置。',
				'part1-section2': '地形地貌。'
			},
			historyContentShown: '这是显示的部分。'
		}
	},
	methods: {
		handleSelect (key, keyPath) {
			console.log(key, keyPath);

			this.historyContentShown = this.historyContent[key];
		},
		handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
	}
}
</script>

<style scoped lang="less">
.pageHistory{
	.navLeft {
		.el-menu {
			text-align: left;
		}
	}
}
</style>