<script lang="ts">
import type { Sortable_itemclick_evt_T } from '@menus/dnd'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import { CheckBox, Radio } from '@menus/form-ui'
import { Modal } from '@menus/modal'
import type { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { getContext_ui_ctx } from '@menus/ui'
import { is_new_o_ } from '@menus/util'
import { validation, ValidationMessages, required_errors_, lte_errors_2, gte_errors_2, } from '@menus/validation'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menu_ui_save_API_MENUS_menuoption_b } from '../ro_menu_ui_save_API_MENUS_menuoption_b.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { ro_menuoptionitems_limit_option_a$_b } from '../ro_menuoptionitems_limit_option_a$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
import { set_ro_menuoptionitem_Is_Default_b } from '../set_ro_menuoptionitem_Is_Default_b.js'
import { add_ro_menuoptionitem_b } from './add_ro_menuoptionitem_b.js'
import { edit_ro_menuoptionitem_b } from './edit_ro_menuoptionitem_b.js'
import { onsort_ro_menuoptionitems_b } from './onsort_ro_menuoptionitems_b.js'
import { ro_menu_ui_API_MENUS_menuoptionitem_del_b } from './ro_menu_ui_API_MENUS_menuoptionitem_del_b.js'
import { RoMenuOptionModal_c } from './RoMenuOptionModal_c.js'
import RoMenuOptionModal_menuoptionitem from './RoMenuOptionModal_menuoptionitem.svelte'
import RoMenuOptionModal_SizeDetails from './RoMenuOptionModal_SizeDetails.svelte'
import { toggle_ro_menuoptionitem_Enabled_b } from './toggle_ro_menuoptionitem_Enabled_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const add_ro_menuoptionitem = add_ro_menuoptionitem_b(ctx)
const edit_ro_menuoptionitem = edit_ro_menuoptionitem_b(ctx)
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
const onsort_ro_menuoptionitems = onsort_ro_menuoptionitems_b(ctx)
const ro_menu_ui_API_MENUS_menuoptionitem_del = ro_menu_ui_API_MENUS_menuoptionitem_del_b(ctx)
const ro_menu_ui_save_API_MENUS_menuoption = ro_menu_ui_save_API_MENUS_menuoption_b(ctx)
const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
const ro_menuoptionitems_limit_option_a$ = ro_menuoptionitems_limit_option_a$_b(ctx)
const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
const set_ro_menuoptionitem_Is_Default = set_ro_menuoptionitem_Is_Default_b(ctx)
const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
const toggle_ro_menuoptionitem_Enabled = toggle_ro_menuoptionitem_Enabled_b(ctx)
const _ = new RoMenuOptionModal_c(ctx)
export const { open, close } = _
let isNew_ro_menuoption = true
$: isNew_ro_menuoption = is_new_o_($selected_ro_menuoption$)
let menuoption_form_errors = []//region
let menuoption_Name_errors = [], menuoption_Minimum_Select_errors = [], menuoption_Maximum_Select_errors = []
$: menuoption_form_errors = [
	...menuoption_Name_errors, ...menuoption_Minimum_Select_errors, ...menuoption_Maximum_Select_errors,
]//endregion
async function onsubmit() {
	if (!menuoption_form_errors.length) {
		await ro_menu_ui_save_API_MENUS_menuoption($selected_ro_menuoption$)
		await close()
	}
}
async function onitemclick(evt:Sortable_itemclick_evt_T<RoMenuoptionitem_I>) {
	await edit_ro_menuoptionitem(evt.detail.item)
}
async function onclick_delete(index:number, ro_menuoptionitem:RoMenuoptionitem_I) {
	await ro_menu_ui_API_MENUS_menuoptionitem_del(index, ro_menuoptionitem)
}
</script>

