<script lang="ts">
import { query_str_ } from '@ctx-core/uri'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { is_mobile_menu_open$_b, Navbar } from '@menus/layout-ui'
import { PlatformIcon } from '@menus/platform-ui'
import { RequestDemoWithBackToTop, ro_scrollTop$_b } from '@menus/ro-layout-ui'
import { already_a_client_support_text_a, SupportContactDialog } from '@menus/ro-support-ui'
import { globalSettings$_b, globalSettings_Subscription$_b } from '@menus/ro-user'
import { SiteFooter } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { navigating_goto_b } from '@menus/page'
import type { ro_pricing_Ctx } from '../ro_pricing_Ctx.js'
const ctx = getContext_ui_ctx() as ro_pricing_Ctx
const globalSettings$ = globalSettings$_b(ctx)
const globalSettings_Subscription$ = globalSettings_Subscription$_b(ctx)
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
const ro_scrollTop$ = ro_scrollTop$_b(ctx)
let request_demo_container:HTMLDivElement
let scrolled_past_hero = false
$: scrolled_past_hero = $ro_scrollTop$ >= 200

const navigate = async (url: string) => {
	await navigating_goto([
		url,
		query_str_({ returnUrl: `${window.location.pathname}${window.location.search}` })
	])

	is_mobile_menu_open$.set(false)
}

</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="landing-page Pricing"
		 class:is_mobile_menu_open={$is_mobile_menu_open$}
