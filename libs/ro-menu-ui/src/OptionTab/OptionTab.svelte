<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { Row } from '@menus/bootstrap'
import type { Sortable_itemclick_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_SM_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { CheckBox } from '@menus/form-ui'
import { notyf_error_b } from '@menus/notyf'
import { is_navigating$_b, params_fireFlyID$_b } from '@menus/page'
import { API_MENUS_menuoption_sort_b, RoRequestQuery } from '@menus/ro-http'
import type { RoMenuoption_I } from '@menus/ro-shared-models'
import { set_list_SortID } from '@menus/ro-shared-models'
import { PageLoader } from '@menus/shared-ui'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menu_ui_save_API_MENUS_menuoption_b } from '../ro_menu_ui_save_API_MENUS_menuoption_b.js'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { ro_menuoptions$_b } from '../ro_menuoptions$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import { ro_menu_ui_API_MENUS_menuoption_del_b, RoMenuOptionModal } from '../RoMenuOptionModal/index.js'
import { SelectOptionCategoryModal } from '../SelectOptionCategoryModal/index.js'
import { open_RoMenuOptionModal_i_b } from './open_RoMenuOptionModal_i_b.js'
import { RoMenuOptionModal_i$_b } from './RoMenuOptionModal_i$_b.js'
import { SelectOptionCategoryModal_i$_b } from './SelectOptionCategoryModal_i$_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const API_MENUS_menuoption_sort = API_MENUS_menuoption_sort_b(ctx)
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const is_navigating$ = is_navigating$_b(ctx)
const notyf_error = notyf_error_b(ctx)
const open_RoMenuOptionModal_i = open_RoMenuOptionModal_i_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_menu_ui_API_MENUS_menuoption_del = ro_menu_ui_API_MENUS_menuoption_del_b(ctx)
const ro_menuitem$ = ro_menuitem$_b(ctx)
const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
const ro_menuoptions$ = ro_menuoptions$_b(ctx)
const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
const ro_menu_ui_save_API_MENUS_menuoption = ro_menu_ui_save_API_MENUS_menuoption_b(ctx)
const RoMenuOptionModal_i$ = RoMenuOptionModal_i$_b(ctx)
const SelectOptionCategoryModal_i$ = SelectOptionCategoryModal_i$_b(ctx)
let busy = false
$: busy = !$ro_menuitem$ || !$ro_menuoptions$ || !$ro_menuoptionsizes$
async function onsort_ro_menuoptions(evt:Sortable_sort_evt_T<RoMenuoption_I[]>) {
	const ro_menuoptions = evt.detail.out_list
	const rollback_value = ro_menuoptions$.$
	set_list_SortID(ro_menuoptions)
	ro_menuoptions$.$ = ro_menuoptions
	const rollback = ()=>{
		notyf_error(SORT_ERROR_MSG)
		ro_menuoptions$.$ = rollback_value
	}
	try {
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		const body = {
			SortDetails: []
		}
		for (const ro_menuoption of ro_menuoptions$.$) {
			if (ro_menuoption.ID > 0) {
				body.SortDetails.push({
					ID: ro_menuoption.ID,
					SortID: ro_menuoption.SortID,
				})
			}
		}
		const payload = await API_MENUS_menuoption_sort(requestData, body)
		if (payload.Status !== 'success') {
			rollback()
		}
	} catch (err) {
		rollback()
		throw err
	}
}
async function onitemclick_ro_menuoptions(evt:Sortable_itemclick_evt_T<RoMenuoption_I>) {
	return await open_RoMenuOptionModal_i(evt.detail.item)
}
async function toggle_ro_menuoption_Enabled(evt:CheckBox_change_evt_T, ro_menuoption:RoMenuoption_I) {
	ro_menuoption.Enabled = evt.detail as boolean
	ro_menuoptions$.refresh()
	busy = true
	try {
		await ro_menu_ui_save_API_MENUS_menuoption(ro_menuoption)
	} finally {
		busy = false
	}
}
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<RoMenuOptionModal bind:this={$RoMenuOptionModal_i$}></RoMenuOptionModal>
<SelectOptionCategoryModal bind:this={$SelectOptionCategoryModal_i$}></SelectOptionCategoryModal>

<div class="OptionTab">
	{#if busy }
		<PageLoader center="page"></PageLoader>
	{/if}
	{#if !$is_navigating$}
		<table class="table table-striped table-responsive-sm">
			<thead>
				<tr>
					<th>Option Category</th>
					<th>Description</th>
					<th>Active</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{#if !busy && !$ro_menuoptions$?.length}
					<tr><td class="text-center" colspan="6">No Records to display</td></tr>
				{/if}
				<Sortable
					tag="tr"
					list={$ro_menuoptions$} key="ID"
					let:item={ro_menuoption} let:index
					on:sort={evt => onsort_ro_menuoptions(evt)}
					on:itemclick={evt => onitemclick_ro_menuoptions(evt)}
				>
					<td>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value f-bold">{ ro_menuoption.Name }</div>
					</td>
					<td>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">{ ro_menuoption.Description }</div>
					</td>
					<td on:click|stopPropagation>
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value">
							{#if $innerWidth_gt_SCREEN_SM_MIN$}
								<CheckBox
									toggle={true}
									value={ro_menuoption.Enabled}
									on:change={evt => toggle_ro_menuoption_Enabled(evt, ro_menuoption)}
								></CheckBox>
							{:else}
								<Row>
									<div class="col-xs-6">
										<CheckBox
											toggle={true}
											text="Active"
											value={ro_menuoption.Enabled}
											on:change={evt => toggle_ro_menuoption_Enabled(evt, ro_menuoption)}
										></CheckBox>
									</div>
									<div class="col-xs-6 text-align-right">
										<div
											class="fa fa-times"
											on:click={evt => ro_menu_ui_API_MENUS_menuoption_del(index, ro_menuoption)}
										><span>Delete</span></div>
									</div>
								</Row>
							{/if}
						</div>
					</td>
					{#if $innerWidth_gt_SCREEN_SM_MIN$}
						<td on:click|stopPropagation>
							<div
								class="delete-time-icon"
								on:click={evt => ro_menu_ui_API_MENUS_menuoption_del(index, ro_menuoption)}
							></div>
						</td>
					{/if}
				</Sortable>
			</tbody>
		</table>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.OptionTab {
	@media (min-width: $screen-sm-min) {
		padding-top: 24px;
	}
	.fa-times {
		color: $brand-danger;
		line-height: 24px;
	}
}
</style>
