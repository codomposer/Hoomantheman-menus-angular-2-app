<script lang="ts">
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import { MessageModal_c } from './MessageModal_c.js'
const ctx = getContext_ui_ctx() as shared_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new MessageModal_c(ctx, dispatch)
const { data$, is_modal_open$ } = _
export const { open, close } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Message Modal -->
  <div class="modal MessageModal message-modal fade d-block in"
			 tabindex="-1"
			 role="dialog"
			 aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click={evt => close(false)}
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">{ $data$?.title }</h4>
        </div>
        <div class="modal-body modal-scrollable">
          <div class="message-message">{ $data$?.message }</div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <button type="button"
										class="col-xs-12 btn {$data$?.ok_class}"
										on:click={evt => close(true)}
						>{ $data$?.ok_text }</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type="text/scss" global>
@import "@menus/css/lib";
.MessageModal {
	.modal-body {
		padding: 40px;
		.message-message {
			font-size: 18px;
			font-weight: $lato-bold;
		}
	}
	.modal-footer {
		padding: 20px 20px 100px;
		border-top: 1px solid #DBDBDB;
		@media (min-width: $screen-sm-min) {
			padding-bottom: 20px;
			text-align: right;
		}
		.action-buttons {
			.btn {
				@media (max-width: $screen-xs-max) {
					width: 100%;
				}
			}
		}
	}
}
</style>
