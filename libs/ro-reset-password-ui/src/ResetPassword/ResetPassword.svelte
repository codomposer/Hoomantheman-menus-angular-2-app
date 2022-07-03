<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import {
	validation, ValidationMessages, required_errors_, email_errors_, password_errors_, confirm_errors_2
} from '@menus/validation'
import { PlatformIcon } from '@menus/platform-ui'
import type { ro_reset_password_ui_Ctx } from '../ro_reset_password_ui_Ctx.js'
import { ResetPassword_c } from './ResetPassword_c.js'
const ctx = getContext_ui_ctx() as ro_reset_password_ui_Ctx
export let email:string, code:string
export const _ = new ResetPassword_c(ctx)
const { busy$, code$, email$, new_password$, confirm_password$ } = _
email$.$ = email
code$.$ = code
let form_errors//region
let email_errors = [], code_errors = [], new_password_errors = [], confirm_password_errors = []
$: form_errors = [...email_errors, ...code_errors, ...new_password_errors, ...confirm_password_errors]//endregion
let show_new_password = false, show_confirm_password = false
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
				<a href="/backoffice/forgot-password">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Reset Password</span>
			</li>
		</ul>
	</div>

	<div class="main-section-wrapper">
    <div class="main-section">
      <div class="section-title">Reset Password</div>
      <div class="section-info">Password reset code was successfully generated. The code has been sent to your
        account’s Email/Phone.
      </div>
      <form class="form" novalidate
						on:submit|preventDefault={evt => form_errors.length || _.reset_password()}
			>
        <div class="form-group"
						 class:has-error={email_errors.length}
				>
          <label for="email">Your Email</label>
          <input type="email"
								 name="email" id="email"
								 class="form-control"
								 required
								 bind:value={$email$}
								 use:validation={$email$, ['Email', required_errors_, email_errors_]}
								 on:errors={evt => email_errors = evt.detail}
					>
            <ValidationMessages errors={email_errors} input_tooltip={true}></ValidationMessages>
        </div>
        <div class="form-group"
						 class:has-error={code_errors.length}
				>
          <label for="code">Code from Email</label>
          <input type="text" name="code" id="code"
								 class="form-control"
								 bind:value={$code$}
								 required
								 use:validation={$code$, ['Reset Code', required_errors_]}
								 on:errors={evt => code_errors = evt.detail}
					>
          <ValidationMessages errors={code_errors} input_tooltip={true}></ValidationMessages>
        </div>
        <div class="form-group input-container"
						 class:has-error={new_password_errors.length}
				>
          <label for="new_password">New Password</label>
					<div class="m-input-group has-addon-right">
						<input type={ show_new_password ? 'text' : 'password' } class="form-control"
									 name="new_password" id="new_password"
									 value={$new_password$}
									 on:change={evt => $new_password$ = evt.target.value}
									 required
									 use:validation={$new_password$, ['New Password', required_errors_, password_errors_]}
									 on:errors={evt => new_password_errors = evt.detail}
						>
						<div class="m-input-group-addon m-addon-right show-password-addon"
								 class:active={show_new_password}
								 on:click={evt => show_new_password = !show_new_password}
						>
							<div class="show-password-icon"></div>
						</div>
					</div>
					<ValidationMessages errors={new_password_errors} input_tooltip={true}></ValidationMessages>
        </div>
        <div class="form-group input-container"
						 class:has-error={confirm_password_errors.length}
				>
          <label for="confirm_password">Confirm New Password</label>
					<div class="m-input-group has-addon-right">
						<input type={ show_confirm_password ? 'text' : 'password' } class="form-control"
									 name="confirm_password" id="confirm_password"
									 value={$confirm_password$}
									 on:change={evt => $confirm_password$ = evt.target.value}
									 required
									 use:validation={$confirm_password$, ['Confirm Password',
										 required_errors_, confirm_errors_2($new_password$)
									 ]}
									 on:errors={evt => confirm_password_errors = evt.detail}
						>
						<div class="m-input-group-addon m-addon-right show-password-addon"
								 class:active={show_confirm_password}
								 on:click={evt => show_confirm_password = !show_confirm_password}
						>
							<div class="show-password-icon"></div>
						</div>
					</div>
					<ValidationMessages errors={confirm_password_errors} input_tooltip={true}></ValidationMessages>
        </div>
        <button type="submit" class="btn btn-lg btn-success btn-block btn-action">Reset</button>
      </form>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.ResetPassword.page {
	padding-bottom: 100px;

	.breadcrumb-container {
		@include breadcrumb-container-default;
	}

	.main-section-wrapper {
		padding: 0 24px;
		.main-section {
			margin-top: 57px;
			background-color: white;
			border-radius: 3px;
			max-width: 360px;
			margin-left: auto;
			margin-right: auto;
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
		}
	}
}
</style>
