<template>
	<li>
		<div class="historyl" @click="$emit('clickl')">
			<i class="fa fa-clock-o" aria-hidden="true"></i>
			{{ n }}
		</div>
		<div class="historyr" @click="$emit('clickr')">
			<i class="fa fa-times" aria-hidden="true"></i>
		</div>
	</li>
</template>

<script>
export default {
	// name: "Songhistory",
	name: "chengHistory",
	props: {
		n: String,
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
	line-height: 45rem;
	box-shadow: 0 1rem 0 0 rgb(242, 242, 242);
	position: relative;
	.historyl {
		& > i {
			margin-right: 10rem;
		}
	}
	.historyr {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45rem;
		height: 45rem;
		color: rgb(182, 180, 180);
	}
}
</style>