<Modal {_} no_footer={true} class="RoMenuOptionModal" title="{isNew_ro_menuoption ? 'Add' : 'Edit'} Option Category">
	<form novalidate on:submit|preventDefault={evt => onsubmit()}>
		<div class="row">
			<div class="col-sm-8">
				<div class="form-group input-container" class:has-error={menuoption_Name_errors.length}>
					<label for="menuoption_Name">Option Name</label>
					<input type="text" class="form-control" name="MOName" id="menuoption_Name"
								 required
								 bind:value={$selected_ro_menuoption$.Name}
								 use:validation={$selected_ro_menuoption$, ['Name', required_errors_]}
								 on:errors={evt => menuoption_Name_errors = evt.detail}
					>
					<ValidationMessages errors={menuoption_Name_errors} input_tooltip={true}></ValidationMessages>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="active-option-wrapper">
					<label for="menuoption_Enabled">Active</label>
					<div id="menuoption_Enabled">
						<CheckBox toggle={true} bind:value={$selected_ro_menuoption$.Enabled}></CheckBox>
					</div>
				</div>
			</div>
		</div>
		<div class="form-group input-container">
			<label for="menuoption_Description">Description (optional)</label>
			<textarea name="Description" id="menuoption_Description"
								class="form-control" rows="4"
								bind:value={$selected_ro_menuoption$.Description}
			></textarea>
		</div>
		<div class="single-select-section select-section">
			<Radio
				name="radioMOSingleMultiSelect"
				value={true}
				bind:group={$selected_ro_menuoption$.Is_Single_Select}
				text="Single Select"
				inline={true}
			></Radio>
		</div>
		<div class="multi-select-section select-section form-inline">
			<Radio
				name="radioMOSingleMultiSelect"
				value={false}
				bind:group={$selected_ro_menuoption$.Is_Single_Select}
				text="Multi Select"
				inline={true}
			></Radio>
			{#if $ro_menuoptionitems_limit_option_a$.length > 1}
			<div class="minmax d-iblock">
				<div class="form-group"
						 class:has-error={menuoption_Minimum_Select_errors.length}
				>
					<span>Min</span>
					<select name="Minimum_Select" id="Minimum_Select"
									bind:value={$selected_ro_menuoption$.Minimum_Select}
									use:validation={$selected_ro_menuoption$, ['Min',
										!$selected_ro_menuoption$.Is_Single_Select && required_errors_,
										$selected_ro_menuoption$.Minimum_Select > 0
										&& $selected_ro_menuoption$.Maximum_Select > 0
										&& lte_errors_2($selected_ro_menuoption$.Maximum_Select),
									]}
									on:errors={evt => menuoption_Minimum_Select_errors = evt.detail}
									disabled={$selected_ro_menuoption$.Is_Single_Select}
					>
						{#each $ro_menuoptionitems_limit_option_a$ as ro_menuoptions_limit_option,i}
							<option value={ro_menuoptions_limit_option.value}>{ro_menuoptions_limit_option.text}</option>
						{/each}
					</select>
					<ValidationMessages errors={menuoption_Minimum_Select_errors} inplace_tooltip={true}></ValidationMessages>
				</div>
				<div class="form-group"
						 class:has-error={menuoption_Maximum_Select_errors.length}
				>
					<span>Max</span>
					<select name="Maximum_Select" id="Maximum_Select"
									bind:value={$selected_ro_menuoption$.Maximum_Select}
									use:validation={$selected_ro_menuoption$, ['Min',
										!$selected_ro_menuoption$.Is_Single_Select && required_errors_,
										$selected_ro_menuoption$.Maximum_Select > 0
										&& $selected_ro_menuoption$.Minimum_Select > 0
										&& gte_errors_2($selected_ro_menuoption$.Minimum_Select),
									]}
									on:errors={evt => menuoption_Maximum_Select_errors = evt.detail}
									disabled={$selected_ro_menuoption$.Is_Single_Select}
					>
						{#each $ro_menuoptionitems_limit_option_a$ as ro_menuoptions_limit_option,i}
							<option value={ro_menuoptions_limit_option.value}>{ro_menuoptions_limit_option.text}</option>
						{/each}
					</select>
					<ValidationMessages errors={menuoption_Maximum_Select_errors} inplace_tooltip={true}></ValidationMessages>
				</div>
			</div>
			{/if}
		</div>
		<div class="item-size-action-buttons action-buttons">
			<button type="submit" class="btn btn-lg btn-success btn-add-menu-item">Save</button>
			<button type="button" class="btn btn-lg btn-success btn-inverse btn-add-menu-item"
							on:click={evt => close()}
			>Close</button>
		</div>
	</form>
	{#if !isNew_ro_menuoption}
	<div class="menu-option-item-list">
		<table class="table table-striped m-table table-responsive-xs">
			<thead>
				<tr class="m-tr">
					<th>Default</th>
					<th>Option Item</th>
					{#if !$ro_menuoptionsizes$.length}
						<th>Price</th>
					{/if}
					{#each $ro_menuoptionitems$[0]?.SizeDetails || [] as sizeDetail}
						<th>
							{ sizeDetail.Name }
						</th>
					{/each}
					<th>Active</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				<Sortable tag="tr"
									list={$ro_menuoptionitems$} key="ID"
									let:item={menuoptionitem} let:index
									on:sort={evt => onsort_ro_menuoptionitems(evt)}
									on:itemclick={evt => onitemclick(evt)}
				>
					<td
						on:click|stopPropagation={evt => set_ro_menuoptionitem_Is_Default($selected_ro_menuoption$, menuoptionitem)}
					>
						<div class="Is_Default">
							<div
								class:radio-on-icon={menuoptionitem.Is_Default}
								class:radio-off-icon={!menuoptionitem.Is_Default}
							></div>
							{#if $innerWidth_lte_SCREEN_XS_MIN$}<span>Default</span>{/if}
						</div>
					</td>
					<td>
						<div class="table-responsive-label">Option Item</div>
						<div class="table-responsive-value">
							{#if menuoptionitem.edit_mode}
								<div class="form-group"
										 class:has-error={menuoptionitem.Name_errors?.length}
								>
									<input type="text" name="Name" class="form-control"
												 required
												 placeholder={
													 menuoptionitem.Name_errors?.length
													 ? 'Name is required' : ''
												 }
												 value={menuoptionitem.Name||''}
												 use:validation={menuoptionitem, ['Name', required_errors_]}
												 on:input={evt => menuoptionitem.Name = evt.target.value}
												 on:input={evt => ro_menuoptionitems$.refresh()}
												 on:errors={evt => menuoptionitem.Name_errors = evt.detail}
									>
									<ValidationMessages errors={menuoptionitem.Name_errors} input_tooltip={true}></ValidationMessages>
								</div>
							{:else}
								<div>{ menuoptionitem.Name }</div>
							{/if}
						</div>
					</td>
					{#if !$ro_menuoptionsizes$.length}
						<td>
							<div class="table-responsive-label">Price</div>
							<div class="table-responsive-value">
								{#if menuoptionitem.edit_mode}
									<div class="form-group" class:has-error={menuoptionitem.Price_errors?.length}>
										<input type="text" name="Price" class="form-control"
													 placeholder={
														 menuoptionitem.Price_errors?.length
														 ? 'Price is required' : ''
													 }
													 value={menuoptionitem.Price||0}
													 use:validation={menuoptionitem, ['Price', required_errors_]}
													 on:input={evt => menuoptionitem.Price = parseFloat(evt.target.value)}
													 on:input={evt => ro_menuoptionitems$.refresh()}
													 on:errors={evt => menuoptionitem.Price_errors = evt.detail}
										>
										<ValidationMessages errors={menuoptionitem.Price_errors} input_tooltip={true}></ValidationMessages>
									</div>
								{:else}
									<div>{ menuoptionitem.Price }</div>
								{/if}
							</div>
						</td>
					{/if}
					{#if $innerWidth_gt_SCREEN_XS_MIN$}
						{#each menuoptionitem.SizeDetails as size_detail}
							<td>
								<RoMenuOptionModal_SizeDetails {menuoptionitem} {size_detail}></RoMenuOptionModal_SizeDetails>
							</td>
						{/each}
					{:else}
						{#each menuoptionitem.SizeDetails as size_detail}
							<td>
								<div class="table-responsive-label">{size_detail.Name}</div>
								{#if menuoptionitem.edit_mode}
									<input type="text"
												 class="form-control"
												 value={size_detail.Price||0}
												 on:input={evt => size_detail.Price = parseFloat(evt.target.value)}
												 on:input={evt => ro_menuoptionitems$.refresh()}
									>
								{:else}
									<div>${ size_detail.Price || '' }</div>
								{/if}
							</td>
						{/each}
					{/if}
					<td on:click|stopPropagation>
						<div class="xs-action-row">
							<CheckBox toggle={true}
												text={$innerWidth_lte_SCREEN_XS_MIN$ ? 'Enabled' : ''}
												value={menuoptionitem.Enabled}
												on:change={evt => toggle_ro_menuoptionitem_Enabled(evt, $selected_ro_menuoption$, menuoptionitem)}
							></CheckBox>
							{#if $innerWidth_lte_SCREEN_XS_MIN$}
								<RoMenuOptionModal_menuoptionitem {menuoptionitem}></RoMenuOptionModal_menuoptionitem>
								{#if menuoptionitem.ID > 0}
									<div class="fa fa-times"
											 on:click|stopPropagation={evt => onclick_delete(index, menuoptionitem)}
									><span>Delete</span></div>
								{/if}
							{/if}
						</div>
					</td>
					{#if $innerWidth_gt_SCREEN_XS_MIN$}
						<td on:click|stopPropagation>
							<RoMenuOptionModal_menuoptionitem {menuoptionitem}></RoMenuOptionModal_menuoptionitem>
						</td>
						<td>
							{#if menuoptionitem.ID > 0}
								<div class="delete-time-icon"
										 on:click|stopPropagation={evt => onclick_delete(index, menuoptionitem)}
								></div>
							{/if}
						</td>
					{/if}
				</Sortable>
			</tbody>
		</table>
		{#if !$ro_menuoptionitems$?.length}
			<div class="empty-record">No Records to display</div>
		{/if}
		<button class="btn btn-success btn-sm btn-add-menu-option"
						on:click={evt => add_ro_menuoptionitem()}
		>Add Option Item</button>
	</div>
	{/if}
</Modal>

<style type=text/scss global>
@import '@menus/css/lib';
.RoMenuOptionModal {
	.modal-dialog {
		width: calc(100% - 60px);
		@media (max-width: $screen-xs-max) {
			width: 100vw;
		}
		.modal-body {
			padding-top: 12px;
			padding-bottom: 12px;
		}
	}
	.select-section {
		.radio-inline {
			height: 39px;
			label {
				> * {
					height: 39px;
					line-height: 39px;
					&.icon {
						width: 39px;
					}
				}
			}
		}
		.minmax {
			margin-left: 12px;
			.form-group {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			select {
				border: 1px solid $gray;
			}
		}
	}
	.multi-select-section {
		display: flex;
	}
	.item-size-action-buttons {
		@media (max-width: $screen-sm-max) {
			margin: 12px 0;
		}
	}
	.xs-action-row {
		@media (max-width: $screen-xs-max) {
			display: flex;
			flex-direction: row;
			> * {
				flex: 1;
			}
		}
	}
	.menu-option-item-list {
		.table {
			margin-bottom: 0;
			input {
				min-width: 100px;
			}
		}
		.empty-record {
			text-align: center;
			padding: 20px 8px;
			border-bottom: 1px solid #DBDBDB;
		}
		.btn.btn-add-menu-option {
			margin-top: 24px;
			margin-bottom: 116px;
		}
		form, .form-group {
			margin-bottom: 0;
		}
		.fa-times {
			line-height: 24px;
			color: $brand-danger;
		}
		.Is_Default {
			display: flex;
			align-items: center;
		}
	}
}
</style>
