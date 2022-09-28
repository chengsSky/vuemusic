<template>
	<div class="ChengAudioAllimg">
		<img
			class="ChengAudioAllimg2"
			:class="{ playing: playing }"
			src="@/assets/needle-ab.png"
			alt="" />
		<!-- <img
			class="ChengAudioAllimg1"
			:class="{ playing: playing }"
			:src="song ? `${song?.picUrl}?imageView=1&type=webp&thumbnail=150x0` : ''"
			alt="" />
		<div
			class="boxyy"
			:style="{
				backgroundImage:
					'url(' + song?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
			}"></div> -->
		<template v-if="song?.picUrl">
			<div
				class="ChengAudioAllimg1"
				:class="{ playing: playing }"
				:style="{
					backgroundImage:
						'url(' + song?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
			<div
				class="boxyy"
				:style="{
					backgroundImage:
						'url(' + song?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
		</template>
		<template v-else-if="song?.al?.picUrl">
			<div
				class="ChengAudioAllimg1"
				:class="{ playing: playing }"
				:style="{
					backgroundImage:
						'url(' + song?.al?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
			<div
				class="boxyy"
				:style="{
					backgroundImage:
						'url(' + song?.al?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
		</template>
		<template v-else>
			<div
				class="ChengAudioAllimg1"
				:class="{ playing: playing }"
				:style="{
					backgroundImage:
						'url(' +
						song?.artists[0]?.img1v1Url +
						'?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
			<div
				class="boxyy"
				:style="{
					backgroundImage:
						'url(' +
						song?.artists[0]?.img1v1Url +
						'?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
		</template>
	</div>
</template>

<script>
export default {
	name: "ChengAudioAllimg",
	props: {
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
@keyframes rotate {
	form {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
@keyframes rotate1 {
	form {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(15deg);
	}
}
@keyframes rotate2 {
	form {
		transform: rotate(15deg);
	}
	to {
		transform: rotate(0deg);
	}
}
.ChengAudioAllimg {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	z-index: 1;
	.ChengAudioAllimg1 {
		width: 150rem;
		height: 150rem;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top: 130rem;
		left: 120rem;
		border-radius: 50%;
		z-index: 2;
		border: 10rem solid rgb(0, 0, 0);
		animation: rotate 8s linear infinite;
		animation-play-state: paused;
		&.playing {
			animation-play-state: running;
		}
	}
	.ChengAudioAllimg2 {
		position: absolute;
		z-index: 3;
		width: 100rem;
		top: 30rem;
		left: 50%;
		transform-origin: left top;
		// animation: rotate2 3s linear 1 forwards;
		&.playing {
			animation: rotate1 3s linear 1 forwards;
		}
	}
	.boxyy {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		height: 100%;
		width: 100%;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		filter: blur(15px);
		overflow: hidden;
	}
}
</style>
