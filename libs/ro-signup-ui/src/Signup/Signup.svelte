<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { no_dom } from '@ctx-core/dom'
import { PlatformIcon } from '@menus/platform-ui'
import { ProgressBar } from '@menus/progress-bar-ui'
import { SupportContactDialog } from '@menus/ro-support-ui'
import { globalSettings_Subscription$_b } from '@menus/ro-user'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { WEB_APP_URL_ } from '@menus/web-config'
import { is_cordova_app } from '@menus/web-cordova'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
import { Signup_c } from './Signup_c.js'
import { Signup_email$_b } from './Signup_email$_b.js'
import { Signup_step$_b } from './Signup_step$_b.js'
import Signup_STEP_NEW_REST from './Signup_STEP_NEW_REST.svelte'
import Signup_STEP_ZIPCODE from './Signup_STEP_ZIPCODE.svelte'
import Signup_STEP_REST_LIST from './Signup_STEP_REST_LIST.svelte'
import Signup_STEP_EMAIL from './Signup_STEP_EMAIL.svelte'
import Signup_STEP_VERIFY_PHONE from './Signup_STEP_VERIFY_PHONE.svelte'
import Signup_STEP_VERIFY_CODE from './Signup_STEP_VERIFY_CODE.svelte'
import Signup_STEP_SET_PASSWORD from './Signup_STEP_SET_PASSWORD.svelte'
import Signup_STEP_SUCCESS from './Signup_STEP_SUCCESS.svelte'
import Signup_STEP_SENT_EMAIL from './Signup_STEP_SENT_EMAIL.svelte'
import Signup_STEP_VERIFY_EMAIL from './Signup_STEP_VERIFY_EMAIL.svelte'
import { Signup_token$_b } from './Signup_token$_b.js'
import {
	STEP_VERIFY_EMAIL, STEP_ZIPCODE, STEP_REST_LIST, STEP_SENT_EMAIL, STEP_ERROR_LINK, STEP_SUCCESS, STEP_NEW_REST,
	STEP_SET_PASSWORD, STEP_EMAIL, STEP_VERIFY_PHONE, STEP_VERIFY_CODE,
} from './STEP.js'
export let email:string, fireFlyID:string, plan:number, token:string
const ctx = getContext_ui_ctx() as ro_signup_ui_Ctx
const { webConfig } = ctx
const globalSettings_Subscription$ = globalSettings_Subscription$_b(ctx)
const Signup_email$ = Signup_email$_b(ctx)
const Signup_step$ = Signup_step$_b(ctx)
const Signup_token$ = Signup_token$_b(ctx)
export const _ = new Signup_c(ctx)
const { busy$, email$, Signup_fireFlyID$, globalSettings$, selected_plan$, step_verify_signup_index$, } = _
$: selected_plan$.$ = plan
$: Signup_fireFlyID$.$ = fireFlyID
$: Signup_email$.$ = email
$: Signup_token$.$ = token
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="Signup page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/backoffice">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Signup</span>
			</li>
		</ul>
	</div>

  <div hidden={no_dom}>
    <div class="reg-restaurant-section">
      <div class="reg-rest-title">Register Your Business</div>
      <div class="reg-rest-subtitle">Get started with Menu.com for free</div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-offset-3 col-lg-6">
          <div class="signup-section">
            {#if $Signup_step$ !== STEP_VERIFY_EMAIL}
              <ProgressBar
								labels={['Find', 'Register', 'Finish']}
								index={$step_verify_signup_index$}
							></ProgressBar>
            {/if}
						{#if $Signup_step$ !== STEP_SENT_EMAIL && $Signup_step$ !== STEP_SUCCESS && $Signup_step$ !== STEP_VERIFY_EMAIL}
              <div class="form-group">
                <label for="selected_plan">Please choose your
									{#if !is_cordova_app}Pricing {/if}Plan</label>
                <select class="form-control" name="selected_plan" id="selected_plan"
												bind:value={$selected_plan$}
								>
                  {#each $globalSettings_Subscription$ || [] as subscription}
                    <option value={subscription.ID.toString()}>{ subscription.Name }</option>
                  {/each}
                </select>
								{#if !is_cordova_app}
									<div class="help-block more-pricing-info">For more info <a
										href="/backoffice/pricing"
										on:click={evt => {
											if (is_cordova_app) {
												evt.preventDefault()
												window.open(`${WEB_APP_URL_(webConfig)}/backoffice/pricing`, '_system')
											}
										}}
										target="_blank"
									>see our pricing</a></div>
                {/if}
              </div>
            {/if}
						{#if $Signup_step$ === STEP_ZIPCODE}
              <Signup_STEP_ZIPCODE></Signup_STEP_ZIPCODE>
						{:else if $Signup_step$ === STEP_REST_LIST}
              <Signup_STEP_REST_LIST {_}></Signup_STEP_REST_LIST>
						{:else if $Signup_step$ === STEP_NEW_REST}
              <Signup_STEP_NEW_REST {_}></Signup_STEP_NEW_REST>
						{:else if $Signup_step$ === STEP_EMAIL}
              <Signup_STEP_EMAIL {_}></Signup_STEP_EMAIL>
						{:else if $Signup_step$ === STEP_VERIFY_PHONE}
              <Signup_STEP_VERIFY_PHONE {_}></Signup_STEP_VERIFY_PHONE>
						{:else if $Signup_step$ === STEP_VERIFY_CODE}
              <Signup_STEP_VERIFY_CODE {_}></Signup_STEP_VERIFY_CODE>
						{:else if $Signup_step$ === STEP_SET_PASSWORD}
              <Signup_STEP_SET_PASSWORD {_}></Signup_STEP_SET_PASSWORD>
						{:else if $Signup_step$ === STEP_SUCCESS}
              <Signup_STEP_SUCCESS {_}></Signup_STEP_SUCCESS>
						{:else if $Signup_step$ === STEP_SENT_EMAIL}
              <Signup_STEP_SENT_EMAIL {_}></Signup_STEP_SENT_EMAIL>
						{:else if $Signup_step$ === STEP_VERIFY_EMAIL}
              <Signup_STEP_VERIFY_EMAIL {_}></Signup_STEP_VERIFY_EMAIL>
						{:else if $Signup_step$ === STEP_ERROR_LINK}
              <div class="success-section">
                <div class="success-section-title">Error</div>
                <div class="success-section-subtitle">
                  The link you opened in not valid. Please open the correct link from the email.
                </div>
              </div>
            {/if}
						{#if $busy$}
              <PageLoader></PageLoader>
            {/if}
          </div>
        </div>
        <div class="col-lg-3">
					<SupportContactDialog></SupportContactDialog>
        </div>
      </div>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.Signup.page {
	position: relative;
	padding-bottom: 150px;

	.breadcrumb-container {
		@include breadcrumb-container-default;

		padding-bottom: 8px;
	}

	.reg-restaurant-section {
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		background-image: vurl('/assets/img/ro/kitchen.png');
		background-size: cover;
		background-repeat: no-repeat;
		@media (min-width: 1440px) {
			background-image: vurl('/assets/img/ro/kitchen@2x.png');
		}
		.reg-rest-title {
			padding-top: 52px;
			font-weight: $lato-black;
			font-size: 32px;
			color: white;
		}
		.reg-rest-subtitle {
			margin-top: 8px;
			padding-bottom: 52px;
			font-size: 18px;
			color: white;
		}
	}
	.signup-section {
		padding: 60px 0 0;
		max-width: 370px;
		margin-left: auto;
		margin-right: auto;
		.resend-code-btn-section, .continue-btn-section, .my-rest-not-found-btn {
			margin-top: 24px;
		}
		.ProgressBar {
			padding: 0 24px;
		}
		.success-section {
			text-align: center;
			.success-section-title {
				font-weight: $lato-black;
				font-size: 24px;
				margin-bottom: 12px;
			}
			.success-section-subtitle {
				font-size: 18px;
				margin-bottom: 66px;
			}
		}
		.more-pricing-info {
			color: $gray;
			a {
				color: $brand-success;
			}
		}
	}
	.SupportContactDialog {
		margin-top: 190px;
		@media (max-width: $screen-md-max) {
			position: fixed;
			right: 0;
			bottom: 0;
			max-width: 100vw;
			min-width: 100vw;
			margin: 0 0 0 -15px;
		}
		@media (max-height: 700px) {
			position: static;
			margin-top: 24px;
		}
	}
}
</style>
