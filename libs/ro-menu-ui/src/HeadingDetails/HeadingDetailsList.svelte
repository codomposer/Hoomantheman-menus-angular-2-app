<script lang="ts">
import { onDestroy, createEventDispatcher } from 'svelte'
import { api_src_ } from '@menus/api'
import type { Sortable_itemclick_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_MD_MIN$_b, innerWidth_lte_SCREEN_MD_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { CheckBox } from '@menus/form-ui'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b, params_fireFlyID$_b, params_HeadingID$_b, params_MasterheadingID$_b } from '@menus/page'
import { ro_httpClient_b, RoHttpClient, RoRequestQuery } from '@menus/ro-http'
import { API_MENUS_menusize_list_payload_, subscribe_ERR_INVALID_ACCESS_b } from '@menus/ro-restaurant-ui'
import type { successAPI_MENUS_menusize_list_payload__T } from '@menus/ro-restaurant-ui'
import { set_list_SortID } from '@menus/ro-shared-models'
import type { RoMenuitem_I } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { confirmModal$_b } from '@menus/shared-ui'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import { getContext_ui_ctx } from '@menus/ui'
import { ValidationMessages } from '@menus/validation'
import { ro_menuitem_is_multisize_ } from '../ro_menuitem_is_multisize_.js'
import { ro_menuitem_is_multisize_errors_ } from '../ro_menuitem_is_multisize_errors_.js'
import type { ro_menuitems$_T } from '../ro_menuitems$_b.js'
import { ro_menuitems$_b } from '../ro_menuitems$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { HeadingDetails_goBack_b } from './HeadingDetails_goBack_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const confirmModal$ = confirmModal$_b(ctx)
const HeadingDetails_goBack = HeadingDetails_goBack_b(ctx)
const innerWidth_gt_SCREEN_MD_MIN$ = innerWidth_gt_SCREEN_MD_MIN$_b(ctx)
const innerWidth_lte_SCREEN_MD_MIN$ = innerWidth_lte_SCREEN_MD_MIN$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
const notyf_error = notyf_error_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const params_HeadingID$ = params_HeadingID$_b(ctx)
const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
const ro_httpClient:RoHttpClient = ro_httpClient_b(ctx)
const ro_menuitems$:ro_menuitems$_T = ro_menuitems$_b(ctx)
const subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(ctx)
onDestroy(subscribe_ERR_INVALID_ACCESS(
	ro_menuitems$.is_ERR_INVALID_ACCESS$, 'HeadingDetailsList'
))
async function onitemclick_ro_menuitems(evt:Sortable_itemclick_evt_T<RoMenuitem_I>) {
	const menuitem = evt.detail.item
	await goto_ro_menuitem(menuitem)
}
async function goto_ro_menuitem(ro_menuitem?:RoMenuitem_I) {
	ro_menuitem = ro_menuitem || ({} as RoMenuitem_I)
	await navigating_goto([
		Path.RO.BASE, Path.RO.MANAGE_RESTAURANT, $params_fireFlyID$,
		Path.RO.MENU_DETAILS, $params_MasterheadingID$,
		Path.RO.CATEGORY_DETAILS, $params_HeadingID$,
		Path.RO.MENU_ITEM_DETAILS,
		ro_menuitem.ID || 0
	])
}
async function onsort_ro_menuitems(evt:Sortable_sort_evt_T<RoMenuitem_I[]>) {
	const ro_menuitems_a = evt.detail.out_list
	set_list_SortID(ro_menuitems_a)
	const rollback_value = ro_menuitems_a
	ro_menuitems$.set(ro_menuitems_a)
	const rollback = ()=>{
		notyf_error(SORT_ERROR_MSG)
		ro_menuitems$.set(rollback_value)
	}
	try {
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, $params_fireFlyID$)
		const body:onsort_ro_menuitems_body_T = {
			SortDetails: []
		}
		for (const menuitem of $ro_menuitems$) {
			if (menuitem.ID > 0) {
				body.SortDetails.push({
					ID: menuitem.ID,
					SortID: menuitem.SortID,
				})
			}
		}
		const payload = await ro_httpClient.API_MENUS_menu_sort(requestData, body)
		if (payload.Status !== 'success') {
			rollback()
		}
	} catch (err) {
		rollback()
		throw err
	}
}
interface onsort_ro_menuitems_body_T {
	SortDetails:{
		ID:number
		SortID:number
	}[]
}
async function toggle_ShowImageInGallery(evt:CheckBox_change_evt_T, ro_menuitem:RoMenuitem_I) {
	ro_menuitem.ShowImageInGallery = evt.detail as boolean
	ro_menuitems$.refresh()
	await API_MENUS_menu_update(ro_menuitem)
}
async function toggle_active_ro_menuitem(evt:CheckBox_change_evt_T, ro_menuitem:RoMenuitem_I) {
	const Enabled = evt.detail as boolean
	if (Enabled) {
		const API_MENUS_menusize_list_payload = (
			await API_MENUS_menusize_list_payload_(ro_httpClient, $params_fireFlyID$, ro_menuitem.ID)
		) as successAPI_MENUS_menusize_list_payload__T
		const ro_menuoptionsizes_v = API_MENUS_menusize_list_payload.Data || []
		if (ro_menuitem_is_multisize_(ro_menuitem)) {
			const ro_menuitem_is_multisize_errors = ro_menuitem_is_multisize_errors_(true, ro_menuoptionsizes_v)
			if (ro_menuitem_is_multisize_errors.length) {
				await notyf_error(ro_menuitem_is_multisize_errors[0])
				ro_menuitem.menuoptionsizes_errors = ro_menuitem_is_multisize_errors
				ro_menuitem.Enabled = false
				ro_menuitems$.refresh()
				return
			}
		}
	}
	ro_menuitem.menuoptionsizes_errors = []
	ro_menuitem.Enabled = Enabled
	ro_menuitems$.refresh()
	await API_MENUS_menu_update(ro_menuitem)
}
let ro_menu_item_busy = false
async function API_MENUS_menu_del(menuitem:RoMenuitem_I) {
	const confirm = await $confirmModal$.open({
		message: `Are you sure you want to delete ${menuitem.Name}?`,
	})
	if (confirm) {
		ro_menu_item_busy = true
		try {
			await ro_menuitems$.API_MENUS_menu_del(menuitem)
		} finally {
			ro_menu_item_busy = false
		}
	}
}
async function API_MENUS_menu_update(menuitem:RoMenuitem_I) {
	ro_menu_item_busy = true
	try {
		await ro_menuitems$.API_MENUS_menu_update(menuitem)
	} finally {
		ro_menu_item_busy = false
	}
}
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div
	class="HeadingDetailsList"
	class:no-result-placeholder={!$ro_menuitems$?.length}
	class:menu-info-table={$ro_menuitems$?.length}
