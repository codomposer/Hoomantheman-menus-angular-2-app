<script lang="ts">
import { Password } from '@menus/form-ui'
import { required_errors_, password_errors_, confirm_errors_2 } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { Password$, ConfirmPassword$ } = _
let form3_errors = []//region
let Password_errors = [], ConfirmPassword_errors = []
$: form3_errors = [...Password_errors, ...ConfirmPassword_errors]//endregion
</script>

<form on:submit|preventDefault={evt => form3_errors.length || _.submit_form_3()}>
  <Password bind:value={$Password$}
						validation_args={{
							label: 'Password',
							validations: [required_errors_, password_errors_],
							noinit: true,
						}}
						bind:errors={Password_errors}
	></Password>
  <Password bind:value={$ConfirmPassword$}
						validation_args={{
							label: 'Confirm Password',
							validations: [required_errors_, confirm_errors_2($Password$)],
							noinit: true,
						}}
						bind:errors={ConfirmPassword_errors}
	></Password>
  <div>
    <button class="btn btn-lg btn-success btn-block next-btn">Continue</button>
  </div>
</form>
