<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CheckBox } from '@menus/form-ui'
import { validation, ValidationMessages, required_errors_, } from '@menus/validation'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SaveHeadModal_c } from './SaveHeadModal_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new SaveHeadModal_c(ctx, dispatch)
const { busy$, head$, is_modal_open$, isNewHead$ } = _
export const open = _.open, close = _.close
let form_errors = []//region
let Name_errors = []
$: form_errors = [
	...Name_errors,
]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in"></div>
<div class="modal save-head-modal fade d-block in"
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
        <h4 class="modal-title" id="myModalLabel">{ $isNewHead$ ? 'New Category' : $head$.Name }</h4>
      </div>
      <form novalidate
						on:submit|preventDefault={evt => form_errors.length || _.save()}
			>
        <div class="modal-body modal-scrollable">
          {#if $busy$}
            <PageLoader></PageLoader>
          {/if}
					<div class="form-group"
							 class:has-error={Name_errors.length}
					>
            <label for="Name">Name</label>
            <input type="text" name="Name" id="Name"
									 required
									 class="form-control"
									 bind:value={$head$.Name}
									 use:validation={$head$.Name, ['Name', required_errors_]}
									 on:errors={evt => Name_errors = evt.detail}
						/>
            <ValidationMessages errors={Name_errors} input_tooltip={true}></ValidationMessages>
          </div>
          <div class="form-group">
            <label for="Description">Description (optional)</label>
            <textarea type="text" name="Description" id="Description"
											rows="5"
											class="form-control"
											bind:value={$head$.Description}
						></textarea>
          </div>
          <div class="active-now-checkbox">
            <CheckBox toggle={true}
											text="Active Now?"
											text-align="left"
											bind:value={$head$.Enabled}
						></CheckBox>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <button type="submit" class="col-xs-6 btn btn-lg btn-success">{ $isNewHead$ ? 'Add' : 'Save' }</button>
            <button type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
										on:click={evt => _.close()}
						>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
{/if}

<style type=text/scss>
.save-head-modal {
	.modal-body {
		padding-top: 28px;
		.active-now-checkbox {
			margin-top: 42px;
		}
	}
}
</style>
