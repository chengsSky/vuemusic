<template>
	<ul class="ChengAudiolist">
		<!-- 搜索结果组件数据 -->
		<template v-if="chenglistsj?.songCount == 600">
			<li
				v-for="n in chenglistsj.songs"
				:key="n.id"
				@click.stop="$emit('chengmusic', n)"
				:class="{ ChengAudiolistgaol: song.id === n.id }">
				<div class="ChengAudiolistl">
					{{ n.name }}
				</div>
				<div class="ChengAudiolistr">
					<img src="@/assets/加载.gif" alt="" v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
					<i class="fa fa-play-circle" aria-hidden="true" v-else></i>
				</div>
			</li>
		</template>
		<!-- 歌单数据 -->
		<!-- <template v-else-if="chenglistsj[0]?.al?.name">
			<li
				v-for="n in chenglistsj"
				:key="n.id"
				@click.stop="$emit('chengmusic', n)"
				:class="{ ChengAudiolistgaol: song.id === n.id }">
				<div class="ChengAudiolistl">
					{{ n.name }}
				</div>
				<div class="ChengAudiolistr">
					<img src="@/assets/加载.gif" alt="" v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
					<i class="fa fa-play-circle" aria-hidden="true" v-else></i>
				</div>
			</li>
		</template> -->
		<!-- 最新音乐数据 -->
		<template v-else>
			<li
				v-for="n in chenglistsj"
				:key="n.id"
				@click.stop="$emit('chengmusic', n)"
				:class="{ ChengAudiolistgaol: song.id === n.id }">
				<div class="ChengAudiolistl">
					{{ n.name }}
				</div>
				<div class="ChengAudiolistr">
					<img src="@/assets/加载.gif" alt="" v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
					<i class="fa fa-play-circle" aria-hidden="true" v-else></i>
				</div>
			</li>
		</template>
	</ul>
</template>

<script>
export default {
	name: "ChengAudiolist",
	props: {
		chenglistsj: [Array, Object],
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
.ChengAudiolist {
	position: fixed;
	bottom: 100rem;
	left: 0;
	width: 375rem;
	height: 300rem;
	border-radius: 10rem 10rem 0 0;
	padding: 30rem 30rem 10rem;
	background-color: rgb(253, 192, 192);
	overflow: scroll;
	li {
		display: flex;
		justify-content: space-between;
		font-size: 18rem;
		height: 55rem;
		color: rgb(0, 150, 230);
		.ChengAudiolistl {
		}
		.ChengAudiolistr {
			font-size: 28rem;
			img {
				width: 30rem;
				height: 30rem;
			}
		}
		&.ChengAudiolistgaol {
			color: red;
		}
	}
}
</style>
