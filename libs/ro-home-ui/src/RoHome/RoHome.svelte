<script lang="ts">
import { onMount } from 'svelte'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { MacbookDevice } from '@menus/device-ui'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { is_mobile_menu_open$_b, Navbar } from '@menus/layout-ui'
import { PlatformIcon } from '@menus/platform-ui'
import { QRCodeViewer } from '@menus/qrcode-ui'
import { query_str_ } from '@ctx-core/uri'
import { RequestDemoWithBackToTop, ro_scrollTop$_b } from '@menus/ro-layout-ui'
import { SiteFooter } from '@menus/shared-ui'
import { already_a_client_support_text_a, SupportContactDialog } from '@menus/ro-support-ui'
import { has_dom } from '@ctx-core/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { images_host_ } from '@menus/web-config'
import { navigating_goto_b } from '@menus/page'
import type { ro_home_ui_Ctx } from '../ro_home_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_home_ui_Ctx
const { webConfig } = ctx
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
const ro_scrollTop$ = ro_scrollTop$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
let request_demo_container:HTMLDivElement
let scrolled_past_hero = false
$: scrolled_past_hero = $ro_scrollTop$ >= 600
const Play_store_link = 'https://play.google.com/store/apps/details?id=com.menu.backoffice'
const App_store_link = 'https://apps.apple.com/ca/app/menu-backoffice/id1581835988'

// tell swiper to use navigation and pagination modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

let Swiper;
let SwiperSlide;

onMount(async () => {
  // dynamically import swiper module
  const SwiperSvelteModule = await import('swiper/svelte');
  Swiper = SwiperSvelteModule.Swiper;
  SwiperSlide = SwiperSvelteModule.SwiperSlide;
});

const navigate = async (url: string) => {
	await navigating_goto([
		url,
		query_str_({ returnUrl: `${window.location.pathname}${window.location.search}` })
	])

	is_mobile_menu_open$.set(false)
}

</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="RoHome landing-page"
		 class:is_mobile_menu_open={$is_mobile_menu_open$}
