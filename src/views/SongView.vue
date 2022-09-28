<template>
	<div>
		<!-- 搜索框 -->
		<div class="chengss">
			<div class="chengtx">
				<i class="fa fa-search" aria-hidden="true"></i>
			</div>
			<input
				type="text"
				v-model="value"
				:placeholder="chengssk"
				@focus="chengsearchRes = null"
				@keyup.enter="getchengSearchResult(value)" />
			<div
				class="chengtx fr"
				@click="
					value = '';
					chengsearchRes = null;
				">
				<i v-show="value" class="fa fa-times" aria-hidden="true"></i>
			</div>
		</div>

		<!-- 过度动画 -->
		<img v-show="loading" src="@/assets/loading.gif" alt="" />

		<!-- 热门搜索 -->
		<ul class="chengSongViewcard" v-if="!value && !chengsearchRes">
			<h5>{{ chengS }}</h5>
			<SongViewcard
				v-for="(n, i) in chengSongViewCard"
				:key="i"
				:n="n"
				@click="
					value = n.first;
					getchengSearchResult(n.first);
				" />
		</ul>

		<!-- 搜索歌曲 -->
		<ul class="chengSearchSuggests" v-if="value && !chengsearchRes">
			<h5>搜索"{{ value }}"</h5>
			<SearchSuggestss
				v-for="(n, i) in chengSearchSuggests"
				:key="i"
				:n="n"
				@click="
					value = n.keyword;
					getchengSearchResult(n.keyword);
				" />
		</ul>

		<!-- 搜索结果 -->
		<template v-if="chengsearchRes">
			<ul class="chengsearchRes" @click="$emit('chenglist', chengsearchRes)">
				<h5>搜索结果组件</h5>
				<SearchRes
					v-for="(n, i) in chengsearchRes?.songs"
					:key="chengsearchRes?.songs[i].id"
					@chengmusic="$emit('chengmusic', $event)"
					:playing="playing"
					:song="song"
					:n="n" />
			</ul>
		</template>

		<!-- 历史记录 -->
		<ul class="chenghistory" v-if="!value && !chengsearchRes && history.length">
			<h5>{{ chenglx }}</h5>
			<SongHistory
				v-for="(n, i) in history"
				:key="i"
				:n="n"
				@clickl="
					value = n;
					getchengSearchResult(n);
				"
				@clickr="history = history.filter((o) => o !== n)" />
		</ul>
	</div>
</template>

<script>
import SongViewcard from "@/components/SongViewcard.vue";
import SearchSuggestss from "@/components/SearchSuggestss.vue";
import SearchRes from "@/components/SearchRes.vue";
import SongHistory from "@/components/SongHistory.vue";

var _ = require("lodash");

export default {
	name: "SongView",
	components: {
		SongViewcard,
		SearchSuggestss,
		SearchRes,
		SongHistory,
	},

	props: {
		song: Object,
		playing: Boolean,
	},

	data() {
		return {
			value: "",
			chengssk: "搜索歌曲,歌手,专辑",
			chengS: "热门搜索",
			// chengSearchSuggestss: "搜索结果",
			chenglx: "历史记录",
			chengSongViewCard: [],
			chengSearchSuggests: [],
			chengsearchRes: null,
			loading: false,
			history: JSON.parse(window.localStorage.getItem("history")) || [],
		};
	},

	mounted() {},

	methods: {
		// 热门搜索
		getchengSongViewCard() {
			this.loading = true;
			return this.axios.get("https://apis.netstart.cn/music/search/hot");
		},

		// 搜索歌曲
		getchengSearchSuggests(keywords) {
			this.loading = true;
			return this.axios
				.get("https://apis.netstart.cn/music/search/suggest", {
					params: { keywords, type: "mobile" },
				})
				.then((ren) => {
					this.loading = false;
					this.chengSearchSuggests = ren.data.result.allMatch;
				});
		},

		//搜索结果
		getchengSearchResult(keywords) {
			this.loading = true;
			this.axios
				.get("https://apis.netstart.cn/music/search", {
					params: { keywords, limit: 10, offset: 0 },
				})
				.then((res) => {
					this.loading = false;
					this.chengsearchRes = res.data.result;
				});

			// 存储本次搜索的关键词
			this.history = [...new Set([keywords, ...this.history])];
		},
	},

	created() {
		this.getchengSongViewCard().then((ren) => {
			this.loading = false;
			this.chengSongViewCard = ren.data.result.hots;
		});

		this.debouncedGetSearchSuggests = _.debounce(
			this.getchengSearchSuggests,
			800
		);
	},
	watch: {
		value(newValue) {
			if (newValue) {
				this.debouncedGetSearchSuggests(newValue);
			}
		},
		history: function (newHistory) {
			localStorage.setItem("history", JSON.stringify(newHistory));
		},
	},
};
</script>

<style lang="less" scoped>
.chengss {
	display: flex;
	width: 100%;
	padding: 10rem;
	font-size: 20rem;
	box-shadow: 0 1rem 0 0 rgb(213, 213, 213);
	.chengtx {
		width: 35.5rem;
		height: 30rem;
		background-color: #ebecec;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 0;
		font-size: 10rem;
		color: rgb(223, 221, 221);
		border-radius: 30rem 0 0 30rem;
	}
	.fr {
		border-radius: 0 30rem 30rem 0;
		& > i {
			color: #000;
		}
	}
	input {
		height: 30rem;
		background-color: #ebecec;
		border: 0 solid red;
		flex-grow: 1;
		// color: rgb(223, 221, 221);
	}
}
.chengSongViewcard {
	display: flex;
	flex-wrap: wrap;
	padding: 0 10rem;
	h5 {
		width: 100%;
		padding: 15rem 5rem;
		margin-left: -10rem;
	}
}
.chengSearchSuggests {
	font-size: 16rem;
	padding: 0 10rem;
	h5 {
		height: 50rem;
		margin-left: 10rem;
		padding-right: 10rem;
		font-size: 15rem;
		line-height: 50rem;
		color: #507daf;
		box-shadow: 0 1rem 0 0 rgb(236, 236, 236);
	}
}
.chengsearchRes {
	font-size: 16rem;
	padding: 0 10rem;
	h5 {
		height: 50rem;
		margin-left: 10rem;
		padding-right: 10rem;
		font-size: 15rem;
		line-height: 50rem;
		color: #507daf;
		box-shadow: 0 1rem 0 0 rgb(236, 236, 236);
	}
}

.chenghistory {
	font-size: 16rem;
	padding: 0 10rem;
	h5 {
		height: 50rem;
		margin-left: 10rem;
		padding-right: 10rem;
		font-size: 15rem;
		line-height: 50rem;
		color: #000000;
		box-shadow: 0 1rem 0 0 rgb(236, 236, 236);
	}
}
</style>
