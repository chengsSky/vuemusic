<template>
	<li>
		<div class="playListViewpll">
			<img :src="n?.user?.avatarUrl" alt="" />
		</div>
		<div class="playListViewplr">
			<div class="chengtop">
				<div class="cheng-t-l">
					<p class="chengp1">
						{{ n.user?.nickname }}
					</p>
					<p class="chengp2">
						{{ n?.timeStr }}
					</p>
				</div>
				<div
					class="cheng-t-r"
					:class="{ chengdianzan: chengdianzan }"
					@click="chengdianzan = !chengdianzan">
					点赞
				</div>
			</div>
			<div class="chengbottom">
				<p class="chengp3">
					{{ n.content }}
				</p>
			</div>
		</div>
	</li>
</template>

<script>
export default {
	name: "playListViewpl",
	props: {
		n: Object,
	},

	data() {
		return {
			chengdianzan: false,
		};
	},

	mounted() {},

	methods: {},
};
</script>

<style lang="less" scoped>
li {
	display: flex;
	padding: 10rem;
	box-shadow: 0 1px 0 0 #f1f1f2;
	.playListViewpll {
		flex-shrink: 0;
		width: 30rem;
		height: 30rem;
		margin-right: 10rem;
		img {
			border-radius: 50%;
			width: 30rem;
			height: 30rem;
		}
	}
	.playListViewplr {
		flex-grow: 1;
		.chengtop {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rem;
			.cheng-t-l {
				.chengp1 {
					font-size: 14px;
					color: #666;
					line-height: 20px;
					overflow: hidden;
				}
				.chengp2 {
					font-size: 9px;
					color: #999;
				}
			}
			.cheng-t-r {
				&.chengdianzan {
					color: #f00;
				}
			}
		}
		.chengbottom {
			.chengp3 {
				color: #333;
				font-size: 15px;
				line-height: 22px;
			}
		}
	}
}
</style>
