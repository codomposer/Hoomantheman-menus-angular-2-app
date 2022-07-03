<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { style_ } from '@ctx-core/html'
import { currency_str_ } from '@ctx-core/currency'
import { innerWidth_gt_SCREEN_SM_MIN$_b } from '@menus/dom'
import { mediumDateTime_ } from '@menus/date'
import { getContext_ui_ctx } from '@menus/ui'
import { PageLoader } from '@menus/shared-ui'
import { api_src_ } from '@menus/api'
import { PROFILE_ORDERS_TAB } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import { ThankYouPointsModal, WriteReviewModal, write_review } from '@menus/consumer-order-ui'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { Profile } from '@menus/user-address-ui'
import type { past_orders_ui_Ctx } from '../past_orders_ui_Ctx.js'
import { PastOrders_c } from './PastOrders_c.js'
const ctx = getContext_ui_ctx() as past_orders_ui_Ctx
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const platform_settings$ = platform_settings$_b(ctx)
export const _ = new PastOrders_c(ctx)
const { filtered_orders$, orders$, keywords$ } = _
let WriteReviewModal_i:WriteReviewModal, ThankYouPointsModal_i:ThankYouPointsModal
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<CrMainDashboard>
<div class="PastOrders">
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>My Orders</span>
			</li>
		</ul>
	</div>

  <Profile activeTab={PROFILE_ORDERS_TAB}></Profile>
  <div class="profile-orders">
    <WriteReviewModal bind:this={WriteReviewModal_i}></WriteReviewModal>
    <ThankYouPointsModal bind:this={ThankYouPointsModal_i}></ThankYouPointsModal>
		{#if !$orders$}
      <PageLoader center="parent"></PageLoader>
    {:else if $orders$.length}
      <div class="past-orders-section">
        <div class="row">
          <div class="col-md-9">
            <div class="form-group">
              <div class="m-input-group has-addon-left">
                <div class="m-input-group-addon m-addon-left">
                  <div class="search-icon cursor-default"></div>
                </div>
                <input type="text"
											 class="form-control"
											 name="search_text"
											 bind:value={$keywords$}
											 placeholder="Search for Order"/>
				{#if $keywords$}
					<div class="m-input-group-addon m-addon-right">
						<div class="close-1-icon cursor-pointer"
								on:click={evt => keywords$.set('')}
						></div>
					</div>
				{/if}
              </div>
            </div>
            <div class="responsive-lg past-orders-list">
              <table class="table"
										 class:table-center={$innerWidth_gt_SCREEN_SM_MIN$}
							>
                <thead>
                  <tr>
                    <th class="sm-or-wider"></th>
                    <th>Restaurant</th>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>ETA</th>
                    <th>Status/Service Type</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {#each $filtered_orders$ as filtered_order}
                    <tr on:click={_evt => _.openOrderDetails(filtered_order)}>
                      <td class="nostretch sm-or-wider">
                        {#if filtered_order.RestImageExist}
                          <div class="restaurant-img"
                               style={style_({'background-image': `url(${api_src_(filtered_order.FileName)})`})}
                          ></div>
                        {:else}
                          <div class="cuisine-img">
                            <div class="cuisine-icon-{filtered_order.CuisineID} item-cuisine-icon"></div>
                          </div>
                        {/if}
                      </td>
                      <td>{ filtered_order.RestaurantName }</td>
                      <td>{ filtered_order.OrderNumber }</td>
                      <td>{ mediumDateTime_(filtered_order.OrderDate_ISO) }</td>
                      <td>{ mediumDateTime_(filtered_order.ETADate_ISO) }</td>
                      <td>
                        <div>{ filtered_order.ConsumerOrderStatusText }</div>
                        <div>{ filtered_order.ServiceType }</div>
                      </td>
                      <td>{ currency_str_(filtered_order.Total, 'USD') }</td>
                      <td class="buttons">
                        {#if $platform_settings$?.Enable_HiWaiter && filtered_order.AllowChat}
                          <div>
                            <button
                              class="btn btn-primary btn-inverse btn-xxs btn-hi-waiter"
                              on:click|stopPropagation={_evt => _.openOrderChat(filtered_order)}
                            >Hi Waiter
                            </button>
                          </div>
                        {/if}
                        <div mStopEvent>
                          <button class="btn btn-primary btn-xxs btn-write-review"
                                  on:click|stopPropagation={
                                    _evt => write_review(
                                      filtered_order,
                                      WriteReviewModal_i,
                                      ThankYouPointsModal_i
                                  )}
                          >{ filtered_order.IsReviewed ? 'Edit' : 'Write' }
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-section">
              <div class="section-title">My Stats</div>
              <div class="stat-section">
                <div class="stat-count">76</div>
                <div class="stat-label">Total Orders</div>
              </div>
              <div class="stat-section">
                <div class="stat-count">3</div>
                <div class="stat-label">Orders Awaiting Review</div>
              </div>
              <div class="stat-section">
                <div class="stat-count">62</div>
                <div class="stat-label">Total Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="past-orders-no-result-section">
        <div class="no-result-icon">
          <div class="dish-icon cursor-default"></div>
        </div>
        <div class="no-result-title">No orders</div>
        <div class="no-result-subtitle">You currently do not have any orders</div>
				<!-- <div class="no-result-action">
					<button class="btn btn-lg btn-success">Find Dishes</button>
				</div> -->
      </div>
    {/if}
  </div>
</div>
</CrMainDashboard>

<style type=text/scss global>
@import "@menus/css/lib";
.PastOrders {
	min-height: calc(100% - #{$navbar-height});
	display: flex;
	flex-direction: column;

	.breadcrumb-container {
		@include breadcrumb-container-default;
	}

	.profile-orders {
		min-height: 400px;
		padding: 0 24px;

		@media (min-width: $screen-sm-min) {
			padding-left: 48px;
			padding-right: 48px;
		}

		.past-orders-no-result-section {
			text-align: center;
			margin-top: 48px;
			.no-result-title {
				font-weight: $lato-black;
				font-size: 24px;
			}
			.no-result-subtitle {
				margin-top: 4px;
			}
			.no-result-action {
				margin-top: 18px;
				.btn {
					min-width: 184px;
				}
			}
		}
		.past-orders-section {
			.past-orders-list {
				overflow-x: auto;
				table {
					table-layout: auto;
					@media(max-width: $screen-xs-max) {
						// See https://css-tricks.com/responsive-data-tables/
						table, thead, tbody, th, td, tr {
							display: block;
						}
						thead tr {
							position: absolute;
							top: -9999px;
							left: -9999px;
						}
						tr {
							border: 1px solid #ccc;
							margin-top: 16px;
						}
						td {
							border: none;
							border-bottom: 1px solid #eee;
							position: relative;
							padding-left: 50%;
							&:before {
								position: absolute;
								top: 0;
								left: 6px;
								width: 45%;
								padding: 20px 10px 20px 0;
								white-space: nowrap;
							}
							&:nth-of-type(1):before {
								content: "";
							}
							&:nth-of-type(2):before {
								content: "Restaurant";
							}
							&:nth-of-type(3):before {
								content: "Order Number";
							}
							&:nth-of-type(4):before {
								content: "Order Date";
							}
							&:nth-of-type(5):before {
								content: "ETA";
							}
							&:nth-of-type(6):before {
								content: "Status/Service Type";
							}
							&:nth-of-type(7):before {
								content: "Total";
							}
							&:nth-of-type(8):before {
								content: "";
							}
						}
					}
				}
				.sm-or-wider {
					display: table-cell;
					@media(max-width: $screen-xs-max) {
						display: none;
					}
				}
				.restaurant-img, .cuisine-img {
					width: 64px;
					height: 64px;
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
				.cuisine-img {
					padding: 8px;
					background-color: rgba(69, 90, 100, 0.05);
					.item-cuisine-icon {
						width: 48px;
						height: 48px;
					}
				}
				.buttons button {
					min-width: 112px;
				}
			}
			.stats-section {
				border: 1px solid #DDDDDD;
				border-radius: 3px;
				padding: 32px;
				max-width: 270px;
				margin: 0 auto;
				.section-title {
					font-weight: $lato-black;
					font-size: 18px;
				}
				.stat-section {
					margin-top: 33px;
					.stat-count {
						font-weight: $lato-black;
						font-size: 24px;
					}
				}
			}
		}
	}
}
</style>
