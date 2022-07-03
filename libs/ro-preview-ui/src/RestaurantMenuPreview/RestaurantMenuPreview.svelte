<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { MenuitemPreviewModal } from '@menus/ro-menu-ui'
import type { ro_preview_ui_Ctx } from '../ro_preview_ui_Ctx.js'
import { RestaurantMenuPreview_c } from './RestaurantMenuPreview_c.js'
const ctx = getContext_ui_ctx() as ro_preview_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new RestaurantMenuPreview_c(ctx, dispatch)
const { busy$, API_PREVIEW_preview_payload$, MenuitemPreviewModal_i$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<MenuitemPreviewModal bind:this={$MenuitemPreviewModal_i$}></MenuitemPreviewModal>
<div class="restaurant-menu-preview">
  {#if $busy$}
    <PageLoader></PageLoader>
  {:else}
    {#if !$API_PREVIEW_preview_payload$?.Masterheading?.length}
      <div class="no-records">No Records to display</div>
    {:else}
      {#each $API_PREVIEW_preview_payload$.Masterheading as masterHead}
        <div class="menu-section">
          <div class="menu-section-heading">
            <div class="row">
              <div class="col-xs-9">
                { masterHead.MasterHeadingName }
              </div>
              <div class="col-xs-3 text-right">
                <div class:open-icon={masterHead.hidden}
										 class:close-icon={!masterHead.hidden}
										 on:click={evt => masterHead.hidden = !masterHead.hidden}
										 on:click={evt => API_PREVIEW_preview_payload$.refresh()}
								></div>
              </div>
            </div>
          </div>
					{#if !masterHead.hidden}
            <div class="menu-section-details">
              {#each masterHead.Heading as head}
                <div class="menu-item-section">
                  <div class="menu-item-section-heading">
                    <div class="row">
                      <div class="col-xs-9">
                        { head.HeadingName }
                      </div>
                      <div class="col-xs-3 text-right">
                        <div class:open-icon={head.hidden}
														 class:close-icon={!head.hidden}
														 on:click={evt => head.hidden = !head.hidden}
														 on:click={evt => API_PREVIEW_preview_payload$.refresh()}
												></div>
                      </div>
                    </div>
                  </div>
									{#if !head.hidden}
                    <div class="menu-item-section-details">
                      {#each head.Menu as menuitem}
                        <div class="row menu-item-name-price"
														 class:have-option={menuitem.HaveOption == 1}
														 on:click={evt => _.open_MenuitemPreviewModal_i(menuitem)}
												>
                          <div class="col-xs-6 menu-item-name">{ menuitem.MenuItemName }</div>
                          <div class="col-xs-6 text-right f-black">{ currency_str_(menuitem.Price, 'USD') }</div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  {/if}
</div>

<style type=text/scss>
@import "@menus/css/lib";
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
</style>
