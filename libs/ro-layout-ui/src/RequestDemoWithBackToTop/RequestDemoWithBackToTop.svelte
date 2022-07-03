<script lang="ts">
import { RequestDemo } from '@menus/request-demo-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ro_app_body_top_div$_b } from '../ro_app_body_top_div$_b.js'
import type { ro_app_body_top_div$_T } from '../ro_app_body_top_div$_b.js'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
const ro_app_body_top_div$:ro_app_body_top_div$_T = ro_app_body_top_div$_b(ctx)
</script>

<div class="BackToTopWithBackToTop">
  <RequestDemo></RequestDemo>
  <a href="."
		 on:click|preventDefault={evt => $ro_app_body_top_div$.scrollIntoView({
       behavior: 'smooth',
       block: 'start',
       inline: 'nearest'
     })}
	><i class="back-to-top fa fa-arrow-circle-o-up"></i></a>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.BackToTopWithBackToTop {
	position: relative;
	.back-to-top {
		position: absolute;
		right: 135px;
		bottom: 79px;
		height: 36px;
		width: 36px;
		font-size: 36px;
		color: black;
		@media (max-width: $screen-xs-max) {
			right: 20px;
			bottom: 20px;
		}
	}
}
</style>
