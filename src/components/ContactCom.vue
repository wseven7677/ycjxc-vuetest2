<template>
	<div class="pageContact">
		<el-card>
			<p>
				如果您对本站有任何建议请发送邮件至ycjxc@126.com，管理员会尽快处理，谢谢您的配合。
			</p>
			<hr>
			<p>
				您可能会因为以下原因需要联系管理员：
				<ul>
					<li>“迎机人物”人员增补</li>
					<li>“迎机图片”增加</li>
					<li>相关内容转载授权</li>
					<li>网站功能改进建议</li>
					<li>其他任何您认为需要联系管理员的事宜</li>
				</ul>
			</p>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'ContactCom',
	data () {
		return {

		}
	}
}
</script>

<style scoped lang="less">
.pageContact{
	.el-card {
		font-size: 14px;
		text-align: left;
		width: 90%;
		padding: 20px;
		margin: 30px;

		hr {
			margin: 5px 0;
		}
	}
}
</style>