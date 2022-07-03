<script lang="ts">
import { goto } from '@sapper/app'
import { getContext_ui_ctx } from '@menus/ui'
import { is_navigating_onclick_b } from '@menus/page'
import { PlatformIcon } from '@menus/platform-ui'
const ctx = getContext_ui_ctx()
const is_navigating_onclick = is_navigating_onclick_b(ctx)
</script>

<div class="404 page-not-found-page">
  <div class="header-logo-section">
    <PlatformIcon white={true}></PlatformIcon>
  </div>
  <div class="clearfix">
    <div class="left-side">
      <div class="astronaut-img"></div>
    </div>
    <div class="right-side">
      <div class="title">Page Not Found</div>
      <div class="description">Oops, We can't cook your request at the moment.</div>
      <button class="btn btn-lg btn-success btn-block back-button"
							on:click={evt => goto('/')}
			>Go Home</button>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.page-not-found-page {
	background-color: #F2F2F2;
	min-height: 100vh;
	overflow: hidden;
	max-width: 100%;
	.header-logo-section {
		background-color: white;
	}
	.left-side {
		padding-top: 30px;
		text-align: center;
		@media (min-width: $screen-sm-min) {
			padding-top: 100px;
		}
		@media (min-width: $screen-md-min) {
			padding-top: 178px;
			float: left;
			width: 50%;
			text-align: right;
			padding-right: 100px;
		}
		.astronaut-img {
			width: 376px;
			height: 304px;
			background-repeat: no-repeat;
			display: inline-block;
			background-image: vurl('/assets/img/ro/astronaut-black.png');
			background-size: contain;
			background-position-x: -10px;
			@media (min-width: 1440px) {
				background-image: vurl('/assets/img/ro/astronaut-black@2x.png');
			}
		}
	}
	.right-side {
		padding-top: 30px;
		text-align: center;
		@media (min-width: $screen-sm-min) {
			padding-top: 100px;
		}
		@media (min-width: $screen-md-min) {
			padding-top: 248px;
			float: right;
			width: 50%;
			text-align: left;
			padding-left: 150px;
		}
		.title {
			font-size: 32px;
			font-weight: $lato-black;
		}
		.description {
			margin-top: 6px;
		}
		.back-button {
			margin-top: 40px;
			max-width: 200px;
			margin-left: auto;
			margin-right: auto;
			@media (min-width: $screen-md-min) {
				margin-left: 0;
				margin-right: 0;
			}
		}
	}
}
</style>
