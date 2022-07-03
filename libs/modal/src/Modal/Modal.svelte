<script context="module" lang="ts">
const base_backdrop_z_index = 1040
const modal_z_index_offset = 10
const next_z_index_offset = 20
const backdrop_z_index_a:number[] = [base_backdrop_z_index]
</script>

<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { style_ } from '@ctx-core/html'
import { getContext_ui_ctx } from '@menus/ui'
import type { BaseModalController } from '../BaseModalController.js'
import type { modal_Ctx } from '../modal_Ctx.js'
const ctx = getContext_ui_ctx() as modal_Ctx
export let _:BaseModalController<any, any>, title = '', no_header = false, no_footer = false
const { close, is_modal_open$ } = _
let backdrop_z_index:number, modal_z_index:number
$: modal_z_index = backdrop_z_index + modal_z_index_offset
onMount(()=>{
	backdrop_z_index = backdrop_z_index_a[backdrop_z_index_a.length - 1] + next_z_index_offset
	backdrop_z_index_a.push(backdrop_z_index)
})
onDestroy(()=>{
	backdrop_z_index_a.splice(backdrop_z_index_a.indexOf(backdrop_z_index), 1)
})
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in" style={style_({ 'z-index': backdrop_z_index })}></div>
<div class="modal fade d-block in {$$props.class || ''}" style={style_({ 'z-index': modal_z_index })}>
	<div class="modal-dialog">
		<div class="modal-content">
			{#if !no_header}
				<div class="modal-header">
					<slot name="header">
						<button type="button" class="close" on:click={close}>
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">{title}</h4>
					</slot>
				</div>
			{/if}
			<div class="modal-body modal-scrollable">
				<slot></slot>
			</div>
			{#if !no_footer}
				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			{/if}
		</div>
	</div>
</div>
{/if}