>
	{#if !$ro_menuitems$?.length}
    <div class="burger-search-fail-icon"></div>
    <div class="placeholder-title">You have no menu item</div>
    <div class="placeholder-subtitle">You need add your first item.</div>
    <div class="action-buttons">
      <button type="button" class="btn btn-lg btn-success" on:click={evt => goto_ro_menuitem()}
			>Add Menu Item</button>
      <button
				type="button" class="btn btn-lg btn-success btn-inverse"
				on:click={evt => HeadingDetails_goBack()}
			>Back</button>
    </div>
	{:else}
    <table class="table table-striped table-center table-responsive-sm">
			<thead>
				<tr>
					<th>Photo</th>
					<th>Menu Items</th>
					<th class="hidden-xs">Description</th>
					<th class="multi-size-col">Multi Size</th>
					<th>Show In Gallery</th>
					<th>Active</th>
					<th>Delete</th>
				</tr>
			</thead>
      <tbody>
      <Sortable
				tag="tr"
				list={$ro_menuitems$} key="ID"
				let:item={ro_menuitem} let:index
				on:sort={evt => onsort_ro_menuitems(evt)}
				on:itemclick={evt => onitemclick_ro_menuitems(evt)}
			>
        {#if $innerWidth_gt_SCREEN_MD_MIN$}
					<td>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">
							<img src={api_src_(ro_menuitem.FileName)} width="64px" height="64px" alt={ro_menuitem.Name}>
						</div>
					</td>
        {/if}
				<td class="f-bold">
					<div class="table-responsive-label"></div>
					<div class="table-responsive-value">
						{#if $innerWidth_lte_SCREEN_MD_MIN$}
							<img src={api_src_(ro_menuitem.FileName)} width="64px" height="64px" alt={ro_menuitem.Name}>
						{/if}
						{ ro_menuitem.Name }
						<ValidationMessages errors={ro_menuitem.update_errors||[]}></ValidationMessages>
					</div>
        </td>
        <td>
					<div class="table-responsive-label"></div>
					<div class="table-responsive-value">{ ro_menuitem.Description }</div>
				</td>
        <td>
					<div class="table-responsive-label"></div>
					<div class="table-responsive-value">
						{#if $innerWidth_gt_SCREEN_MD_MIN$}
							<div class="status-circle" class:active={!ro_menuitem.Is_Single_Size}></div>
						{:else}
							<div class="row">
								<div class="col-xs-6 action-container">
									<CheckBox
										class="mt-12"
										toggle={true}
										text="Gallery"
										value={ro_menuitem.ShowImageInGallery}
										on:change={evt => toggle_ShowImageInGallery(evt, ro_menuitem)}
									></CheckBox>
									<ValidationMessages errors={ro_menuitem.ShowImageInGallery_errors||[]}></ValidationMessages>
									<CheckBox
										class="mt-12"
										toggle={true}
										text="Active"
										value={ro_menuitem.Enabled}
										on:change={evt => toggle_active_ro_menuitem(evt, ro_menuitem)}
									></CheckBox>
									<ValidationMessages errors={ro_menuitem.menuoptionsizes_errors||[]}></ValidationMessages>
								</div>
								<div class="col-xs-6 text-align-right">
									<div
										class="status-circle mt-12"
										class:active={!ro_menuitem.Is_Single_Size}
									>Multi Size</div>
									<div
										class="fa fa-times mt-12"
										on:click|stopPropagation={evt => API_MENUS_menu_del(ro_menuitem)}
									><span>Delete</span></div>
									<ValidationMessages errors={ro_menuitem.delete_errors||[]}></ValidationMessages>
								</div>
							</div>
						{/if}
					</div>
        </td>
				{#if $innerWidth_gt_SCREEN_MD_MIN$}
					<td on:click|stopPropagation>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">
							<CheckBox
								toggle={true}
								value={ro_menuitem.ShowImageInGallery}
								on:change={evt => toggle_ShowImageInGallery(evt, ro_menuitem)}
							></CheckBox>
							<ValidationMessages errors={ro_menuitem.ShowImageInGallery_errors||[]}></ValidationMessages>
						</div>
					</td>
					<td on:click|stopPropagation>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">
							<CheckBox
								toggle={true}
								value={ro_menuitem.Enabled}
								on:change={evt => toggle_active_ro_menuitem(evt, ro_menuitem)}
							></CheckBox>
							<ValidationMessages errors={ro_menuitem.menuoptionsizes_errors||[]}></ValidationMessages>
						</div>
					</td>
					<td>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">
							<div
								class="fa fa-times"
								on:click|stopPropagation={evt => API_MENUS_menu_del(ro_menuitem)}
							>{#if $innerWidth_lte_SCREEN_MD_MIN$}<span>Delete</span>{/if}</div>
							<ValidationMessages errors={ro_menuitem.delete_errors||[]}></ValidationMessages>
						</div>
					</td>
				{/if}
      </Sortable>
      </tbody>
    </table>
		<div class="action-buttons">
			<button type="button" class="btn btn-lg btn-success"
							on:click={evt => goto_ro_menuitem()}
			>Add Menu Item</button>
			<button
				type="button" class="btn btn-lg btn-success btn-inverse"
				on:click={evt => HeadingDetails_goBack()}
			>Back</button>
		</div>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.HeadingDetailsList {
	&.no-result-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 48px;
		.placeholder-title {
			font-weight: $lato-black;
			font-size: 24px;
		}
		.placeholder-subtitle {
			margin-top: 6px;
		}
		.action-buttons {
			margin-top: 24px;
		}
	}
	&.menu-info-table {
		position: relative;
		.multi-size-col {
			width: 14%;
		}
	}
	.action-buttons {
		width: 100%;
		margin: 12px 0;
		@media (max-width: $screen-xs-max) {
			display: block;
			.btn {
				display: block;
				margin-bottom: 12px;
				width: 100%;
			}
		}
		@media (min-width: $screen-md-min) {
			.btn:first-child {
				margin-right: 24px;
			}
		}
	}
	.status-circle {
		line-height: 24px;
	}
	.fa-times {
		color: $brand-danger;
		line-height: 24px;
		@media (max-width: $screen-sm-max) {
			text-align: right;
		}
	}
	@media (max-width: $screen-sm-max) {
		.CheckBox {
			display: block;
		}
	}
	.action-container {
		position: relative;
		.ValidationMessages {
			display: block;
		}
	}
}
</style>
