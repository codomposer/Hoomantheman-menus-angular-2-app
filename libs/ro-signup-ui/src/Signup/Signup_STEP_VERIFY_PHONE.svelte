<script lang="ts">
import { Grecaptcha } from '@menus/grecaptcha'
import { ladda } from '@menus/ladda'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { API_REGISTRATION_register_busy$, globalSettings$, is_captcha_verified$, rest_phone$ } = _
</script>

<div class="Signup_STEP_VERIFY_PHONE">
  <div>Please Verify if this your phone number</div>
  <div class="verify-phone-number">{ $rest_phone$ }</div>
  <Grecaptcha
		on:verification={evt => _.grecaptcha_onverification(evt)}
	></Grecaptcha>
  <div class="call-customer-service-text">
    Call restaurant customer service if you have not received a
    call { $globalSettings$?.CustomerService?.Phone }
  </div>
  <div class="continue-btn-section">
    <button use:ladda={$API_REGISTRATION_register_busy$}
						class="btn btn-lg btn-success btn-block"
						type="button"
						on:click={evt=>_.API_REGISTRATION_register()}
						disabled={!$is_captcha_verified$}
		>Continue</button>
  </div>
</div>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Signup_STEP_VERIFY_PHONE {
	.verify-phone-number {
		font-weight: $lato-black;
		font-size: 32px;
		padding: 16px;
		border: 1px solid #C7CED1;
		border-radius: 3px;
		margin-top: 7px;
		margin-bottom: 24px;
	}
	.call-customer-service-text {
		margin: 19px 0;
	}
}
</style>
