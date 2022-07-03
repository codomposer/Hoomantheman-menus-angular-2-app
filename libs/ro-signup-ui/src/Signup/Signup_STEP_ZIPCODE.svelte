<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { required_errors_, validation, ValidationMessages, zip_errors_, } from '@menus/validation'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
import { Signup_step$_b } from './Signup_step$_b.js'
import { Signup_zip_code$_b } from './Signup_zip_code$_b'
import { STEP_REST_LIST } from './STEP.js'
const ctx = getContext_ui_ctx() as ro_signup_ui_Ctx
const Signup_step$ = Signup_step$_b(ctx)
const Signup_zip_code$ = Signup_zip_code$_b(ctx)
let zip_code:HTMLInputElement
let zipCode_form_errors:string[] = []
let zipCode_errors:string[] = []
$: zipCode_form_errors = [...zipCode_errors]
function scroll_zip_code_into_view() {
	const zip_code_bcl = zip_code.getBoundingClientRect()
	const zip_code_bottom = zip_code_bcl.bottom
	const { body } = document
	const body_bcl = body.getBoundingClientRect()
	const body_height = body_bcl.height
	const body_bottom = body_bcl.bottom
	if (body_bottom < zip_code_bottom) {
		body.scrollTop = zip_code_bottom - body_height + 100
	}
}
</script>

<form
	id="signup-form"
	class="Signup_STEP_ZIPCODE"
	novalidate
	on:submit|preventDefault={_evt => {
		if (!zipCode_form_errors.length) {
			Signup_step$.$ = STEP_REST_LIST
		}
	}}
>
  <div class="zip-code-section">
    <div class="form-group zip-code-input"
				 class:has-error={zipCode_errors.length}
		>
      <label for="zip_code">Please enter your ZIP Code</label>
      <input type="text" class="form-control" id="zip_code" name="zip_code"
						 bind:this={zip_code}
						 bind:value={$Signup_zip_code$}
						 on:focus={evt=> scroll_zip_code_into_view()}
						 required
						 use:validation={$Signup_zip_code$, ['Zip Code', required_errors_, zip_errors_]}
						 on:errors={evt => zipCode_errors = evt.detail}
			/>
      <ValidationMessages errors={zipCode_errors} input_tooltip={true}></ValidationMessages>
    </div>
    <div class="continue-btn-section">
      <button class="btn btn-lg btn-success btn-block" type="submit">Continue</button>
    </div>
  </div>
</form>
