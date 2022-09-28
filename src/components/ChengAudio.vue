<template>
	<div class="chengAudio">
		<!-- 歌曲图片 -->
		<div class="chengaudioimg">
			<!-- 最新音乐数据图片 -->
			<template v-if="song?.picUrl">
				<div
					class="chengbj"
					:class="{ playing: playing }"
					:style="{
						backgroundImage:
							'url(' + song?.picUrl + '?imageView=1&type=webp&thumbnail=70x0)',
					}"></div>
			</template>
			<!-- 歌单组件数据 && 热歌榜组件 && 歌单组件数据 && 热歌榜数据图片 -->
			<template v-else-if="song?.al?.picUrl">
				<div
					class="chengbj"
					:class="{ playing: playing }"
					:style="{
						backgroundImage:
							'url(' + song?.al?.picUrl + '?imageView=1&type=webp&thumbnail=70x0)',
					}"></div>
			</template>
			<!-- 搜索结果组件数据图片 -->
			<template v-else>
				<div
					class="chengbj"
					:class="{ playing: playing }"
					:style="{
						backgroundImage:
							'url(' +
							song?.artists[0]?.img1v1Url +
							'?imageView=1&type=webp&thumbnail=70x0)',
					}"></div>
			</template>
		</div>
		<!-- 歌曲名字 -->
		<div class="chengaudiomin">
			<p class="chengaudiop1">
				{{ song?.name }}-<samp>{{ song?.song?.album?.artists[0]?.name }}</samp>
			</p>
			<p class="chengaudiop2">
				<!-- 进度条 -->
				{{ Math.floor(currentTime / 60) }}分{{ Math.floor(currentTime % 60) }}秒 /
				{{ Math.floor(duration / 60) }}分{{ Math.floor(duration % 60) }}秒
			</p>
		</div>
		<!-- 播放暂停 -->
		<div class="chengcanvar">
			<div
				class="chengaudiopause"
				v-if="!playing"
				@click.stop="$emit('song-play')">
				<i class="fa fa-play-circle" aria-hidden="true"></i>
			</div>
			<div class="chengaudiopause" v-else @click.stop="$emit('song-pause')">
				<i class="fa fa-pause-circle" aria-hidden="true"></i>
			</div>
			<canvas width="50" height="50" ref="canvas"></canvas>
		</div>
		<!-- 显示/隐藏列表 -->
		<div class="chengA">
			<ChengAudiolist
				v-show="!chengAudiolistpd"
				:chenglistsj="chenglistsj"
				:song="song"
				:playing="playing"
				@chengmusic="$emit('chengmusic', $event)" />
			<div
				class="chengAudiolist"
				v-if="chengAudiolistpd"
				@click.stop="chengAudiolistpd = false">
				<i class="fa fa-align-justify" aria-hidden="true"></i>
			</div>
			<div class="chengAudiolist" v-else @click.stop="chengAudiolistpd = true">
				<i aria-hidden="true" class="fa fa-times"></i>
			</div>
		</div>
	</div>
</template>

<script>
import ChengAudiolist from "@/components/ChengAudiolist.vue";
export default {
	name: "ChengAudio",
	components: {
		ChengAudiolist,
	},
	props: {
		song: Object,
		playing: Boolean,
		duration: Number,
		currentTime: Number,
		chenglistsj: [Array, Object],
	},
	data() {
		return {
			chengAudiolistpd: true,
		};
	},

	mounted() {},

	methods: {},

	computed: {
		progressBar() {
			return this.currentTime / this.duration;
		},
	},
	watch: {
		progressBar(newValue) {
			// console.log(newValue);
			var canvas = this.$refs.canvas;
			var context = canvas.getContext("2d");

			context.clearRect(0, 0, 50, 50);
			context.beginPath();
			context.arc(25, 25, 20, -0.5 * Math.PI, Math.PI * (2 * newValue - 0.5));
			context.stroke();
		},
	},
};
</script>

<style lang="less" scoped>
@keyframes rotate {
	form {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
.chengAudio {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100rem;
	background-color: rgb(243, 92, 92);
	padding: 15rem 30rem;
	color: #fff;
	.chengaudioimg {
		width: 70rem;
		height: 70rem;
		.chengbj {
			width: 70rem;
			height: 70rem;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			border-radius: 50%;
			animation: rotate 8s linear infinite;
			animation-play-state: paused;
			&.playing {
				animation-play-state: running;
			}
		}
	}
	.chengaudiomin {
		margin-left: 15rem;
		flex-grow: 1;
		.chengaudiop1 {
			height: 24rem;
			overflow: hidden;
			font-size: 18rem;
			samp {
				font-size: 12rem;
			}
		}
		.chengaudiop2 {
			font-size: 12rem;
		}
	}
	.chengcanvar {
		flex-grow: 0;
		flex-shrink: 0;
		width: 70rem;
		height: 70rem;
		position: relative;
		z-index: 1;
		.chengaudiopause {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 70rem;
			height: 70rem;
			font-size: 38rem;
			position: absolute;
			z-index: 3;
		}

		canvas {
			position: absolute;
			top: 10rem;
			right: 10rem;
			z-index: 2;
		}
	}
	.chengAudiolist {
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30rem;
		height: 70rem;
		font-size: 32rem;
	}
}
</style>