>
  <Navbar class="ro-navbar" bg_transparent={!scrolled_past_hero} bg_white={scrolled_past_hero} bg_white_opacity={0.4}>
    <div class="navbar-brand" slot="header">
      <PlatformIcon></PlatformIcon>
    </div>
    <ul class="nav navbar-nav navbar-right" slot="collapse" on:click|stopPropagation>
		<!-- <li class="has-fa-icon support-link">
			<a href="/backoffice/signup" on:click={evt => is_mobile_menu_open$.set(false)}><span class="icon fa fa-phone"></span>Support</a>
		</li> -->
      <li class="has-fa-icon request-demo-link">
        <a href="."
					 on:click|preventDefault={evt => is_mobile_menu_open$.set(false)}
					 on:click|preventDefault={evt => request_demo_container.scrollIntoView({ behavior: 'smooth' })}
				><span class="icon fa fa-desktop"></span>Request a Demo</a>
      </li>
	  <li class="has-fa-icon pricing-link">
        <a href="/backoffice/pricing" on:click={evt => is_mobile_menu_open$.set(false)}><span class="icon fa fa-dollar"></span>Pricing</a>
      </li>
	  <li class="has-fa-icon signup-link">
        <a on:click|preventDefault={evt => navigate('/backoffice/signup')} href="/backoffice/signup"><span class="icon fa fa-user-plus"></span>Signup</a>
      </li>
      <li class="has-fa-icon ro-login-link">
        <a href="/backoffice/login"><span class="icon fa fa-user"></span>Login</a>
      </li>
    </ul>
  </Navbar>
  <div class="main-slides">
    <svelte:component
			this={Swiper} slidesPerView={1}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}}
			pagination={{
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			}}
			loop={true}
			autoplay={{ delay: 5000 }}
		>
		<svelte:component this={SwiperSlide}>
			<div class="RoHome_main_slide digital-menu-slide">
				<div class="main-text">
					<div class="tag-heading">Bringing Your Menu Forward for the New Digital Age.</div>
				</div>
				<div class="image-overlay"></div>
			</div>
      	</svelte:component>
		<svelte:component this={SwiperSlide}>
			<div class="RoHome_main_slide analytics-slide">
					<div class="main-text">
					<div class="tag-heading">Simplified Analytics for Valuable Insights.</div>
				</div>
				<div class="image-overlay"></div>
			</div>
		</svelte:component>
		<svelte:component this={SwiperSlide}>
			<div class="RoHome_main_slide restaurant-operations-slide">
				<div class="main-text">
					<div class="tag-heading">The Full Kitchen at the palm of your hand. Gain Full Control of all your Restaurant Operations.</div>
				</div>
				<div class="image-overlay"></div>
			</div>
		</svelte:component>
		<svelte:component this={SwiperSlide}>
			<div class="RoHome_main_slide integration-slide">
				<div class="main-text">
					<div class="tag-heading">Flexible Platform with Advanced Integration.</div>
				</div>
				<div class="image-overlay"></div>
			</div>
		</svelte:component>
      
		<svelte:fragment slot="container-end">
			<div class="swiper-pagination"></div>

			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</svelte:fragment>
    </svelte:component>
  </div>
  <div class="section-cta">
    <a href="/backoffice/pricing"
			 class="btn btn-primary btn-xlg"
			 class:btn-xlg={$innerWidth_gt_SCREEN_SM_MIN$}
			 class:btn-sm={$innerWidth_lte_SCREEN_SM_MIN$}
		>Sign Up</a>
  </div>
  <div class="section-icons">
    <div class="icon-container">
      <div class="icon menu-icon"></div>
      <div class="icon phone-icon"></div>
      <div class="icon tablet-icon"></div>
    </div>
  </div>
	<div class="section-download-app">
		<div class="section-details">
			<div class="section-title">
				Download our app
			</div>
			<div class="section-subtitle">
				Allows restaurant owners to manage their restaurant, menu and orders placed by customers.
			</div>
		</div>

		<div class="section-download-links">
			<div class="play-store-section">
				<div class="play-store-qr-code">
					{#if has_dom}
						<QRCodeViewer text={Play_store_link}></QRCodeViewer>
					{/if}
				</div>

				<a class="playstore-link" target="_blank" href={Play_store_link}>
					<img src="/assets/img/cr/play-store-badge.svg" alt="google play badge">
				</a>
			</div>

			<div class="app-store-section">
				<div class="app-store-qr-code">
					{#if has_dom}
						<QRCodeViewer text={App_store_link}></QRCodeViewer>
					{/if}
				</div>

				<a class="appstore-link" target="_blank" href={App_store_link}>
					<img src="/assets/img/cr/app-store-badge.svg" alt="app store badge">
				</a>
			</div>
		</div>
	</div>
  <div class="section-take-control clearfix">
    <div class="section-video">
      <div class="embed-responsive embed-responsive-16by9">
        <video controls poster="{images_host_(webConfig)}/static_video/menucom-promo-poster.b81c170.png">
          <source src="{images_host_(webConfig)}/static_video/menucom-promo.1031aa0.mp4" type="video/mp4">
        </video>
      </div>
    </div>
    <div class="section-details">
      <div class="section-title">
        Seamless online ordering system built for you and your customers.
      </div>
      <div class="section-subtitle">
        Allows your customers to place orders directly from your website and mobile app with social login and
        easy checkout.
      </div>
    </div>
  </div>
  <div class="section-did-you-know clearfix">
    <div class="section-details">
      <div class="section-details-wrapper">
        <div class="section-title">
          Do you use Menusense™
        </div>
        <div class="section-subtitle">
          Restaurants who use Menusense™ know more about their competitors.
        </div>
      </div>
    </div>
  </div>
  <div class="section-menusense clearfix">
    <svelte:component
			this={Swiper} slidesPerView={1}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}}
			pagination={{
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			}}
			loop={true}
            autoplay={{ delay: 5000 }}
		>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-1.jpg" alt="Menu.com MenuSense 1"/>
          </MacbookDevice>
        </div>
      </svelte:component>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-2.jpg" alt="Menu.com MenuSense 2"/>
          </MacbookDevice>
        </div>
      </svelte:component>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-3.jpg" alt="Menu.com MenuSense 3"/>
          </MacbookDevice>
        </div>
      </svelte:component>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-4.jpg" alt="Menu.com MenuSense 4"/>
          </MacbookDevice>
        </div>
      </svelte:component>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-5.jpg" alt="Menu.com MenuSense 5"/>
          </MacbookDevice>
        </div>
      </svelte:component>
      <svelte:component this={SwiperSlide}>
        <div class="slide-device-wrapper">
          <MacbookDevice>
            <img src="/assets/img/ro/macbook-6.jpg" alt="Menu.com MenuSense 6"/>
          </MacbookDevice>
        </div>
      </svelte:component>

	  	<svelte:fragment slot="container-end">
			<div class="swiper-pagination"></div>

			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</svelte:fragment>
    </svelte:component>
  </div>
  <div class="section-reach-customers clearfix">
    <div class="section-details">
      <div class="section-details-wrapper">
        <div class="section-title">
          Reach new customers and lower your commission rates.
        </div>
        <div class="section-subtitle">
          Menu.com is your menu window to the world, so hungry customers craving your dishes can find you
          with a click.
        </div>
      </div>
    </div>
    <div class="section-image">
      <img src="/assets/img/ro/macbook-iphone.svg" alt="">
    </div>
  </div>
  <div class="section-online-ordering">
    <div class="section-title">
      Integrated online ordering and analytical platform
    </div>
    <div class="section-details">
      <div class="feature-list clearfix">
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/power-up.svg" alt="">
          </div>
          <div class="feature-title">Power up</div>
          <div class="feature-text">with our online, app and phone ordering integration</div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/get-listed.svg" alt="">
          </div>
          <div class="feature-title">Get listed on the menu.com</div>
          <div class="feature-text">market place and receive orders at lower cost</div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/modernize.svg" alt="">
          </div>
          <div class="feature-title">Modernize your concept</div>
          <div class="feature-text">with your own branded mobile app and website that is already integrated
            with popular payment platform
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/gain-market.svg" alt="">
          </div>
          <div class="feature-title">Gain market intelligence</div>
          <div class="feature-text">and optimize your menu pricing and offering by utilizing menusense&trade;
            reporting
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/promote.svg" alt="">
          </div>
          <div class="feature-title">Manage and promote your restaurant</div>
          <div class="feature-text">to existing and potential customers via integrated Zpoints&trade; Coupons
            system and analyze results
            for further insights
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/feedback.svg" alt="">
          </div>
          <div class="feature-title">Get direct feedback</div>
          <div class="feature-text">from customers and turn a complains into an opportunity</div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/manage.svg" alt="">
          </div>
          <div class="feature-title">Manage your online transaction</div>
          <div class="feature-text">and reporting from palm of your hand and chat directly with customers</div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/streamline.svg" alt="">
          </div>
          <div class="feature-title">Streamline your phone orders</div>
          <div class="feature-text">to a trained DigitalWaiters&trade; to save cost and increase average
            check
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img src="/assets/img/ro/optimize.svg" alt="">
          </div>
          <div class="feature-title">Optimize your menu</div>
          <div class="feature-text">wording and listing for Search Optimization to gain new clients</div>
        </div>
        <div class="feature-item item-center">
          <div class="feature-image">
            <img src="/assets/img/ro/support-2.svg" alt="">
          </div>
          <div class="feature-title">24/7 Customer support</div>
          <div class="feature-text">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
  <div bind:this={request_demo_container} id="request-demo">
    <RequestDemoWithBackToTop></RequestDemoWithBackToTop>
  </div>
  <SupportContactDialog text_a={already_a_client_support_text_a}></SupportContactDialog>
  <SiteFooter></SiteFooter>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
