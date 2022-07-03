<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { MenuSearchBox_c } from './MenuSearchBox_c.js'
export let click_action:string = null
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
export const _ = new MenuSearchBox_c(ctx)
const { ro_preview_masterheadings$, isOpenACList$, keywords$ } = _
$: _.click_action$.$ = click_action
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="form-group menus-search-section MenuSearchBox">
  <div class="m-input-group has-addon-left m-input-sm">
    <div class="m-input-group-addon m-addon-left">
      <div class="search-icon cursor-default"></div>
    </div>
    <input type="text" class="form-control input-sm" name="menusTabSearchText"
					 bind:value={$keywords$}
					 placeholder="Search your Menu"
					 on:change={evt => _.menussearch_text_Enter()}
					 on:focus={evt => _.menussearch_text_Enter()}
					 on:blur={evt => _.openACList(false)}
		>
  </div>
</div>
{#if $isOpenACList$}
  <div class="auto-complete-list">
    {#each $ro_preview_masterheadings$ as ro_preview_masterheading}
      <div class="ac-masterhead" on:click={evt => _.view_ro_preview_masterheading(ro_preview_masterheading)}>
        <div class="ac-masterhead-item">
          <div class="ac-masterhead-title">
            { ro_preview_masterheading.MasterHeadingName }
          </div>
        </div>
				{#each ro_preview_masterheading.Heading as ro_preview_heading}
          <div class="ac-head"
							 on:click|stopPropagation={evt => _.view_ro_preview_heading(ro_preview_masterheading, ro_preview_heading)}
					>
            <div class="ac-head-item">
              <div class="ac-head-title">
                { ro_preview_heading.HeadingName }
              </div>
            </div>
						{#each ro_preview_heading.Menu as ro_preview_menuitem}
              <div class="ac-menuitem" mStopEvent
									 on:click|stopPropagation={evt =>
                     _.view_ro_preview_menuitem(ro_preview_masterheading, ro_preview_heading, ro_preview_menuitem)
                   }
							>
                <div class="ac-menuitem-item">
                  <div class="ac-menuitem-title">
                    { ro_preview_menuitem.MenuItemName }
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style type=text/scss>
@import "@menus/css/lib";
.MenuSearchBox {
	margin-bottom: 0;
	max-width: 340px;
	@media (max-width: $screen-xs-max) {
		max-width: none;
	}
}
.auto-complete-list {
	position: absolute;
	background-color: white;
	width: 340px;
	margin-left: -1px;
	border: 1px solid #DBDBDB;
	border-bottom: none;
	border-top: none;
	z-index: 99;
	max-height: 400px;
	overflow-y: auto;
	.ac-masterhead-item {
		padding-left: 24px;
		font-weight: $lato-black;
		font-size: 18px;
		margin-top: 27px;
		margin-bottom: 12px;
	}
	.ac-head-title {
		padding-left: 12px;
	}
	.ac-menuitem-title {
		padding-left: 24px;
	}
	.ac-head-item {
		font-weight: $lato-bold;
	}
	.ac-head-item, .ac-menuitem-item {
		cursor: pointer;
		padding: 14px 23px;
		border-bottom: 1px solid #DBDBDB;
	}
}
</style>
