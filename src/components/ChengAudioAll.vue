<template>
	<div class="chengAudioall">
		<div class="box" v-if="!chenglock">
			<h4>
				<i
					v-if="!chenglock"
					@click="chenglock = !chenglock"
					class="fa fa-unlock"
					aria-hidden="true"></i>
			</h4>
		</div>
		<header>
			<h4 @click="$emit('clickshowPlayPage')">
				<i class="fa fa-chevron-left" aria-hidden="true"></i>
			</h4>
			<h5>{{ song?.name }}</h5>
			<h4>
				<i
					v-if="chenglock"
					@click="chenglock = !chenglock"
					class="fa fa-unlock-alt"
					aria-hidden="true"></i>
			</h4>
		</header>
		<section>
			<!-- 图片组件 -->
			<ChengAudioAllimg
				v-if="chengAudioallpd"
				:song="song"
				:playing="playing"
				@click.native="chengAudioallpd = false" />
			<!-- 歌词组件 -->
			<ChengAudioAlllyric
				v-else
				@click.native="chengAudioallpd = true"
				:song="song"
				:playing="playing"
				:duration="duration"
				:currentTime="currentTime" />
		</section>
		<footer>
			<!-- 拖拽进度条 -->
			<div class="chengAudioalljdt">
				<div class="chengjdt">
					{{ Math.floor(currentTime / 60) }}分{{ Math.floor(currentTime % 60) }}秒
				</div>
				<input
					min="0"
					:max="duration"
					:value="tmpCurrentTime"
					@input="draging = true"
					@change="
						draging = false;
						$emit('update-time', $event.target.value);
					"
					type="range" />
				<div class="chengjdt-t">
					<div
						class="chengjdt-d"
						:style="{ width: (200 * currentTime) / duration + 'rem' }"></div>
				</div>
				<div class="chengjdt">
					{{ Math.floor(duration / 60) }}分{{ Math.floor(duration % 60) }}秒
				</div>
			</div>
			<!-- 下面控制台 -->
			<div class="chengAudioall-b">
				<div class="chengAudioall-b-m">
					<!-- 模式 -->
					<div class="chengAudioallpattern" @click="$emit('change-model')">
						<!-- 随机 -->
						<i v-if="model === '随'" class="fa fa-random" aria-hidden="true"></i>
						<!-- 循环 -->
						<i v-if="model === '单'" class="fa fa-repeat" aria-hidden="true"></i>
						<!-- 顺序 -->
						<i v-if="model === '顺'" class="fa fa-list-ul" aria-hidden="true"></i>
					</div>
					<!-- 上一曲 -->
					<div class="chengAudioallup" @click="$emit('change-song', 'prev')">
						<i class="fa fa-backward" aria-hidden="true"></i>
					</div>
					<!-- 播放 -->
					<div
						class="chengaudiopause"
						v-if="!playing"
						@click.stop="$emit('song-play')">
						<i class="fa fa-play-circle" aria-hidden="true"></i>
					</div>
					<!-- 暂停 -->
					<div class="chengaudiopause" v-else @click.stop="$emit('song-pause')">
						<i class="fa fa-pause-circle" aria-hidden="true"></i>
					</div>
					<!-- 下一曲 -->
					<div class="chengAudioallbelow" @click="$emit('change-song', 'next')">
						<i class="fa fa-forward" aria-hidden="true"></i>
					</div>

					<!-- 列表 -->
					<ChengAudiolist
						v-show="!chengAudioalllist"
						:chenglistsj="chenglistsj"
						:song="song"
						:playing="playing"
						@chengmusic="$emit('chengmusic', $event)" />

					<div
						class="chengAudioalllist"
						v-if="chengAudioalllist"
						@click.stop="chengAudioalllist = false">
						<i class="fa fa-align-justify" aria-hidden="true"></i>
					</div>
					<div
						class="chengAudioalllist"
						@click.stop="chengAudioalllist = true"
						v-else>
						<i aria-hidden="true" class="fa fa-times"></i>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import ChengAudioAllimg from "@/components/ChengAudioAllimg.vue";
import ChengAudioAlllyric from "@/components/ChengAudioAlllyric.vue";
import ChengAudiolist from "@/components/ChengAudiolist.vue";

export default {
	name: "ChengAudioAll",
	components: {
		ChengAudioAllimg,
		ChengAudioAlllyric,
		ChengAudiolist,
	},
	props: {
		song: Object,
		playing: Boolean,
		duration: Number,
		currentTime: Number,
		chenglistsj: [Array, Object],
		model: String,
	},
	data() {
		return {
			chengAudioallpd: true,
			draging: false,
			tmpCurrentTime: this.currentTime,
			chengAudioalllist: true,
			chenglock: true,
		};
	},

	mounted() {},

	methods: {},

	watch: {
		currentTime: function (n) {
			if (!this.draging) {
				this.tmpCurrentTime = n;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.chengAudioall {
	width: 100%;
	height: 100vh;

	// background-color: rgb(213, 208, 208);

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.box {
		width: 100%;
		height: 100vh;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.3);
		// opacity: 0;
		z-index: 99;
		h4 {
			position: absolute;
			top: 0;
			right: 0;
			flex-grow: 0;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40rem;
			height: 40rem;
			font-size: 28rem;
			color: #fff;
		}
	}
	header {
		display: flex;
		justify-content: space-between;
		font-size: 28rem;
		background-color: rgb(218, 207, 207);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 40rem;
		z-index: 10;
		h4 {
			flex-grow: 0;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40rem;
			height: 40rem;
		}
		h5 {
			flex-grow: 1;
			height: 40rem;
			line-height: 40rem;
			overflow: hidden;
			text-align: center;
		}
	}
	section {
		flex-grow: 1;
		flex-shrink: 1;
		background-color: #fff;
	}
	footer {
		// position: relative;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background-color: rgb(0, 0, 0);
		padding-top: 10rem;
		.chengAudioalljdt {
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: #fff;
			font-size: 18rem;
			font-weight: 600;
			position: relative;
			.chengjdt {
				color: rgb(0, 179, 255);
			}
			input {
				position: absolute;
				top: 10rem;
				left: 87rem;
				width: 200rem;
				z-index: 9;
				opacity: 0;
			}
			.chengjdt-t {
				position: absolute;
				top: 10rem;
				left: 87rem;
				z-index: 8;
				width: 200rem;
				height: 5rem;
				background-color: #fff;
				border-radius: 5rem;
				.chengjdt-d {
					width: 100rem;
					height: 5rem;
					border-radius: 5rem;
					background-color: rgb(0, 200, 255);
				}
			}
		}
		.chengAudioall-b {
			.chengAudioall-b-m {
				display: flex;
				justify-content: space-evenly;
				color: #f00;
				.chengAudioallpattern {
					font-size: 32rem;
					width: 30rem;
					height: 100rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chengAudioallup {
					font-size: 32rem;
					height: 100rem;
					width: 30rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chengaudiopause {
					font-size: 34rem;
					height: 100rem;
					width: 30rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chengAudioallbelow {
					font-size: 32rem;
					height: 100rem;
					width: 30rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chengAudioalllist {
					font-size: 32rem;
					height: 100rem;
					width: 30rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}
</style>
