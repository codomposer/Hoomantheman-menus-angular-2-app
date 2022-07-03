<script lang="ts">
import { validation, ValidationMessages, required_errors_ } from '@menus/validation'
export let value = ''
export let validation_args = {
	label: 'Password',
	validations: [required_errors_],
	noinit: true,
}
export let name = 'password', id = name, placeholder = 'Password'
export let type = 'password', errors = []
let show_password = false
$: type = show_password ? 'text' : 'password'
</script>

<div class="Password form-group" class:has-error={ errors.length }>
  <label for={id}>{validation_args.label || validation_args[0]}</label>
  <div class="m-input-group has-addon-left has-addon-right">
    <div class="m-input-group-addon m-addon-left">
      <div class="password-icon cursor-default"></div>
    </div>
    <input
			{type} id={id} class="form-control" name={name} {value} {placeholder}
			use:validation={value, validation_args}
			on:input={evt => value = evt.target.value}
			on:errors={evt => errors = evt.detail}
		>
    <div
			class="m-input-group-addon m-addon-right show-password-addon"
			class:active={show_password}
			on:click={ _evt => show_password = !show_password }
		>
      <div class="show-password-icon"></div>
    </div>
  </div>
  <ValidationMessages {errors}></ValidationMessages>
</div>
