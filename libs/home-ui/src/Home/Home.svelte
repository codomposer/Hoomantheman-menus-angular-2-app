<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { _call__map } from '@ctx-core/function'
import type { CityCtx } from '@menus/address'
import { Row } from '@menus/bootstrap'
import { Navbar } from '@menus/layout-ui'
import { AppStoreLinks } from '@menus/consumer-app-ui'
import { is_ProfileHandle_open$_b, ProfileHandle, ProfileMenu } from '@menus/consumer-layout-ui'
import { SearchParams } from '@menus/consumer-search-ui'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { ShoppingCart, ShoppingCartLinkHandle } from '@menus/consumer-shopping-cart-ui'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { is_filters_opened$_b } from '@menus/filters-common'
import { is_navigating_onclick_b } from '@menus/page'
import { PlatformIcon } from '@menus/platform-ui'
import type { PopularDish } from '@menus/search-menu-common'
import { LocationAutocomplete, SiteFooter } from '@menus/shared-ui'
// import { AppSwiper } from '@menus/swiper'
import { getContext_ui_ctx } from '@menus/ui'
import { ChangeAddressModal, UserAddressLink } from '@menus/user-address-ui'
import type { home_ui_Ctx } from '../home_ui_Ctx.js'
import { Home_c } from './Home_c.js'
const ctx = getContext_ui_ctx() as home_ui_Ctx
const is_filters_opened$ = is_filters_opened$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const is_ProfileHandle_open$ = is_ProfileHandle_open$_b(ctx)
const { is_shopping_cart_opened$ } = shopping_cart_b(ctx)
const consumer_login_user$ = consumer_login_user$_b(ctx)
let ChangeAddressModal_i
export let cities:CityCtx[], popular_dishes:PopularDish[]
export const _ = new Home_c(ctx)
$: _.cities$.$ = cities
$: _.popular_dishes$.$ = popular_dishes
const {
	url_slug_, cities$, dish$, home_page_map$, color_white$, locationAutocomplete$, popular_dishes$,
	popular_dishes_container$, search_regex$, selected_popular_dish_index$, selected_tab$,
	userAddress$, userAddress_text$, value$,
} = _
let search_dishes
$: search_regex$.set(new RegExp(`.*${$value$}.*`))
$: search_dishes =
	$value$
	? ($popular_dishes$ || []).filter(popularDish=>$search_regex$.test(popularDish.Name))
	: ($popular_dishes$ || [])
export let hasBanner = false
export let strCitySearch = ''
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:resize={_.refresh_color_white}></svelte:window>
<ChangeAddressModal bind:this={ChangeAddressModal_i}></ChangeAddressModal>
<div class="landing-page home-page HomePage"
		 class:has-banner={hasBanner}
		 class:filters-opened={$is_filters_opened$}
