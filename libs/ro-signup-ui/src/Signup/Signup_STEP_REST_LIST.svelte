<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { required_errors_, validation, ValidationMessages } from '@menus/validation'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
import type { Signup_c } from './Signup_c.js'
import { Signup_step$_b } from './Signup_step$_b.js'
import type { 	Signup_STEP_REST_LIST_restaurant_name_modal_I } from './Signup_STEP_REST_LIST_restaurant_name_modal/index.js'
import { Signup_STEP_REST_LIST_restaurant_name_modal } from './Signup_STEP_REST_LIST_restaurant_name_modal/index.js'
import { STEP_NEW_REST } from './STEP.js'
export let _:Signup_c
let Signup_STEP_REST_LIST_restaurant_name_modal_i:Signup_STEP_REST_LIST_restaurant_name_modal_I
const { rest_name$, selected_rest$ } = _
const ctx = getContext_ui_ctx() as ro_signup_ui_Ctx
const Signup_step$ = Signup_step$_b(ctx)
let rest_name_form_errors:string[], rest_name_errors:string[] = []
$: rest_name_form_errors = [...rest_name_errors]
</script>

<Signup_STEP_REST_LIST_restaurant_name_modal
	bind:this={Signup_STEP_REST_LIST_restaurant_name_modal_i}
></Signup_STEP_REST_LIST_restaurant_name_modal>
<form
	class="Signup_STEP_REST_LIST"
	novalidate autocomplete="off"
	on:submit|preventDefault={_evt => {
		if (!rest_name_form_errors.length) {
			_.continue_restaurant_list_step()
		}
	}}
>
  <div class="form-group restaurant-name-input"
			 class:has-error={rest_name_errors.length}
	>
    <label for="rest_name">Please enter your restaurant name</label>
    <input type="text" class="form-control" id="rest_name" name="rest_name"
					 bind:value={$rest_name$}
					 required
					 use:validation={$rest_name$, ['Business name', required_errors_]}
					 on:errors={evt => rest_name_errors = evt.detail}
					 on:focus={evt=>Signup_STEP_REST_LIST_restaurant_name_modal_i.open()}
		>
    <ValidationMessages errors={rest_name_errors} input_tooltip={true}></ValidationMessages>
  </div>
	<div class="continue-btn-section">
    <button class="btn btn-lg btn-success btn-block" type="submit"
						disabled={!$selected_rest$}
		>Continue</button>
  </div>
  <div class="my-rest-not-found-btn">
    <button class="btn btn-lg btn-success btn-inverse btn-block" type="button"
						on:click={evt=>{
							Signup_step$.$ = STEP_NEW_REST
						}}
		>Can't find your restaurant?</button>
  </div>
</form>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Signup_STEP_REST_LIST {
	position: relative;
	$width: 310px;
	.restaurant-name-input {
		margin-bottom: 0;
	}
}
</style>