@import 'swiper/swiper.scss';
@import 'swiper/components/navigation/navigation.scss';
@import 'swiper/components/pagination/pagination.scss';
.RoHome {
	$top-content-height: 600px;
	&.is_mobile_menu_open {
		max-height: 100vh;
		overflow: hidden;
	}
	.Navbar {
		ul {
			li {
				.profile-icon {
					position: absolute;
					top: 3px;
					left: -12px;
					height: 1em;
					width: 2em;
					@media (max-width: $grid-float-breakpoint-max) {
						display: none;
					}
				}
			}
		}
	}
	.main-slides {
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: auto;
		z-index: 1;
		.image-overlay {
			width: 100%;
			background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;
			height: $top-content-height;
			opacity: 0.6;
			@media (max-width: $screen-sm-max) {
				height: 300px;
			}
		}
		.digital-menu-slide {
			.image-overlay {
				background-image: vurl('/assets/img/ro-home-slides/1-digital-menu-slide.jpg');
			}
		}
		.analytics-slide {
			.image-overlay {
				background-image: vurl('/assets/img/ro-home-slides/2-analytics-slide.jpg');
			}
		}
		.restaurant-operations-slide {
			.image-overlay {
				background-image: vurl('/assets/img/ro-home-slides/3-restaurant-operations-slide.jpg');
			}
		}
		.integration-slide {
			.image-overlay {
				background-image: vurl('/assets/img/ro-home-slides/4-integration-slide.jpg');
			}
		}
		.main-text {
			position: absolute;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: 1;
			margin-top: $navbar-height + 24px;
			text-align: center;
			@media (max-width: $grid-float-breakpoint-max) {
				margin-top: $navbar-height;
				padding-left: 8px;
				padding-right: 8px;
			}
			.tag-heading {
				font-weight: $lato-black;
				font-size: 40px;
				@media (max-width: $screen-xs-max) {
					font-size: 20px;
				}
			}
		}
		video {
			width: 100%;
			max-width: 100%;
			background: vurl('/assets/img/cr/poster.png') no-repeat;
			background-size: cover;
			transition: opacity 1s;
		}
	}
	.section-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 24px;
	}
	.section-icons {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 24px;
		.icon-container {
			display: flex;
			justify-content: space-between;
			width: 100%;
			max-width: 1600px;
			align-items: center;
			@media (max-width: $screen-xs-max) {
				flex-direction: column;
			}
			.icon {
				float: left;
				width: 300px;
				height: 210px;
				margin: 0;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				cursor: auto;

				@media (min-width: $screen-lg-min) {
					width: 400px;
					height: 285px;
				}
				
				&.menu-icon {
					background-image: vurl('/assets/img/ro-home-icons/1-menu-icon.svg');
				}
				&.phone-icon {
					background-image: vurl('/assets/img/ro-home-icons/2-phone-icon.svg');
				}
				&.tablet-icon {
					background-image: vurl('/assets/img/ro-home-icons/3-tablet-icon.svg');
				}
			}
		}
	}
	.section-download-app {
		padding: 140px 135px 0;
		display: flex;

		@media (max-width: $screen-xs-max) {
			flex-direction: column;
		}

		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding: 61px 24px 59px;
		}
		.section-details {
			@media (min-width: $screen-sm-min) {
				width: 40%;
			}
			@media (max-width: $screen-xs-max) {
				text-align: center;
				margin-top: 39px;
			}
			.section-title {
				font-weight: $lato-black;
				font-size: 32px;
				color: #2A3134;
				@media (min-width: $screen-lg-min) {
					margin-top: 44px;
				}
			}
			.section-subtitle {
				margin-top: 15px;
				font-size: 18px;
			}
		}
		.section-download-links {
			display: flex;
			text-align: center;
			margin-left: auto;
			margin-right: auto;

			.play-store-section {
				@media (min-width: $screen-sm-min) {
					margin-right: 36px;
				}
			}

			.play-store-section, .app-store-section {
				.play-store-qr-code, .app-store-qr-code {
					img {
						width: 148px;
					}
				}

				.playstore-link, .appstore-link {
					img {
						width: 140px;
						height: 40px;
					}
				}
			}
		}
	}
	.section-take-control {
		padding: 140px 135px 160px;
		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding: 61px 24px 59px;
		}
		.section-details {
			@media (min-width: $screen-sm-min) {
				float: left;
				width: 40%;
			}
			@media (max-width: $screen-xs-max) {
				text-align: center;
				margin-top: 39px;
			}
			.section-title {
				font-weight: $lato-black;
				font-size: 32px;
				color: #2A3134;
				@media (min-width: $screen-lg-min) {
					margin-top: 44px;
				}
			}
			.section-subtitle {
				margin-top: 15px;
				font-size: 18px;
			}
			.section-call-action {
				margin-top: 40px;
				.btn {
					min-width: 200px;
				}
			}
		}
		.section-video {
			@media (min-width: $screen-sm-min) {
				float: right;
				width: 55%;
				margin-left: 5%;
			}
			// https://www.aleksandrhovhannisyan.com/blog/dev/css-aspect-ratio/
			.embed-responsive {
				position: relative;
				height: 0;
				padding-bottom: 56.25%; // 9 / 16 * 100
				overflow: hidden;
				@media (min-width: $screen-sm-min) {
					width: 100%;
				}
				video {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.section-did-you-know {
		padding: 0 135px 129px;
		@media (max-width: $screen-sm-max) {
			padding: 0 36px 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding: 87px 24px 85px;
			text-align: center;
		}
		.section-image {
			@media (min-width: $screen-sm-min) {
				float: left;
				width: 40%;
			}
			@media (max-width: $screen-xs-max) {
				margin-top: 36px;
			}
			img {
				max-width: 100%;
			}
		}
		.section-details {
			.section-details-wrapper {
				text-align: center;
				@media (max-width: $screen-xs-max) {
					margin: 0 auto;
				}
				.section-title {
					font-weight: $lato-black;
					font-size: 32px;
					color: #2A3134;
					@media (min-width: $screen-lg-min) {
						margin-top: 44px;
					}
				}
				.section-subtitle {
					margin-top: 15px;
					font-size: 18px;
				}
				.section-call-action {
					margin-top: 40px;
					.btn {
						min-width: 200px;
					}
				}
			}
		}
	}
	.section-menusense {
		padding: 0 36px 129px;
		@media (max-width: $screen-sm-max) {
			padding: 0 36px 36px;
		}
		text-align: center;
		overflow-x: hidden;
		.AppSwiper {
			width: 100%;
			.slide-device-wrapper {
				width: 100%;
			}
		}
	}
	.section-reach-customers {
		background: vurl('/assets/img/ro/bg-3.jpg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		padding: 100px 135px;
		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding-top: 48px;
			padding-left: 24px;
			padding-right: 24px;
		}
		.section-details {
			@media (min-width: $screen-sm-min) {
				padding-left: 48px;
				float: right;
				width: 60%;
			}
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
			.section-details-wrapper {
				max-width: 431px;
				@media (max-width: $screen-xs-max) {
					margin: 0 auto;
				}
				.section-title {
					font-weight: $lato-black;
					font-size: 32px;
					color: #2A3134;
					@media (min-width: $screen-sm-min) {
						// margin-top: 44px;
					}
				}
				.section-subtitle {
					margin-top: 15px;
					font-size: 18px;
				}
				.section-call-action {
					margin-top: 40px;
					.btn {
						min-width: 200px;
					}
				}
			}
		}
		.section-image {
			@media (min-width: $screen-sm-min) {
				float: left;
				width: 40%;
			}
			@media (max-width: $screen-xs-max) {
				margin-top: 36px;
				text-align: center;
			}
			img {
				max-width: 100%;
			}
		}
	}
	#request-demo {
		position: relative;
		.back-to-top {
			position: absolute;
			right: 135px;
			bottom: 79px;
			height: 36px;
			width: 36px;
			font-size: 36px;
			color: black;
			@media (max-width: $screen-xs-max) {
				right: 20px;
				bottom: 20px;
			}
		}
	}
  .SupportContactDialog {
    max-width: none;
  }
  .login-link {
    position: relative;
  }
}
</style>
