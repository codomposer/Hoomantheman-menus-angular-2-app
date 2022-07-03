<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PREVIEW_TAB } from '@menus/web-config'
import { MenuitemPreviewModal } from '../MenuitemPreviewModal'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { PreviewTab_c } from './PreviewTab_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const ro_auth_rules = ro_auth_rules$_b(ctx)
export const _ = new PreviewTab_c(ctx, dispatch)
const { busy$, ro_preview_masterheadings$, MenuitemPreviewModal_i$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules[PREVIEW_TAB]}
<MenuitemPreviewModal bind:this={$MenuitemPreviewModal_i$}></MenuitemPreviewModal>
<div class="PreviewTab page">
<div class="restaurant-menu-preview">
  {#if $busy$ || !$ro_preview_masterheadings$}
    <PageLoader center="parent"></PageLoader>
  {:else}
    {#each $ro_preview_masterheadings$ as ro_preview_masterheading}
      <div class="menu-section">
        <div class="menu-section-heading">
          <div class="row">
            <div class="col-xs-9">
              { ro_preview_masterheading.MasterHeadingName }
            </div>
            <div class="col-xs-3 text-right">
              <div class="toggle-ro_preview_masterheading"
									 class:open-icon={ro_preview_masterheading.hidden}
									 class:close-icon={!ro_preview_masterheading.hidden}
									 on:click={evt => ro_preview_masterheading.hidden = !ro_preview_masterheading.hidden}
							></div>
            </div>
          </div>
        </div>
				{#if !ro_preview_masterheading.hidden}
          <div class="menu-section-details">
            {#each ro_preview_masterheading.Heading as heading}
              <div class="menu-item-section">
                <div class="menu-item-section-heading">
                  <div class="row">
                    <div class="col-xs-9">
                      { heading.HeadingName }
                    </div>
                    <div class="col-xs-3 text-right">
                      <div class:open-icon={heading.hidden}
													 class:close-icon={!heading.hidden}
													 on:click={evt => heading.hidden = !heading.hidden}
											></div>
                    </div>
                  </div>
                </div>
								{#if !heading.hidden}
                  <div class="menu-item-section-details">
                    {#each heading.Menu as ro_menuitemheading}
                      <div class="row menu-item-name-price"
													 class:have-option={ro_menuitemheading.HaveOption === 1}
													 on:click={evt => _.open_MenuitemPreviewModal_i(ro_menuitemheading)}
											>
                        <div class="col-xs-6 menu-item-name">{ ro_menuitemheading.MenuItemName }</div>
                        <div class="col-xs-6 text-right f-black">${ ro_menuitemheading.Price }</div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
        </div>
    {:else}
      <div class="no-records">No Records to display</div>
    {/each}
  {/if}
</div>
</div>
{/if}

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.PreviewTab {
	.restaurant-menu-preview {
		.no-records {
			text-align: center;
			padding: 20px 0;
			border-top: 1px solid #DBDBDB;
			border-bottom: 1px solid #DBDBDB;
		}
		.menu-section {
			border: 1px solid #DBDBDB;
			border-radius: 3px;
			margin-bottom: 24px;
			.menu-section-heading {
				font-weight: $lato-black;
				font-size: 24px;
				padding: 18px 32px;
			}
			.menu-section-details {
				padding: 0 33px 33px;
				border-top: 1px solid #DBDBDB;
				@media (max-width: $screen-xs-max) {
					padding-left: 11px;
					padding-right: 11px;
				}
				.menu-item-section {
					margin-top: 33px;
					border: 1px solid #DBDBDB;
					@media (max-width: $screen-xs-max) {
						margin-top: 11px;
					}
					.menu-item-section-heading {
						font-weight: $lato-black;
						font-size: 18px;
						padding: 21px 24px;
					}
					.menu-item-section-details {
						padding: 28px 24px;
						border-top: 1px solid #DBDBDB;
						.menu-item-name-price {
							margin-bottom: 12px;
							&.have-option {
								cursor: pointer;
								color: $brand-success;
								.menu-item-name {
									text-decoration: underline;
								}
							}
							&:last-child {
								margin-bottom: 0;
							}
						}
					}
					&.collapsed {
						.menu-item-section-heading {
							border-bottom: none;
						}
						.menu-item-section-details {
							display: none;
						}
					}
				}
			}
			&.collapsed {
				.menu-section-heading {
					border-bottom: none;
				}
				.menu-section-details {
					display: none;
				}
			}
		}
	}
}
</style>
