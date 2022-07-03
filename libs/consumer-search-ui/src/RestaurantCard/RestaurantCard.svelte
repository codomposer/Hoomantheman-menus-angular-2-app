<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { is_navigating_onclick_b } from '@menus/page'
import { Enable_Yelp_Count$_b, Enable_Yelp_Rating$_b } from '@menus/platform-settings'
import type { BaseRestaurantCard } from '@menus/restaurant'
import { restaurant_url_, menuitem_restaurant_url_data_ } from '@menus/route'
import { ServiceType, serviceType$_b } from '@menus/service-type'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { getContext_ui_ctx } from '@menus/ui'
import { distance_text_ } from '@menus/util'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { RestaurantCard_c } from './RestaurantCard_c.js'
const dispatch = createEventDispatcher()
export let restaurant_card:BaseRestaurantCard | SearchMenuitem_I, index:number, show_close = false, show_bubble = false
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx
const Enable_Yelp_Count = Enable_Yelp_Count$_b(ctx)
const Enable_Yelp_Rating = Enable_Yelp_Rating$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const serviceType = serviceType$_b(ctx)
export const _ = new RestaurantCard_c(ctx, dispatch)
const { index$, restaurant_card$ } = _
$: index$.$ = index
$: restaurant_card$.$ = restaurant_card
</script>

<div class="restaurant-item RestaurantCard"
		 class:is_selected={restaurant_card.is_selected}
		 on:mouseover={_.onMouseOver}
		 on:focus={_.onMouseOver}
		 on:mouseout={_.onMouseOut}
		 on:blur={_.onMouseOut}
