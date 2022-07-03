<script lang="ts">
import { ladda } from '@menus/ladda'
import { email_errors_, required_errors_, validation, ValidationMessages } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { owner_email$, verify_phone_busy$ } = _
let email_form_errors
let owner_email_errors = []
$: email_form_errors = [...owner_email_errors]
</script>

<form
	class="Signup_STEP_EMAIL"
	novalidate
	on:submit|preventDefault={_evt => email_form_errors.length || _.continue_email_step(false)}
>
  <div class="form-group input-container"
			 class:has-error={owner_email_errors.length}
	>
    <label for="owner_email">Please enter your email address</label>
    <input type="email" class="form-control" required
					 name="owner_email" id="owner_email"
					 bind:value={$owner_email$}
					 use:validation={$owner_email$, ['Email', required_errors_, email_errors_]}
					 on:errors={evt => owner_email_errors = evt.detail}
		>
    <ValidationMessages errors={owner_email_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="continue-btn-section">
    <button use:ladda={$verify_phone_busy$} class="btn btn-lg btn-success btn-block"
						type="submit">Continue</button>
  </div>
</form>
