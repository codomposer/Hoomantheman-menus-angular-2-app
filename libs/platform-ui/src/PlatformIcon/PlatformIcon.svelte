<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { is_navigating_onclick_b } from '@menus/page'
import { App_Name$_b, isPlatform$_b } from '@menus/platform-settings'
import { serviceType$_b } from '@menus/service-type'
import type { platform_ui_Ctx } from '../platform_ui_Ctx.js'
export let white = false
const ctx = getContext_ui_ctx() as platform_ui_Ctx, dispatch = createEventDispatcher()
const App_Name = App_Name$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const isPlatform = isPlatform$_b(ctx)
const serviceType = serviceType$_b(ctx)
let href:string
$: href = $serviceType ? `/?serviceType=${$serviceType}` : '/'
</script>

<a class="PlatformIcon"
	 href="/"
	 on:click={is_navigating_onclick}
	 on:click={evt => dispatch('click', evt)}
>
  {#if $isPlatform}
    <div class="app-name">{$App_Name}</div>
  {:else if $isPlatform != null}
    <div class="menu-logo"
				 class:menu-logo-icon={!white}
				 class:menu-logo-white-icon={white}
		></div>
  {/if}
</a>

<style type=text/scss global>
@import "@menus/css/lib";
.PlatformIcon {
	padding-top: calc(env(safe-area-inset-top, 0));
	padding-left: calc(env(safe-area-inset-left, 0) + 16px);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: default;
	&:hover, &:focus {
		text-decoration: none;
	}
	.app-name {
		position: relative;
		font-weight: 900;
		font-size: 18px;
		height: $navbar-height-sm;
		line-height: $navbar-height-sm;
		// @media (max-width: $screen-sm-max) {
		// 	padding: 0 0 0 36px;
		// 	font-size: 18px;
		// }
	}
	.menu-logo {
		height: $navbar-height-sm;
	}
}
</style>
