<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { api_src_ } from '@menus/api'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { Pagination } from '@menus/pagination-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { ManageRestaurant_c, PAGINATION_ID } from './ManageRestaurant_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
export const _ = new ManageRestaurant_c(ctx)
const { busy$, restaurant_a$, page$, pageSize$, TotalPages$, TotalRow$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="breadcrumb-container hidden-xs">
  <Breadcrumb></Breadcrumb>
</div>
<div class="ManageRestaurant page">
  <div class="main-contents">
    <div class="page-title-section">
      <div class="row">
        <div class="col-sm-6">
          <div class="page-title-text cursor-default">Manage Restaurant</div>
        </div>
        <div class="col-sm-6 search-rest-wrapper">
          <div class="form-group">
            <div class="m-input-group has-addon-left">
              <div class="m-input-group-addon m-addon-left">
                <div class="search-icon cursor-default"></div>
              </div>
              <input type="text" class="form-control" name="search"
										 placeholder="Search for Restaurant"
										 on:change={evt => _.search(evt.target.value)}
							>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="restaurant-list">
      {#if $busy$ || $restaurant_a$ == null}
        <PageLoader center="parent"></PageLoader>
      {:else}
        {#each $restaurant_a$ as restaurant}
          <a class="restaurant-item clearfix"
						 href="/backoffice/manage-restaurant/{restaurant.FireFlyID}"
					>
            {#if restaurant.RestImageExist}
              <div class="restaurant-img">
                <img src={api_src_(restaurant.FileName)} alt={restaurant.Name}>
              </div>
            {:else}
              <div class="photo-viewer">
                <img src="/assets/img/ro/photo-placeholder.svg" alt="">
              </div>
            {/if}
						<div class="restaurant-details">
              <div class="restaurant-info">
                <div class="restaurant-name"
								>{ restaurant.Name }
									<span
										class:text-success={restaurant.Enabled}
										class:text-danger={!restaurant.Enabled}
									>{ restaurant.Enabled ? 'Enabled' : 'Disabled' }</span>
                </div>
                <div class="restaurant-address">
                  { restaurant.Address_1 }
									{#if restaurant.Address_2}<span> { restaurant.Address_2 }</span>{/if},
									{ restaurant.City }, { restaurant.State } { restaurant.ZipCode }
                </div>
                <div class="rest-phone">{ restaurant.Phone }</div>
              </div>
              <div class="rest-service-types">
                <div class="rest-service-type">
                  <div class="service-type-name">Delivery
                    <div class="service-type-status"
												 class:active={restaurant.ST_Delivery_Enabled}
										></div>
                  </div>
                  <div class="service-type-value-section">
                    <div class="service-type-value">Delivery Charge</div>
                  </div>
                  <div class="service-type-value-section last-section">
                    <div class="service-type-price">{
											restaurant.DeliveryCharge != null ? `$${restaurant.DeliveryCharge}` : '—'
										}</div>
                  </div>
                </div>
                <div class="rest-service-type">
                  <div class="service-type-name">Pickup
                    <div class="service-type-status"
												 class:active={restaurant.ST_Pickup_Enabled}
										></div>
                  </div>
                  <div class="service-type-value-section">
                    <div class="service-type-value">Min Order</div>
                  </div>
                  <div class="service-type-value-section last-section">
                    <div
											class="service-type-price">{ restaurant.MinOrder != null ? `$${restaurant.MinOrder}` : '—'}</div>
                  </div>
                </div>
                <div class="rest-service-type">
                  <div class="service-type-name">Dining-In
                    <div class="service-type-status"
												 class:active={restaurant.ST_DiningIn_Enabled}
										></div>
                  </div>
                  <div class="service-type-value-section">
                    <div class="service-type-value">Delivery Time</div>
                  </div>
                  <div class="service-type-value-section last-section">
                    <div class="service-type-eta">{
											restaurant.DeliveryTime != null ? `${restaurant.DeliveryTime} min` : '—'
										}</div>
                  </div>
                </div>
                <div class="rest-service-type">
                  <div class="service-type-name">Catering
                    <div class="service-type-status"
												 class:active={restaurant.ST_Catering_Enabled}
										></div>
                  </div>
                  <div class="service-type-value-section">
                    <div class="service-type-value">Pickup Time</div>
                  </div>
                  <div class="service-type-value-section last-section">
                    <div class="service-type-eta">{
											restaurant.PickupTime != null ? `${restaurant.PickupTime} min` : '—'
										}</div>
                  </div>
                </div>
              </div>
              <div class="rest-icon-section">
                <div class="rest-right-arrow arrow-right-icon"></div>
              </div>
            </div>
          </a>
        {:else}
          <div class="no-records">No records found</div>
        {/each}
      {/if}
    </div>
		{#if $restaurant_a$?.length}
      <Pagination
				id={PAGINATION_ID}
				bind:page={$page$}
				bind:pageSize={$pageSize$}
				TotalPages={$TotalPages$}
				TotalRow={$TotalRow$}
			></Pagination>
    {/if}
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.ManageRestaurant {
	.main-contents {
		.page-title-section {
			.search-rest-wrapper {
				@media (max-width: $screen-xs-max) {
					margin-top: 16px;
					margin-bottom: 16px;
				}
			}
		}
	}
	.restaurant-list {
		min-height: calc(100vh - #{$navbar-height} - 60px);
		.no-records {
			text-align: center;
			padding: 20px 0;
			border-bottom: 1px solid #DBDBDB;
		}
		.restaurant-item {
			padding: 24px 0;
			border-bottom: 1px solid #DBDBDB;
			cursor: pointer;
			display: block;
			@media (max-width: $screen-xs-max) {
				padding: 12px 0;
			}
			.restaurant-img {
				overflow: hidden;
			}
			.photo-viewer {
				float: left;
				position: relative;
				margin-top: 7px;
				margin-bottom: 12px;
				width: 112px;
				height: 112px;
				@media (max-width: $screen-xs-max) {
					width: 80px;
					height: 80px;
				}
				background-color: rgba(#455A64, 0.05);
				img {
					position: absolute;
					margin: auto;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					max-width: 100%;
				}
			}
			.restaurant-img {
				float: left;
				width: 112px;
				height: 112px;
				@media (max-width: $screen-xs-max) {
					width: 80px;
					height: 80px;
				}
				img {
					max-width: 100%;
				}
			}
			.restaurant-details {
				overflow: hidden;
				padding-left: 24px;
				.restaurant-info {
					float: left;
					width: 40%;
					@media (max-width: $screen-xs-max) {
						width: 90%;
					}
					@media (min-width: $screen-sm-min) and (max-width: 1400px) {
						width: 90%;
					}
					.restaurant-name {
						font-weight: $lato-black;
						font-size: 18px;
						.text-success, .text-danger {
							margin-left: 8.5px;
							@media (max-width: $screen-xs-max) {
								margin-left: 0;
								display: block;
							}
						}
					}
					.restaurant-address {
						line-height: 20px;
					}
					.rest-phone {
						font-weight: $lato-bold;
					}
				}
				.rest-service-types {
					float: left;
					width: 50%;
					text-align: left;
					@media (max-width: $screen-xs-max) {
						display: none;
					}
					@media (min-width: $screen-sm-min) and (max-width: 1400px) {
						margin-top: 24px;
						width: 100%;
					}
					.rest-service-type {
						float: left;
						width: 25%;
						.service-type-status {
							display: inline-block;
							width: 12px;
							height: 12px;
							border-radius: 50%;
							margin-left: 8px;
							background-color: $brand-danger;
							&.active {
								background-color: $brand-success;
							}
						}
						.service-type-name {
							font-weight: $lato-bold;
						}
						.service-type-value-section {
							margin-top: 20px;
							.service-type-value, .service-type-price, .service-type-eta {
								display: inline-block;
								padding: 4px 12px;
							}
							.service-type-value {
								padding-left: 0;
								padding-right: 0;
							}
							.service-type-price, .service-type-eta {
								background-color: rgba(#263238, .05);
								border-radius: 100px;
							}
							&.last-section {
								margin-top: 5px;
							}
						}
					}
				}
				.rest-icon-section {
					overflow: hidden;
					text-align: right;
				}
			}
		}
	}
}
</style>
