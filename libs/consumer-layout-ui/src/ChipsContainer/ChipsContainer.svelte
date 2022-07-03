<script context="module" lang="ts">
export interface ChipsContainer_item_T {
	active:boolean
	url:string
	Name?:string
	ZipCode?:string
}
</script>

<script lang="ts">
import { afterUpdate ,createEventDispatcher } from 'svelte'
import { is_navigating_onclick_b } from '@menus/page'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
export let list:ChipsContainer_item_T[], key:keyof ChipsContainer_item_T, type = '', busy = false,
	enable_loadMoreResults = false, multi_select = false
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx, dispatch = createEventDispatcher()
const is_navigating_onclick = is_navigating_onclick_b(ctx)
let chips_container:HTMLDivElement, init_chips_container_scroll = false, show_next = false, show_prev = false
function choose_item(item:ChipsContainer_item_T) {
	const active = !item.active
	if (!multi_select) {
		for (const list_item of list) {
			list_item.active = false
		}
	}
	item.active = active
	list = list

	dispatch('itemsChanged', list.filter(i => i.active))
}
function click_scroll(event:Event, direction:number) {
	event.preventDefault()
	const chips_container_bcr = chips_container.getBoundingClientRect()
	const { width } = chips_container_bcr
	if (direction < 0) {
		chips_container.scrollLeft = Math.max(
			chips_container.scrollLeft - width,
			0,
		)
	} else {
		chips_container.scrollLeft = chips_container.scrollLeft + width
	}
}
function update_chips_wrapper() {
	if (chips_container) {
		const { scrollLeft, offsetWidth, scrollWidth } = chips_container
		show_prev = !!scrollLeft
		const scrollOffset = scrollLeft + offsetWidth
		show_next = scrollOffset < scrollWidth
		if (scrollOffset >= scrollWidth) {
			trigger_load_more_results()
		}
	}
}
function trigger_load_more_results() {
	dispatch('loadMoreResults')
}

function init_chips_container_scroll_if_needed() {
	if(!init_chips_container_scroll && chips_container) {
		init_chips_container_scroll = true
		update_chips_wrapper()
	}
}

afterUpdate(()=> init_chips_container_scroll_if_needed())
</script>

{#if list?.length}
  <div class="ChipsContainer {$$props.class||''}">
    {#if show_prev}
      <a href="."
				 class="showPrev scroll-arrow arrow-left-icon"
				 on:click={evt=>click_scroll(evt, -1)}
			>&nbsp;</a>
    {/if}
		{#if show_next}
      <a href="."
				 class="showNext scroll-arrow arrow-right-icon"
				 on:click={evt=>click_scroll(evt, 1)}
			>&nbsp;</a>
    {/if}
		<div bind:this={chips_container} class="chips-container" on:scroll={update_chips_wrapper}>
      <div class="chips style-2">
        {#each list as item,index}
          <div class="chip-item-wrapper">
            {#if type === 'link'}
              <a class="chip-item"
								 class:active={item.active}
								 href={item.url}
								 on:click={is_navigating_onclick}
							>{item[key]}</a>
            {:else}
              <div class="chip-item"
									 class:active={item.active}
									 on:click={_evt=>choose_item(item)}
							>{item[key]}</div>
            {/if}
          </div>
        {/each}
				{#if enable_loadMoreResults}
          <div class="load-more-results-link c-primary"
							 on:click={trigger_load_more_results}
					>
            {#if busy}
              <span>Loading...</span>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
@import "@menus/css/clearfix";
.ChipsContainer {
	width: 100%;
	min-height: 51px;
	overflow-x: auto;
	overflow-y: hidden;
	background-color: white;
	border-bottom: 1px solid #DBDBDB;
	padding: 8px 24px 0;
	position: relative;
	@media (max-width: $screen-md-max) {
		min-height: 50px;
	}
	.scroll-arrow {
		position: absolute;
		margin-top: 5px;
		z-index: 1;
		&.showPrev {
			margin-left: -24px;
		}
		&.showNext {
			margin-left: calc(100% - 48px);
		}
	}
	.chips-container {
		position: relative;
		max-height: 400px;
		overflow-x: auto;
		scroll-behavior: smooth;
		&::-webkit-scrollbar {
			scrollbar-width: thin;
		}
		.chips {
			display: inline-block;
			padding-left: 0;
			@include chipsScrollable();
			.chip-item {
				display: inline-block;
				margin: 5px;
				user-select: none;
				a {
					text-decoration: none;
				}
			}
			.load-more-results-link {
				display: inline-block;
				font-weight: $lato-bold;
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
	.selected-chips-wrapper {
		@extend .clearfix;
		margin-top: 8px;
		padding: 0 8px;
		.selected-chips {
			float: left;
			max-width: 80%;
			.selected-chips-count {
				font-weight: $lato-black;
				margin-right: 4px;
			}
		}
	}
}
</style>
