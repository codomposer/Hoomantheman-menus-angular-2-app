<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { Row } from '@menus/bootstrap'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_XS_MIN$_b } from '@menus/dom'
import { CheckBox, Select } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { is_navigating$_b } from '@menus/page'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { errors_2, ValidationMessages, required_errors_, number_errors_ } from '@menus/validation'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SizeTab_c } from './SizeTab_c.js'
import { toggle_isOpen_lookup_ro_menuoptionsizes_section_b } from './toggle_isOpen_lookup_ro_menuoptionsizes_section_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const is_navigating$ = is_navigating$_b(ctx)
const toggle_isOpen_lookup_ro_menuoptionsizes_section = toggle_isOpen_lookup_ro_menuoptionsizes_section_b(ctx)
export const _ = new SizeTab_c(ctx, dispatch)
const {
	available_lookup_ro_menuoptionsizes$, busy$, isOpen_lookup_ro_menuoptionsizes_section$, menuoptionsize_busy_a$,
	menuoptionsize_edit_a$, ro_menuoptionsizes$
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
let menuoptionsize_errors_a:Record<string, string[]>[] = []
$: {
	menuoptionsize_errors_a = ($ro_menuoptionsizes$ || []).map(
		menuoptionsize=>{
			return {
				Name_errors:
					errors_2(['Name', required_errors_,
						menuoptionsize.api_errors_Name === menuoptionsize.Name
						? menuoptionsize.api_errors : []])(menuoptionsize.Name),
				Price_errors:
					errors_2(['Price', required_errors_, number_errors_])(menuoptionsize.Price),
			}
		}
	)
}
let menuoptionsize_valid_a:boolean[] = []
$: menuoptionsize_valid_a = menuoptionsize_errors_a.map(menuoptionsize_errors=>
	!menuoptionsize_errors.Name_errors.length && !menuoptionsize_errors.Price_errors.length
)
</script>

<div class="SizeTab" class:opened-menu-item-sizes={$isOpen_lookup_ro_menuoptionsizes_section$}>
	{#if $busy$}
		<PageLoader center="parent"></PageLoader>
	{/if}
	{#if !$is_navigating$ && $ro_menuoptionsizes$}
		{#if !$ro_menuoptionsizes$.length && $isOpen_lookup_ro_menuoptionsizes_section$ === false && !$busy$}
			<div class="pizza-placeholder">
				<img src="/assets/img/ro/pizza-placeholder.svg" alt="">
				<div class="title-text">You can choose multiple sizes</div>
				<div class="subtitle-text">For your item. Want to this right now?</div>
				<button
					class="btn btn-success btn-sm btn-sizes"
					on:click={evt => toggle_isOpen_lookup_ro_menuoptionsizes_section()}
				>Select Size</button>
				<button
					class="btn btn-success btn-sm btn-inverse btn-create-size"
					on:click={evt => _.create_ro_menuoptionsize()}
				>Create Size</button>
			</div>
		{:else}
			{#if $isOpen_lookup_ro_menuoptionsizes_section$}
				<div class="MenuItemDetails-section menu-item-sizes-section">
					<Row>
						<div class="action-buttons col-sm-6">
							<button
								class="btn btn-lg btn-success btn-add-option-category"
								on:click={evt => _.add_ro_menuoptionsize()}
							>Add</button>
							<button
								class="btn btn-lg btn-success btn-cancel-option-category"
								on:click={evt => toggle_isOpen_lookup_ro_menuoptionsizes_section()}
							>Cancel</button>
						</div>
						<div class="select-size-wrapper col-sm-6">
							<Select
								items={$available_lookup_ro_menuoptionsizes$}
								itemLabelProp="Name"
								theme="dark"
								multiSelect={true}
								placeholder="Select Size"
							></Select>
						</div>
					</Row>
				</div>
			{/if}
			<div class="menu-item-sizes-list">
				<table class="table table-striped m-table">
					<thead>
						<div class="m-tr">
							<div class="m-th">Default</div>
							<div class="m-th">Size</div>
							<div class="m-th">Price</div>
							<div class="m-th">Active</div>
							<div class="m-th">Edit</div>
							<div class="m-th">Delete</div>
						</div>
					</thead>
					<tbody>
						<Sortable
							tag="tr"
							list={$ro_menuoptionsizes$} key="ID"
							class="m-tr form-group"
							let:item={menuoptionsize} let:index={index}
							on:sort={evt => _.onsort_menuoptionsizes(evt)}
							on:itemclick={evt => _.onitemclick_menuoptionsizes(evt)}
						>
							<td on:click|stopPropagation={evt => _.set_menuoptionsize_Is_Default(menuoptionsize, index)} class="m-td">
								{#if menuoptionsize.Is_Default}
									<div class="radio-on-icon"></div>
								{:else}
									<div class="radio-off-icon"></div>
								{/if}
							</td>
							<td class="m-td">
								{#if $menuoptionsize_edit_a$[index]}
									<div
										class="form-group"
										class:has-error={(menuoptionsize_errors_a[index]?.Name_errors||[]).length}
									>
										<input
											type="text" name="Name" required
											class="form-control"
											placeholder={
												(menuoptionsize_errors_a[index].Name_errors||[]).length ? 'Size' : ''
											}
											value={menuoptionsize.Name||''}
											on:input={evt => menuoptionsize.Name = evt.target.value}
											on:input={evt => ro_menuoptionsizes$.refresh()}
										>
										<ValidationMessages
											errors={menuoptionsize_errors_a[index]?.Name_errors}
											input_tooltip={true}
										></ValidationMessages>
									</div>
								{:else}
									<div>{ menuoptionsize.Name }</div>
								{/if}
							</td>
							<td class="m-td">
								{#if $menuoptionsize_edit_a$[index]}
									<div class="form-group"
											 class:has-error={(menuoptionsize_errors_a[index].Price_errors||[]).length}
									>
										<input
											type="text" name="Price"
											class="form-control"
											required
											value={menuoptionsize.Price||''}
											placeholder={
												(menuoptionsize_errors_a[index].Price_errors||[]).length ? 'Price is required' : ''
											}
											on:input={evt => menuoptionsize.Price = parseFloat(evt.target.value)}
											on:input={evt => ro_menuoptionsizes$.refresh()}
										>
										<ValidationMessages
											errors={menuoptionsize_errors_a[index].Price_errors}
											input_tooltip={true}
										></ValidationMessages>
									</div>
								{:else}
									<div>${ menuoptionsize.Price }</div>
								{/if}
							</td>
							{#if !$menuoptionsize_edit_a$[index]}
								<td on:click|stopPropagation class="m-td">
									<CheckBox toggle={true}
														value={menuoptionsize.Enabled}
														on:change={evt => _.toggle_menuoptionsize_Enabled(evt, menuoptionsize, index)}
									></CheckBox>
								</td>
							{/if}
							<td on:click|stopPropagation class="m-td" colspan={$menuoptionsize_edit_a$[index] ? 3 : 1}>
								{#if $menuoptionsize_edit_a$[index]}
									<div>
										<button
											use:ladda={$menuoptionsize_busy_a$[index]}
											type="submit" class="btn action-link save-link"
											on:click|preventDefault={async evt => {
												if (menuoptionsize_valid_a[index]) {
													await _.API_MENUS_menusize_save(menuoptionsize, index)
												}
											}}
										>Save</button>
										<button
											type="button" class="btn action-link cancel-link"
											on:click|preventDefault={evt => _.cancel_menuoptionsize(menuoptionsize, index)}
										>Cancel</button>
									</div>
								{:else}
									<div class="pencil-icon" on:click={evt => _.edit_ro_menuoptionsize(menuoptionsize)}></div>
								{/if}
							</td>
							{#if !$menuoptionsize_edit_a$[index]}
								<td on:click|stopPropagation class="m-td">
									{#if menuoptionsize.ID > 0}
										<div
											class="delete-time-icon"
											on:click={evt => _.API_MENUS_menusize_del(index, menuoptionsize)}
										></div>
									{/if}
								</td>
							{/if}
						</Sortable>
					</tbody>
				</table>
				{#if !$busy$ && !$ro_menuoptionsizes$.length}
					<div class="empty-record">
						No Records to display
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.SizeTab {
	&.opened-menu-item-sizes {
		padding-top: 0;
	}
	.menu-item-sizes-section {
		background-color: $gray;
		padding: 24px;
		.Row {
			.action-buttons {
				display: flex;
				height: 48px;
				align-items: center;
				padding: 0;
				@media (max-width: $screen-xs-max) {
					display: block;
					margin-bottom: 12px;
				}
				.btn {
					flex: 0;
					@media (max-width: $screen-md-max) {
						min-width: 120px;
					}
				}
			}
		}
		.select-size-wrapper {
			display: inline-block;
			float: right;
			padding: 0;
			@media (max-width: $screen-xs-max) {
				width: 100%;
			}
		}
		.dropdown {
			display: inline-block;
			position: relative;
			width: 264px;
			.btn.dropdown-toggle {
				width: 100%;
				font-weight: normal;
				min-width: auto;
				text-align: left;
				background: rgba(255, 255, 255, 0.10);
				color: rgba(255, 255, 255, 0.5);
				border-radius: 4px;
				border: 1px solid $brand-success;
				.caret {
					float: right;
					margin-top: 9px;
					margin-left: 2px;
					border-top-color: $gray;
				}
			}
			.dropdown-menu {
				top: 0;
				left: 100%;
				margin-top: -1px;
				max-height: 400px;
				overflow-y: auto;
				width: 264px;
				> li {
					> a {
						padding-top: 10px;
						padding-bottom: 10px;
						&:hover {
							background-color: $brand-success;
							color: white;
						}
					}
				}
			}
		}
		.btn-cancel-option-category {
			background-color: $gray;
			color: $brand-success;
		}
	}
	.pizza-placeholder {
		text-align: center;
		padding: 24px 0;
		.title-text {
			margin-top: 42px;
			font-weight: $lato-black;
			font-size: 24px;
		}
		.subtitle-text {
			margin-top: 6px;
			margin-bottom: 12px;
		}
		.btn {
			margin-top: 12px;
			@media (max-width: $screen-xs-max) {
				width: 100%;
				display: block;
			}
			@media (min-width: $screen-sm-min) {
				&.btn-create-size {
					margin-left: 24px;
				}
			}
		}
	}
	.add-menu-item-size-section {
		padding-top: 34px;
		.default-size-toggle {
			margin-bottom: 38px;
			.toggle-btn {
				margin-bottom: -6px;
			}
		}
	}
	.menu-item-sizes-list {
		padding-top: 0;
		.table {
			margin-bottom: 0;
			input {
				min-width: 100px;
				@media (max-width: $screen-xs-max) {
					min-width: 66px;
				}
			}
		}
		.empty-record {
			text-align: center;
			padding: 20px 8px;
			border-bottom: 1px solid #DBDBDB;
		}
		.btn.btn-add-menu-item {
			margin-top: 24px;
			margin-bottom: 0;
		}
		.form-group {
			margin-bottom: 0;
		}
	}
}

</style>
