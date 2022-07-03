<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { Row } from '@menus/bootstrap'
import { innerWidth_gt_SCREEN_XS_MIN$_b } from '@menus/dom'
import { ladda } from '@menus/ladda'
import { CheckBox } from '@menus/form-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_ } from '@menus/validation'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SaveMasterheadingModal_c } from './SaveMasterheadingModal_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
export const _ = new SaveMasterheadingModal_c(ctx, dispatch)
const { busy$, is_modal_open$, masterheading_is_new$, ro_masterheading$, } = _
export const { open, close } = _
let form_errors = []//region
let Name_errors = []
$: form_errors = [...Name_errors]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in"></div>
<div class="modal save-masterhead-modal SaveMasterheadingModal fade d-block in"
		 on:click={evt => _.close()}
		 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
>
	<div class="modal-dialog" role="document" on:click|stopPropagation>
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close"
								on:click={evt => _.close()}
				>
					<div class="delete-icon"></div>
				</button>
				<h4 class="modal-title"
						id="myModalLabel">{ $masterheading_is_new$ ? 'New Menu' : $ro_masterheading$.Name }</h4>
			</div>
			<form novalidate on:submit|preventDefault={evt => form_errors.length || _.save()}>
				<div class="modal-body modal-scrollable">
					<div class="form-group input-container"
							 class:has-error={Name_errors.length}
					>
						<label for="Name">Name</label>
						<input type="text" name="Name" id="Name" class="form-control"
									 required
									 bind:value={$ro_masterheading$.Name}
									 use:validation={$ro_masterheading$.Name, ['Name', required_errors_]}
									 on:errors={evt => Name_errors = evt.detail}
						/>
						<ValidationMessages errors={Name_errors} input_tooltip={true}></ValidationMessages>
					</div>
					<div class="form-group input-container">
						<label for="Description">Description (optional)</label>
						<textarea type="text" name="Description" id="Description"
											rows="5"
											class="form-control"
											bind:value={$ro_masterheading$.Description}
						></textarea>
					</div>
					<Row class="service-type-checkbox-container checkbox-container">
						<CheckBox class="col-xs-6 col-sm-3" text="Dining-In" bind:value={$ro_masterheading$.IsDiningIn}></CheckBox>
						<CheckBox class="col-xs-6 col-sm-3" text="Catering" bind:value={$ro_masterheading$.IsCatering}></CheckBox>
						<CheckBox class="col-xs-6 col-sm-3" text="Delivery" bind:value={$ro_masterheading$.IsDelivery}></CheckBox>
						<CheckBox class="col-xs-6 col-sm-3" text="Pick-Up" bind:value={$ro_masterheading$.IsPickup}></CheckBox>
					</Row>
					<div class="active-now-checkbox-container checkbox-container">
						<CheckBox toggle={true}
											text="Active Now?"
											text-align="left"
											bind:value={$ro_masterheading$.Enabled}
						></CheckBox>
					</div>
				</div>
				<div class="modal-footer">
					<Row>
						<button type="submit" use:ladda={$busy$} class="col-xs-6 btn btn-lg btn-success">
							{ $masterheading_is_new$ ? 'Add' : 'Save' }
						</button>
						<button type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse" on:click={evt => _.close()}>
							Cancel
						</button>
					</Row>
				</div>
			</form>
		</div>
	</div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.save-masterhead-modal {
	.modal-body {
		padding-top: 24px;
		.checkbox-container {
			margin-top: 24px;
			@media (max-width: $screen-xs-max) {
				margin-bottom: 24px;
			}
			.CheckBox {
				@media (max-width: $screen-xs-max) {
					display: block;
					margin-top: 8px;
					label {
						justify-content: flex-start;
					}
				}
			}
		}
	}
}
</style>
