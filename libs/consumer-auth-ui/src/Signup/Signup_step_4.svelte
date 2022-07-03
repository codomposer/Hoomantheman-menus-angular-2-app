<script lang="ts">
import { validation, ValidationMessages, required_errors_ } from '@menus/validation'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const {
	SecurityQuestion$, SecurityAnswer$, agree_to_terms_of_use$, agree_to_privacy_policy$, save_busy$,
} = _
let form4_errors = []//region
let SecurityAnswer_errors = [], agree_to_privacy_policy_errors = [], agree_to_terms_of_use_errors = []
$: form4_errors = [
	...SecurityAnswer_errors, ...agree_to_privacy_policy_errors, ...agree_to_terms_of_use_errors
]//endregion
</script>

<form on:submit|preventDefault={evt => form4_errors.length || _.submit_form_4()}>
  <div class="form-group input-container"
			 class:has-error={SecurityAnswer_errors.length}
	>
    <label for="SecurityAnswer">{ $SecurityQuestion$ }</label>
    <input type="text"
					 class="form-control"
					 required
					 name="SecurityAnswer" id="SecurityAnswer"
					 placeholder="Security Answer"
					 bind:value={$SecurityAnswer$}
					 use:validation={$SecurityAnswer$, ['Security answer', required_errors_]}
					 on:errors={evt => SecurityAnswer_errors = evt.detail}
		>
    <ValidationMessages errors={SecurityAnswer_errors}></ValidationMessages>
  </div>
  <div class="agree_prompt">
    To sign up you must agree to our:
  </div>
  <div class="agree_container">
    <CheckBox bind:value={$agree_to_terms_of_use$}
							title="To you agree to our Terms of Service?"
							validation={$agree_to_terms_of_use$, ['Terms of Service', required_errors_]}
							bind:errors={agree_to_terms_of_use_errors}
		></CheckBox>
    <a href="/terms-of-service" target="_blank">terms of service</a>
  </div>
  <div class="agree_container">
    <CheckBox bind:value={$agree_to_privacy_policy$}
							title="To you agree to our Privacy Policy?"
							validation={$agree_to_privacy_policy$, ['Terms of Service', required_errors_]}
							bind:errors={agree_to_privacy_policy_errors}
		></CheckBox>
    <a href="/privacy-policy" target="_blank">privacy policy</a>
  </div>
  <div>
    <button use:ladda={$save_busy$}
						class="btn btn-lg btn-success btn-block next-btn"
						title={
              ($agree_to_terms_of_use$ && $agree_to_privacy_policy$)
              ? ''
              : 'To sign up, you must agree to our Terms of Service & Privacy Policy'
            }
						disabled={!$agree_to_terms_of_use$ || !$agree_to_privacy_policy$}
		>Confirm</button>
  </div>
</form>
