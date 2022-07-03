<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { ladda } from '@menus/ladda'
import { validation, ValidationMessages, required_errors_, email_errors_ } from '@menus/validation'
import { PlatformIcon } from '@menus/platform-ui'
import type { ro_forgot_password_ui_Ctx } from '../ro_forgot_password_ui_Ctx.js'
import { ForgotPassword_c } from './ForgotPassword_c.js'
const ctx = getContext_ui_ctx() as ro_forgot_password_ui_Ctx
export const _ = new ForgotPassword_c(ctx)
const { busy$, email$, form_send_code_errors$ } = _
let form_errors//region
let email_errors = []
$: form_errors = [...email_errors]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="forgot-password-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/backoffice/login">« Back</a>
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
      <form class="form" novalidate
						on:submit|preventDefault={evt => form_errors.length || _.send_code()}
			>
        <div class="form-group"
						 class:has-error={email_errors.length}
				>
          <label for="email">Your Email</label>
          <input type="email"
								 name="email" id="email"
								 class="form-control"
								 bind:value={$email$}
								 required
								 use:validation={$email$, ['Email', required_errors_, email_errors_, $form_send_code_errors$]}
								 on:errors={evt => email_errors = evt.detail}
					>
            <ValidationMessages errors={email_errors}></ValidationMessages>
        </div>
				{#if has_dom}
          <button use:ladda={$busy$} type="submit"
									class="btn btn-lg btn-success btn-block btn-action"
					>Send</button>
        {/if}
      </form>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.forgot-password-page {
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
