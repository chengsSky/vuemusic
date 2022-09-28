<template>
	<div class="box">
		<ul class="ChengAudioAlllyric" ref="ul" v-if="chenglyric">
			<li
				v-for="(n, i) in chenglyric"
				:key="i"
				:class="{ sign: chenglyricgling === i }">
				{{ n.text }}
			</li>
		</ul>
		<template v-if="song?.picUrl">
			<div
				class="boxyy"
				:style="{
					backgroundImage:
						'url(' + song?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
		</template>
		<template v-else-if="song?.al?.picUrl">
			<div
				class="boxyy"
				:style="{
					backgroundImage:
						'url(' + song?.al?.picUrl + '?imageView=1&type=webp&thumbnail=150x0)',
				}"></div>
		</template>
		<template v-else>
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
	name: "ChengAudioAlllyric",
	props: {
		song: Object,
		playing: Boolean,
		duration: Number,
		currentTime: Number,
	},

	data() {
		return {
			chenglyric: null,
			chenglyricgling: null,
		};
	},

	mounted() {},

	methods: {},

	created() {
		// console.log(this.axios);
		this.axios
			.get("https://apis.netstart.cn/music/lyric", {
				params: {
					id: this.song.id,
				},
			})
			.then((ren) => {
				this.chenglyric = ren.data.lrc.lyric
					.split("\n")
					.filter((o) => o)
					.map((o) => {
						var { groups } = o.match(
							/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/
						);
						return {
							time: groups.mm * 60 + groups.ss * 1,
							text: groups.text.trim(),
						};
					});
			});
	},

	watch: {
		currentTime: function () {
			if (this.chenglyric) {
				var copy = [...this.chenglyric].reverse();
				var index = copy.findIndex((o) => o.time < this.currentTime);
				this.chenglyricgling = copy.length - 1 - index;
				// console.log(this.chenglyricgling);
				this.$refs.ul.style.transform = `translateY(${
					this.chenglyricgling * -34 + 150
				}rem)`;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.ChengAudioAlllyric {
	position: relative;
	z-index: 0;
	width: 100%;
	// height: 507rem;
	// height: calc(100vh - 160rem);
	// overflow: scroll;
	// background-color: rgb(213, 208, 208);

	li {
		width: 100%;
		// position: absolute;
		// top: 0;
		// left: 0;
		// z-index: 9;
		font-size: 18rem;
		text-align: center;
		margin: 10rem 0;
		color: rgb(0, 179, 255);
		height: 24rem;
		overflow: hidden;
		&.sign {
			color: red;
		}
	}
}
.boxyy {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	// height: 100%;
	height: calc(100vh - 160rem);

	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	filter: blur(15px);
	// overflow: hidden;
}
</style>
