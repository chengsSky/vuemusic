<template>
	<div id="app">
		<nav v-if="$route.meta.showNav">
			<div class="cheng">
				<router-link to="/">推荐音乐</router-link>
			</div>
			<div class="cheng">
				<router-link to="/song">热歌榜</router-link>
			</div>
			<div class="cheng">
				<router-link to="/search">搜索</router-link>
			</div>
		</nav>
		<router-view
			:song="song"
			:playing="playing"
			@chengmusic="song = $event"
			@chenglist="chenglistsj = $event" />

		<div class="chengaudio" v-if="song">
			<audio
				:src="songSrc"
				ref="audio"
				@play="playing = true"
				@pause="playing = false"
				@durationchange="duration = $event.target.duration"
				@timeupdate="currentTime = $event.target.currentTime"
				autoplay></audio>

			<!-- 下面播放栏 -->
			<ChengAudio
				v-if="!showPlayPage"
				:song="song"
				:playing="playing"
				@song-play="$refs.audio.play()"
				@song-pause="$refs.audio.pause()"
				:duration="duration"
				:currentTime="currentTime"
				@click.native="showPlayPage = true"
				:chenglistsj="chenglistsj"
				@chengmusic="song = $event" />

			<!-- 全屏播放栏 -->
			<ChengAudioAll
				v-if="showPlayPage"
				@clickshowPlayPage="showPlayPage = false"
				:song="song"
				:playing="playing"
				@song-play="$refs.audio.play()"
				@song-pause="$refs.audio.pause()"
				:duration="duration"
				:currentTime="currentTime"
				@update-time="$refs.audio.currentTime = $event"
				@chengmusic="song = $event"
				:chenglistsj="chenglistsj"
				@change-song="changeSong"
				:model="model"
				@change-model="changeModel" />

			<!-- 列表栏 -->
		</div>
	</div>
</template>
<script>
import ChengAudio from "@/components/ChengAudio.vue";
import ChengAudioAll from "@/components/ChengAudioAll.vue";
export default {
	components: {
		ChengAudio,
		ChengAudioAll,
	},
	data: function () {
		return {
			playing: false,
			song: JSON.parse(window.localStorage.getItem("song")) || null,
			duration: 0,
			currentTime: 0,
			showPlayPage: false,
			chenglistsj: JSON.parse(window.localStorage.getItem("chenglistsj")) || null,
			models: ["顺", "随", "单"],
			model: "顺",
		};
	},
	watch: {
		// 正在播放的歌曲存放本地
		song: function (newSong) {
			localStorage.setItem("song", JSON.stringify(newSong));
		},
		//存放正在播放的歌单
		chenglistsj: function (chenglistsjall) {
			localStorage.setItem("chenglistsj", JSON.stringify(chenglistsjall));
		},
	},

	computed: {
		// 歌曲的变化
		songSrc: function () {
			console.log(this.song.id);
			if (this.song.id) {
				return this.song
					? `https://music.163.com/song/media/outer/url?id=${this.song.id}.mp3`
					: null;
			} else {
				return this.song
					? `https://music.163.com/song/media/outer/url?id=${this.song.al.id}.mp3`
					: null;
			}
		},
	},

	methods: {
		// 根据模式切歌
		changeSong: function (direction) {
			switch (this.model) {
				case "顺":
					var currentSongIndex = this.chenglistsj.findIndex(
						(o) => o.id === this.song.id
					);
					if (direction === "next") {
						this.song =
							currentSongIndex === this.chenglistsj.length - 1
								? this.chenglistsj[0]
								: this.chenglistsj[currentSongIndex + 1];
					} else {
						this.song =
							currentSongIndex === 0
								? this.chenglistsj[this.chenglistsj.length - 1]
								: this.chenglistsj[currentSongIndex - 1];
					}
					break;
				case "随":
					var daixuan = this.chenglistsj.filter((o) => o.id !== this.song.id);
					this.song = daixuan[Math.floor(Math.random() * daixuan.length)];
					break;
				case "单":
					this.$refs.audio.currentTime = 0;
					this.$refs.audio.play();
					break;
			}
		},

		// 切换模式
		changeModel: function () {
			var index = this.models.findIndex((o) => o === this.model);

			this.model =
				index === this.models.length - 1 ? this.models[0] : this.models[index + 1];
		},
	},
};
</script>
<style lang="less">
@keyframes chengaudios {
	form {
		bottom: -100rem;
	}
	to {
		bottom: 0;
	}
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	color: #2c3e50;
}

nav {
	display: flex;
	justify-content: space-evenly;
	height: 40rem;
	box-shadow: 0 1rem 0 0 rgb(224, 224, 224);

	position: sticky;
	top: 0;
	left: 0;
	z-index: 9;
	background-color: #fff;

	.cheng {
		width: 33.33%;
		height: 40rem;
		display: flex;
		justify-content: center;
		a {
			display: inline-block;
			text-align: center;
			padding: 0 6rem;

			color: #2c3e50;
			line-height: 37rem;
			font-weight: 600;
			font-size: 15rem;

			text-decoration: none;
			&.router-link-exact-active {
				color: #dd001b;
				border-bottom: 3px solid #dd001b;
			}
		}
	}
}
.chengaudio {
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 9;
	animation: chengaudios 1.3s linear 1;
}
</style>
