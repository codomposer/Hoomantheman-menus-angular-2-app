<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
// import { SupportChatBox } from '@menus/chat-ui'
// import { EnableGuestSupportChat$_b, EnableLoggedInSupportChat$_b } from '@menus/platform-settings'
// import { support_chat_window_show$_b } from '@menus/chat'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { html_scrollTop$_b } from '@menus/layout-ui'
import { ro_app_body_div$_b } from '../ro_app_body_div$_b.js'
import { ro_app_body_top_div$_b } from '../ro_app_body_top_div$_b.js'
import { ro_app_body_scrollTop$_b } from '../ro_app_body_scrollTop$_b.js'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
const consumer_login_user$ = consumer_login_user$_b(ctx)
const html_scrollTop$ = html_scrollTop$_b(ctx)
const isLoggedIn$ = consumer_login_user$.isLoggedIn$
// const EnableGuestSupportChat$ = EnableGuestSupportChat$_b(ctx)
// const EnableLoggedInSupportChat$ = EnableLoggedInSupportChat$_b(ctx)
const ro_app_body_div$ = ro_app_body_div$_b(ctx)
const ro_app_body_top_div$ = ro_app_body_top_div$_b(ctx)
const ro_app_body_scrollTop$ = ro_app_body_scrollTop$_b(ctx)
// const support_chat_window_show = support_chat_window_show$_b(ctx)
</script>

<svelte:window on:scroll={evt => html_scrollTop$.set(document.body.parentElement.scrollTop) }></svelte:window>

<div bind:this={$ro_app_body_div$}
		 class="ro-app-body"
		 on:scroll={evt => ro_app_body_scrollTop$.set($ro_app_body_div$.scrollTop) }
>
  <div class="ro_app_body_top_div" bind:this={$ro_app_body_top_div$}></div>
  <slot></slot>
</div>
<!--{#if $support_chat_window_show}-->
<!--  <div class="support-chat-box-container">-->
<!--    {#if (!$isLoggedIn && $EnableGuestSupportChat$) || ($isLoggedIn && $EnableLoggedInSupportChatu$) }-->
<!--      <div>-->
<!--        <SupportChatBox type="TYPE_RESTAURANT"></SupportChatBox>-->
<!--      </div>-->
<!--    {/if}-->
<!--  </div>-->
<!--{/if}-->

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
@import "@menus/ro-shared-css/icons";
.ro-app {
	@media (max-width: $screen-xs-max) {
		display: flex;
		flex-direction: column;
		> .ro-app-body {
			flex-grow: 1;
		}
		> .support-chat-box-container {
			flex-grow: 0;
			min-height: $support-chat-box-container-height;
		}
	}
}
</style>
