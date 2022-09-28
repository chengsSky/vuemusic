<template>
	<li @click="$emit('chengmusic', i)">
		<div>{{ i.name }}</div>
		<div class="chengx">
			<div class="chengbg"></div>
			{{ i.song.album.artists[0].name }}-{{ i.song.album.name }}
		</div>
		<div class="box">
			<img src="@/assets/加载.gif" alt="" v-if="playing && song?.id === i?.id" />
			<i class="fa fa-play-circle-o" aria-hidden="true" v-else></i>
		</div>
	</li>
</template>

<script>
export default {
	name: "SongCard",
	props: {
		i: Object,
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
li {
	height: 55.5rem;
	font-size: 14rem;
	padding: 10rem 5rem;
	box-shadow: 0 1px 0 0 #f1f1f2;
	position: relative;
	div {
		overflow: hidden;
	}
	.chengx {
		overflow: hidden;
		font-size: 10rem;
		text-align: left;
		.chengbg {
			background-image: url(@/assets/index_icon_2x.png);
			background-size: 166px 97px;
			width: 12rem;
			height: 8rem;
			margin-left: 4rem;
			display: inline-block;
		}
	}
	.box {
		img {
			position: absolute;
			right: 15rem;
			top: 20rem;
			width: 30rem;
			height: 30rem;
		}
		i {
			position: absolute;
			right: 15rem;
			top: 20rem;
			font-size: 28rem;
			color: #aaaaaa;
		}
	}
}
</style>
