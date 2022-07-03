<script lang="ts">
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { Modal } from '@menus/modal'
import { getContext_ui_ctx } from '@menus/ui'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import { ConfirmModal_c } from './ConfirmModal_c.js'
const ctx = getContext_ui_ctx() as shared_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new ConfirmModal_c(ctx, dispatch)
const { data$ } = _
export const { open, close, is_modal_open$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
	<!-- Confirm Modal -->
	<Modal {_} class="ConfirmModal confirm-modal">
		<div slot="header">
			<button type="button" class="close"
							on:click={evt => close(false)}
			>
				<div class="delete-icon"></div>
			</button>
			<h4 class="modal-title">{ $data$?.title }</h4>
		</div>
		<div class="confirm-message">{ $data$?.message }</div>
		<div slot="footer">
			<div class="row">
				<button type="button"
								class="col-xs-6 btn btn-lg {$data$?.cancel_class}"
								on:click={evt => close(false)}
				>{ $data$?.cancel_text }</button>
				<button type="button"
								class="col-xs-6 btn btn-lg {$data$?.ok_class}"
								on:click={evt => close(true)}
				>{ $data$?.ok_text }</button>
			</div>
		</div>
	</Modal>
{/if}

<style type="text/scss" global>
@import "@menus/css/lib";
.ConfirmModal {
	.modal-body {
		padding: 40px;
		.confirm-message {
			font-size: 18px;
			font-weight: $lato-bold;
		}
	}
	.modal-footer {
		padding: 20px 20px 100px;
		border-top: 1px solid #DBDBDB;
		@media (max-width: $screen-xs-max) {
			// TODO: Fix this `important` in future
			position: unset !important;
			padding-bottom: 150px !important;
		}
		@media (min-width: $screen-sm-min) {
			padding-bottom: 20px;
			text-align: right;
		}
		@media (max-width: $screen-xs-max) {
			.action-buttons {
				display: flex;
				flex-direction: column-reverse;
				.btn {
					width: 100%;
					margin-top: 12px;
				}
			}
		}
	}
}
</style>
