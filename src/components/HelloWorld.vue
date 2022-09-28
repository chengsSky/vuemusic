<template>
	<li
		class="home-card"
		@click="$router.push({ path: '/playlist', query: { id: i.id } })">
		<img :src="i.picUrl" alt="" />
		<h5>{{ i.name }}</h5>
	</li>
</template>

<script>
export default {
	name: "HelloWorld",
	props: {
		i: Object,
	},
	data() {
		return {
			property: "value",
		};
	},
};
</script>

<style scoped lang="less">
.home-card {
	width: 33%;
	height: 33%;
	margin-bottom: 15rem;
	img {
	}
}
</style>