>
	{#if show_bubble}
		<div class="restaurant-item-bubble"></div>
	{/if}
	{#if show_close}
		<div class="close" on:click={_.onclose}>&times;</div>
	{/if}
	<div class="restaurant-item-inner-wrapper">
		<div class="item-body">
			<div class="restaurant-img-container">
			<div
						class="restaurant-img{restaurant_card.RestImageExist ? '' : ` cuisine-icon-${restaurant_card.CuisineID}`}"
						class:RestImageExist={restaurant_card.RestImageExist}
						class:restaurant-cuisine-icon={!restaurant_card.RestImageExist}
						style={
							restaurant_card.RestImageExist ? style_({
								'background-image': `url(${restaurant_card.RestImage})`
							}) : ''
						}
					></div>
			<div class="yelp-rating">
				{#if $Enable_Yelp_Rating}
				<div class="yelp-icon yelp-icon-0 yelp-icon-{ restaurant_card.RestRating }">
					&nbsp;
				</div>
				{/if}
						{#if $Enable_Yelp_Rating || $Enable_Yelp_Count}
				<img class="yelp-logo" src="/assets/img/yelp/yelp-logo.svg" alt="Yelp Ratings">
				{/if}
						{#if $Enable_Yelp_Count}
				<div class="yelp-rating-count c-text2">
					({ restaurant_card.RestRatingCount || 0 })
				</div>
				{/if}
			</div>
			</div>
			<div class="restaurant-details">
			<div class="restaurant-name text-overflow">{ restaurant_card.RestaurantName }</div>
			<div class="restaurant-info c-text2">{ restaurant_card.Address }</div>
			<div class="restaurant-info c-text2">
				<span>{ restaurant_card.CuisineName } • </span>
				{#if restaurant_card.Distance}
					<span>{ distance_text_(restaurant_card.Distance) } • </span>
				{/if}
				<span>{ restaurant_card.PriceLevel }</span>
			</div>

				<div class="c-text3">
					{#if $serviceType === ServiceType.SERVICE_TYPE_DELIVERY || $serviceType === ServiceType.SERVICE_TYPE_CATERING }
						<span class="restaurant-delivery-fee">Delivery Fee ${ restaurant_card.DeliveryCharge } • </span>
						{#if restaurant_card.MinOrder !== null}
							<span class="restaurant-min-order">Min Order ${ restaurant_card.MinOrder } • </span>
						{/if}
					{/if}
					{#if $serviceType !== ServiceType.SERVICE_TYPE_DINEIN && restaurant_card.ETA}
						<span class="restaurant-eta">ETA { restaurant_card.ETA }</span>
					{/if}
				</div>

					<div class="restaurant-status"
							class:c-success={restaurant_card.IsOpen}
							class:c-primary={!restaurant_card.IsOpen}
					>{ restaurant_card.IsOpen ? 'Open Now' : (restaurant_card.Availability || '&nbsp;') }</div>
			</div>
		</div>

		<div class="item-actions clearfix">
			<a
					class="btn btn-success btn-xs view-menu"
					href={restaurant_url_(menuitem_restaurant_url_data_(restaurant_card, $serviceType))}
					on:click={is_navigating_onclick}
				>View Menu</a>
		</div>
	</div>
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.RestaurantCard {
	position: relative;
	float: left;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 370px;
	min-height: 240px;
	max-height: 240px;
	text-align: left;
	font-size: initial;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
	border-radius: 3px 3px 0 0;
	@media (max-width: $screen-xs-max) {
		max-width: none;
	}
	&.is_selected {
		border-color: $brand-success;
	}
	.restaurant-item-bubble {
		background-color: white;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
		content: "\A0";
		display: block;
		left: 50%;
		position: absolute;
		top: 100%;
		transform: rotate(45deg);
		height: 12px;
		width: 12px;
		margin-top: -6px;
		margin-left: -6px;
		z-index: 0;
	}
	.close {
		z-index: 2;
		position: absolute;
		top: 2px;
		right: 6px;
		cursor: pointer;
	}

	.restaurant-item-inner-wrapper {
		min-height: 240px;
		max-height: 240px;
		background: white;
		z-index: 1;
		padding: 16px;

		.item-body {
			flex: 1;
			display: flex;
			flex-direction: row;
			overflow: hidden;
			> * {
				height: 100%;
				&.restaurant-img-container {
					flex: 0;
					position: relative;
					margin: 0 16px 0 0;
					display: inline-block;
					background-size: cover;
					border-radius: 3px 3px 0 0;
					.restaurant-img {
						width: 96px;
						height: 96px;
						padding: 24px;
						margin: 0 auto;
						background-color: #F5F7F7;
						&.RestImageExist {
							background-repeat: no-repeat;
							background-size: contain;
							background-position: 50%;
							padding: 0;
						}
						&.restaurant-cuisine-icon {
							background-size: auto;
						}
					}
					.yelp-rating {
						height: 44px;
						margin: 7px 0 12px;
						overflow: hidden;
						.yelp-rating-count {
							display: inline-block;
							font-size: 12px;
						}
						.yelp-icon {
							display: block;
							width: 100px;
							height: 14px;
						}
						.yelp-logo {
							vertical-align: middle;
						}
					}
				}
				&.restaurant-details {
					flex: 1;
					background-color: white;
					.restaurant-name {
						font-size: 14px;
						font-weight: $lato-bold;
					}
					.restaurant-info {
						margin-top: 4px;
						font-size: 12px;
					}
					.restaurant-delivery-fee, .restaurant-min-order, .restaurant-eta {
						text-transform: uppercase;
						font-size: 12px;
					}
					.restaurant-status {
						margin-top: 3px;
						font-size: 12px;
					}
				}
			}
		}
		.item-actions {
			flex: 0;
			border-top: 1px solid #DBDBDB;
			margin-top: 0;
			padding-top: 32px;
			height: 41px;
			.row, .col {
				padding: 0;
			}
			.view-menu {
				display: flex;
				align-items: center;
				justify-content: center;
				float: right;
				height: 24px;
				width: 96px;
				font-size: 12px;
				margin-top: -14px;
			}
		}
	}
}
</style>
