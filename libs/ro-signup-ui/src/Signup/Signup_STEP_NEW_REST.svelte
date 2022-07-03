<script lang="ts">
import { onMount } from 'svelte'
import { email_errors_, phone_errors_, required_errors_, validation, ValidationMessages, } from '@menus/validation'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
onMount(()=>_.init_address_autocomplete())
const {
	busy$, newRest_Address_str$, newRest_Address_str_input$, newRest_Address_str_payload_errors$, newRest_Name$,
	newRest_customerName$, newRest_Title$, newRest_Email$, newRest_Phone$
} = _
let newRest_form_errors//region
let newRest_Name_errors = [], newRest_Address_str_errors = [], newRest_customerName_errors = [],
	newRest_Title_errors = [], newRest_Email_errors = [], newRest_Phone_errors = []
$: newRest_form_errors = [
	...newRest_Name_errors, ...newRest_Address_str_errors, ...newRest_customerName_errors,
	...newRest_Title_errors, ...newRest_Email_errors, ...newRest_Phone_errors
]//endregion
</script>

<form
	class="Signup_STEP_NEW_REST"
	novalidate
	on:submit|preventDefault={_evt =>
		newRest_form_errors.length || _.API_REGISTRATION_new()
	}
>
  <div class="form-group input-container"
			 class:has-error={newRest_Name_errors.length}
	>
    <label for="newRest_Name">Business Name</label>
    <input type="text" class="form-control" name="newRest_Name" id="newRest_Name"
					 required
					 bind:value={$newRest_Name$}
					 use:validation={$newRest_Name$, ['Business name', required_errors_]}
					 on:errors={evt => newRest_Name_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_Name_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={newRest_Address_str_errors.length}
	>
    <label for="newRest_Address_str">Business Address</label>
    <input bind:this={$newRest_Address_str_input$} type="text" class="form-control"
					 name="newRest_Address_str" id="newRest_Address_str"
					 bind:value={$newRest_Address_str$}
					 required
					 use:validation={$newRest_Address_str$, [
             'Business Address',
             required_errors_,
             $newRest_Address_str_payload_errors$
           ]}
					 on:errors={evt => newRest_Address_str_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_Address_str_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={newRest_customerName_errors.length}
	>
    <label for="newRest_customerName">Name</label>
    <input type="text" class="form-control" required
					 name="newRest_customerName" id="newRest_customerName"
					 bind:value={$newRest_customerName$}
					 use:validation={$newRest_customerName$, ['Name', required_errors_]}
					 on:errors={evt => newRest_customerName_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_customerName_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={newRest_Title_errors.length}
	>
    <label for="newRest_Title">Title</label>
    <input type="text" class="form-control" required
					 name="newRest_Title" id="newRest_Title"
					 bind:value={$newRest_Title$}
					 use:validation={$newRest_Title$, ['Title', required_errors_]}
					 on:errors={evt => newRest_Title_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_Title_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={newRest_Email_errors.length}
	>
    <label for="newRest_Email">Email</label>
    <input type="email" class="form-control" required
					 name="newRest_Email" id="newRest_Email"
					 bind:value={$newRest_Email$}
					 use:validation={$newRest_Email$, ['Email', required_errors_, email_errors_]}
					 on:errors={evt => newRest_Email_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_Email_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="form-group input-container"
			 class:has-error={newRest_Phone_errors.length}
	>
    <label for="newRest_Phone">Business Phone</label>
    <input type="text" class="form-control" required
					 name="newRest_Phone" id="newRest_Phone"
					 bind:value={$newRest_Phone$}
					 use:validation={$newRest_Phone$, ['Business Phone', required_errors_, phone_errors_]}
					 on:errors={evt => newRest_Phone_errors = evt.detail}
		>
    <ValidationMessages errors={newRest_Phone_errors} input_tooltip={true}></ValidationMessages>
  </div>
  <div class="continue-btn-section">
    <button class="btn btn-lg btn-success btn-block" type="submit"
						disabled={$busy$}>Continue</button>
  </div>
</form>
