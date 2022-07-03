<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { App_Android_Store_Link$_b, App_IOS_Store_Link$_b } from '@menus/platform-settings'
import type { consumer_app_ui_Ctx } from '../consumer_app_ui_Ctx.js'
const ctx = getContext_ui_ctx() as consumer_app_ui_Ctx
const App_Android_Store_Link$ = App_Android_Store_Link$_b(ctx)
const App_IOS_Store_Link$ = App_IOS_Store_Link$_b(ctx)
</script>

<div class="AppStoreLinks">
  <a class="playstore-link" target="_blank"
		 href={$App_Android_Store_Link$}
	><img
		src="/assets/img/cr/play-store-badge.svg"
		alt="google play badge"></a>
  <a class="appstore-link" target="_blank"
		 href={$App_IOS_Store_Link$}
	><img
		src="/assets/img/cr/app-store-badge.svg"
		alt="app store badge"
	></a>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.AppStoreLinks {
	position: relative;
	@media (min-width: $screen-sm-min) {
		text-align: right;
	}
	> a {
		display: inline;
		@media (max-width: $screen-sm-max) {
			display: inline;
		}
		img {
			width: 140px;
			height: 40px;
			@media (max-width: $screen-sm-max) {
				max-width: 45%;
				max-height: 32px;
			}
		}
	}
}
</style>
