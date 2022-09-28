<template>
	<div class="PlayListView">
		<div class="box">
			<div class="boxl">
				<template v-if="playlist">
					<img :src="playlist?.coverImgUrl" alt="" />
				</template>
				<div class="boxl-g">{{ chenggedan }}</div>
			</div>
			<div class="boxr">
				<h3>{{ playlist?.name }}</h3>
				<div class="boxs">
					<template v-if="playlist">
						<img :src="playlist?.creator?.avatarUrl" alt="" />
					</template>
					<p>{{ playlist?.creator?.nickname }}</p>
				</div>
			</div>
			<div class="boxfh" @click="back()">
				<samp>返回</samp>
			</div>
			<!-- 模糊背景 -->
			<template v-if="playlist.coverImgUrl">
				<div
					class="boxyy"
					:style="{
						backgroundImage: 'url(' + playlist?.coverImgUrl + ')',
					}"></div>
			</template>
		</div>
		<!-- 歌曲列表 -->
		<ul class="playlistcard" @click="$emit('chenglist', playlistcardAll)">
			<h5>{{ chengp }}</h5>
			<template v-if="!chengplaylistcard && playlistcard">
				<PlayListViewCard
					v-for="(n, i) in playlistcard"
					:key="n.id"
					:n="n"
					:song="song"
					:playing="playing"
					@chengmusic="$emit('chengmusic', $event)"
					:i="i" />
			</template>
			<template v-if="chengplaylistcard && playlistcard">
				<PlayListViewCard
					v-for="(n, i) in playlistcardAll"
					:key="n.id"
					:n="n"
					:song="song"
					:playing="playing"
					@chengmusic="$emit('chengmusic', $event)"
					:i="i" />
			</template>
			<p @click="chengplaylistcard = true" v-if="!chengplaylistcard">
				{{ chengp2 }}
			</p>
		</ul>
		<!-- 精彩评论 -->
		<ul class="PlayListpl">
			<h5>{{ chengp3 }}</h5>
			<PlayListViewpl v-for="n in PlayListpl" :key="n.commentId" :n="n" />
		</ul>
		<!-- 最新评论 -->
		<ul class="PlayListpl">
			<h5>{{ chengp4 }}</h5>
			<PlayListViewpl v-for="n in PlayListpl2" :key="n.commentId" :n="n" />
		</ul>
	</div>
</template>

<script>
import PlayListViewCard from "@/components/PlayListViewCard.vue";
import PlayListViewpl from "@/components/PlayListViewpl.vue";
export default {
	components: {
		PlayListViewCard,
		PlayListViewpl,
	},
	name: "PlayListView",

	props: {
		song: Object,
		playing: Boolean,
	},

	data() {
		return {
			playlist: [],
			chengplaylistcard: false,
			chengp: "歌曲列表",
			chengp2: "更多歌曲",
			chengp3: "精彩评论",
			chengp4: "最新评论",
			chenggedan: "歌单",
			playlistcard: null,
			playlistcardAll: null,
			PlayListpl: [],
			PlayListpl2: [],
		};
	},

	mounted() {},

	methods: {
		//拿歌单
		getPlayList: function (id) {
			this.axios
				.get("https://apis.netstart.cn/music/playlist/detail", {
					params: { id },
				})
				.then((res) => {
					this.playlist = res.data.playlist;
					this.playlistcard = res.data.playlist.tracks.slice(0, 10);
					this.playlistcardAll = res.data.playlist.tracks;
				});
		},
		//拿评论
		getPlayListpl: function (id) {
			this.axios
				.get("https://apis.netstart.cn/music/comment/playlist", {
					params: { id },
				})
				.then((res) => {
					this.PlayListpl = res.data.hotComments;
					this.PlayListpl2 = res.data.comments;
				});
		},

		// 返回
		back() {
			if (window.history.length <= 1) {
				this.$router.push({ path: "/" });
				return false;
			} else {
				this.$router.go(-1);
			}
		},
	},

	created: function () {
		// 创建时执行拿歌单
		this.getPlayList(this.$route.query.id);
		//创建时拿评论
		this.getPlayListpl(this.$route.query.id);
	},

	// 切换歌单
	beforeRouteUpdate(to, from, next) {
		this.getPlayList(to.query.id);
		this.getPlayListpl(to.query.id);
		next();
	},
};
</script>

<style lang="less" scoped>
.PlayListView {
	.box {
		display: flex;
		padding: 30rem 15rem;
		.boxl {
			flex-shrink: 0;
			width: 126rem;
			height: 126rem;
			position: relative;
			img {
				width: 126rem;
				height: 126rem;
			}
			.boxl-g {
				font-size: 10rem;
				position: absolute;
				top: 10rem;
				left: 0;
				z-index: 8;
				border-radius: 0 10rem 10rem 0;
				background-color: #d04b4c;
				padding: 1rem 10rem;
				color: #fff;
			}
		}
		.boxr {
			margin-left: 15rem;
			font-size: 16rem;
			font-weight: 500;
			color: #fff;
			h3 {
			}
			.boxs {
				display: flex;
				width: 100%;
				height: 30rem;
				line-height: 30rem;
				margin: 30rem 0;
				img {
					flex-shrink: 0;
					width: 30rem;
					height: 30rem;
					border-radius: 50%;
					margin-right: 10rem;
				}
				samp {
					font-size: 10rem;
					line-height: 30rem;
					color: rgb(168, 167, 167);
				}
			}
		}
		.boxfh {
			position: absolute;
			top: 10rem;
			left: 0;
			background-color: #fff;
			padding: 5rem 10rem;
			border-radius: 0 10rem 10rem 0;
			// width: 30rem;
			// height: 15rem;
		}
		.boxyy {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 192rem;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			filter: blur(15px);
		}
	}
	.playlistcard {
		h5 {
			padding: 5rem 10rem;
			font-size: 14rem;
			background-color: #eeeff0;
		}
		p {
			text-align: center;
			font-size: 13rem;
			color: rgb(133, 128, 128);
		}
	}
	.PlayListpl {
		h5 {
			padding: 5rem 10rem;
			font-size: 14rem;
			background-color: #eeeff0;
		}
	}
}
</style>
