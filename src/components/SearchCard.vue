<template>
	<li @click="$emit('chengmusic', n)">
		<div class="xlie" ref="gaol">
			{{ i + 1 >= 10 ? i + 1 : "0" + (i + 1) }}
		</div>
		<h5>
			{{ n.name }}
		</h5>
		<div class="author">
			<div class="bg"></div>
			{{ n.ar[0].name }}-
			{{ n.al.name }}
		</div>
		<div class="cheng">
			<img
				src="@/assets/加载.gif"
				alt=""
				v-if="playing && (song?.al?.id === n.id || song?.id === n.id)" />
			<i class="fa fa-play-circle-o" v-else aria-hidden="true"></i>
		</div>
	</li>
</template>

<script>
export default {
	name: "SearchCard",
	props: {
		n: Object,
		i: Number,
		song: Object,
		playing: Boolean,
	},

	data() {
		return {};
	},

	mounted() {
		(() => {
			// console.log(this.$refs.gaol);
			if (this.i < 3) {
				this.$refs.gaol.style.color = "#f00";
			}
		})();
	},
	methods: {},
};
</script>

<style lang="less" scoped>
li {
	position: relative;
	height: 55.5rem;
	box-shadow: 0 1px 0 0 #f1f1f2;
	font-size: 18rem;
	overflow: hidden;
	.xlie {
		float: left;
		width: 55.5rem;
		height: 55.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h5 {
		margin-top: 5rem;
	}
	.author {
		font-size: 10rem;
		font-weight: 200;
		.bg {
			background-image: url(@/assets/index_icon_2x.png);
			background-size: 166px 97px;
			width: 12rem;
			height: 8rem;
			margin-left: 4rem;
			display: inline-block;
		}
	}
	.cheng {
		color: #aaaaaa;
		position: absolute;
		top: 20rem;
		right: 15rem;
	}
}
</style>
