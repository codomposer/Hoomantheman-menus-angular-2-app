<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { no_dom } from '@ctx-core/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { CheckBox } from '@menus/form-ui'
import { PlatformIcon } from '@menus/platform-ui'
import { SupportContactDialog } from '@menus/ro-support-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_, email_errors_ } from '@menus/validation'
import { WEB_APP_URL_ } from '@menus/web-config'
import type { ro_login_ui_Ctx } from '../ro_login_ui_Ctx.js'
import { Login_c } from './Login_c.js'
const ctx = getContext_ui_ctx() as ro_login_ui_Ctx
const { webConfig } = ctx
const { INTERNAL_DEBUG } = webConfig
export const _ = new Login_c(ctx)
const { busy$, email$, enable_beta_features$, envToggleLive$, password$, show_password$, } = _
let form_errors//region
let email_errors = [], password_errors = []
$: form_errors = [...email_errors, ...password_errors]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="Login page">
  <div class="login-navbar">
    <PlatformIcon></PlatformIcon>
  </div>
	{#if $busy$ || no_dom}
    <PageLoader center="page"></PageLoader>
  {:else}

  	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/backoffice">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Login</span>
			</li>
		</ul>
	</div>

    <div class="login-section-wrapper">
      <div class="login-section">
        <div class="login-section-label">Please login to Back Office</div>
        <form class="login-form" novalidate
							on:submit|preventDefault={_evt => form_errors.length || _.login()}
				>
          <div class="form-group input-container" class:has-error={email_errors.length}>
            <label for="email">Email</label>
            <div class="m-input-group has-addon-left">
              <div class="m-input-group-addon m-addon-left">
                <div class="email-icon cursor-default"></div>
              </div>
              <input type="email" class="form-control"
										 name="email" id="email"
										 placeholder="Email"
										 bind:value={$email$}
										 required
										 use:validation={$email$, {
										 	 label: 'Email',
										 	 validations: [required_errors_, email_errors_],
										 	 noinit: true
										 }}
										 on:errors={evt => email_errors = evt.detail}
							/>
            </div>
            <ValidationMessages errors={email_errors} input_tooltip={true}></ValidationMessages>
          </div>
          <div class="form-group input-container"
							 class:has-error={password_errors.length}
					>
            <label for="password">Password</label>
            <div class="m-input-group has-addon-left has-addon-right">
              <div class="m-input-group-addon m-addon-left">
                <div class="password-icon cursor-default"></div>
              </div>
              <input type={ $show_password$ ? 'text' : 'password' }
										 class="form-control"
										 name="password" id="password"
										 value={$password$||''} placeholder="Password"
										 required
										 use:validation={$password$, {
										 	 label: 'Password',
										 	 validations: [required_errors_],
										 	 noinit: true,
										 }}
										 on:errors={evt => password_errors = evt.detail}
										 on:change={evt => password$.set(evt.target.value)}
							>
              <div class="m-input-group-addon m-addon-right show-password-addon"
									 class:active={$show_password$}
									 on:click={_.toggle_show_password}
							>
                <div class="show-password-icon"></div>
              </div>
            </div>
            <ValidationMessages errors={password_errors} input_tooltip={true}></ValidationMessages>
          </div>
          <div class="login-btn-wrapper">
            <button type="submit" class="btn btn-lg btn-success btn-block login-btn">Login</button>
          </div>
          <div class="forgot-password-link">
            <a href="/backoffice/forgot-password">Forgot your password?</a>
          </div>
          <div class="login-separator"></div>
					<button class="btn btn-primary btn-lg btn-block signup-btn"
									on:click|preventDefault={_.signup}
					>Sign up</button>
					<div class="agree_prompt"
					>By signing up you agree to our
						<a href="/terms-of-service" target="_blank"
							on:click|stopPropagation={evt =>
								window.open(`${WEB_APP_URL_(webConfig)}/terms-of-service`, '_system')
							}
						>terms of service</a> and
						<a href="/privacy-policy" target="_blank"
							on:click|stopPropagation={evt =>
								window.open(`${WEB_APP_URL_(webConfig)}/privacy-policy`, '_system')
							}
						>privacy policy</a>.
					</div>
					{#if INTERNAL_DEBUG}
            <div>
              <div style="margin-top: 24px; text-align: center">
                <CheckBox
									toggle={true}
									text="Enable Live environment"
									bind:value={$envToggleLive$}
									on:change={_.envToggleChange}
								></CheckBox>
              </div>
              <div style="margin-top: 24px; text-align: center">
                <CheckBox toggle={true} text="Enable Beta features"
													bind:value={$enable_beta_features$}
								></CheckBox>
              </div>
            </div>
          {/if}
        </form>
      </div>
    </div>
		<SupportContactDialog></SupportContactDialog>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.Login {
	padding-bottom: 100px;

	.breadcrumb-container {
		@include breadcrumb-container-default;
	}

	.login-navbar {
		height: $navbar-height;
		padding: 0 48px;
		display: flex;
		align-items: center;
		@media (max-width: $screen-xs-max) {
			padding: 0 24px 0 8px;
		}
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
				margin-top: 24px;
				.login-btn-wrapper {
					margin-top: 24px;
					.login-btn {
						text-transform: uppercase;
						@media (max-width: $screen-xs-max) {
							width: 100%;
						}
					}
					@media (min-width: $screen-sm-min) {
						text-align: center;
					}
				}
				.forgot-password-link {
					margin: 24px 0;
					text-align: center;
					color: #455A64;
				}
				.login-separator {
					width: 100%;
					height: 1px;
					background-color: rgba(#455A64, .3);
					@media (max-width: $screen-xs-max) {
						display: none;
					}
				}
				.agree_prompt {
					margin-top: 12px;
					a {
						text-decoration: underline;
					}
				}
				.signup-btn {
					margin-top: 24px;
					text-align: center;
					text-transform: uppercase;
					@media (max-width: $screen-xs-max) {
						margin-top: 0;
					}
				}
			}
		}
	}
	.SupportContactDialog {
		position: fixed;
		right: 0;
		bottom: 0;
		@media (max-height: 700px) {
			position: static;
		}
	}
}
</style>
