<template>
	<div class="home">
		<!-- 编辑推荐 -->
		<h3>{{ chengrecommend }}</h3>
		<ul class="chengrecommendCard">
			<HelloWorld 
			v-for="i in chengrecommendCard" 
			:key="i.id" 
			:i="i" />
		</ul>
		<!-- 最新音乐 -->
		<h3>{{ chengnewsong }}</h3>
		<ul class="chengnewsongCard">
			<SongCard
				v-for="i in chengnewsongCard"
				:key="i.id"
				:i="i"
				:song="song"
				:playing="playing"
				@click.native="$emit('chenglist', chengnewsongCard)"
				@chengmusic="$emit('chengmusic', $event)" />
		</ul>
		<div class="home-log">
			<img src="@/assets/recommand_bg_2x.png" alt="" />
		</div>
	</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import SongCard from "@/components/SongCard.vue";

export default {
	name: "HomeView",
	components: {
		HelloWorld,
		SongCard,
	},
	props: {
		song: Object,
		playing: Boolean,
	},
	data() {
		return {
			chengrecommend: "编辑推荐",
			chengnewsong: "最新音乐",
			chengrecommendCard: [],
			chengnewsongCard: [],
		};
	},
	created() {
		// console.log(this.axios);
		this.axios
			.get("https://apis.netstart.cn/music/personalized", {
				params: {
					limit: 6,
				},
			})
			.then((ren) => {
				this.chengrecommendCard = ren.data.result;
			});
		this.axios
			.get("https://apis.netstart.cn/music/personalized/newsong")
			.then((ren) => {
				this.chengnewsongCard = ren.data.result;
			});
	},
};
</script>

<style lang="less" scoped>
.home {
	background-color: #fcfcfd;
	h3 {
		font-size: 14rem;
		font-weight: 500;
		border-left: 3px solid red;
		margin: 10px 0;
		padding-left: 10rem;
	}
	ul.chengrecommendCard {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 20rem;
	}
	ul.chengnewsongCard {
		margin-bottom: 20rem;
	}
}
</style>
