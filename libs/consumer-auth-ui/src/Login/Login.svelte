<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { Password } from '@menus/form-ui'
import { is_navigating_onclick_b } from '@menus/page'
import { Enable_Facebook_Login$_b, Enable_Google_Login$_b } from '@menus/platform-settings'
import { PlatformIcon } from '@menus/platform-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { required_errors_, email_errors_, validation, ValidationMessages } from '@menus/validation'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { Login_c, STEP_LOGIN, STEP_EMAIL, PROVIDER_FACEBOOK, PROVIDER_GOOGLE } from './Login_c.js'
const ctx = getContext_ui_ctx() as consumer_auth_ui_Ctx, dispatch = createEventDispatcher()
const Enable_Facebook_Login$ = Enable_Facebook_Login$_b(ctx)
const Enable_Google_Login$ = Enable_Google_Login$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
export let returnUrl:string
export const _ = new Login_c(ctx, dispatch)
const { busy$, email$, password$, social_login_email$, step$, } = _
$: _.returnUrl$.$ = returnUrl
let login_form_errors = []//region
let email_errors = [], password_errors = []
$: login_form_errors = [...email_errors, ...password_errors]//endregion
let social_login_form_errors//region
let social_login_email_errors = []
$: social_login_form_errors = [...social_login_email_errors]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="Login page">
  <div class="header-logo-section">
    <PlatformIcon
			on:click={evt => _.onclick_PlatformIcon(evt)}
		></PlatformIcon>
  </div>
	{#if $busy$}
    <PageLoader center="page"></PageLoader>
  {/if}
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Login</span>
			</li>
		</ul>
	</div>

	<div class="login-section-wrapper">
    {#if $step$ === STEP_LOGIN}
      <div class="login-section">
        <div class="login-section-label">Please login below</div>
        <form class="login-form"
							on:submit|preventDefault={_evt => login_form_errors.length || _.login() }
				>
          <div class="form-group input-container" class:has-error={ email_errors.length }>
            <label for="email">Email</label>
            <div class="m-input-group has-addon-left">
              <div class="m-input-group-addon m-addon-left">
                <div class="email-icon cursor-default"></div>
              </div>
              <input type="email"
										 class="form-control"
										 required
										 placeholder="Email"
										 name="email" id="email"
										 bind:value={$email$}
										 use:validation={$email$, {
										 	 label: 'Email',
										 	 validations: [required_errors_, email_errors_],
										 	 noinit: true,
										 }}
										 on:errors={evt => email_errors = evt.detail}
							>
            </div>
            <ValidationMessages errors={email_errors}></ValidationMessages>
          </div>
          <Password bind:value={$password$} bind:errors={password_errors}></Password>
          <div class="row login-btn-wrapper">
            <button type="submit" class="btn btn-lg btn-success login-btn">Login</button>
          </div>
          <div class="login-separator"></div>
          <div class="forgot-password-link c-text3">
            <a href="/signup" on:click={is_navigating_onclick}>Sign up</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/forgot-password" on:click={is_navigating_onclick}>Forgot your password?</a>
          </div>
					{#if $Enable_Facebook_Login$}
            <div class="signup-btn">
              <button type="button" class="btn btn-fb btn-block btn-xlg"
											on:click={_evt => _.social_login(PROVIDER_FACEBOOK)}
							>
                <div class="btn-wrapper">
                  <div class="facebook-icon custom-icon"></div>
                  <div class="btn-text">Login with Facebook</div>
                </div>
              </button>
            </div>
          {/if}
					{#if $Enable_Google_Login$}
            <div class="signup-btn">
              <button type="button" class="btn btn-gplus btn-block btn-xlg"
											on:click={ _evt => _.social_login(PROVIDER_GOOGLE) }
							>
                <div class="btn-wrapper">
                  <div class="google-icon custom-icon"></div>
                  <div class="btn-text">Login with Google</div>
                </div>
              </button>
            </div>
          {/if}
					<div class="agreements">
            By signing in, you agree to our <a href="/terms-of-service" class="c-text2">Terms of Service</a>
            and <a href="/privacy-policy" class="c-text2">Privacy Policy</a>.
          </div>
        </form>
      </div>
    {/if}
		{#if $step$ === STEP_EMAIL}
      <div class="login-section">
        <div class="login-section-label">Please enter your email</div>
        <form class="login-form"
							novalidate
							on:submit|preventDefault={_evt => social_login_form_errors?.length || _.email_social_login()}
				>
          <div class="form-group input-container" class:has-error={social_login_email_errors.length}>
            <label for="social_login_email">Email</label>
            <div class="m-input-group has-addon-left">
              <div class="m-input-group-addon m-addon-left">
                <div class="email-icon cursor-default"></div>
              </div>
              <input type="email" class="form-control"
										 name="social_login_email" id="social_login_email"
										 placeholder="Email"
										 bind:value={$social_login_email$}
										 required
										 use:validation={$social_login_email$, ['Email', required_errors_, email_errors_]}
										 on:errors={evt => social_login_email_errors = evt.detail}
							>
            </div>
            <ValidationMessages errors={social_login_email_errors}></ValidationMessages>
          </div>
					<div class="row login-btn-wrapper">
						<button type="submit" class="btn btn-lg btn-success login-btn">Login</button>
					</div>
        </form>
      </div>
    {/if}
  </div>
</div>

<style type="text/scss">
@import "@menus/consumer-shared-css/variables";
.Login {
	padding-bottom: 100px;
	// .login-navbar {
	// 	height: $navbar-height;
	// 	padding: 0 32px;
	// 	display: flex;
	// 	align-items: center;

	// 	@media (max-width: $screen-xs-max) {
	// 		padding-left: 8px;
	// 		padding-right: 8px;
	// 	}
	// }
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
	.login-section-wrapper {
		padding: 0 24px;
		.login-section {
			margin-top: 89px;
			background-color: white;
			border-radius: 3px;
			max-width: 360px;
			margin-left: auto;
			margin-right: auto;
			@media (max-width: $screen-xs-max) {
				margin-top: 24px;
			}
			.login-section-label {
				font-weight: $lato-black;
				font-size: 24px;
				text-align: center;
			}
			.login-form {
				margin-top: 27px;
				.login-separator {
					width: 100%;
					height: 1px;
					background-color: rgba(#455A64, .3);
				}
				.forgot-password-link {
					margin: 24px 0;
					text-align: center;
				}
				.agreements {
					margin-top: 12px;
				}
				.signup-btn {
					margin-top: 24px;
					text-align: center;
					text-transform: uppercase;
					@media (max-width: $screen-xs-max) {
						margin-top: 16px;
					}
					.btn-fb, .btn-gplus {
						border-radius: 5px;
						.btn-wrapper {
							display: inline-block;
							.custom-icon {
								margin-top: 9px;
							}
							.custom-icon, .btn-text {
								display: block;
								float: left;
							}
							.btn-text {
								margin-top: 1px;
								margin-left: 10px;
								font-size: 16px;
								font-weight: $lato-regular;
							}
						}
					}
				}
				.login-btn-wrapper {
					text-align: center;
					margin: 24px 0;
				}
			}
		}
	}
}
</style>
