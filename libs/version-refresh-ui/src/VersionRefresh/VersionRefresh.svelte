<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { APP_VERSION_dirty$_b } from '../APP_VERSION_dirty$_b.js'
import type { version_refresh_ui_Ctx } from '../version_refresh_ui_Ctx.js'
const ctx = getContext_ui_ctx() as version_refresh_ui_Ctx
const APP_VERSION_dirty$ = APP_VERSION_dirty$_b(ctx)
</script>

{#if $APP_VERSION_dirty$}
  <div class="VersionRefresh">
    <div class="text">
      There are new updates. Please refresh this page.
    </div>
    <a href="." class="refresh-link" on:click|preventDefault={evt => window.location.reload()}>refresh</a>
  </div>
{/if}

<style type=text/scss>
@import "@menus/css/lib";
.VersionRefresh {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	height: 72px;
	width: 100%;
	z-index: 999999;
	background: orange;
	vertical-align: middle;
	.text {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 64px;
	}
	.refresh-link {
		display: flex;
		align-items: center;
		justify-content: center;
		background: $brand-success;
		z-index: 1;
		&:focus {
			text-decoration: none;
		}
	}
}
</style>
