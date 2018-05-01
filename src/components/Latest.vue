<template>
	<div class="partLatest">
		<h2>新闻</h2>
		<el-row v-for="item in latestData" :key="item.newsTime">
		  <el-col :span="24">
        <el-card>
          <span class="news-title">{{item.newsTitle}}</span>
          <span class="news-time">{{item.newsTime}}</span>
        </el-card>
      </el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'Latest',
	data () {
		return {
      latestData: [{
        'newsTitle': '热烈庆祝网站搭建了差不多一小半儿了！',
        'newsTime': '2018.2.27 14:05'
      },{
        'newsTitle': '标题2',
        'newsTime': '2018.2.27 14:06'
      }]
		}
	}
}
</script>

<style scoped lang="less">
.partLatest{
	h2 {
		margin-bottom: 20px;
	}

  .el-col {
    text-align: left;
    margin-bottom: 10px;
  }

  .news {
    &-title {
      font-size: 18px;
      line-height: 24px;
    }
    &-time {
      font-size: 12px;
      color: #888;

      float: right;
      line-height: 24px;
    }
  }
}
</style>
