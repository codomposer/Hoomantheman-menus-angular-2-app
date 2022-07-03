<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { MenuitemPreviewModal_c } from './MenuitemPreviewModal_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
export const _ = new MenuitemPreviewModal_c(ctx)
const { busy$, is_modal_open$, menuoptions$, menuoptionsizes$, ro_menuitem_heading$, } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal menu-item-option-items-modal fade d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click={evt => _.close()} aria-label="Close"
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">{ $ro_menuitem_heading$.MenuItemName }</h4>
        </div>
        <div class="modal-body"
						 class:modal-scrollable={!$busy$}
				>
          {#if $busy$}
            <PageLoader center="parent"></PageLoader>
          {/if}
					<div class="menu-item-sizes-list">
            {#if $menuoptionsizes$?.length}
              <table class="table table-hover">
								<thead>
									<tr>
										<th colspan="3">Choose item size
											<div class="chip-label chip-label-primary">Required</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{#each $menuoptionsizes$ as menuoptionsize}
										<tr on:click={evt => _.select_menuoptionsize(menuoptionsize)}>
											<td class="nostretch">
												<div class:radio-on-icon={menuoptionsize.Is_Default}
														 class:radio-off-icon={!menuoptionsize.Is_Default}
												></div>
											</td>
											<td>{ menuoptionsize.Name }</td>
											<td class="text-right">${ menuoptionsize.Price || '' }</td>
										</tr>
									{/each}
								</tbody>
              </table>
            {/if}
          </div>
          <div class="menu-item-options-list">
            {#each $menuoptions$ || [] as menuoption}
              <table class="table">
								<thead>
									<tr>
										<th colspan="3">{menuoption.OptionHeader}
											{#if menuoption.Minimum_Select}
												<div class="chip-label chip-label-primary">
													Required
												</div>
											{:else}
												<div class="chip-label chip-label-gray">
													Optional
												</div>
											{/if}
										</th>
									</tr>
								</thead>
								<tbody>
									{#each menuoption.OptionItems as optionitem}
										<tr>
											<td class="nostretch">
												{#if menuoption.Is_Single_Select}
													<div class:radio-on-icon={optionitem.Is_Default}
															 class:radio-off-icon={!optionitem.Is_Default}
													></div>
												{:else}
													<div class:checkbox-on-icon={optionitem.Is_Default}
															 class:checkbox-off-icon={!optionitem.Is_Default}
													></div>
												{/if}
											</td>
											<td>
												{ optionitem.Name }
											</td>
											<td class="text-right">
												${ optionitem.Price || '' }
											</td>
										</tr>
									{/each}
								</tbody>
              </table>
            {/each}
          </div>
        </div>
        <div class="modal-footer">
					<div class="row">
						<button type="button" class="col-xs-12 btn btn-lg btn-success"
										on:click={evt => _.close()}
						>OK</button>
					</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss>
.menu-item-option-items-modal {
	.modal-body {
		padding-top: 32px;
		min-height: 250px;
		overflow: hidden;
		&.modal-scrollable {
			overflow: auto;
		}
		.chip-label {
			margin-left: 7px;
		}
		.menu-item-options-list {
			.table {
				th, td {
					cursor: text;
				}
			}
		}
	}
}
</style>
