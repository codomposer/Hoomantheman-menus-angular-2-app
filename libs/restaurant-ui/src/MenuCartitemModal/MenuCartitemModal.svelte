<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { style_ } from '@ctx-core/html'
import { api_src_ } from '@menus/api'
import type { Menuitem_I, Menuoption_I, Menuoptionsize_I } from '@menus/consumer-menu'
import { IMG_CHECKBOX_ACTIVE$_b, IMG_CHECKBOX$_b, IMG_RADIO_ACTIVE$_b, IMG_RADIO$_b } from '@menus/platform-settings'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { MenuCartitemModal_c } from './MenuCartitemModal_c.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const IMG_CHECKBOX = IMG_CHECKBOX$_b(ctx)
const IMG_CHECKBOX_ACTIVE = IMG_CHECKBOX_ACTIVE$_b(ctx)
const IMG_RADIO$ = IMG_RADIO$_b(ctx)
const IMG_RADIO_ACTIVE$ = IMG_RADIO_ACTIVE$_b(ctx)
export const _ = new MenuCartitemModal_c(ctx)
export const { open, close } = _
const {
	busy$, consumer_login_user$, is_modal_open$, is_modal_open_animate$, menu_cartitem$, SoldOutAction$, serviceType$,
	serviceType_invalid, SoldOutAction_busy$, SoldOutActions$, totalPrice$,
} = _
let menuitem:Menuitem_I
$: menuitem = $menu_cartitem$?.menuitem
let menuoptions:Menuoption_I[]
$: menuoptions = $menu_cartitem$?.menuoptions
let menuoptionsizes:Menuoptionsize_I[]
$: menuoptionsizes = $menu_cartitem$?.menuoptionsizes
let selected_menuoptionsize:Menuoptionsize_I
$: selected_menuoptionsize = $menu_cartitem$?.selected_menuoptionsize
let suggestion:string|undefined
$: suggestion = $menu_cartitem$?.suggestion
let quantity:number
$: quantity = $menu_cartitem$?.quantity
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:keydown={evt => evt.key === 'Escape' && _.close()}></svelte:window>
{#if $is_modal_open$ && $menu_cartitem$}
  <div class="modal-backdrop fade in"></div>
  <div
		class="modal MenuCartitemModal menu-item-options-modal fade d-block"
		class:in={$is_modal_open_animate$}
		on:click={evt => _.close()}
	>
    <div class="modal-dialog" on:click|stopPropagation>
      <div
				class="modal-content"
				class:has-menu-item-image={menuitem.MenuImageExist}
			>
        <div class="modal-header"
						 style={style_({
                'background-image':
                  menuitem.MenuImageExist
                    ? (`url(${api_src_(menuitem.FileName)})`)
                    : ''
             })}
				>
          <div class="modal-header-overlay"></div>
          <button type="button" class="close" aria-label="Close" on:click={_.close}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{ menuitem.MenuItemName }</h4>
        </div>
        <div class="modal-body modal-scrollable">
          {#if $serviceType_invalid}
            <div class="item-unavailable bg-danger">
              Right now your are using {$serviceType$} service and you are not able to
              order food from this restaurant. You have to change your service type.
            </div>
          {/if}
					{#if menuitem.MenuItemDescription}
            <div class="menu-item-desc">
              ({ menuitem.MenuItemDescription })
            </div>
          {/if}
					{#if menuoptionsizes?.length}
            <div class="menu-item-options-list">
              <table class="table table-hover">
								<thead>
									<tr>
										<th colspan="3">item size
											<div class="chip-label chip-label-primary">Required</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{#each menuoptionsizes || [] as menuoptionsize}
										<tr on:click={_evt => _.select_menuoptionsize(menuoptionsize)}>
											<td class="nostretch">
												<img
													alt={selected_menuoptionsize?.Name}
													src={
														menuoptionsize.id === selected_menuoptionsize?.id
														? $IMG_RADIO_ACTIVE$
														: $IMG_RADIO$
													}
												/>
											</td>
											<td>{ menuoptionsize.Name }</td>
											<td class="text-right">{ menuoptionsize.Price ? `$${menuoptionsize.Price}` : 'Free' }</td>
										</tr>
									{/each}
								</tbody>
              </table>
            </div>
          {/if}
					{#if $busy$}
            <PageLoader></PageLoader>
          {:else}
            <div class="menu-item-options-list">
              {#each menuoptions || [] as menuoption}
                <table class="table table-hover">
									<tbody>
										<tr>
											<th colspan="3">{menuoption.OptionHeader}<br>{menuoption.OptionDescription}
												{#if menuoption.Minimum_Select === 0 && !menuoption.Is_Single_Select}
													<div class="chip-label chip-label-gray">
															Optional
													</div>
												{:else}
													<div class="chip-label chip-label-primary">Required</div>
												{/if}
												{#if menuoption.Minimum_Select || menuoption.Maximum_Select}
													<div>
														{#if menuoption.Minimum_Select}
															<span>Minimum {menuoption.Minimum_Select}
																{#if menuoption.Maximum_Select}
																	<span>&nbsp;</span>
																{/if}
															</span>
														{/if}
														{#if menuoption.Maximum_Select}
															<span>Maximum {menuoption.Maximum_Select}</span>
														{/if}
													</div>
												{/if}
											</th>
										</tr>
										{#each menuoption.OptionItems || [] as menuoptionitem}
											<tr on:click={_.select_menuoptionitem(menuoption, menuoptionitem)}>
												<td class="nostretch">
													{#if menuoption.Is_Single_Select}
														<img alt={menuoption.Name} src={
															menuoption?.selected_OptionItem?.ID === menuoptionitem.ID
															? $IMG_RADIO_ACTIVE$
															: $IMG_RADIO$
														}/>
													{:else}
														<img alt={menuoptionitem.Name} src={
															menuoptionitem.is_selected
															? $IMG_CHECKBOX_ACTIVE
															: $IMG_CHECKBOX
														}/>
													{/if}
												</td>
												<td>{ menuoptionitem.Name }</td>
												<td class="text-right">
													<div>{ menuoptionitem.Price ? `$${menuoptionitem.Price}` : 'Free' }</div>
												</td>
											</tr>
										{/each}
									</tbody>
                </table>
              {/each}
            </div>
            <div class="special-instruction-section">
              <div class="section-label">Special Instructions</div>
              <textarea class="form-control special-instruction-textarea"
												rows="3"
												placeholder="Enter your message here… (max 300 characters)"
												bind:value={suggestion}
							></textarea>
            </div>
						{#if $consumer_login_user$}
              <div class="soldout-section">
                {#if $SoldOutAction_busy$}
                  <PageLoader center="parent" class="soldout-PageLoader"></PageLoader>
                {:else}
                  <div class="form-group">
                    <label for="SoldOutAction" class="f-bold"
										>If item is sold out / price changing</label>
                    <select class="form-control" name="SoldOutAction" id="SoldOutAction"
														bind:value={$SoldOutAction$}
										>
                      {#each $SoldOutActions$ || [] as item}
                        <option value={item}>{ item.Name }</option>
                      {/each}
                    </select>
                  </div>
                {/if}
              </div>
            {/if}
          {/if}
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-sm-5">
              <div class="menu-item-qty-section-wrapper">
                <div class="menu-item-qty-section noselect">
                  <div class="menu-item-qty b-text3">
                    <div class="qty-minus"
												 on:click={ _evt => _.update_quantity(-1) }
										>
                      <div class="close-icon"></div>
                    </div>
                    <div class="qty-value">{ quantity }</div>
                    <div class="qty-plus"
												 on:click={ _evt=>_.update_quantity(1) }
										>
                      <div class="open-icon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-7">
              <button class="btn btn-lg btn-success btn-block"
											on:click={evt => _.save()}
											disabled={ $busy$ || $SoldOutAction_busy$ || $serviceType_invalid }
							>Add to Cart({ currency_str_($totalPrice$, 'USD') })</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type="text/scss" global>
@import "@menus/css/lib";
.MenuCartitemModal {
	.modal-content {
		&.has-menu-item-image {
			.modal-header {
				background-repeat: no-repeat;
				padding-bottom: 267px;
				background-size: cover;
				background-position: center;
				.modal-header-overlay {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					width: 100%;
					height: 285px;
					opacity: 0.9;
					background-image: linear-gradient(0deg, rgba(38, 50, 56, 0.00) 0%, #263238 95%);
				}
				.close {
					color: white;
					position: absolute;
					top: 12px;
					right: 24px;
				}
				.modal-title {
					position: absolute;
					top: 24px;
					width: calc(100% - 80px);
					color: white;
					padding-right: 0;
					white-space: normal;
				}
			}
			.modal-body {
				@media (min-width: $screen-sm-min) {
					height: calc(100vh - 475px);
				}
			}
		}
		.modal-body {
			padding-bottom: 20px;
			.chip-label {
				margin-left: 7px;
			}
			.rest-unavailable, .item-unavailable {
				margin-top: 40px;
				color: $light;
				line-height: 20px;
				padding: 18px 24px;
			}
			.menu-item-desc, .menu-item-options-list {
				margin-top: 40px;
			}
			.special-instruction-section {
				margin-top: 40px;
				.section-label {
					font-weight: $lato-bold;
				}
				.special-instruction-textarea {
					margin-top: 7px;
				}
			}
			.soldout-section {
				margin-top: 40px;
			}
		}
		.modal-footer {
			border-top: 1px solid #DBDBDB;
			padding: 20px 20px 200px;
			@media (max-width: $screen-xs-max) {
				// TODO: Fix this `important` in future
				position: unset !important;
				padding-bottom: 150px !important;
			}
			@media (min-width: $screen-sm-min) {
				padding-bottom: 20px;
			}
			.menu-item-qty-section-wrapper {
				@media (max-width: $screen-xs-max) {
					text-align: center;
					margin-bottom: 24px;
				}
				.menu-item-qty-section {
					.menu-item-qty {
						padding: 5px 10px;
						background: white;
						border: 2px solid transparent;
						border-radius: 100px;
						@media (min-width: $screen-sm-min) {
							display: inline-block;
							width: 184px;
						}
						.qty-value {
							width: 32%;
							font-weight: $lato-black;
							font-size: 24px;
							text-align: center;
							display: inline-block;
						}
						.qty-minus {
							margin-top: 5px;
							width: 32%;
							float: left;
							text-align: left;
							.close-icon {
								width: 24px;
								height: 24px;
							}
						}
						.qty-plus {
							margin-top: 5px;
							width: 32%;
							float: right;
							text-align: right;
							.open-icon {
								width: 24px;
								height: 24px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
