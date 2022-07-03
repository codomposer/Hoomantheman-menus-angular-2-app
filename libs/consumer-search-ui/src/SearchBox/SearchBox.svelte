<script lang="ts">
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { SearchParams } from '../SearchParams/index.js'
import { SearchKeywordType, SearchBox_c } from './SearchBox_c.js'
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new SearchBox_c(ctx, dispatch)
const {
	autoSuggest_busy$, cuisine_autoSuggest_items$, dish_autoSuggest_items$, menuitems_autoSuggest_items$,
	rest_autoSuggest_items$, selected_autoSuggest_item$, show_autoSuggest$, keywords$, value$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="SearchBox top-search-section clearfix">
  <div class="top-search clearfix">
    <SearchParams
			bind:value={$value$}
			on:focus={evt => _.focus_SearchParams(true)}
			on:blur={evt => _.focus_SearchParams(false)}
			on:select={evt => _.onselect_SearchParams()}
			on:keydown:ArrowUp={_.onkeydown_ArrowUp}
			on:keydown:ArrowDown={_.onkeydown_ArrowDown}
			on:keydown:Enter={evt => _.onselect_SearchParams()}
		></SearchParams>
		{#if $show_autoSuggest$}
      <div class="auto-complete-list">
        {#if $autoSuggest_busy$}
          <div class="auto-complete-loader">
            <PageLoader></PageLoader>
          </div>
        {/if}
				<div>

					{#if $cuisine_autoSuggest_items$.length > 0}
			<div class="auto-complete-heading">Cuisines</div>
			{/if}
					{#each $cuisine_autoSuggest_items$ || [] as item}
            <div class="auto-complete-item list-item"
								 class:active={item === $selected_autoSuggest_item$}
								 on:mousedown={evt => _.onclick_autoSuggestItem(item, SearchKeywordType.KEYWORD_TYPE_CUISINE)}
						>{ item.Name }</div>
          	{/each}

			  {#if $dish_autoSuggest_items$.length > 0}
			<div class="auto-complete-heading">Dishes</div>
			{/if}
			{#each $dish_autoSuggest_items$ || [] as item}
            <div
							class="auto-complete-item list-item"
							class:active={item === $selected_autoSuggest_item$}
							on:mousedown={evt => _.onclick_autoSuggestItem(item, SearchKeywordType.KEYWORD_TYPE_DISH)}
						>{ item.Name }</div>
            
          	{/each}

			{#if $menuitems_autoSuggest_items$.length > 0}
				<div class="auto-complete-heading">Menu Items</div>
			{/if}
          	{#each $menuitems_autoSuggest_items$ as item}
            <div
							class="auto-complete-item list-item"
							class:active={item === $selected_autoSuggest_item$}
							on:mousedown={evt => _.onclick_autoSuggestItem(item, SearchKeywordType.KEYWORD_TYPE_MENU_ITEM)}
						>{ item.Name }</div>
            
          	{/each}
			
			{#if $rest_autoSuggest_items$.length > 0}
			<div class="auto-complete-heading">Restaurant</div>
			{/if}
			{#each $rest_autoSuggest_items$ || [] as item}
            <div class="auto-complete-item list-item"
								 class:active={item === $selected_autoSuggest_item$}
								 on:mousedown={evt => _.onclick_autoSuggestItem(item, SearchKeywordType.KEYWORD_TYPE_RESTAURANT)}
						>{ item.Name }</div>
          	{/each}

			{#if !$cuisine_autoSuggest_items$.length && !$dish_autoSuggest_items$.length && !$menuitems_autoSuggest_items$.length && !$rest_autoSuggest_items$.length}
				<div class="auto-complete-heading">No results found</div>
			{/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style type="text/scss">
@import "@menus/consumer-shared-css/variables";
.SearchBox {
	background-color: white;
	padding: 0 16px;
	@media (max-width: $screen-xs-max) {
		padding-left: 8px;
		padding-right: 8px;
	}
	.top-search {
		$top-search-height: $input-height-base;
		box-shadow: 0 0 3px #dbdbdb;
		border-radius: 3px;
		position: relative;

		@media (min-width: $screen-md-min) {
			max-width: 600px;
			float: left;
			width: 100%;
		}
		.auto-complete-list {
			position: absolute;
			top: $top-search-height;
			left: 0;
			width: 100%;
			background-color: white;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
			border-bottom: none;
			z-index: 1;

			@media (max-width: $screen-xs-max) {
				top: $input-height-base;
			}

			.auto-complete-loader {
				padding: 40px;
			}
			.auto-complete-heading {
				padding-left: 24px;
				font-weight: $lato-black;
				font-size: 18px;
				margin-top: 27px;
				margin-bottom: 12px;
			}
			.auto-complete-item {
				cursor: pointer;
				padding: 14px 23px;
				border-bottom: 1px solid #DBDBDB;
			}
		}
	}
}
</style>
