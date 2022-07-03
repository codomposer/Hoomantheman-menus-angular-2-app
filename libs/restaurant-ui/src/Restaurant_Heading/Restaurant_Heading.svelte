<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import type { Heading_I } from '@menus/consumer-menu'
import { Restaurant_Menuitem } from '../Restaurant_Menuitem'
import { heading_elements$_b } from '../heading_elements$_b.js'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
export let Heading:Heading_I, idx:number
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const heading_elements$ = heading_elements$_b(ctx)
</script>

<div bind:this={$heading_elements$[idx]} class="menu-list">
  <div id="heading_{ Heading.Hid }" class="head-name">{ Heading.Heading }</div>
	{#each Heading.menuitems as Head_menuitem}
    <Restaurant_Menuitem menuitem={Head_menuitem}></Restaurant_Menuitem>
  {/each}
</div>

<style type=text/scss>
@import "@menus/css/lib";
.menu-list {
	.head-name {
		margin: 36px 0 28px;
		font-weight: $lato-black;
		font-size: 18px;
		scroll-margin-top: 130px;

		@media (max-width: $screen-sm-max) {
			scroll-margin-top: 100px;
		}
	}
}
</style>
