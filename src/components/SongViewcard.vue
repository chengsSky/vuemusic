<template>
	<li class="SongView-card" @click="$emit('click')">
		{{ n.first }}
	</li>
</template>

<script>
export default {
	name: "SongViewcard",
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
.SongView-card {
	border-color: #d3d4da;
	border-radius: 32rem;
	border: 1rem solid rgb(186, 186, 186);
	height: 32rem;
	margin-right: 8rem;
	margin-bottom: 8rem;
	padding: 0 14rem;
	font-size: 14rem;
	line-height: 32rem;
	color: #333;
}
</style>
