<script lang="ts">
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { platform_settings$_b } from '@menus/http'
import { is_navigating_onclick_b, navigating_goto_b } from '@menus/page'
import {
	About_Text$_b, Enable_About_Text$_b, isPlatform$_b, PrivacyPolicy$_b, RefundPolicy$_b, SocialLink_Facebook$_b,
	SocialLink_Instagram$_b, SocialLink_Twitter$_b, SocialLink_Youtube$_b
} from '@menus/platform-settings'
import { query_str_ } from '@ctx-core/uri'
import { getContext_ui_ctx } from '@menus/ui'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
export let topBorder = false
const ctx = getContext_ui_ctx() as shared_ui_Ctx
const SocialLink_Facebook$ = SocialLink_Facebook$_b(ctx)
const SocialLink_Twitter$ = SocialLink_Twitter$_b(ctx)
const SocialLink_Instagram$ = SocialLink_Instagram$_b(ctx)
const SocialLink_Youtube$ = SocialLink_Youtube$_b(ctx)
const About_Text$ = About_Text$_b(ctx)
const Enable_About_Text$ = Enable_About_Text$_b(ctx)
const consumer_login_user$ = consumer_login_user$_b(ctx)
const isLoggedOut$ = consumer_login_user$.isLoggedOut$
const platform_settings$ = platform_settings$_b(ctx)
const PrivacyPolicy$ = PrivacyPolicy$_b(ctx)
const RefundPolicy$ = RefundPolicy$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const isPlatform$ = isPlatform$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)

const navigate = async (url: string) => {
	await navigating_goto([
		url,
		query_str_({ returnUrl: `${window.location.pathname}${window.location.search}` })
	])
}

</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="SiteFooter site-footer-section"
		 class:top-border={topBorder}
>
  <div class="social-icons col-sm-12 section-1">
    {#if $SocialLink_Facebook$}
      <a href={$SocialLink_Facebook$} target="_blank"
				 class="fa fa-facebook"
			><div></div></a>
    {/if}
		{#if $SocialLink_Twitter$}
      <a href={$SocialLink_Twitter$} target="_blank"
				 class="fa fa-twitter"
			><div></div></a>
    {/if}
		{#if $SocialLink_Instagram$}
      <a href={$SocialLink_Instagram$} target="_blank"
				 class="fa fa-instagram"
			><div></div></a>
    {/if}
		{#if $SocialLink_Youtube$}
      <a href={$SocialLink_Youtube$} target="_blank"
				 class="fa fa-youtube"
			><div></div></a>
    {/if}
  </div>
  <div class="row top-row">
    {#if $platform_settings$?.Footer_Description}
      <div class="row-header">
        {$platform_settings$.Footer_Description}
      </div>
    {/if}
		<div class="column col-xs-6 col-sm-4 section-3">
      <div class="section-links">
        {#if $Enable_About_Text$ && $About_Text$}
          <div class="section-link"><a
						href="/about-us"
						target="_blank"
						on:click={evt => is_navigating_onclick(evt)}
					>About us</a></div>
        {/if}
				{#if $PrivacyPolicy$}
          <div class="section-link"><a
						href="/privacy-policy"
						target="_blank"
						on:click={evt => is_navigating_onclick(evt)}
					>Privacy Policy</a></div>
        {/if}
				{#if $RefundPolicy$}
          <div class="section-link"><a
						href="/terms-of-service#RefundPolicy"
						target="_blank"
						on:click={evt => is_navigating_onclick(evt)}
					>Refund Policy</a></div>
        {/if}
				<div class="section-link"><a
					href="/terms-of-service"
					target="_blank"
					on:click={evt => is_navigating_onclick(evt)}
				>Terms of Service</a></div>
        <div class="section-link"><a
					href="/privacy-policy#DoNotSellMyPersonalInformation"
					target="_blank"
					on:click={evt => is_navigating_onclick(evt)}
				>Do not sell my personal information</a></div>
      </div>
    </div>
    <div class="column col-xs-6 col-sm-4 section-4">
      <div class="section-links">
        {#if $isLoggedOut$}
          <div class="section-link"><a
			on:click|preventDefault={evt => navigate('/login')} href="/login"
						on:click={evt => is_navigating_onclick(evt)}
					>Login</a></div>
          <div class="section-link"><a
			on:click|preventDefault={evt => navigate('/signup')}
						href="/signup"
						on:click={evt => is_navigating_onclick(evt)}
					>Signup</a></div>
        {/if}

		{#if !$isPlatform$}
          <div class="section-link"><a
						href="/backoffice"
						on:click={evt => is_navigating_onclick(evt)}
					>Backoffice</a></div>
        {/if}
      </div>
    </div>
  </div>
  <div class="row">
    <div class="powered-by">
      Powered by
      <a href="https://menu.com" target="_blank"
			><img class="logo" src="/assets/favicon.png" alt="menu.com"/>menu.com</a>
    </div>
  </div>
</div>

<style type="text/scss" global>
  @import "@menus/css/lib";
	.SiteFooter {
		position: relative;
		padding: 0 24px 0 72px;
		@media (max-width: $screen-sm-max) {
			padding-left: 24px;
		}
		@media (max-width: $screen-xs-max) {
			padding-top: 45px;
		}
		&.top-border {
			border-top: 10px solid $gray;
		}
		.social-icons {
			position: absolute;
			top: 20px;
			left: 24px;
			display: block;
			@media (max-width: $screen-sm-max) {
				width: 100%;
				display: flex;
				flex-direction: row;
				left: 0;
			}
			@media (max-width: $screen-xs-max) {
				text-align: center;
				margin-bottom: 32px;
			}
			a.fa {
				float: left;
				@media (max-width: $screen-sm-max) {
					float: none;
					flex-grow: 1;
				}
			}
		}
		.row {
			padding: 0 0 24px;
			&.top-row {
				padding-top: 80px;
			}
			.row-header {
				padding: 20px 15px;
			}
			.column {
				.section-links {
					margin-top: 13px;
					.section-link {
						margin-bottom: 8px;
					}
				}
			}
			.powered-by {
				padding: 0 15px;
				.logo {
					height: 24px;
					width: 24px;
					margin: 0 8px;
				}
			}
		}
	}
</style>
