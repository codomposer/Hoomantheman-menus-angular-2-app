<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import SwiperCore, { Navigation } from 'swiper';
import { compact } from '@ctx-core/array'
import { isNumber } from '@ctx-core/number'
import { currency_str_ } from '@ctx-core/currency'
import { query_str_ } from '@ctx-core/uri'
import { style_ } from '@ctx-core/html'
import { has_dom } from '@ctx-core/dom'
import { app_download_link_, PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { distance_text_ } from '@menus/util'
import { api_src_ } from '@menus/api'
import { params_serviceType$_b } from '@menus/page'
import { minutes_duration_human_text_ } from '@menus/date'
import { Enable_Yelp_Count$_b, Enable_Yelp_Rating$_b } from '@menus/platform-settings'
import { MapRouteModal } from '@menus/consumer-user-ui'
import { QRCodeViewer } from '@menus/qrcode-ui'
import { AppStoreLinks } from '@menus/consumer-app-ui'
import { not_found_goto_url } from '@menus/route'
import { availability_ctx$_b } from '@menus/restaurant-hours'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { Restaurant_Menuitems_Filter } from '../Restaurant_Menuitems_Filter'
import { set_selected_menuitem_ } from '../set_selected_menuitem_.js'
import { Restaurant_EmptyResult_ServiceTypes } from '../Restaurant_EmptyResult_ServiceTypes'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { Restaurant_Menuitems_c } from './Restaurant_Menuitems_c.js'
import Restaurant_MenuHours from './Restaurant_MenuHours.svelte'
const app_download_link = app_download_link_()
let show_rest_heads_menu:boolean
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const dispatch = createEventDispatcher()
const availability_ctx$ = availability_ctx$_b(ctx)
const Enable_Yelp_Count$ = Enable_Yelp_Count$_b(ctx)
const Enable_Yelp_Rating$ = Enable_Yelp_Rating$_b(ctx)
const { is_shopping_cart_opened$ } = shopping_cart_b(ctx)
const params_serviceType$ = params_serviceType$_b(ctx)
const set_selected_menuitem = set_selected_menuitem_(ctx)
export const _ = new Restaurant_Menuitems_c(ctx, dispatch)
const {
	restaurant_busy$, gallery_menuitems$, goto_url$, is_masterheadings_tab_section_fixed$,
	list_view_icon$, masterheadings$, Masterheadings_tab_div$, masterheadings_tab_section$, 
	is_masterheadings_tab_section_mobile_fixed$, is_rest_heads_menu_fixed$, is_rest_open$, isDeliverable$, selected_menuitem$, menu$,
	rest_details_map_div_a$, restaurant_menu_tabs_ul$, MapRouteModal_i$, visible_headings$, selected_masterheading$,
	serviceType$,
} = _
let Distance_isNumber:boolean
$: Distance_isNumber = isNumber($selected_menuitem$?.Distance)
let not_found_service_Ts_visible:boolean

// tell swiper to use navigation and pagination modules
SwiperCore.use([Navigation]);

let Swiper;
let SwiperSlide;

onMount(async () => {
	_.onMount()

  // dynamically import swiper module
  const SwiperSvelteModule = await import('swiper/svelte');
  Swiper = SwiperSvelteModule.Swiper;
  SwiperSlide = SwiperSvelteModule.SwiperSlide;
});

onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:scroll={evt => _.update_selected_masterheading()}></svelte:window>
<MapRouteModal bind:this={$MapRouteModal_i$}></MapRouteModal>
<div class="Restaurant_Menuitems">
  <div class="restaurant-details-section clearfix">
    <div class="menu-item-img-container">
      {#if $menu$ && ($menu$.MenuImageExist || $menu$.RestImageExist)}
        <div class="menu-item-img">
          <img src={ api_src_($menu$.RestImage) }
							 alt={ $menu$.RestaurantName }/>
        </div>
      {:else if $menu$}
        <div class="item-cuisine-icon-parent clearfix">
          <div class="cuisine-icon-{$menu$.CuisineID} item-cuisine-icon"></div>
        </div>
      {/if}
	  <!-- Show when isPlatform is FALSE -->
			{#if $menu$ && !$menu$.IsPlatform}
        <div class="manage-listing">
          <a href="/backoffice/signup{query_str_({ fireFlyID: $menu$.FFID })}"
						 class="btn btn-xxs btn-primary"
					>Manage This Listing</a>
        </div>
      {/if}
    </div>
    <div class="restaurant-details">
      <div class="row">
        {#if $menu$}
          <div class:col-md-6={$menu$.IsPlatform}
							 class:col-md-12={!$menu$.IsPlatform}
					>
            <div class="restaurant-name">
              { $menu$.RestaurantName }
							<div class="restaurant-status"
									 class:c-success={$is_rest_open$}
									 class:c-primary={!$is_rest_open$}
							>{
								$availability_ctx$.label
								|| ($is_rest_open$ ? 'Open Now' : $selected_menuitem$?.Availability)
							}</div>
            </div>
            <div class="yelp-rating">
              {#if $Enable_Yelp_Rating$}
                <div class="yelp-icon yelp-icon-0 yelp-icon-{ $menu$.RestRating }">&nbsp;</div>
              {/if}
							{#if $Enable_Yelp_Count$}
                <div class="yelp-rating-count c-text2"
								>({ $menu$.RestRatingCount || 0 })</div>
              {/if}
							{#if $Enable_Yelp_Rating$ || $Enable_Yelp_Count$}
                <img class="yelp-logo" src="/assets/img/yelp/yelp-logo.svg" alt="">
              {/if}
            </div>
            <div class="restaurant-info c-text2">{
							compact([
								$menu$.CuisineName ? $menu$.CuisineName : null,
								$menu$.PriceLevel ? currency_str_($menu$.PriceLevel) : null,
							]).join(' • ')
						}
            </div>
						{#if $isDeliverable$}
              <div class="restaurant-info c-text2">{
								compact([
									(Distance_isNumber && $selected_menuitem$.DeliveryCharge)
									? `Delivery Fee ${currency_str_($selected_menuitem$.DeliveryCharge)}`
									: (Distance_isNumber && ($selected_menuitem$.DeliveryCharge === 0))
										? 'Free Delivery'
										: null,
									(Distance_isNumber && $selected_menuitem$.MinOrder)
									? `Min Order ${currency_str_($selected_menuitem$.MinOrder)}`
									: null,
								]).join(' • ')
							}</div>
            {/if}
						{#if (!$isDeliverable$ || Distance_isNumber) && $selected_menuitem$?.ETA}
              <div class="restaurant-info c-text2">
                {$isDeliverable$ ? 'ETA' : '~'}
								{ minutes_duration_human_text_($selected_menuitem$.ETAMin, $selected_menuitem$.ETAMax) }
              </div>
            {/if}
          </div>
					{#if $menu$.IsPlatform}
            <div class="col-md-6 QRCodeViewer-wrapper">
              {#if has_dom && app_download_link}
                <QRCodeViewer text={app_download_link}></QRCodeViewer>
              {/if}
            </div>
          {/if}
        {/if}
      </div>
    </div>
    <div class="AppStoreLinks-container">
      <AppStoreLinks></AppStoreLinks>
    </div>
  </div>
	{#if $restaurant_busy$}
    <div class="main-page-loader">
      <PageLoader></PageLoader>
    </div>
  {:else}
    {#if has_dom && $gallery_menuitems$?.length}
      <div class="gallery-menu-items">
		<div class="AppSwiper">
			<svelte:component 
				this={Swiper}
				slidesPerView={'auto'}
				spaceBetween={15}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}>
			{#each $gallery_menuitems$ as menuitem}
				<svelte:component this={SwiperSlide}>
				<div class="swiper-slide gallery-menu-item-wrapper">
					<div on:click={_evt => set_selected_menuitem(menuitem)}
											class="gallery-menu-item"
											style={style_({ 'background-image': `url(${api_src_(menuitem.MenuItemImage)})` })}
									></div>
				</div>
				</svelte:component>
			{/each}

				<svelte:fragment slot="container-end">
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</svelte:fragment>
			</svelte:component>
		</div>
      </div>
    {/if}
		<div class="restaurant-map-section restaurant-map-section-0"
				 class:is_shopping_cart_opened={$is_shopping_cart_opened$}
				 class:not_is_shopping_cart_opened={!$is_shopping_cart_opened$}
				 on:click={evt => _.open_MapRouteModal_i()}
		>
      <div class="map-container-0">
        <div bind:this={$rest_details_map_div_a$[0]} id="restaurant-details-map-0" class="restaurant-details-map"></div>
      </div>
			{#if $selected_menuitem$}
        <div class="restaurant-map-details">
          <div class="restaurant-address">{ $selected_menuitem$.Address }</div>
					{#if $selected_menuitem$.Distance}
            <div class="restaurant-distance-away c-text2">{
							distance_text_($selected_menuitem$.Distance)
						} away</div>
          {/if}
					<div class="restaurant-phone-number">{ $selected_menuitem$.Phone }</div>
          <Restaurant_MenuHours></Restaurant_MenuHours>
        </div>
      {/if}
    </div>
    <div bind:this={$masterheadings_tab_section$}
				 class="master-headings-tab-section"
				 class:fixed-nav={$is_masterheadings_tab_section_fixed$}
				 class:fixed-nav-mobile={$is_masterheadings_tab_section_mobile_fixed$}
		></div>
		{#if $selected_menuitem$}
      <ul
				bind:this={$restaurant_menu_tabs_ul$}
				class="nav nav-pills nav-primary tabs restaurant-menu-tabs scrollable"
				class:fixed-nav={$is_masterheadings_tab_section_fixed$}
				class:fixed-nav-mobile={$is_masterheadings_tab_section_mobile_fixed$}
			>
        {#each $masterheadings$ as masterheading}
          <li class:active={$selected_masterheading$?.Mhid === masterheading?.Mhid}
							on:click={_evt => _.select_masterheading(masterheading)}
					><a href="." on:click|preventDefault>{ masterheading.MasterHeading } ({ masterheading.ItemCount })</a></li>
        {/each}
      </ul>
    {/if}
		{#if $menu$}
      <div class="restaurant-menu-section clearfix">
        <div class="left-side">
          <Restaurant_Menuitems_Filter></Restaurant_Menuitems_Filter>
					{#if !$selected_menuitem$}
            <div class="empty-result">
              <div class="burger-search-fail-icon empty-result-icon"></div>
              <div class="empty-result-title">We don't deliver to this address</div>
              <div class="empty-result-subtitle">Try to change your address.</div>
              <Restaurant_EmptyResult_ServiceTypes></Restaurant_EmptyResult_ServiceTypes>
            </div>
          {/if}
        </div>
        <div class="right-side">
          {#if $menu$}
            <div class="restaurant-map-section restaurant-map-section-1"
								 class:is_shopping_cart_opened={$is_shopping_cart_opened$}
								 class:not_is_shopping_cart_opened={!$is_shopping_cart_opened$}
								 on:click={evt => _.open_MapRouteModal_i()}
						>
              <div class="map-container-1">
                <div bind:this={$rest_details_map_div_a$[1]} id="restaurant-details-map-1"
										 class="restaurant-details-map"
								></div>
              </div>
              <div class="restaurant-map-details">
                <div class="restaurant-address">{ $menu$.Address }</div>
								{#if $menu$.Distance}
                  <div class="restaurant-distance-away c-text2">{
										distance_text_($menu$.Distance)
									} away</div>
                {/if}
								{#if $menu$.Phone}
                  <div class="restaurant-phone-number">{ $menu$.Phone }</div>
                {/if}
								<Restaurant_MenuHours></Restaurant_MenuHours>
              </div>
            </div>
          {/if}
					{#if $selected_menuitem$}
            <div bind:this={$Masterheadings_tab_div$}></div>
            <div class="restaurant-headings-menu bg-text1"
								 class:fixed-nav={$is_rest_heads_menu_fixed$}
								 class:show-mobile={show_rest_heads_menu}
								 class:is_shopping_cart_opened={$is_shopping_cart_opened$}
								 class:not_is_shopping_cart_opened={!$is_shopping_cart_opened$}
						>
              {#each $selected_masterheading$.heads as heading,heading_idx}
                <div class="restaurant-headings-menuitem clearfix"
										 class:c-success={$visible_headings$ && ~$visible_headings$.indexOf(heading)}
										 on:click={_evt => _.select_heading(`#heading_${ heading.Hid }`)}
										 on:click={_evt => show_rest_heads_menu = false}
								>
                  <div class="head-name">{ heading.Heading }</div>
                  <div class="head-count">{ heading.ItemCount }</div>
                </div>
              {/each}
            </div>
						{#if show_rest_heads_menu}
              <div class="close-menu-wrapper"
									 on:click={_evt => show_rest_heads_menu = !show_rest_heads_menu}
							>
                <div class="close-3-white-icon"></div>
              </div>
            {:else}
              <div class="list-view-icon-wrapper"
									 on:click={_evt => show_rest_heads_menu = !show_rest_heads_menu}
							>
                <img src={$list_view_icon$} alt="">
              </div>
            {/if}
          {/if}
        </div>
      </div>
    {:else if (
			$serviceType$ === $params_serviceType$
			&& $goto_url$ === not_found_goto_url
		)}
      <div class="restaurant-menu-section">
        <div class="empty-result">
          <div class="empty-result-icon restaurants-icon"></div>
          <div class="empty-result-title">We can't find restaurants for {$params_serviceType$} service.</div>
					{#if not_found_service_Ts_visible}
            <div class="empty-result-subtitle ng-binding">But we found results in other service types.</div>
          {/if}
					<Restaurant_EmptyResult_ServiceTypes bind:visible={not_found_service_Ts_visible}
					></Restaurant_EmptyResult_ServiceTypes>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style type=text/scss global>
@import '@menus/css/lib';
@import '@menus/consumer-shared-css/lib';
@import 'swiper/swiper.scss';
@import 'swiper/components/navigation/navigation.scss';
@import 'swiper/components/pagination/pagination.scss';
.Restaurant_Menuitems {
	min-height: calc(100vh - 400px);
	.main-page-loader {
		padding: 24px;
	}
	.restaurant-details-section {
		position: relative;
		padding: 20px 48px;
		@media (max-width: $screen-sm-max) {
			padding: 20px 24px;
		}
		.menu-item-img-container {
			@media (min-width: $screen-sm-min) {
				float: left;
				margin-right: 16px;
			}
			.menu-item-img {
				position: relative;
				width: 120px;
				height: 120px;
				margin: 0 auto;
				background-color: #F5F7F7;
				img {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					max-width: 100%;
				}
			}
			.manage-listing {
				margin-top: 8px;
				@media (max-width: $screen-xs-max) {
					text-align: center;
				}
			}
			.item-cuisine-icon-parent {
				background-color: #F5F7F7;
				padding: 28px;
				width: 120px;
				height: 120px;
				margin: 0 auto;
				.item-cuisine-icon {
					width: 64px;
					height: 64px;
					margin: 0 auto;
				}
			}
		}
		.restaurant-details {
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
			@media (min-width: $screen-sm-min) {
				overflow: hidden;
			}
			.restaurant-name {
				font-weight: $lato-black;
				font-size: 30px;
				display: inline-block;
				.restaurant-status {
					display: inline;
					font-size: 14px;
					@media (max-width: $screen-xs-max) {
						display: block;
						text-align: center;
					}
				}
			}
			.yelp-rating {
				margin: 7px 0 12px;
				.yelp-icon {
					display: inline-block;
					width: 100px;
				}
				.yelp-rating-count {
					display: inline-block;
					font-size: 12px;
				}
				.yelp-logo {
					vertical-align: middle;
				}
			}
			.restaurant-info {
				margin-top: 6px;
			}
			.QRCodeViewer-wrapper {
				text-align: right;
				@media (max-width: $screen-xs-max) {
					display: none;
				}
			}
		}
		.AppStoreLinks-container {
			display: flex;
			justify-content: flex-end;
			@media (max-width: $screen-xs-max) {
				margin: 16px 0 0;
				justify-content: center;
				text-align: center;
			}
		}
	}
	.gallery-menu-items {
		position: relative;
		padding: 0 48px 32px;
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 16px;
		}
		.AppSwiper {
			width: 100%;
			.swiper-slide {
				display: flex;
				width: 170px;
				height: 170px;
				@media (max-width: $screen-xs-max) {
					align-items: center;
					justify-content: center;
				}
				.gallery-menu-item {
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					display: inline-block;
					cursor: pointer;
				}
			}
		}
	}
	.master-headings-tab-section {
		&.fixed-nav {
			@media (min-width: $screen-sm-min) {
				height: 67px;
			}
		}
		&.fixed-nav-mobile {
			@media (max-width: $screen-xs-max) {
				height: 54px;
			}
		}
	}
	.nav {
		display: flex;
		flex-direction: row;
		&.nav-pills {
			padding: 0 24px;
			border-bottom: 1px solid #DBDBDB;
			white-space: nowrap;
			&.tabs {
				border-top: 1px solid #DBDBDB;
				padding: 0 48px;
				@media (max-width: $screen-xs-max) {
					padding-left: 0;
					padding-right: 0;
					text-align: center;
				}
				li {
					font-size: 14px;
					a {
						user-select: none;
						img {
							margin-top: -2px;
							height: 24px;
							width: 24px;
						}
					}
				}
			}
			&.restaurant-menu-tabs {
				margin-top: -1px;
				&.fixed-nav, &.fixed-nav-mobile {
					position: fixed;
					top: $cr-navbar-and-service-type-height;
					width: 100%;
					background-color: white;
					z-index: 2;
					@media (max-width: $screen-sm-max) {
						top: $cr-mobile-navbar-and-service-type-height;
						left: 0;
					}
				}
				li {
					a {
						padding-top: 12px;
						margin-bottom: 8px;
					}
				}
			}
		}
		> li {
			display: flex;
			align-content: center;
			justify-content: center;
			a {
				display: flex;
				align-content: center;
				justify-content: center;
			}
		}
	}
	.restaurant-map-section {
		border: 1px solid #DBDBDB;
		border-radius: 3px;
		cursor: pointer;
		&.restaurant-map-section-0 {
			&.is_shopping_cart_opened {
				@media (min-width: $screen-lg-min) {
					position: absolute;
					left: -999999999px;
				}
			}
			&.not_is_shopping_cart_opened {
				@media (min-width: $screen-sm-min) {
					position: absolute;
					left: -999999999px;
				}
			}
		}
		&.restaurant-map-section-1 {
			&.is_shopping_cart_opened {
				@media (max-width: $screen-md-max) {
					position: absolute;
					left: -999999999px;
				}
			}
			&.not_is_shopping_cart_opened {
				@media (max-width: $screen-xs-max) {
					position: absolute;
					left: -999999999px;
				}
			}
		}
		.map-container {
			position: relative;
		}
		.restaurant-details-map {
			height: 120px;
			width: 100%;
		}
		.restaurant-map-details {
			border-top: 1px solid #DBDBDB;
			padding: 8px 30px;
			.restaurant-address {
				font-weight: $lato-bold;
			}
			.restaurant-distance-away {
				margin-top: 6px;
				padding-bottom: 12px;
				border-bottom: 1px solid #DBDBDB;
			}
			.restaurant-phone-number, .restaurant-MenuHour {
				margin-top: 12px;
			}
		}
	}
	.restaurant-menu-section {
		$right-side-width: 300px;
		padding: 8px 48px 40px;
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
		}
		> .left-side {
			@media (min-width: $screen-sm-min) {
				$margin-right: 5%;
				width: calc(100% - #{$margin-right} - #{$right-side-width});
				float: left;
				margin-right: $margin-right;
			}
			.empty-result {
				margin-top: 100px;
			}
		}
		> .right-side {
			@media (min-width: $screen-sm-min) {
				width: $right-side-width;
				float: right;
			}
			.restaurant-headings-menu {
				@media (min-width: $screen-sm-min) {
					width: $right-side-width;
					overflow: auto;
					margin-top: 40px;
					border-radius: 3px;
					background-color: $gray;
					max-height: 70%;
					z-index: 1;
					padding: 24px;
				}
				&.is_shopping_cart_opened {
					@media (max-width: $screen-md-max) {
						display: none;
					}
				}
				&.not_is_shopping_cart_opened {
					@media (max-width: $screen-xs-max) {
						display: none;
					}
				}
				&.fixed-nav {
					@media (min-width: $screen-sm-min) {
						position: fixed;
						top: 152px; // `152` is the top position of `$Masterheadings_tab_div$`
					}
				}
				&.show-mobile {
					display: block;
					position: fixed;
					bottom: 48px;
					right: 48px;
					padding: 24px;
					z-index: 1;
				}
				.restaurant-headings-menuitem {
					color: $light;
					padding: 13px 0 14px;
					border-bottom: 1px solid #5B717C;
					cursor: pointer;
					&.active {
						.head-name, .head-count {
							color: $brand-success;
						}
					}
					.head-name {
						float: left;
						font-weight: $lato-bold;
						color: inherit;
					}
					.head-count {
						float: right;
						font-weight: $lato-black;
						color: inherit;
					}
				}
			}
			.close-menu-wrapper {
				position: fixed;
				bottom: 0;
				right: 0;
				width: 48px;
				height: 48px;
				z-index: 999999999;
				padding: 12px;
				border-radius: 50%;
				background: #263238;
				cursor: pointer;
				@media (min-width: $screen-sm-min) {
					display: none;
				}
			}
			.list-view-icon-wrapper {
				position: fixed;
				bottom: 0;
				right: 0;
				padding-bottom: 0;
				z-index: 4;
				@media (min-width: $screen-sm-min) {
					display: none;
				}
			}
		}
		.empty-result {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.empty-result-icon {
				height: 112px;
				background: vurl('/assets/img/shared/restaurants-placeholder.png');
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
			}
			.empty-result-title {
				font-weight: bold;
			}
		}
	}
}
</style>
