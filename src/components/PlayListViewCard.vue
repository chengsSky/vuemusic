<template>
	<li class="chengplaylist" @click="$emit('chengmusic', n)">
		<div class="playlistxhao">
			{{ i + 1 >= 10 ? i + 1 : "0" + (i + 1) }}
		</div>
		<div class="playlistgeq">
			<p class="playlistp1">
				{{ n?.name }}
				<samp>
					{{ n?.alia[0] }}
				</samp>
			</p>
			<p class="playlistp2">{{ n?.ar[0].name }}-{{ n?.al?.name }}</p>
		</div>
		<div class="playlisti">
			<img src="@/assets/加载.gif" alt="" v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
			<i class="fa fa-play-circle-o" v-else aria-hidden="true"></i>
		</div>
	</li>
</template>

<script>
export default {
	name: "PlayListViewCard",

	props: {
		n: Object,
		i: Number,
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
.chengplaylist {
	height: 55.5rem;
	display: flex;
	box-shadow: 0 1px 0 0 #f1f1f2;
	// justify-content: space-between;
	.playlistxhao {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40rem;
		height: 55.5rem;
		font-size: 16rem;
		color: rgb(127, 108, 108);
	}
	.playlistgeq {
		padding: 5rem;
		width: 295rem;
		.playlistp1 {
			font-size: 18rem;
			height: 24rem;
			overflow: hidden;
			samp {
				font-weight: 200;
			}
		}
		.playlistp2 {
			font-size: 12rem;
			color: rgb(141, 129, 129);
		}
	}
	.playlisti {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40rem;
		height: 55.5rem;
		font-size: 20rem;
		i {
			color: #aaaaaa;
		}
	}
}
</style>
