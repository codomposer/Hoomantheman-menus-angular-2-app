<script lang="ts">
import { required_errors_, validation, ValidationMessages } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c, CustomerService_Phone:string
const { verify_code$, verify_code_request_errors$ } = _
let verify_code_form_errors
let verify_code_errors = []
$: verify_code_form_errors = [...verify_code_errors]
</script>

<form
	class="Signup_STEP_VERIFY_CODE"
	novalidate
	on:submit|preventDefault={_evt => verify_code_form_errors.length || _.API_REGISTRATION_verify()}
>
  <div class="form-group input-container"
			 class:has-error={verify_code_errors.length}
	>
    <label for="verify_code">Please enter your verification code</label>
    <input type="text" class="form-control" required
					 name="verify_code" id="verify_code"
					 bind:value={$verify_code$}
					 use:validation={$verify_code$, [
             'Verification Code', required_errors_, $verify_code_request_errors$
           ]}
					 on:errors={evt => verify_code_errors = evt.detail}
		>
    <ValidationMessages errors={verify_code_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="input-container">
    Call restaurant customer service if you have not received a
    call { CustomerService_Phone }
  </div>
  <div class="resend-code-btn-section">
    <button class="btn btn-lg btn-success btn-inverse btn-block" type="button"
						on:click={()=>_.resend_code()}
		>Resend Code</button>
  </div>
  <div class="continue-btn-section">
    <button class="btn btn-lg btn-success btn-block" type="submit">Continue</button>
  </div>
</form>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Signup_STEP_VERIFY_CODE {
	.form-control {
		height: 72px;
		font-size: 32px;
		font-weight: $lato-black;
		padding-top: 16px;
		padding-bottom: 16px;
	}
}
</style>