>
  <div id="hero">
    <div class="big-image-section">
      <div class="now-serving-california">
        <em>Now Serving California</em>
      </div>
      <div class="search-section">
        <div class="popular-dishes-section tab-content"
						 hidden={$dish$}
				>
          <SearchParams
						bind:value={$value$}
						on:select={evt => _.onselect_SearchParams(evt)}
						on:escape={evt => _.onescape_SearchParams(evt)}
						on:arrowUp={evt => _.onarrowUp_SearchParams(evt)}
						on:arrowDown={evt => _.onarrowDown_SearchParams(evt)}
					></SearchParams>
          <div bind:this={$popular_dishes_container$} class="section-content">
            <Row>
              {#each search_dishes || [] as search_dish, index}
                <div
									class="col-sm-4 col-md-3 col-lg-2 section-3"
								>
                <div
									class="section-link"
									class:selected={ $selected_popular_dish_index$ === index }
								>
                  <a
										href="/dish/{ url_slug_(search_dish.Name) }/page/1"
										on:click={evt => _.onClickPopularDish(evt, search_dish.Name)}
									>{ search_dish.Name }</a>
                </div>
              </div>
              {/each}
            </Row>
          </div>
        </div>
				{#if $dish$}
          <div class="tab-content dish">
            <h2 class="clearable">{$dish$}</h2>
            <div class="clear-button visible"
								 on:click={evt => _.clear_dish()}
						>
              <div class="close-1-white-icon icon-custom"></div>
            </div>
          </div>
        {/if}
				<form class="form-inline tab-content clearfix"
							hidden={!$dish$ || $userAddress$}
							autocomplete="off"
				>
          <div class="form-group">
            <div class="m-input-group has-addon-left">
              <div class="m-input-group-addon m-addon-left"
									 on:click={evt => _.init_userAddress(true)}
							>
                <div class="location-icon icon-custom"></div>
              </div>
              <LocationAutocomplete
								bind:this={$locationAutocomplete$}
								on:userAddressChanged={_.onUserAddressChanged}
							></LocationAutocomplete>
              <div class="m-input-group-addon m-addon-right"
									 class:visible={!!$userAddress_text$}
									 on:click={_.clear_locationAutocomplete}
							>
                <div class="close-1-white-icon icon-custom"></div>
              </div>
            </div>
          </div>
        </form>
        <div class="tab-content"
						 hidden={$selected_tab$ !== 'city'}
				>
          <div class="section-title">
            <div class="search-icon"></div>
            <input
							type="text"
							bind:value={strCitySearch}
							placeholder="Search for City"
							autocomplete="disable"
						/>
          </div>
          <div class="section-content">
            <div class="row">
              {#each $cities$ || [] as city, index}
                <div class="col-sm-3 section-3">
                  <div class="section-link">
                    <a href="/city/{ _.url_slug_(city.City) }"
											 on:click={is_navigating_onclick}
										>{ city.City } restaurants
                    </a>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slider-container">
      {#if has_dom}
<!--        <AppSwiper>-->
          <div class="swiper-slide chalkboard">
            <div class="mask"></div>
            <div class="slide-text-wrapper">
            </div>
          </div>
				<!--        </AppSwiper>-->
      {/if}
    </div>
  </div>
  <div class="top-content">
    <Navbar color_white={$color_white$} bg_transparent={!$is_filters_opened$} bg_white={$is_filters_opened$}>
      <div class="navbar-brand" slot="header">
        <PlatformIcon white={true}></PlatformIcon>
      </div>
			<!-- Collect the nav links, forms, and other content for toggling -->
      <ul class="nav navbar-nav" slot="collapse">
        <li class="user-address-link-container">
          <UserAddressLink
						color_white={$color_white$}
						{ChangeAddressModal_i}
					></UserAddressLink>
        </li>
				{#if $consumer_login_user$}
          <li class="Profile-container">
            <ProfileHandle></ProfileHandle>
						{#if $is_ProfileHandle_open$}
              <ProfileMenu class="dropdown-menu"></ProfileMenu>
            {/if}
          </li>
          <li class="ShoppingCartLinkHandle-container">
            <ShoppingCartLinkHandle color_white={$color_white$}></ShoppingCartLinkHandle>
          </li>
        {:else if $consumer_login_user$ !== undefined}
          <li class="big-link"><a href="." on:click={_.login}>Customer Login</a></li>
          <li class="big-link">
            <a href="/backoffice"
							 on:click={_call__map([is_navigating_onclick, _.toggle_mobile_menu])}
						>Restaurant Backoffice</a>
          </li>
        {:else}
          <li></li>
          <li></li>
        {/if}
      </ul>
    </Navbar>
  </div>
  <div class="main-map-wrapper">
    <div bind:this={$home_page_map$} id="home-page-map" class="main-map"></div>
    <div class="main-content">
      <div class="download-app-section">
        <div class="section-heading">Download our app to start forking</div>
        <AppStoreLinks></AppStoreLinks>
      </div>
    </div>
  </div>
  <div class="section-already-client">
    <div class="section-text">Need help with an order? Contact Menu.com Support.</div>
    <div class="section-phone">
      <div class="phone-icon"></div>
      <a href="tel:+18336368700"><span class="white">(833) 636-8700</span></a>
    </div>
  </div>
	{#if $is_shopping_cart_opened$}
    <div class="shopping-cart-section-wrapper">
      <ShoppingCart></ShoppingCart>
    </div>
  {/if}
	<SiteFooter></SiteFooter>
</div>

<style type="text/scss" global>
@import "@menus/css/lib";
@import "@menus/consumer-shared-css/lib";
.HomePage {
	$banner-height: 190px;
	&.filters-opened {
		height: 100vh;
		overflow: hidden;
		.top-content {
			color: $gray;
			.Navbar {
				background: transparent;
				&.color_white {
					background: white;
					.navbar-collapse {
						> .navbar-nav {
							> li {
								> a {
									color: white;
									@media (max-width: $grid-float-breakpoint-max) {
										color: white;
									}
									&:hover, &:focus {
										background-color: transparent;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.section-heading {
		font-weight: $lato-black;
		font-size: 24px;
		@media (min-width: $screen-md-min) {
			font-size: 36px;
		}
	}
	#hero {
		position: relative;
		overflow: hidden;
		top: 0;
		left: 0;
		right: 0;
		height: 1000px;
		width: 100%;
		z-index: 1;
		@media (max-width: $screen-md-max) {
			height: 660px;
		}
		@media (max-width: $screen-xs-max) {
			margin-top: $navbar-height;
			height: 450px;
		}
		.section-heading {
			text-shadow: 2px 2px 2px #263238;
		}
		.big-image-section {
			position: absolute;
			top: 0;
			height: 100%;
			width: 100%;
			padding: 157px 135px 0;
			z-index: 2;
			color: white;
			@media (max-width: $screen-xs-max) {
				padding: 24px;
			}
			.now-serving-california {
				width: 100%;
				max-width: 1000px;
				margin: 0 auto;
			}
			.tag-heading {
				font-weight: $lato-black;
				font-size: 36px;
			}
			.tag-subheading {
				margin-top: 8px;
				font-size: 24px;
			}
			.search-section {
				@media (max-width: $screen-xs-max) {
					margin-top: 32px;
					text-align: center;
				}
				.close-1-icon, .close-1-white-icon {
					height: 16px;
					width: 16px;
				}
				.tab-content {
					display: flex;
					flex-direction: column;
					position: relative;
					max-width: 1000px;
					margin: 0 auto;
					@media (max-width: $screen-md) {
						width: 100%;
						overflow-y: hidden;
					}
					&[hidden] {
						display: none;
					}
					&.dish {
						display: block;
						position: relative;
						h2 {
							display: flex;
							align-items: center;
							height: $input-height-large;
							margin: 0;
							padding: 0;
						}
						.clear-button {
							top: 0;
						}
					}
					input {
						&.your-address {
							@media (min-width: $screen-sm-min) {
								width: 60%;
							}
						}
					}
					.section-content {
						max-height: 400px;
						width: calc(100% - 152px);
						margin-top: 1rem;
						overflow: hidden;
						overflow-y: auto;
						@media (max-width: $screen-md-max) {
							width: calc(100% - #{$navbar-height});
						}
						@media (max-width: $screen-sm-max) {
							width: 100%;
							overflow-y: hidden;
						}
						&.expanded {
							max-height: none;
						}
						.section-link {
							margin-bottom: 8px;
							&.selected {
								background: $gray-lighter;
								a {
									color: black;
								}
							}
						}
					}
					.section-title {
						width: 100%;
					}
					.section-link {
						cursor: pointer;
						&.hidden {
							display: none;
						}
					}
				}
				.form-inline.tab-content {
					flex-direction: row;
					.form-group {
						flex-grow: 1;
						display: flex;
						overflow: hidden;
						margin-bottom: 0;
						.m-input-group {
							flex-grow: 1;
							display: flex;
							&.has-addon-left {
								.form-control {
									padding: 0 1rem;
									text-overflow: ellipsis;
								}
							}
							.m-input-group-addon {
								flex-grow: 0;
								display: none;
								&.visible {
									display: block;
								}
								&.m-addon-left {
									padding: 16px;
								}
								&.m-addon-right {
									padding: 20px;
								}
								.icon-custom {
									float: left;
								}
							}
							location-autocomplete {
								flex-grow: 1;
								display: flex;
								input {
									flex-grow: 1;
								}
							}
						}
					}
				}
				a {
					color: white;
				}
			}
		}
		.slider-container {
			height: 1000px;
			z-index: 0;
			.AppSwiper {
				width: 100%;
				height: 100%;
				display: flex;
				.swiper-wrapper {
					flex-grow: 1;
					position: relative;
					text-align: center;
					img {
						@media (max-width: $screen-md-max) {
							display: inline-block;
						}
					}
					.swiper-slide {
						position: relative;
						background-repeat: no-repeat;
						background-size: cover;
						width: 100%;
						height: 100%;
						background-position-x: 50%;
						background-position-y: 50%;
						@media (max-width: $screen-xs-max) {
							background-position-y: -150px;
						}
						&.chalkboard {
							background-image: vurl('/assets/img/cr/chalkboard--iStock-467805992.jpg');
						}
						.mask {
							position: absolute;
							top: 0;
							left: 0;
							height: 100%;
							width: 100%;
							z-index: 1;
							background: rgba($gray, 0);
						}
						.slide-device-wrapper {
							@media (min-width: $screen-lg-min) {
								float: left;
							}
						}
						.slide-text-wrapper {
							padding-top: 145px;
							@media (max-width: $screen-md-max) {
								padding-top: 90px;
								text-align: center;
							}
							@media (min-width: $screen-lg-min) {
								overflow: auto;
								padding-left: 48px;
							}
							.own-business-text {
								.text-title {
									font-weight: $lato-black;
									font-size: 36px;
								}
								.text-subtitle {
									margin-top: 16px;
									font-size: 24px;
								}
								.action-signup {
									margin-top: 29px;
								}
							}
						}
					}
				}
			}
			.swiper-container-horizontal > .swiper-pagination-bullets {
				bottom: 6px;
			}
			.swiper-pagination-white .swiper-pagination-bullet-active {
				background: $gray;
			}
			.swiper-pagination-white .swiper-pagination-bullet {
				background: $gray;
			}
		}
	}
	.top-content {
		position: absolute;
		top: 0;
		z-index: 2;
		width: 100%;
		color: white;
		.container-fluid {
			display: flex;
			flex-direction: row;
			.navbar-collapse {
				flex-grow: 1;
				@media (max-width: $grid-float-breakpoint-max) {
					top: $navbar-height-sm;
					height: calc(100vh - #{$navbar-height-sm});
				}
				> .navbar-nav {
					float: none;
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					min-width: 298px;
					@media (max-width: $grid-float-breakpoint-max) {
						flex-grow: 1;
						flex-direction: column;
					}
					> li {
						&.user-address-link-container {
							display: flex;
							align-items: center;
							justify-content: center;
							> user-address-link {
								flex-grow: 1;
								justify-content: flex-end;
								@media (max-width: $screen-md-max) {
									max-width: 254px;
									width: 100%;
								}
								a {
									float: none;
								}
							}
						}
					}
				}
			}
		}
		.open > a {
			&, &:hover, &:focus {
				background-color: transparent;
				border-color: white;
			}
		}
	}
}
.main-map-wrapper {
	position: relative;
	$main-map-height: 600px;
	// NOTE: Banners are disabled for now
	// @media (max-width: $screen-xs-max) {
	//   margin-top: $banner-height;
	// }
	.main-map {
		opacity: 0.5;
		width: 100%;
		height: $main-map-height;
		@media (max-width: $screen-md-max) {
			height: 600px;
		}
	}
	.main-content {
		position: absolute; // top: 112px;
		top: 48px;
		left: 0;
		right: 0;
		width: 100%;
		padding: 0 24px 38px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.download-app-section {
			margin-top: 48px;
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
		}
	}
}
</style>
