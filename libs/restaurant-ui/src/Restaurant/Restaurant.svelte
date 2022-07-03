<script lang="ts">
import { onDestroy, onMount } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { restaurant_frame$_b } from '@menus/restaurant-frame'
import { PageLoader } from '@menus/shared-ui'
import { platform_settings$_b } from '@menus/http'
import { page_query$_b } from '@ctx-core/sapper'
import { MenuCartitemModal } from '../MenuCartitemModal/index.js'
import { Restaurant_Menuitems } from '../Restaurant_Menuitems/index.js'
import { restaurant_MenuoptionsModal$_b } from '../restaurant_MenuoptionsModal$_b.js'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { Restaurant_c } from './Restaurant_c.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const _ = new Restaurant_c(ctx)
const { menu$ } = _
const { busy$ } = restaurant_frame$_b(ctx)
const platform_settings$ = platform_settings$_b(ctx)
const page_query$ = page_query$_b(ctx)
const restaurant_MenuoptionsModal$ = restaurant_MenuoptionsModal$_b(ctx)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<MenuCartitemModal bind:this={$restaurant_MenuoptionsModal$}></MenuCartitemModal>
<div class="Restaurant page"
		 class:busy={$busy$}
>
  {#if $busy$}
    <PageLoader></PageLoader>
  {:else}

  {#if $platform_settings$?.IsMultiRestaurant || $platform_settings$?.IsMarketPlace}
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/search">« All Restaurants</a>
			</li>
			{#if $page_query$?.keywords}
			<li class="breadcrumb-item">
				<a href="/menu?keywords={$page_query$?.keywords}">{ $page_query$?.keywords }</a>
			</li>
			{/if}
			<li class="breadcrumb-item active">
				<span>{ $menu$?.RestaurantName }</span>
			</li>
		</ul>
	</div>
	{/if}

    <Restaurant_Menuitems></Restaurant_Menuitems>
  {/if}
</div>

<style type=text/scss global>
@import '@menus/css/lib';
.Restaurant {
	padding: 40px 0 0;
	&.busy {
		min-height: 100vh;
	}

	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
}
</style>
