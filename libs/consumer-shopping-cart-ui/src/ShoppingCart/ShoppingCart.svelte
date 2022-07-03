<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { style_ } from '@ctx-core/html'
import { api_src_ } from '@menus/api'
import { is_shopping_cart_busy$_b, shopping_cart_b } from '@menus/consumer-shopping-cart'
import { AvailableCouponsModal } from '@menus/coupon-ui'
import { minutes_duration_human_text_, minute_tick$_b } from '@menus/date'
import { ladda } from '@menus/ladda'
import { NoResultPlaceholder, PageLoader } from '@menus/shared-ui'
import { Enable_Coupons$_b } from '@menus/platform-settings'
import { availability_ctx_ } from '@menus/restaurant-hours'
import { isDeliverable$_b, SERVICE_TYPE_DELIVERY } from '@menus/service-type'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_shopping_cart_ui_Ctx } from '../consumer_shopping_cart_ui_Ctx.js'
import { ScheduleDayTime } from '../ScheduleDayTime/index.js'
import { ShoppingCart_c } from './ShoppingCart_c.js'
import { MODE_NORMAL, MODE_MODAL } from './mode.js'
const ctx = getContext_ui_ctx() as consumer_shopping_cart_ui_Ctx, dispatch = createEventDispatcher()
const shopping_cart = shopping_cart_b(ctx)
const {
	calculated_restaurant_cartitems$, driverTip$, driverTip_percent$, ETAMin$, ETAMax$, min_order_restaurant_cartitems$,
	restaurant_cartitems$, total$
} = shopping_cart
const Enable_Coupons = Enable_Coupons$_b(ctx)
const isDeliverable = isDeliverable$_b(ctx)
const is_shopping_cart_busy = is_shopping_cart_busy$_b(ctx)
const minute_tick$ = minute_tick$_b(ctx)
export const _ = new ShoppingCart_c(ctx, dispatch)
const { AvailableCouponsModal_i, mode$, serviceType$ } = _
$: _.mode$.$ = $$props.mode || MODE_MODAL
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<AvailableCouponsModal bind:this={$AvailableCouponsModal_i}></AvailableCouponsModal>
<div class="ShoppingCart shopping-cart-section">
  <div class="topbar clearfix">
    <div class="title">
      Checkout ({$serviceType$ || ''})
    </div>
    <div class="delete-icon"
				 class:mode-normal={$mode$ === MODE_NORMAL}
				 on:click={_evt => _.toggle_shopping_cart($mode$)}
		></div>
  </div>
  <div class="main">
    {#if $is_shopping_cart_busy || !$calculated_restaurant_cartitems$}
      <div class="main-loader">
        <PageLoader></PageLoader>
      </div>
    {:else}
      {#if !$calculated_restaurant_cartitems$.length}
	  <div>
		<NoResultPlaceholder config={{
			icon: 'dish-icon',
			title: 'Your Cart is Empty',
			subtitle: 'Looks like you haven’t made your menu yet',
			buttons: [{
				type: '',
				title: 'Back to Menu',
				action: () => _.toggle_shopping_cart()
			}]
		}}></NoResultPlaceholder>
	  </div>
      {:else}
        <div class="cart-restaurant-list">
          {#each $calculated_restaurant_cartitems$ as restaurant_cartitem,restaurant_cartitemIndex}
            <div class="restaurant-item">
              <div class="restaurant-details clearfix">
                {#if restaurant_cartitem.RestImageExist}
                  <div class="restaurant-img"
											 style={
                         style_({
                           'background-image': `url(${api_src_(restaurant_cartitem.RestImage)})`
                         }
                       )}
									></div>
                {:else}
                  <div class="cuisine-icon-{restaurant_cartitem.CuisineID} restaurant-cuisine-icon cursor-pointer"
											 on:click={_evt => _.view_menu(restaurant_cartitem)}
									></div>
                {/if}
								<div class="item-details">
                  <div class="item-restaurant-name cursor-pointer"
											 on:click={_evt => _.view_menu(restaurant_cartitem)}
									>{ restaurant_cartitem.RestaurantName }</div>
                  <div
										class="item-available-status c-text2"
									>{ availability_ctx_(restaurant_cartitem.service_restaurant_hours, $minute_tick$).label }</div>
									{#if $ETAMin$ || $ETAMax$}
                    <div class="est-time c-text3">
                      Est. { $serviceType$ === SERVICE_TYPE_DELIVERY ? 'Arrival' : 'Prepare' }
											Time { minutes_duration_human_text_($ETAMin$, $ETAMax$) }
                    </div>
                  {/if}
									<button
										class="btn btn-xxs btn-success view-more cursor-pointer"
										on:click={_evt => _.view_menu(restaurant_cartitem)}
									>View Menu</button>
                </div>
              </div>
							{#if restaurant_cartitem.require_min_order}
                <div class="min-order-note bg-danger">
                  <div class="note-text">
                    You have to order more items, because of minimum order fee
                    is { currency_str_(restaurant_cartitem.MinOrder, 'USD') }
                  </div>
                  <button
										class="btn btn-xxs btn-danger btn-inverse btn-no-hover order-more cursor-pointer"
										on:click={_evt => _.view_menu(restaurant_cartitem)}
									>Order More</button>
                </div>
              {/if}
							{#each restaurant_cartitem.menu_cartitems || [] as menu_cartitem,menu_cartitems_idx}
                <div class="menu-item">
                  <div class="clearfix">
                    <div class="menu-item-name">
                        { menu_cartitem.menuitem.MenuItemName }
                    </div>
                    <div class="menu-item-qty-section noselect">
                      <div class="menu-item-qty b-text3">
                        <div class="qty-minus"
														 on:click={_evt=> _.update_quantity(restaurant_cartitem, menu_cartitems_idx, -1)}
												>
                          <div class="close-icon"></div>
                        </div>
                        <div class="qty-value">{ menu_cartitem.quantity }</div>
                        <div class="qty-plus"
														 on:click={_evt => _.update_quantity(restaurant_cartitem, menu_cartitems_idx, 1)}
												>
                          <div class="open-icon"></div>
                        </div>
                      </div>
                    </div>
                    <div class="menu-item-price">
                      { currency_str_(menu_cartitem.subTotal, 'USD') }
                    </div>
                  </div>
                </div>
              {/each}
							<div class="restaurant-price-info">
                <div class="sub-total ShoppingCart-value"
										 class:c-danger={restaurant_cartitem.require_min_order && !restaurant_cartitem.coupon_discount}
								>
                  <div class="row">
                    <div class="col-xs-6 left-text">Subtotal</div>
                    <div
											class="col-xs-6 right-text"
										>{ currency_str_(restaurant_cartitem.subTotal, 'USD') }</div>
                  </div>
                </div>
								{#if restaurant_cartitem.coupon_discount}
                  <div class="coupon-discount ShoppingCart-value">
                    <div class="row">
                      <div class="col-xs-6 left-text">Coupon Discount</div>
                      <div class="col-xs-6 right-text"
											>-{ currency_str_(restaurant_cartitem.coupon_discount, 'USD') }</div>
                    </div>
                  </div>
                  <div class="sub-total ShoppingCart-value"
											 class:c-danger={restaurant_cartitem.require_min_order}
									>
                    <div class="row">
                      <div class="col-xs-6 left-text">Discounted Subtotal</div>
                      <div
												class="col-xs-6 right-text"
											>{ currency_str_(restaurant_cartitem.subTotal - restaurant_cartitem.coupon_discount, 'USD') }</div>
                    </div>
                  </div>
                {/if}
								{#if $isDeliverable}
                  <div class="delivery-total ShoppingCart-value">
                    <div class="row">
                      <div class="col-xs-6 left-text">Delivery</div>
                      <div class="col-xs-6 right-text"
											>{ currency_str_(restaurant_cartitem.delivery, 'USD') }</div>
                    </div>
                  </div>
                {/if}
								<div class="tax-total ShoppingCart-value">
                  <div class="row">
                    <div class="col-xs-6 left-text">Tax</div>
                    <div class="col-xs-6 right-text"
										>{ currency_str_(restaurant_cartitem.tax, 'USD') }</div>
                  </div>
                </div>
								{#if $isDeliverable}
                  <div class="clearfix driver-tip-total">
                    <div class="tip-label">Driver Tip</div>
										{#if $calculated_restaurant_cartitems$.length == 1}
                      <div class="tip-range">
                        <div class="tip-range-container">
                          <div class="range-fill range-fill-active"
															 style="{
                                  style_({
                                    left: 0,
                                    width: `${$driverTip_percent$ * 5}%`,
                                  })
                               }"
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
                    {/if}
										<div class="tip-value">{ currency_str_(restaurant_cartitem.driverTip, 'USD') }</div>
                  </div>
                {/if}
								{#if restaurant_cartitem.menusServiceFee}
                  <div class="service-fee-total ShoppingCart-value">
                    <div class="row">
                      <div class="col-xs-6 left-text">Service Fee</div>
                      <div class="col-xs-6 right-text"
											>{ currency_str_(restaurant_cartitem.serviceFee, 'USD') }</div>
                    </div>
                  </div>
                {/if}
								<div class="full-total ShoppingCart-value">
                  <div class="row">
                    <div class="col-xs-6 left-text">Total</div>
                    <div class="col-xs-6 right-text"
										>{ currency_str_(restaurant_cartitem.total, 'USD') }</div>
                  </div>
                </div>
								{#if $Enable_Coupons}
                  {#each restaurant_cartitem?.applied_coupons || [] as applied_coupon,index}
                    <div
											class="applied-coupon-section clearfix"
											class:has-coupon-errors={
                        applied_coupon?.errors?.length
                        || !restaurant_cartitem.coupons.find(coupon=>
                          coupon.CouponCode === applied_coupon.CouponCode
                        )
                      }
										>
                      <div class="coupon-code clearfix">
                        <div class="coupon-tag-icon cursor-default"></div>
												{ applied_coupon.CouponCode }
                      </div>
                      <button class="btn btn-xxs btn-danger remove-coupon-btn"
															on:click={
                                _evt => _.remove_applied_coupon(restaurant_cartitem, index)
                              }
											>Remove</button>
                    </div>
                    <div class="applied-coupon-errors-section c-danger">
                      {#each applied_coupon?.errors || [] as error}
                        <div>{ error.message }</div>
                      {/each}
                    </div>
                  {/each}
									<div class="add-coupon-section clearfix">
                    <div class="form-group coupon-input">
                      <div class="m-input-group has-addon-left">
                        <div class="m-input-group-addon m-addon-left">
                          <div class="coupon-tag-icon cursor-default"></div>
                        </div>
                        <input class="form-control input-sm"
															 type="text"
															 name="coupon_code"
															 placeholder="Enter your coupon code"
															 value={restaurant_cartitem.coupon_code||''}
															 on:input={evt => _.set_coupon_code(restaurant_cartitem, evt.target.value)}
												>
                      </div>
                    </div>
                    <div>
                      <button class="btn btn-xxs btn-success coupon-btn"
															use:ladda={restaurant_cartitem.addCouponCode_busy}
															on:click={_evt => _.validate_coupon_code(restaurant_cartitem)}
															disabled={ restaurant_cartitem.addCouponCode_busy || !restaurant_cartitem.coupon_code }
											>Add</button>
                    </div>
                  </div>
									{#if restaurant_cartitem?.coupons?.length}
                    <div class="available-coupons-link c-success"
												 on:click={_evt => _.show_AvailableCouponsModal_i(restaurant_cartitem)}
										>See Available Coupons</div>
                  {/if}
                {/if}
              </div>
							{#if restaurant_cartitem.ASAP_available || restaurant_cartitem.schedule_n0_a}
                <div class="restaurant-price-info">
                  <ScheduleDayTime class="ShoppingCart-value"
																	 schedule_ctx={restaurant_cartitem}
																	 on:change={evt => restaurant_cartitems$.refresh()}
									></ScheduleDayTime>
                </div>
              {/if}
							{#if restaurant_cartitem.menu_cartitems?.[0].menuitem.Checkout_Message}
                <div class="restaurant-price-info Checkout_Message">
                  {restaurant_cartitem.menu_cartitems?.[0].menuitem.Checkout_Message}
                </div>
              {/if}
            </div>
          {/each}

		  {#if $isDeliverable}
		  <div class="restaurant-item">
			  <div class="restaurant-price-info">
				<div class="clearfix driver-tip-total">
                    <div class="tip-label">Tip</div>
										{#if $calculated_restaurant_cartitems$.length > 1}
                      <div class="tip-range">
                        <div class="tip-range-container">
                          <div class="range-fill range-fill-active"
															 style="{
                                  style_({
                                    left: 0,
                                    width: `${$driverTip_percent$ * 5}%`,
                                  })
                               }"
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
                    {/if}
										<div class="tip-value">{ currency_str_($driverTip$, 'USD') }</div>
                  </div>
			  </div>
		  </div>
                {/if}
        </div>
        <slot></slot>
        <div class="place-order-section">
          <button class="btn btn-lg btn-success"
									class:b-text3={$min_order_restaurant_cartitems$.length}
									class:bg-text3={$min_order_restaurant_cartitems$.length}
									on:click={_evt => _.place_order($mode$)}
									disabled={$min_order_restaurant_cartitems$.length}
					>{
						$mode$ === MODE_NORMAL
						? `Complete Order (${currency_str_($total$, 'USD')})`
						: 'Proceed to Checkout'
					}</button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/lib";
.ShoppingCart {
	position: fixed;
	top: $cr-navbar-and-service-type-height - 1;
	height: calc(100vh - #{$cr-navbar-and-service-type-height - 1});
	width: $sidebar-cart-width;
	display: flex;
	flex-direction: column;
	right: 0;
	background-color: white;
	border-left: 1px solid #DBDBDB;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 5;
	margin-top: 1px; // to show the border of top navbar
	@media (max-width: $screen-sm-max) {
		top: 0;
		height: 100vh;
		width: 100%;
		padding-right: 0;
		border-left: none;
		z-index: 100;
	}
	.topbar {
		flex-grow: 0;
		position: relative;
		padding: 17px;
		border-bottom: 1px solid #e6e6e6;
		.title {
			text-align: center;
			font-weight: $lato-bold;
			text-transform: capitalize;
		}
		.delete-icon {
			position: absolute;
			top: 14px;
			right: 12px;
			&.mode-normal {
				display: none;
			}
		}
	}
	.main {
		flex-grow: 1;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 24px;
		.main-loader {
			margin-top: 24px;
		}
		.cart-restaurant-list {
			.row {
				padding: 0;
			}
			.restaurant-item {
				margin-bottom: 12px;
				.restaurant-details {
					padding: 0 0 8px;
					border-bottom: 1px solid #DBDBDB;
					.item-details {
						overflow: hidden;
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
						}
						.est-time {
							margin-top: 7px;
							font-size: 12px;
							letter-spacing: 0;
						}
						.view-more {
							margin-top: 13px;
						}
					}
				}
				.min-order-note {
					padding: 12px 14px 15px;
					color: $light;
					.order-more.btn {
						margin-top: 7px;
						border: none;
					}
				}
				.menu-item {
					border-bottom: 1px solid #DBDBDB;
					.menu-item-name {
						float: left;
						width: 50%;
						font-weight: $lato-bold;
						padding: 19px 5px 19px 0;
						@media (max-width: $iPhone6-width - 1) {
							width: 39%;
						}
					}
					.menu-item-qty-section {
						margin-top: 14px;
						float: left;
						.menu-item-qty {
							width: 80px;
							padding: 4px 10px;
							background: white;
							border: 1px solid transparent;
							border-radius: 100px;
							.qty-value {
								font-weight: 900;
								font-size: 14px;
								text-align: center;
								width: calc(100% - 12px - 12px);
								display: inline-block;
							}
							.qty-minus {
								float: left;
								.close-icon {
									width: 12px;
									height: 12px;
								}
							}
							.qty-plus {
								float: right;
								.open-icon {
									width: 12px;
									height: 12px;
								}
							}
						}
					}
					.menu-item-price {
						float: right;
						text-align: right;
						font-weight: $lato-black;
						padding: 19px 0;
					}
				}
				.restaurant-price-info {
					&.Checkout_Message {
						padding: 12px;
					}
					@media (max-width: $screen-xs-max) {
						.left-text {
							padding-right: 0;
						}
						.right-text {
							padding-left: 0;
						}
					}
					.right-text {
						text-align: right;
					}
					.ShoppingCart-value {
						margin-top: 0;
						padding: 13px 0 14px;
						border-bottom: 1px solid #DBDBDB;
					}
					.nav.nav-pills {
						li {
							padding: 13px 15px 14px;
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
					.applied-coupon-section {
						$remove-coupon-btn-width: 96px;
						padding: 8px 0;
						border-bottom: 1px solid #DBDBDB;
						&.has-coupon-errors {
							.coupon-code {
								text-decoration: line-through;
							}
						}
						.coupon-code {
							$padding-right: 16px;
							float: left;
							width: calc(100% - #{$remove-coupon-btn-width} - #{$padding-right});
							margin-top: 6px;
							.coupon-tag-icon {
								display: block;
								float: left;
								margin-right: 8px;
							}
						}
						.remove-coupon-btn {
							float: right;
							margin-top: 3px;
						}
					}
					.applied-coupon-errors-section {
						margin: 6px 0 12px;
					}
					.add-coupon-section {
						$remove-coupon-btn-width: 96px;
						padding: 12px 0;
						.coupon-input {
							$padding-right: 16px;
							margin-bottom: 0;
							@media (min-width: $screen-sm-min) {
								float: left;
								width: calc(100% - #{$remove-coupon-btn-width} - #{$padding-right});
							}
							.m-input-group {
								.m-input-group-addon {
									padding: 10px;
								}
							}
						}
						.coupon-btn {
							float: right;
							margin-top: 8px;
							@media (max-width: $screen-xs-max) {
								margin-top: 16px;
								font-size: 14px;
								width: 100%;
								height: 32px;
							}
						}
					}
					.available-coupons-link {
						text-align: center;
						font-weight: $lato-black;
						cursor: pointer;
					}
					.h-link {
						font-weight: $lato-black;
						cursor: pointer;
					}
				}
				.restaurant-schedule-order {
					border-top: 1px solid #DBDBDB;
				}
			}
		}
		.place-order-section {
			text-align: center;
			padding-bottom: 200px;
			.btn {
				min-width: 220px;
			}
		}
	}
}
</style>
