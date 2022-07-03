<script lang="ts">
import {
	required_errors_, email_errors_, email_confirm_errors_2, validation, ValidationMessages,
} from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const {
	register_email_errors$, Email$, ConfirmEmail$
} = _
let form2_errors = []//region
let Email_errors = [], Email_input_errors = [], ConfirmEmail_errors = []
$: Email_errors = [...Email_input_errors, ...$register_email_errors$]
$: form2_errors = [...Email_errors, ...ConfirmEmail_errors]//endregion
</script>

<form on:submit|preventDefault={evt => form2_errors.length ||  _.submit_form_2() }>
  <div class="form-group input-container"
			 class:has-error={Email_errors.length}
	>
    <label for="Email">Email</label>
    <input type="Email"
					 class="form-control"
					 required
					 placeholder="Email Address"
					 name="Email" id="Email"
					 bind:value={$Email$}
					 use:validation={$Email$, ['Email',
             required_errors_, email_errors_
           ]}
					 on:errors={evt => Email_input_errors = evt.detail}
		>
    <ValidationMessages errors={Email_errors}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={ConfirmEmail_errors.length}
	>
    <label for="ConfirmEmail">Confirm Email</label>
    <input type="email"
					 class="form-control"
					 required
					 placeholder="Confirm Email Address"
					 name="ConfirmEmail" id="ConfirmEmail"
					 bind:value={$ConfirmEmail$}
					 use:validation={$ConfirmEmail$, ['Confirm Email',
             required_errors_, email_confirm_errors_2($Email$)
           ]}
					 on:errors={evt => ConfirmEmail_errors = evt.detail}
		>
    <ValidationMessages errors={ConfirmEmail_errors}></ValidationMessages>
  </div>
  <div>
    <button class="btn btn-lg btn-success btn-block next-btn">Continue</button>
  </div>
</form>