>
  <Navbar
    class="ro-navbar"
		bg_transparent={!scrolled_past_hero}
		bg_white={scrolled_past_hero}
    bg_white_opacity={0.4}
		color_white={!scrolled_past_hero}
	>
    <div class="navbar-brand" slot="header">
      <PlatformIcon white={!$is_mobile_menu_open$ && !scrolled_past_hero}></PlatformIcon>
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
	  <li class="has-fa-icon signup-link">
        <a on:click|preventDefault={evt => navigate('/backoffice/signup')} href="/backoffice/signup"><span class="icon fa fa-user-plus"></span>Signup</a>
      </li>
      <li class="has-fa-icon ro-login-link">
        <a href="/backoffice/login"><span class="icon fa fa-user"></span>Login</a>
      </li>
      <li class="has-fa-icon backoffice-link">
        <a href="/backoffice"><span class="icon fa fa-home"></span>Backoffice</a>
      </li>
    </ul>
  </Navbar>
  <div class="section-pricing-wrapper clearfix">
    <div class="section-title">Pricing</div>
    <div class="section-pricing">
      <div class="plan-header">
        <div class="plan-header-item">&nbsp;</div>
				{#each $globalSettings_Subscription$ || [] as Subscription_item}
          <div class="plan-header-item">
            <div class="plan-name">{ Subscription_item.Name }</div>
            <div class="plan-description">{ Subscription_item.Description }</div>
            <div class="item-popular"
								 class:is-popular={Subscription_item.BestValue}
						>{ Subscription_item.BestValue ? 'Best Value' : '&nbsp;' }</div>
          </div>
        {/each}
      </div>
      <div class="plan-features">
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Mobile friendly transactional website</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    Having a mobile friendly site is crucial to having a higher search ranking
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
            <div class="feature-value"><i class="fa"
																					class:fa-check={Subscription_item.MobileFriendlyWebsite}
																					class:icon-feature-enabled={Subscription_item.MobileFriendlyWebsite}
																					class:fa-close={!Subscription_item.MobileFriendlyWebsite}
																					class:icon-feature-disabled={!Subscription_item.MobileFriendlyWebsite}
																					aria-hidden="true"
						></i></div>
          </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Your menu.com Subdomain</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    You will get a complementary Subdomain under yourname.menu.com
                    that you can receive orders from.
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.YourOwnSubdomain||true}
																						class:icon-feature-enabled={Subscription_item.YourOwnSubdomain||true}
																						class:fa-close={!Subscription_item.YourOwnSubdomain}
																						class:icon-feature-disabled={!Subscription_item.YourOwnSubdomain}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Your own domain</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    By Default you will get a complementary Subdomain under yourname.menu.com
                    that you can receive orders from.<br>
                    Under pro version you are able to receive orders under any domain of your choosing.
                    All domains come with Secure certificate.
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.YourOwnDomain}
																						class:icon-feature-enabled={Subscription_item.YourOwnDomain}
																						class:fa-close={!Subscription_item.YourOwnDomain}
																						class:icon-feature-disabled={!Subscription_item.YourOwnDomain}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Mobile App</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    Get your own Brand of mobile App for fraction of what it will cost you to build
                    it from scratch all integrated with automatic payment settlement in your bank
                    account.
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value">
                {#if Subscription_item.MobileApp}
                  <span>iOS & Android</span>
                {:else}
                  <i class="fa fa-close icon-feature-disabled"
										 aria-hidden="true"></i>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Menusense</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    Stay ahead of your competitors with having access to first dish analysis engine
                    that recommends menu add on and optimal pricing for dishes you serve compare to
                    restaurants around you
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.MenuSense}
																						class:icon-feature-enabled={Subscription_item.MenuSense}
																						class:fa-close={!Subscription_item.MenuSense}
																						class:icon-feature-disabled={!Subscription_item.MenuSense}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Digital coupon</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    Create custimzed coupon with complete flexibility and tracking based on your
                    customer order history, total meal price, or specific item, time and service
                    type to drive more traffic to your concept
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.DigitalCoupon}
																						class:icon-feature-enabled={Subscription_item.DigitalCoupon}
																						class:fa-close={!Subscription_item.DigitalCoupon}
																						class:icon-feature-disabled={!Subscription_item.DigitalCoupon}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Automatic payment settlement</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    Secure and Direct money settlement into your account
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.AutoPaymentSettlement}
																						class:icon-feature-enabled={Subscription_item.AutoPaymentSettlement}
																						class:fa-close={!Subscription_item.AutoPaymentSettlement}
																						class:icon-feature-disabled={!Subscription_item.AutoPaymentSettlement}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Third party and your own delivery integration</div>
              <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                <div class="tooltip right">
                  <div class="tooltip-inner">
                    You are given complete flexibility as to which delivery company you would like
                    to work with and as long as they have an API we will do all the work for you to
                    make
                  </div>
                </div>
              </i>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value"><i class="fa"
																						class:fa-check={Subscription_item.DeliveryIntegration}
																						class:icon-feature-enabled={Subscription_item.DeliveryIntegration}
																						class:fa-close={!Subscription_item.DeliveryIntegration}
																						class:icon-feature-disabled={!Subscription_item.DeliveryIntegration}
																						aria-hidden="true"></i></div>
            </div>
          {/each}
        </div>
				{#if false}
          <div class="plan-feature">
            <div class="plan-feature-item">
              <div class="feature-name">
                <div class="feature-name-text">2 hours professional food photographer</div>
                <i class="fa fa-question-circle icon-feature-tooltip" aria-hidden="true">
                  <div class="tooltip right">
                    <div class="tooltip-inner">
                      Pictures describe a thousand words, give your menu the zest it deserves with our
                      professional photography services
                    </div>
                  </div>
                </i>
              </div>
            </div>
						{#each $globalSettings_Subscription$ || [] as Subscription_item}
              <div class="plan-feature-item">
                <div class="feature-value"><i class="fa"
																							class:fa-check={Subscription_item.FoodPhotographer}
																							class:icon-feature-enabled={Subscription_item.FoodPhotographer}
																							class:fa-close={!Subscription_item.FoodPhotographer}
																							class:icon-feature-disabled={!Subscription_item.FoodPhotographer}
																							aria-hidden="true"></i></div>
              </div>
            {/each}
          </div>
        {/if}
				<div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name">
              <div class="feature-name-text">Service fees</div>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="feature-value">
                {#if Subscription_item.ServiceFeePercent}
                  <span>{ Subscription_item.ServiceFeePercent }%</span>
                {/if}
								{#if Subscription_item.ServiceFeePercent && Subscription_item.ServiceFeeFlat}
                  <span> + </span>
                {/if}
								{#if Subscription_item.ServiceFeeFlat}
                  <span>${ Subscription_item.ServiceFeeFlat }</span>
                {/if}
								{#if Subscription_item.ServiceFeePercent || Subscription_item.ServiceFeeFlat}
                  <span>per order</span>
                {/if}
								{#if Subscription_item.ServiceFeePercent && Subscription_item.ServiceFeeFlat}
                  <div>(Transaction fee included)</div>
                {/if}
								{#if !Subscription_item.ServiceFeePercent && !Subscription_item.ServiceFeeFlat}
                  <span>$0</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="plan-feature">
          <div class="plan-feature-item">
            <div class="feature-name item-feature-subscription-fees" style="border-bottom: none">
              <div class="feature-name-text">Subscription fees</div>
            </div>
          </div>
					{#each $globalSettings_Subscription$ || [] as Subscription_item}
            <div class="plan-feature-item">
              <div class="plan-price">
                <div class="price-currency">$</div>
                <div class="price-value">{(Subscription_item.MonthlyValue || 0)}</div>
                <div class="price-duration">/month</div>
              </div>
							{#if Subscription_item.SetupFee}
                <div>
                  <div>+ ${ Subscription_item.SetupFee } Setup fees</div>
                  <div>(per location)</div>
                </div>
              {/if}
							{#if Subscription_item.YearlyDiscountPercent}
                <div class="plan-save-price">
                  Pay yearly and save { Subscription_item.YearlyDiscountPercent }%
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="plan-footer">
        <div class="plan-footer-item">&nbsp;</div>
				{#each $globalSettings_Subscription$ || [] as Subscription_item}
          <div class="plan-footer-item">
            <div class="plan-call-action">
              <a href="/backoffice/signup{query_str_({ plan: Subscription_item.ID })}"
								 class="btn btn-primary"
								 class:btn-xlg={$innerWidth_gt_SCREEN_SM_MIN$}
								 class:btn-xs={$innerWidth_lte_SCREEN_SM_MIN$}
							>{Subscription_item.MonthlyValue ? '' : 'Free '}Sign Up</a>
							{#if Subscription_item.SetupFee || Subscription_item.YearlyDiscountPercent}
                <div class="free-trial">One month free Trial</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="section-card-process">
    <div class="section-details">
      <ul>
        <li>Credit Card rates based on Braintree 2.9% + 0.30 per transaction.</li>
        <li>Prices are subject to change.</li>
        <li>Do you have more than 10 locations? Contact us for bulk pricing.</li>
      </ul>
    </div>
  </div>
  <div class="section-online-ordering">
    <div class="section-title">
      Integrated online ordering and analytical platform
    </div>
    <div class="section-details">
      <div class="feature-list clearfix">
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/power-up.svg" alt=""></div>
          <div class="feature-title">Power up</div>
          <div class="feature-text">with our online, app and phone ordering integration</div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/get-listed.svg" alt=""></div>
          <div class="feature-title">Get listed on the menu.com</div>
          <div class="feature-text">market place and receive orders at lower cost</div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/modernize.svg" alt=""></div>
          <div class="feature-title">Modernize your concept</div>
          <div class="feature-text">with your own branded mobile app and website that is already integrated
            with popular payment platform
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/gain-market.svg" alt=""></div>
          <div class="feature-title">Gain market intelligence</div>
          <div class="feature-text">and optimize your menu pricing and offering by utilizing menusense&trade;
            reporting
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/promote.svg" alt=""></div>
          <div class="feature-title">Manage and promote your restaurant</div>
          <div class="feature-text">to existing and potential customers via integrated Mpoints&trade; Coupons
            system and analyze results for further insights
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/feedback.svg" alt=""></div>
          <div class="feature-title">Get direct feedback</div>
          <div class="feature-text">from customers and turn a complains into an opportunity</div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/manage.svg" alt=""></div>
          <div class="feature-title">Manage your online transaction</div>
          <div class="feature-text">and reporting from palm of your hand and chat directly with customers
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/streamline.svg" alt=""></div>
          <div class="feature-title">Streamline your phone orders</div>
          <div class="feature-text"
					>to a trained DigitalWaiter&trade; to save cost and increase average check</div>
        </div>
        <div class="feature-item">
          <div class="feature-image"><img src="/assets/img/ro/optimize.svg" alt=""></div>
          <div class="feature-title">Optimize your menu</div>
          <div class="feature-text">wording and listing for Search Optimization to gain new clients</div>
        </div>
        <div class="feature-item item-center">
          <div class="feature-image"><img src="/assets/img/ro/support-2.svg" alt=""></div>
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
@use "sass:math";
@import "@menus/ro-shared-css/lib";
@import "@menus/css/clearfix";
.Pricing {
	&.is_mobile_menu_open {
		max-height: 100vh;
		overflow: hidden;
	}
	.section-pricing-wrapper {
		padding-top: $navbar-height;
		background-image: vurl('/assets/img/ro/bg-price.jpg');
		background-size: cover;
		.section-title {
			text-align: center;
			font-weight: $lato-black;
			font-size: 32px;
			color: white;
		}
		.section-pricing {
			padding: 50px 0;
			background-color: white;
			text-align: center;
			width: 80%;
			max-width: $screen-md;
			margin: 80px auto 113px;
			border-radius: 3px;
			@media (max-width: $screen-sm-max) {
				max-width: none;
				width: 100%;
				border-radius: 0;
			}
			.plan-header {
				@extend .clearfix;
				.plan-header-item {
					float: left;
					width: math.div(100%, 3);
					.plan-name {
						font-weight: $lato-bold;
						font-size: 24px;
					}
					.plan-description {
						margin-top: 8px;
					}
				}
			}
			.plan-features {
				margin-top: 36px;
				.plan-feature {
					border-top: 1px solid #F7F7F7;
					@extend .clearfix;
					.plan-feature-item {
						float: left;
						width: math.div(100%, 3);
						.feature-name,
						.feature-value {
							padding: 8px 16px;
							.icon-feature-enabled {
								color: $brand-success;
							}
							.icon-feature-disabled {
								color: $brand-danger;
							}
						}
						.feature-name {
							@extend .clearfix;
							&.item-feature-subscription-fees {
								padding: 19px 0;
							}
							.feature-name-text {
								float: left;
								width: 85%;
							}
							.icon-feature-tooltip {
								margin-top: 3px;
								overflow: hidden;
								.tooltip {
									display: none;
									margin-left: 20px;
									margin-top: -19px;
									opacity: 1;
								}
								&:hover {
									.tooltip {
										display: block;
									}
								}
							}
						}
					}
				}
			}
			.plan-footer {
				@extend .clearfix;
				.plan-footer-item {
					float: left;
					width: math.div(100%, 3);
				}
			}
			.item-popular {
				visibility: hidden;
				font-weight: $lato-bold;
				color: white;
				background-color: $gray;
				border: 1px solid $gray;
				border-radius: 100px;
				width: 105px;
				margin: 8px auto 0;
				line-height: 20px;
				@media (max-width: $screen-sm-max) {
					width: auto;
				}
				&.is-popular {
					visibility: visible;
				}
			}
			.plan-price {
				display: inline-block;
				position: relative;
				padding-left: 10px;
				.price-currency {
					display: inline-block;
					position: absolute;
					top: 10px;
					left: 0;
				}
				.price-value {
					display: inline-block;
					font-weight: $lato-black;
					font-size: 40px;
				}
				.price-duration {
					display: inline-block;
				}
			}
			.plan-save-price {
				margin-top: 24px;
			}
			.plan-call-action {
				margin-top: 48px;
				.free-trial {
					padding: 8px 0;
					font-weight: bold;
				}
			}
		}
	}
	.section-card-process {
		text-align: center;
		background-color: #F7F7F7;
		padding: 48px 135px;
		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
		}
		.section-details {
			text-align: left;
		}
	}
  .SupportContactDialog {
    width: 100%;
    max-width: none;
  }
}
</style>
