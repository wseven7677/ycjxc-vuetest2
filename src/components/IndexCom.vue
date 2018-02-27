<template>
	<div class="pageIndex">

		<el-carousel height="300px">
      <el-carousel-item v-for="item in imgCarousel" :key="item">
        <img :src="require('../assets/'+item)" alt="">
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="20" class="partText">
      <el-col :span="16"><div><Latest/></div></el-col>
      <el-col :span="8">
        <div class="partIntro grid-content">
          <h2>黑龙江省迎春机械厂</h2>
          <p>
            1949年天津解放后，我人民解放军四野特种兵后勤部接收国民党联合勤务总司令部第七汽车三级修理厂，为四野特种兵军械处汽车修理厂，奠定了工厂的前身，之后即随军转战南北，同年七月南下到武汉，1950年北上哈尔滨，1951年迁厂本溪，为东北军区车管部汽车修配四厂，1952年驻沈阳市部队所属的六个小型汽车修配厂合并，为东北军区车管部汽车修配三厂，1953年11月以三厂为基础三，四两厂合并，四厂前往沈阳，为沈阳军区后勤部沈阳汽车修理厂，1958年4月，为发展我国的农机事业，军委总后勤部决定移交农垦部领导，为农垦部沈阳拖拉机配件厂。从此，由军工生产修理汽车转变为机械制造，为全国新疆、黑龙江、海南岛等各大垦区服务。
          </p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="partIndexShow">
      <h1>黑龙江省迎春机械厂</h1>
      <p class="textWelcome">欢迎您回家</p>
      <el-col :span="6"><img class="imgIndexShow" src="../assets/imgIndexShow_1.jpg" alt="">
      <p>查阅工厂史志</p></el-col>
      <el-col :span="6"><img class="imgIndexShow" src="../assets/imgIndexShow_2.jpg" alt="">
      <p>回顾辉煌过去</p></el-col>
      <el-col :span="6"><img class="imgIndexShow" src="../assets/imgIndexShow_3.jpg" alt="">
      <p>留住精彩瞬间</p></el-col>
      <el-col :span="6"><img class="imgIndexShow" src="../assets/imgIndexShow_4.jpg" alt="">
      <p>凝聚职工力量</p></el-col>
    </el-row>

	</div>
</template>

<script>
import Latest from './Latest'

export default {
	name: 'IndexCom',
	components: {
		Latest
	},
	data () {
		return {
			imgCarousel: ['carousel_1.jpg','carousel_2.jpg','carousel_3.jpg']
		}
	}
}
</script>

<style scoped lang="less">
.pageIndex{

	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

    padding: 30px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 36px;

    padding: 10px;
  }

  .partIndexShow {
    text-align: center;

    .imgIndexShow {
      border-radius: 50%;

      width: 240px;
    }

    p {
      margin-top: 20px;
    }

    h1 {
      font-size: 45px;
    }
    .textWelcome {
      font-size: 24px;
      margin: 30px 0;
    }
  }

  .partText {
    .el-col {
      text-align: left;
    }
  }

  .partIntro {
    h2 {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>