<script lang="ts">
import { phone_errors_, required_errors_, validation, ValidationMessages } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { FirstName$, LastName$, Phone$, register_phone_errors$ } = _
let form1_errors = []//region
let FirstName_errors = [], LastName_errors = [], Phone_errors = [], Phone_input_errors = []
$: Phone_errors = [...Phone_input_errors, ...$register_phone_errors$]
$: form1_errors = [...FirstName_errors, ...LastName_errors, ...Phone_errors]//endregion
</script>

<form on:submit|preventDefault={evt => form1_errors.length || _.submit_form_1()}>
  <div class="form-group input-container"
			 class:has-error={FirstName_errors.length}
	>
    <label for="FirstName">First Name</label>
    <input type="text"
					 class="form-control"
					 required
					 name="FirstName" id="FirstName"
					 placeholder="First Name"
					 bind:value={$FirstName$}
					 use:validation={$FirstName$, ['First name', required_errors_]}
					 on:errors={evt => FirstName_errors = evt.detail}
		>
    <ValidationMessages errors={FirstName_errors}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={LastName_errors.length}
	>
    <label for="LastName">Last Name</label>
    <input type="text" class="form-control"
					 required
					 name="LastName" id="LastName"
					 placeholder="Last Name"
					 bind:value={$LastName$}
					 use:validation={$LastName$, ['Last name', required_errors_]}
					 on:errors={evt => LastName_errors = evt.detail}
		>
    <ValidationMessages errors={LastName_errors}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={Phone_errors.length}
	>
    <label for="Phone">Phone (+1)</label>
    <input type="text"
					 class="form-control"
					 required
					 placeholder="1111111111"
					 name="Phone" id="Phone"
					 bind:value={$Phone$}
					 use:validation={
             $Phone$, ['Phone', required_errors_, phone_errors_]
           }
					 on:errors={evt => Phone_input_errors = evt.detail}
		>
    <ValidationMessages errors={Phone_errors}></ValidationMessages>
  </div>
  <div>
    <button class="btn btn-lg btn-success btn-block next-btn">Continue</button>
  </div>
</form>
