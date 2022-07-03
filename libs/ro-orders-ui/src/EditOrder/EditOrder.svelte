<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { shortDate_ } from '@menus/date'
import { ladda } from '@menus/ladda'
import { order_status_r_StatusID } from '@menus/web-config'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { MenuSearchBox } from '@menus/ro-menu-ui'
import { Select } from '@menus/form-ui'
import { Menuitemoptions } from '../Menuitemoptions'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import { EditOrder_c } from './EditOrder_c.js'
const ctx = getContext_ui_ctx() as ro_orders_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new EditOrder_c(ctx, dispatch)
const {
	busy$, save_and_accept_order_busy$, save_order_busy$, search_busy$, cart_busy$, restaurant_cartitems$, coupons$,
	driverTip_percent$, isOpenSelectedMenuItem$, headings$, selected_menu_cartitem$, menuitems$, menuitems_busy$,
	order_info$, ro_masterheadings$, selected_action$, selected_ro_heading$, selected_ro_masterheading$,
	selected_ro_menuitem$, shopping_cart,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $busy$ || $search_busy$ || $cart_busy$}
  <PageLoader center="page"></PageLoader>
{:else}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
<div class="edit-order-page EditOrder">
  {#if !$busy$ && $isOpenSelectedMenuItem$}
    <div class="page-overlay" on:click={evt => _.closeMenuItem()}></div>
    <div class="menu-item-details-sidebar main-header-pt">
      <Menuitemoptions
				action={$selected_action$}
				menu_cartitem={$selected_menu_cartitem$}
				ro_menuitem={$selected_ro_menuitem$}
				{shopping_cart}
				on:ro_menuitem_selected={evt => _.on_ro_menuitem_selected(evt)}
			></Menuitemoptions>
    </div>
  {/if}
	{#if !$busy$ && $order_info$}
    <div class="main-contents">
      <div class="page-title-section">
				<div class="page-title-text" on:click={evt => _.goBack()}>
					<div class="arrow-left-icon"></div>
					Order { $order_info$.OrderDetail.OrderNumber }
				</div>
      </div>
      <div class="order-actions-section">
        <div class="row">
          <div class="col-md-6 menu-search-box-wrapper">
            <MenuSearchBox click_action="event"
													 on:itemclicked={evt => _.onitemclicked(evt)}
						></MenuSearchBox>
          </div>
          <div class="col-md-6 order-actions">
            <button use:ladda={$save_order_busy$} class="btn btn-lg btn-success btn-inverse btn-accept-order"
										on:click={evt => _.saveOrder(false)}
						>Save Order</button>
						{#if $order_info$.OrderDetail.StatusID !== order_status_r_StatusID.ORDER_ACCEPTED}
              <button use:ladda={$save_and_accept_order_busy$}
											class="btn btn-lg btn-success btn-accept-order"
											on:click={evt => _.saveOrder(true)}
							>Save & Accept Order</button>
            {/if}
          </div>
        </div>
      </div>
      <div class="choose-order-item-section clearfix">
        <div class="item-details">
          <!-- Master Heading Tabs -->
					{#if !$busy$}
            <ul class="nav nav-pills scrollable master-head-tabs">
              {#each $ro_masterheadings$ || [] as ro_masterheading,index}
                <li class:active={$selected_ro_masterheading$ && $selected_ro_masterheading$.ID === ro_masterheading.ID}
								><a href="." on:click|preventDefault={evt => _.choose_selected_ro_masterheading(ro_masterheading)}
								>{ ro_masterheading.Name }</a></li>
              {/each}
            </ul>
          {/if}
					<div class="section-heading">Categories</div>
          <div class="head-list clearfix">
            {#each $headings$ || [] as heading,index}
              <div class="head-item" class:active={$selected_ro_heading$ && $selected_ro_heading$.ID === heading.ID}
									 on:click={evt => _.select_heading(heading)}
							>
                <span>{ heading.Name }</span>
              </div>
            {/each}
          </div>
          <div class="section-heading">Menu Items</div>
          <div class="menu-item-list-section">
            {#if $menuitems_busy$}
              <PageLoader></PageLoader>
            {:else}
              <div class="menu-item-list clearfix">
                {#each $menuitems$ || [] as menuitem,index}
                  <div class="menu-item"
											 on:click={evt => _.select_menu_cartitem(menuitem, 'add')}
									>
                    <span class="name">{ menuitem.Name }</span>
                    <span class="price">{ currency_str_(menuitem.Price, 'USD') }</span>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
				{#if $restaurant_cartitems$.length}
          <div class="cart-restaurant-list">
            <div class="section-heading">Order Cart</div>
						{#each $restaurant_cartitems$ || [] as restaurant_cartitem}
              <div class="restaurant-item">
                {#each restaurant_cartitem.menu_cartitems || [] as menu_cartitem,menu_cartitem_idx}
                  <div class="menu-item">
                    <div class="clearfix">
                      <div class="menu-item-name" on:click={evt => _.edit_menu_cartitem(menu_cartitem)}>
                        { menu_cartitem.MenuItemName }
                      </div>
                      <div class="cart-menu-item-qty-section noselect" on:click|preventDefault>
                        <div class="menu-item-qty">
                          <div class="qty-minus"
															 on:click={evt =>
                                 _.update_menu_cartitem_quantity(restaurant_cartitem, menu_cartitem_idx, -1)
                               }
													>
                            <div class="close-icon"></div>
                          </div>
                          <div class="qty-value">{ menu_cartitem.quantity }</div>
                          <div class="qty-plus"
															 on:click={evt =>
                                 _.update_menu_cartitem_quantity(restaurant_cartitem, menu_cartitem_idx, 1)
                               }
													>
                            <div class="open-icon"></div>
                          </div>
                        </div>
                      </div>
                      <div class="menu-item-price">
                        { currency_str_(menu_cartitem.totalPrice, 'USD') }
                      </div>
                    </div>
                  </div>
                {/each}
								<div class="restaurant-price-info">
                  <div class="sub-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Subtotal</div>
                      <div class="col-xs-6 right-text"
											>{ currency_str_(restaurant_cartitem.subTotal + restaurant_cartitem.coupon_discount, 'USD') }</div>
                    </div>
                  </div>
                  <div class="sub-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Coupon Discount</div>
                      <div class="col-xs-6 right-text">
                        -{ currency_str_(restaurant_cartitem.coupon_discount, 'USD') }</div>
                    </div>
                  </div>
                  <div class="delivery-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Delivery</div>
                      <div class="col-xs-6 right-text">{ currency_str_(restaurant_cartitem.delivery, 'USD') }</div>
                    </div>
                  </div>
                  <div class="tax-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Tax</div>
                      <div class="col-xs-6 right-text">{ currency_str_(restaurant_cartitem.tax, 'USD') }</div>
                    </div>
                  </div>
                  <div class="clearfix driver-tip-total">
                    <div class="tip-label">Tip</div>
                    <div class="tip-range">
                      <div class="tip-range-container">
                        <div class="range-fill range-fill-active"
														 style={style_({ left: 0, width: `${$driverTip_percent$ * 5}%` })}
												></div>
                        <input class="custom-range-slider"
															 style="padding-right: 0;"
															 type="range"
															 min="0"
															 max="20"
															 step="1"
															 bind:value={$driverTip_percent$}
												>
                      </div>
                    </div>
                    <div class="tip-percent">{ $driverTip_percent$ }%</div>
                    <div class="tip-value">{ currency_str_(restaurant_cartitem.driverTip, 'USD') }</div>
                  </div>
                  <div class="service-fee-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Service Fee</div>
                      <div class="col-xs-6 right-text">{ currency_str_(restaurant_cartitem.serviceFee, 'USD') }</div>
                    </div>
                  </div>
                  <div class="full-total">
                    <div class="row">
                      <div class="col-xs-6 left-text">Total (Customer Paid)</div>
                      <div class="col-xs-6 right-text">{ currency_str_(restaurant_cartitem.total, 'USD') }</div>
                    </div>
                  </div>
                  <div class="eta-time">
                    <div class="row">
                      <div class="col-xs-6 left-text">Est. Arrival Time</div>
                      <div class="col-xs-6 right-text">{ shortDate_($order_info$.OrderDetail.OrderETA) }</div>
                    </div>
                  </div>
									{#each restaurant_cartitem.applied_coupons as coupon,couponIndex}
                    <div class="coupons-section">
                      <div class="row" class:has-coupon-errors={coupon.errors.length}>
                        <div class="col-xs-6 left-text coupon-text">{ coupon.CouponCode }</div>
                        <div class="col-xs-6 right-text">
                          <button class="btn btn-danger btn-xxs"
																	on:click={evt => _.remove_applied_coupon(restaurant_cartitem, couponIndex)}
													>Remove</button>
                        </div>
                      </div>
											{#if coupon.errors.length}
                        <div class="applied-coupon-errors-section">
                          {#each coupon.errors as error}
                            <div>{ error.message }</div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  {/each}
									<div class="new-coupon-section">
                    <div class="coupon-code-text">
                      <Select placeholder="Select Coupon"
															items={$coupons$}
															itemLabelProp={'CouponCode'}
											></Select>
                    </div>
                    <div class="add-coupon-code">
                      <button class="btn btn-lg btn-success btn-block"
															on:click={evt => _.addCouponCode(restaurant_cartitem)}
											>Add Coupon</button>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.edit-order-page {
	padding-bottom: 300px;
	.menu-item-details-sidebar {
		position: fixed;
		width: 400px;
		height: 100vh;
		top: 0;
		right: 0;
		z-index: 5;
		overflow-x: hidden;
		overflow-y: auto;
		border: 1px solid #DBDBDB;
		border-radius: 3px;
		background: white;
		.menu-item-details-section {
			padding: 40px;
			.menu-item-name-wrapper {
				.close {
					margin-top: 12px;
					opacity: 1;
				}
				.menu-item-name {
					font-weight: $lato-black;
					font-size: 32px;
				}
			}
			.menu-item-description {
				margin: 40px 0;
			}
			.menu-item-qty-section {
				margin-top: 14px;
				display: inline-block;
				.menu-item-qty {
					width: 184px;
					padding: 5px 10px;
					background: white;
					border: 2px solid #455A64;
					border-radius: 100px;
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
			.add-to-cart-wrapper {
				margin-top: 48px;
			}
		}
	}
	.main-contents {
		.page-title-section {
			@media (max-width: $screen-xs-max) {
				.page-title-text {
					font-size: 19px;
				}
				.arrow-left-icon {
					vertical-align: sub;
				}
			}
		}
		.choose-order-item-section {
			margin-top: 48px;
			$cart-restaurant-list-width: 370px;
			/* Cart rest list */
			.cart-restaurant-list {
				padding: 24px;
				margin: 48px auto 0;
				border-radius: 3px;
				@media (min-width: $screen-md-min) {
					float: left;
					width: $cart-restaurant-list-width;
					margin-top: 0;
				}
				.row, .col {
					padding: 0;
				}
				.section-heading {
					margin-top: 0;
				}
				.restaurant-item {
					.restaurant-details {
						padding: 22px 0 16px;
						border-bottom: 1px solid #DBDBDB;
						.item-details {
							float: left;
						}
						.restaurant-cuisine-icon {
							float: left;
							width: 48px;
							height: 48px;
							background-color: #F7F7F7;
						}
						.restaurant-img {
							float: left;
							width: 48px;
							height: 48px;
							margin: 16px 0;
							background-size: contain;
							background-repeat: no-repeat;
							background-position: 50%;
						}
						.item-details {
							padding-left: 16px;
							.item-restaurant-name {
								font-weight: $lato-bold;
							}
							.item-available-status {
								font-size: 12px;
								color: #7C8B92;
							}
							.item-address {
								margin-top: 7px;
								font-size: 12px;
								color: #455A64;
								letter-spacing: 0;
							}
							.view-more.btn {
								margin-top: 13px;
							}
						}
					}
					.min-order-note {
						padding: 12px 14px 15px;
						color: $light;
						background-color: $brand-danger;
						.order-more.btn {
							margin-top: 7px;
						}
					}
					.menu-item {
						border-bottom: 1px solid #DBDBDB;
						.menu-item-name {
							float: left;
							width: 50%;
							font-weight: $lato-bold;
							padding: 19px 5px 19px 0;
							cursor: pointer;
						}
						.cart-menu-item-qty-section {
							margin-top: 14px;
							float: left;
							width: 30%;
							.menu-item-qty {
								width: 100px;
								padding: 5px 10px;
								background: white;
								border: 1px solid #455A64;
								border-radius: 100px;
								.qty-value {
									font-weight: 900;
									font-size: 14px;
									text-align: center;
									width: 32%;
									display: inline-block;
								}
								.qty-minus {
									width: 32%;
									float: left;
									text-align: left;
									.close-icon {
										width: 12px;
										height: 12px;
									}
								}
								.qty-plus {
									width: 32%;
									float: right;
									text-align: right;
									.open-icon {
										width: 12px;
										height: 12px;
									}
								}
							}
						}
						.menu-item-price {
							float: right;
							width: 20%;
							text-align: right;
							font-weight: $lato-black;
							padding: 19px 0;
						}
					}
					.restaurant-price-info {
						.sub-total, .delivery-total, .tax-total, .service-fee-total,
						.coupons-section, .full-total, .eta-time {
							margin-top: 0;
							padding: 13px 0 14px;
							border-bottom: 1px solid #DBDBDB;
							.right-text {
								text-align: right;
							}
						}
						.driver-tip-total {
							border-bottom: 1px solid #DBDBDB;
							.tip-label {
								float: left;
								padding: 13px 0 14px;
								width: 25%;
							}
							.tip-range {
								float: left;
								padding: 2px 0;
								width: 40%;
								margin-top: 10px;
								.tip-range-container {
									position: relative;
								}
							}
							.tip-percent {
								float: left;
								padding: 13px 0 14px;
								width: 15%;
								text-align: center;
							}
							.tip-value {
								float: right;
								padding: 13px 0 14px;
								width: 20%;
								text-align: right;
							}
							.range {
								padding: 0;
								input {
									margin: 0;
								}
							}
						}
						.full-total {
							font-weight: $lato-black;
						}
						.eta-time {
							color: #7C8B92;
						}
						.coupons-section {
							.has-coupon-errors {
								.coupon-text {
									text-decoration: line-through;
								}
							}
							.applied-coupon-errors-section {
								margin-top: 12px;
								color: $brand-danger;
							}
						}
						.new-coupon-section {
							margin-top: 24px;
							.add-coupon-code {
								margin-top: 16px;
							}
						}
					}
					&.min-order {
						.sub-total {
							color: $brand-danger;
						}
					}
				}
			}
			.item-details {
				@media (min-width: $screen-md-min) {
					float: right;
					width: calc(100% - #{$cart-restaurant-list-width});
					padding-left: 48px;
				}
				.master-head-tabs {
					margin-bottom: 24px;
				}
				.head-list {
					margin-bottom: 18px;
					&.scrollable {
						white-space: nowrap;
						overflow-x: auto;
					}
					.head-item {
						width: 134px;
						height: $input-height-large;
						margin-left: -1px;
						margin-top: -1px;
						border: 1px solid #DBDBDB;
						float: left;
						position: relative;
						cursor: pointer;
						> span {
							font-weight: $lato-bold;
							position: absolute;
							margin: 0;
							top: 50%;
							left: 50%;
							margin-right: -50%;
							transform: translate(-50%, -50%);
							padding: 0 5px;
							text-align: center;
						}
						&:hover, &.active {
							background-color: $brand-success;
							border-color: $brand-success;
							> span {
								color: white;
							}
						}
					}
				}
				.menu-item-list-section {
					.menu-item-list {
						.menu-item {
							width: 134px;
							height: 104px;
							margin-left: -1px;
							margin-top: -1px;
							border: 1px solid #DBDBDB;
							float: left;
							position: relative;
							cursor: pointer;
							> span.name {
								position: absolute;
								top: 11px;
								left: 0;
								right: 0;
								padding: 0 5px;
								text-align: center;
							}
							> span.price {
								font-weight: $lato-black;
								position: absolute;
								bottom: 13px;
								left: 0;
								right: 0;
								padding: 0 5px;
								text-align: center;
							}
							&:hover, &.active {
								background-color: $brand-success;
								border-color: $brand-success;
								> span {
									color: white;
								}
							}
						}
					}
				}
			}
		}
	}
	.order-actions-section {
		padding: 24px 0 8px;
		border-bottom: 1px solid #DBDBDB;
		@media (max-width: 356px) {
			text-align: center;
		}
		.menu-search-box-wrapper {
			@media (max-width: $screen-xs-max) {
				text-align: center;
				.MenuSearchBox {
					max-width: 100%;
				}
			}
		}
		.order-actions {
			@media (max-width: $screen-sm-max) {
				margin-top: 24px;
			}
			@media (min-width: $screen-md-min) {
				text-align: right;
			}
			.btn {
				margin-bottom: 16px;
				margin-right: 24px;
				&:last-child {
					margin-right: 0;
				}
				@media (max-width: $screen-xs-max) {
					width: 100%;
				}
			}
		}
	}
	.info-section {
		.info-title {
			margin-top: 24px;
			font-weight: $lato-black;
			font-size: 18px;
		}
		.info-details {
			margin-top: 20px;
			padding: 26px;
			border: 1px solid rgba(#455A64, .3);
			border-radius: 3px;
			.info-field {
				position: relative;
				margin-top: 6px;
				.info-field-dots {
					position: absolute;
					left: 0;
					bottom: 4px;
					border-top: 1px dotted rgba(38, 50, 56, 0.30);
					width: 100%;
					height: 1px;
				}
				.info-field-label {
					position: relative;
					float: left;
					background-color: white;
					padding-right: 6px;
				}
				.info-field-value {
					position: relative;
					float: right;
					background-color: white;
					padding-left: 6px;
				}
				&.delivery-address-field {
					margin-top: 22px;
				}
			}
		}
	}
	.order-details-section {
		.order-details-title {
			margin: 24px 0 0;
			font-weight: $lato-black;
			font-size: 18px;
		}
		.order-details-list {
			.tr-totals {
				td {
					&.td-labels {
						padding-right: 0;
						.charge-label {
							margin-top: 3px;
							text-align: right;
							&.total-label, &.net-account-label {
								margin: 11px 0;
								font-weight: $lato-black;
							}
							&.total-label {
								border-bottom: 1px solid #DBDBDB;
								border-radius: 0;
								padding-bottom: 11px;
							}
							&.net-account-label {
								font-size: 18px;
							}
						}
					}
					&.td-values {
						padding-left: 0;
						.charge-value {
							margin-top: 3px;
							text-align: right;
							&.total-value, &.net-account-value {
								margin: 11px 0;
								font-weight: $lato-black;
							}
							&.total-value {
								border-bottom: 1px solid #DBDBDB;
								border-radius: 0;
								padding-bottom: 11px;
							}
							&.net-account-value {
								font-size: 18px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
