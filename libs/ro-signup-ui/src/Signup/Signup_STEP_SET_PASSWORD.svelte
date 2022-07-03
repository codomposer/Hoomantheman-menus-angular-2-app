<script lang="ts">
import { confirm_errors_2, password_errors_, required_errors_, validation, ValidationMessages } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { busy$, new_password$, confirm_password$ } = _
let new_password_form_errors
let new_password_errors = [], confirm_password_errors = []
$: new_password_form_errors = [...new_password_errors, ...confirm_password_errors]
</script>

<form
	class="Signup_STEP_SET_PASSWORD"
	novalidate
	on:submit|preventDefault={_evt => new_password_form_errors.length || _.continue_new_password_step()}
>
  <div class="form-group input-container"
			 class:has-error={new_password_errors.length}
	>
    <label for="new_password">Password</label>
    <input type="password" class="form-control" required
					 name="new_password" id="new_password"
					 reverse="true"
					 bind:value={$new_password$}
					 use:validation={$new_password$, ['New Password', required_errors_, password_errors_]}
					 on:errors={evt => new_password_errors = evt.detail}
		>
    <ValidationMessages errors={new_password_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={confirm_password_errors.length}
	>
    <label for="confirm_password">Confirm Password</label>
    <input type="password" class="form-control" required
					 name="confirm_password" id="confirm_password"
					 bind:value={$confirm_password$}
					 use:validation={$confirm_password$, ['Confirm Password',
             required_errors_, confirm_errors_2($new_password$)
           ]}
					 on:errors={evt => confirm_password_errors = evt.detail}
		>
    <ValidationMessages errors={confirm_password_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="continue-btn-section">
    <button class="btn btn-lg btn-success btn-block" type="submit"
						disabled={$busy$}
		>Continue</button>
  </div>
</form>
