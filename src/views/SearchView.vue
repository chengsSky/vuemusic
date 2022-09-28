<template>
	<div>
		<div class="chengx">
			<div class="chengbg"></div>
			<h5>更新时间: 09月27日</h5>
		</div>
		<ul @click="$emit('chenglist',chengnewsearchCardAll)">
			<SearchCard
				v-for="(n, i) in chengnewsearchCard"
				:key="i.id"
				:i="i"
				:n="n"
				:song="song"
				:playing="playing"
				@chengmusic="$emit('chengmusic', $event)"
				v-show="!SearchViewpd" />

			<p @click="SearchViewqiehuan" v-show="!SearchViewpd">查看完整歌单 ></p>
			<SearchCard
				v-for="(n, i) in chengnewsearchCardAll"
				:key="i.id"
				:i="i"
				:n="n"
				:song="song"
				:playing="playing"
				@chengmusic="$emit('chengmusic', $event)"
				v-show="SearchViewpd" />
		</ul>
	</div>
</template>

<script>
import SearchCard from "@/components/SearchCard.vue";
export default {
	name: "SearchView",
	components: {
		SearchCard,
	},
	props:{
		song: Object,
		playing: Boolean,
	},

	data() {
		return {
			chengnewsearchCard: [],
			chengnewsearchCardAll: [],
			SearchViewpd: false,
		};
	},

	mounted() {},

	methods: {
		SearchViewqiehuan() {
			this.SearchViewpd = true;
		},
	},

	created() {
		this.axios
			.get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
			.then((ren) => {
				// console.log(ren.data.playlist.tracks);
				this.chengnewsearchCard = ren.data.playlist.tracks.slice(0, 20);
				this.chengnewsearchCardAll = ren.data.playlist.tracks;
			});
	},
};
</script>

<style lang="less" scoped>
div {
	.chengx {
		height: 146rem;
		background-image: url(@/assets/hot_music_bg_2x.jpg);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-left: 20px;
		display: flex;
		justify-content: flex-start;
		align-content: center;
		flex-wrap: wrap;
		color: #fff;
		.chengbg {
			width: 141.5rem;
			height: 67rem;
			background-image: url(@/assets/index_icon_2x.png);
			background-size: 166px 97px;
			background-position: -24px -30px;
		}
		h5 {
			width: 100%;
		}
	}
	ul {
		margin-bottom: 100rem;
		p {
			color: rgb(174, 174, 174);
			padding: 20rem;
			text-align: center;
		}
	}
}
</style>
