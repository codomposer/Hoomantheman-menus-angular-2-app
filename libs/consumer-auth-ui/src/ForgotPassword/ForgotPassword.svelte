<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_, email_phone_errors_ } from '@menus/validation'
import { ladda } from '@menus/ladda'
import { is_navigating_onclick_b } from '@menus/page'
import { PlatformIcon } from '@menus/platform-ui'
import { isPlatform$_b } from '@menus/platform-settings'
import { ForgotPassword_c } from './ForgotPassword_c.js'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
const ctx = getContext_ui_ctx() as consumer_auth_ui_Ctx
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const isPlatform = isPlatform$_b(ctx)
export const _ = new ForgotPassword_c(ctx)
const { busy$, forgot_password_email_phone$ } = _
let forgot_password_email_phone_errors = []//region
let form_errors
$: form_errors = [...forgot_password_email_phone_errors]//endregion
</script>

<div class="page ForgotPassword">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/login">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Forgot Password</span>
			</li>
		</ul>
	</div>

  <div class="main-section-wrapper">
    <div class="main-section">
      <div class="section-title">Forgot Password</div>
      <div class="section-info">If you forgot your password, enter email and we will send you special code.</div>
      <form class="form"
						novalidate
						on:submit|preventDefault={_evt => form_errors?.length || _.send_forgot_password()}
			>
        <div class="form-group"
						 class:has-error={forgot_password_email_phone_errors.length}
				>
          <label for="forgot_password_email_phone">Your Email / Phone (+1)</label>
          <input type="text" id="forgot_password_email_phone"
								 class="form-control"
								 required
								 bind:value={$forgot_password_email_phone$}
								 use:validation={$forgot_password_email_phone$, ['Email/Phone', required_errors_, email_phone_errors_]}
								 on:errors={evt => forgot_password_email_phone_errors = evt.detail}
					>
          <ValidationMessages errors={forgot_password_email_phone_errors}></ValidationMessages>
        </div>
				{#if has_dom}
          <button type="submit" use:ladda={$busy$}
									class="btn btn-lg btn-success btn-block btn-action"
					>Send</button>
        {/if}
      </form>
    </div>
  </div>
</div>

<style type="text/scss">
@import "@menus/css/lib";
.ForgotPassword {
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
			@media (max-width: $screen-xs-max) {
				margin-top: 24px;
			}
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
