<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader, PoweredBy } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ladda } from '@menus/ladda'
import { is_navigating_onclick_b } from '@menus/page'
import { App_Logo$_b, App_Name$_b, isPlatform$_b } from '@menus/platform-settings'
import {
	required_errors_, password_errors_, confirm_errors_2, validation, ValidationMessages,
} from '@menus/validation'
import { consumer_http_client_b } from '@menus/consumer-http'
import { PlatformIcon } from '@menus/platform-ui'
import { Password } from '@menus/form-ui'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { ResetPassword_c } from './ResetPassword_c.js'
export let reset_code = ''
const ctx = getContext_ui_ctx() as consumer_auth_ui_Ctx
const App_Logo = App_Logo$_b(ctx)
const App_Name = App_Name$_b(ctx)
const isPlatform = isPlatform$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
export const _ = new ResetPassword_c(ctx)
const {
	busy$, confirm_password$, new_password$, resend_code_busy$, reset_code$, reset_code_success$,
} = _
_.reset_code$.$ = reset_code
let form_errors//region
let reset_code_errors = [], new_password_errors = [], confirm_password_errors = []
$: form_errors = [...reset_code_errors, ...new_password_errors, ...confirm_password_errors]//endregion
const consumer_http_client = consumer_http_client_b(ctx)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ResetPassword page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
	{#if $busy$}
    <PageLoader center="page"></PageLoader>
  {/if}

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/forgot-password">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Reset Password</span>
			</li>
		</ul>
	</div>

	<div class="main-section">
    {#if $reset_code_success$}
      <div class="success-section">
        <div class="success-icon"></div>
        <div class="success-section-title">Success!</div>
        <div class="success-section-subtitle">Your password was successfully changed.</div>
				{#if $App_Logo}
          <div><img src={$App_Logo} alt={$App_Name}></div>
        {/if}
				<div><a href="/login" on:click={is_navigating_onclick}>Login to {$App_Name || '...'}</a></div>
      </div>
    {:else}
      <div class="section-title">Reset Password</div>
      <div class="section-info">Password reset code was successfully generated. The code has been sent to your
        account’s Email/Phone.
      </div>
			{#if $App_Logo}
        <div><img src={$App_Logo} alt={$App_Name}></div>
      {/if}
			<form class="form"
						novalidate
						on:submit|preventDefault={evt => form_errors?.length || _.request_reset_password()}
			>
        <div class="form-group" class:has-error={reset_code_errors.length}>
          <label for="reset_code">Code from Email / Phone</label>
          <input type="text"
								 name="reset_code" id="reset_code"
								 class="form-control"
								 required
								 bind:value={$reset_code$}
								 use:validation={$reset_code$, ['Code', required_errors_]}
								 on:errors={evt => reset_code_errors = evt.detail}
					>
          <ValidationMessages errors={reset_code_errors}></ValidationMessages>
        </div>
        <Password
					label="New Password"
					name="new_password" id="new_password"
					bind:value={$new_password$}
					validation_args={{
						label: 'New Password',
						validations: [required_errors_, password_errors_],
						noinit: true,
					}}
					bind:errors={new_password_errors}
				></Password>
        <Password
					label="Confirm Password"
					name="confirm_password" id="confirm_password"
					bind:value={$confirm_password$}
					validation_args={{
						label: 'Confirm Password',
						validations: [required_errors_, confirm_errors_2($new_password$)],
						noinit: true,
					}}
					bind:errors={confirm_password_errors}
				></Password>
        <button type="submit" class="btn btn-lg btn-success btn-block btn-action">Reset</button>
        <button use:ladda={$resend_code_busy$}
								class="btn btn-lg btn-success btn-block"
								on:click|preventDefault={evt => _.send_forgot_password()}
				>Resend Code</button>
      </form>
    {/if}
  </div>
  <div class="PoweredBy-container">
    <PoweredBy></PoweredBy>
  </div>
</div>

<style type="text/scss">
@import "@menus/css/lib";
.ResetPassword.page {
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
	.main-section {
		$side-padding: 24px;
		position: relative;
		min-height: calc(100vh - 128px);
		max-width: 360px + (2 * $side-padding);
		margin-left: auto;
		margin-right: auto;
		padding: 57px $side-padding 0;
		background-color: white;
		border-radius: 3px;
		.section-title {
			font-weight: $lato-black;
			font-size: 24px;
			text-align: center;
		}
		.section-info {
			margin-top: 18px;
			text-align: center;
		}
		.form {
			margin-top: 50px;
			.btn-action {
				margin-top: 24px;
			}
		}
		.success-section {
			text-align: center;
			font-size: 18px;
			.success-section-title {
				font-weight: $lato-black;
				font-size: 24px;
				margin-bottom: 12px;
			}
			.success-section-subtitle {
				margin-bottom: 66px;
			}
		}
	}
	.PoweredBy-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
