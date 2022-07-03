<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { clickoutside } from '@menus/dom'
import { user_full_name_ } from '@menus/user-common'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { is_ProfileHandle_open$_b } from '../is_ProfileHandle_open$_b.js'
import { toggle_ProfileHandle_b } from '../toggle_ProfileHandle_b.js'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx
const is_ProfileHandle_open$ = is_ProfileHandle_open$_b(ctx)
const consumer_login_user$ = consumer_login_user$_b(ctx)
const toggle_ProfileHandle = toggle_ProfileHandle_b(ctx)
</script>

{#if $consumer_login_user$}
  <a use:clickoutside={evt => is_ProfileHandle_open$.set(false)}
		 href="."
		 class="ProfileHandle dropdown-toggle"
		 class:active={$is_ProfileHandle_open$}
		 on:click|preventDefault|stopPropagation={evt => toggle_ProfileHandle(false)}
	>
    <div class="icon profile-selected-icon"></div>
    <div class="login-username"
		>{ user_full_name_($consumer_login_user$) }</div>
    <span class="caret"></span>
  </a>
{/if}

<style type="text/scss">
@import "@menus/css/lib";
.ProfileHandle {
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	@media (min-width: $grid-float-breakpoint) {
		padding-left: 8px;
		padding-right: 8px;
		text-align: center;
	}
	.icon {
		width: 1em;
		height: 1em;
		margin: 1px 8px 0 0;
	}
	.login-username {
		@media (min-width: $grid-float-breakpoint) {
			white-space: nowrap;
			max-width: 100px;
			display: inline-block;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
</style>
