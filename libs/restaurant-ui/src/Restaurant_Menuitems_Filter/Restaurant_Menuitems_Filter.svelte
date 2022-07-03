<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { NoResultPlaceholder } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { Restaurant_Heading } from '../Restaurant_Heading'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { Restaurant_Menuitems_Filter_c } from './Restaurant_Menuitems_Filter_c.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new Restaurant_Menuitems_Filter_c(ctx, dispatch)
const { filtered_headings$, no_result$, restaurant_search_text$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="Restaurant_Menuitems_Filter">
  <div class="restaurant-search-box">
    <input type="text"
					 class="form-control"
					 bind:value={$restaurant_search_text$}
					 placeholder="Search Menu"
		>
	{#if $restaurant_search_text$}
    	<div class="clear" on:click={evt => restaurant_search_text$.set('')}></div>
	{/if}
  </div>
	{#each $filtered_headings$ || [] as Heading,idx}
    <Restaurant_Heading {Heading} {idx}></Restaurant_Heading>
  {/each}
	{#if $no_result$}
    <NoResultPlaceholder config={{
      icon: 'burger-search-fail-icon',
      title:
        $restaurant_search_text$
          ? 'No matching menu items'
          : `We don't deliver to this address`,
      subtitle:
        $restaurant_search_text$
          ? 'Try changing your search text'
          : 'Try changing your address',
    }}></NoResultPlaceholder>
  {/if}
</div>

<style type=text/scss global>
.Restaurant_Menuitems_Filter {
	.restaurant-search-box {
		position: relative;
		&::before {
			position: absolute;
			top: 0;
			left: 12px;
			height: 100%;
			width: 24px;
			background-repeat: no-repeat;
			background-position: 50%;
			background-size: contain;
			background-image: vurl('/assets/img/cr/search.svg');
			z-index: 1;
			content: " ";
		}
		.form-control {
			padding: 0 48px;
			background-color: #f1F3F4;
			border-color: transparent;
		}
		.clear {
			position: absolute;
			top: 0;
			right: 12px;
			height: 100%;
			width: 24px;
			background-repeat: no-repeat;
			background-position: 50%;
			background-size: contain;
			background-image: vurl('/assets/img/shared/close-1.svg');
			z-index: 1;
			content: " ";
			cursor: pointer;
		}
	}
}
</style>
