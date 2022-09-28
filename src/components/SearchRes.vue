<template>
	<li class="chengSearchRes" @click="$emit('chengmusic', n)">
		<div class="chengSearchResl">
			<p class="chengSearchResp1">
				{{ n.name }}
			</p>
			<p class="chengSearchResp2">
				{{ n.artists[0].name }}-
				{{ n.album.name }}
			</p>
		</div>
		<div class="chengSearchResr">
			<img src="@/assets/加载.gif" alt="" v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
			<i class="fa fa-play-circle-o" v-else aria-hidden="true"></i>
		</div>
	</li>
</template>

<script>
export default {
	name: "SearchRes",
	props: {
		n: Object,
		song: Object,
		playing: Boolean,
	},

	data() {
		return {};
	},

	mounted() {},

	methods: {},
};
</script>

<style lang="less" scoped>
.chengSearchRes {
	width: 100%;
	height: 55.5rem;
	display: flex;
	justify-content: space-between;
	box-shadow: 0 1px 0 0 #f1f1f2;
	.chengSearchResl {
		height: 55.5rem;
		padding: 8rem 0;
		.chengSearchResp1 {
			font-size: 17px;
			overflow: hidden;
			color: #507daf;
		}
		.chengSearchResp2 {
			font-size: 12px;
			color: #888;
		}
	}
	.chengSearchResr {
		color: rgb(154, 151, 151);
		font-size: 20rem;
		width: 55.5rem;
		height: 55.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		i {
			color: #aaaaaa;
		}
	}
}
</style>
