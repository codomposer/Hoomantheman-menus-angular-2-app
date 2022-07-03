<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { Modal } from '@menus/modal'
import { PageLoader } from '@menus/shared-ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SelectOptionCategoryModal_c } from './SelectOptionCategoryModal_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const _ = new SelectOptionCategoryModal_c(ctx, dispatch)
export const { busy$, open, close } = _
const { is_modal_open$, OptionGroupSuggestions$, selected_optionGroupSuggestion$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<Modal {_} title="Select Option Category" class="SelectOptionCategoryModal" no_footer={true}>
	{#if $busy$ }
		<PageLoader center="parent"></PageLoader>
	{/if}
	<div class="action-buttons">
		<button class="btn btn-lg btn-success btn-add-option-category"
						on:click={evt => _.save_selected_optionGroupSuggestion()}
		>Add</button>
		<button class="btn btn-lg btn-success btn-cancel-option-category"
						on:click={evt => close()}
		>Cancel</button>
	</div>
	<div class="selection">
		<div class="OptionGroupSuggestions OptionGroup_a">
			<div class="heading">Option Group</div>
			<div class="body">
				{#each $OptionGroupSuggestions$ || [] as optionGroupSuggestion}
					<div class="optionGroupSuggestion OptionGroup"
							 class:selected={optionGroupSuggestion.ID === $selected_optionGroupSuggestion$?.ID}
					>
						<a on:click|preventDefault={evt => _.toggle_optionGroupSuggestion(optionGroupSuggestion)}
							 href="."
						>{ optionGroupSuggestion.Name }</a>
					</div>
				{/each}
			</div>
		</div>
		{#if $selected_optionGroupSuggestion$}
			<div class="OptionGroupSuggestion_Details OptionGroup_a">
				<div class="heading">Detail</div>
				<div class="body">
					{#each $selected_optionGroupSuggestion$.Details as detail,idx}
						<div class="optionGroupSuggestion_detail OptionGroup" class:selected={detail.isActive}>
							<a on:click|preventDefault={
								evt => _.toggle_optionGroupSuggestion_detail(detail)
							} href=".">{ detail.Name }</a></div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Modal>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.SelectOptionCategoryModal {
	.modal-body {
		display: flex;
		flex-direction: column;
		.action-buttons {
			flex: 0;
			display: flex;
			padding: 12px 0;
			align-items: center;
			justify-content: flex-end;
			@media (max-width: $screen-xs-max) {
				justify-content: flex-start;
				margin-bottom: 12px;
			}
			.btn {
				float: right;
				@media (max-width: $screen-xs-max) {
					flex: 1;
				}
				&.btn-add-option-category {
					margin-right: 12px;
					@media (max-width: $screen-xs-max) {
						margin-right: 0;
					}
				}
				&.btn-cancel-option-category {
					background-color: $gray;
					color: $brand-success;
				}
			}
		}
	}
	.selection {
		flex: 1;
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		.OptionGroup_a {
			width: 50%;
			.heading {
				font-weight: $lato-bold;
				text-align: center;
			}
			.body {
				overflow-y: auto;
				height: 100%;
				.OptionGroup {
					display: flex;
					align-items: center;
					min-width: 264px;
					width: 264px;
					height: 40px;
					border: 1px solid transparent;
					&:hover {
						border-color: $brand-success;
					}
					&.selected {
						position: sticky;
						top: 0;
						bottom: 20px;
						> a {
							background-color: $brand-success;
							color: white;
						}
					}
					> a {
						display: block;
						width: 100%;
						padding-top: 10px;
						padding-bottom: 10px;
						&:hover {
							text-decoration: none;
						}
						&:focus {
							text-decoration: none;
						}
					}
				}
			}
		}
	}
}
</style>
