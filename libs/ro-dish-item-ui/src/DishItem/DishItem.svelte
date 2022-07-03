<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { getContext_ui_ctx } from '@menus/ui'
import { api_src_ } from '@menus/api'
import type { DishType_I } from '@menus/dish'
import type { ro_dish_item_ui_Ctx } from '../ro_dish_item_ui_Ctx.js'
export let dish:DishType_I
const ctx = getContext_ui_ctx() as ro_dish_item_ui_Ctx, dispatch = createEventDispatcher()
</script>

<div class="DishItem" on:click={evt => dispatch('click', evt)}>
  <div class="dish-image-wrapper">
    {#if dish.ImageExist}
      <div class="dish-image"
					 style={style_({
             'background-image': `url(${api_src_(dish.FileName)})`,
           })}
			></div>
    {/if}
  </div>
  <div class="dish-details">
    <div class="dish-name text-overflow">{ dish.DishName } ({ dish.Count })</div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.DishItem {
	display: inline-block;
	width: 100%;
	max-width: 370px;
	margin-bottom: 30px;
	cursor: pointer;
	text-align: left;
	font-size: initial;
	@media (min-width: $screen-sm-min) {
		margin-right: 30px;
	}
	.dish-image-wrapper {
		position: relative;
		background-color: #F7F7F7;
		width: 100%;
		height: 165px;
		background-size: cover;
		border-radius: 3px 3px 0 0;
		.dish-image {
			width: 100%;
			height: 100%;
			margin: 0 auto;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50%;
		}
	}
	.dish-details {
		background-color: white;
		padding: 20px 24px;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
		border-radius: 3px 3px 0 0;
		.dish-name {
			font-weight: $lato-black;
			font-size: 18px;
		}
	}
}
</style>
