<template>
	<li @click="$emit('click')">
		<div class="box">
			<i class="fa fa-search" aria-hidden="true"></i>
		</div>
		{{ n.keyword }}
	</li>
</template>

<script>
export default {
	name: "SearchSuggestss",
	props: {
		n: Object,
	},

	data() {
		return {};
	},

	mounted() {},

	methods: {},
};
</script>

<style lang="less" scoped>
li {
	display: flex;
	line-height: 45rem;
	box-shadow: 0 1rem 0 0 rgb(242, 242, 242);

	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45rem;
		height: 45rem;
		color: rgb(182, 180, 180);
	}
}
</style>
