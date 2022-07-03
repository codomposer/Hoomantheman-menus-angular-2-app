<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_support_ui_Ctx } from '../ro_support_ui_Ctx.js'
import { Tutorial_c } from './Tutorial_c.js'
const ctx = getContext_ui_ctx() as ro_support_ui_Ctx
export const _ = new Tutorial_c(ctx)
const { tutorial_chapters, videoEl$, activeChapterId$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="Tutorial page">
  <div class="page-title">Menu Backoffice Tutorial</div>
    <div class="main-contents">
		<div>
			<video bind:this={$videoEl$} on:timeupdate={(_evt) => _.on_time_update(_evt)} controls poster="https://s3.us-west-2.amazonaws.com/live.images.menu.com/static_video/Tutorial_poster.png">
				<source src="https://s3.us-west-2.amazonaws.com/live.images.menu.com/static_video/Tutorial_V1_2021-11-19.mp4" type="video/mp4" />
			</video>
		</div>

		<div class="video-chapters-nav">
			  <a href="." on:click|preventDefault class="h-link">
				  <div class="video-chapters-nav-heading">Video Chapters</div>
			  </a>

			  {#each tutorial_chapters as item}
				<a href="." on:click|preventDefault={evt => _.goto_video_chapter(item.time) } class="h-link">
					<div class="video-chapters-nav-item" class:active={$activeChapterId$ === item.id}>{ item.label }</div>
				</a>
			  {/each}
		</div>
    </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.Tutorial {
	.page-title {
		font-weight: $lato-black;
		font-size: 32px;
		margin: 0 0 40px;
		@media (max-width: $screen-xs-max) {
			margin-left: 20px;
			margin-right: 20px;
		}
	}
	.main-contents {
		padding-bottom: 48px;

		@media (min-width: $screen-md-min) {
			display: flex;
			justify-content: space-around;
		}

		.video-chapters-nav {
			width: 100%;
			background-color: $gray;
			border-radius: 4px;
			padding: 28px 24px 55px;
			@media (min-width: $screen-md-min) {
				width: 220px;
				min-width: 220px;
				margin-left: 24px;
			}
			.video-chapters-nav-heading {
				margin-bottom: 28px;
				font-weight: $lato-black;
				font-size: 18px;
				cursor: default;
				color: white;
			}
			.video-chapters-nav-item {
				padding: 13px 0 14px;
				border-bottom: 1px solid #394A53;
				cursor: pointer;
				user-select: none;
				color: white;

				&.active {
					color: $brand-success;
				}
			}
		}

		video {
			width: 100%;
			max-width: 1200px;
		}
	}
}
</style>
