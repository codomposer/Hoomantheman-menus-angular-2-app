<script lang="ts">
import { onDestroy, onMount } from 'svelte'
import { Row } from '@menus/bootstrap'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { CheckBox } from '@menus/form-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { MENUS_TAB } from '@menus/web-config'
import { MenuSearchBox } from '../MenuSearchBox/index.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SaveMasterheadingModal } from '../SaveMasterheadingModal'
import { SaveScheduleModal } from '../SaveScheduleModal/index.js'
import { MenusTab_c } from './MenusTab_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const ro_auth_rules = ro_auth_rules$_b(ctx)
export const _ = new MenusTab_c(ctx)
const { busy$, busy_text$, ro_masterheadings$, saveMasterheadingModal$, saveScheduleModal$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<EnsureFontAwesome></EnsureFontAwesome>
{#if $ro_auth_rules[MENUS_TAB]}
<SaveMasterheadingModal
	bind:this={$saveMasterheadingModal$}
	on:additem={evt => _.onadditem_saveMasterheadingModal(evt)}
></SaveMasterheadingModal>
<SaveScheduleModal bind:this={$saveScheduleModal$}></SaveScheduleModal>
<div class="MenusTab page">
  {#if $busy$}
    <div>
      <PageLoader></PageLoader>
			{#if $busy_text$}
        <h3 class="f-bold text-center">{ $busy_text$ }</h3>
      {/if}
    </div>
  {/if}
	<div class="menu-search-box-wrapper">
		<MenuSearchBox></MenuSearchBox>
	</div>
	{#if $ro_masterheadings$?.length}
		<table class="table table-striped table-responsive-sm">
			<thead>
				<tr>
					<th>Menu</th>
					<th>Description</th>
					<th>Services</th>
					<th></th>
					<th></th>
					<th>Active</th>
					<th>Action</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<Sortable
					tag="tr"
					list={$ro_masterheadings$} key="ID"
					let:item={ro_masterheading} let:index
					on:sort={evt => _.onsort_masterheadings(evt)}
					on:itemclick={evt => _.onitemclick_masterheadings(evt)}
				>
					<td class="f-bold">
						<div class="table-responsive-label"></div>
						<div class="table-responsive-value Name">{ ro_masterheading.Name }</div>
					</td>
					<td>
						<div class="table-responsive-label">Description</div>
						<div class="table-responsive-value">{ ro_masterheading.Description }</div>
					</td>
					<td>
						<div class="table-responsive-label">Services</div>
						<Row class="table-responsive-value">
							<div class="service-type-name" class:col-xs-6={$innerWidth_lte_SCREEN_SM_MIN$}>
								<div class="status-circle"
										 class:active={ro_masterheading.IsDelivery}
								>Delivery</div>
							</div>
							<div class="service-type-name service-type-dinein" class:col-xs-6={$innerWidth_lte_SCREEN_SM_MIN$}>
								<div class="status-circle"
										 class:active={ro_masterheading.IsDiningIn}
								>Dining-In</div>
							</div>
						</Row>
					</td>
					<td>
						<Row class="table-responsive-value">
							<div class="service-type-name" class:col-xs-6={$innerWidth_lte_SCREEN_SM_MIN$}>
								<div
									class="status-circle"
									class:active={ro_masterheading.IsPickup}
								>Pickup</div>
							</div>
							<div class="service-type-name service-type-catering" class:col-xs-6={$innerWidth_lte_SCREEN_SM_MIN$}>
								<div class="status-circle"
										 class:active={ro_masterheading.IsCatering}
								>Catering</div>
							</div>
						</Row>
					</td>
					{#if $innerWidth_gt_SCREEN_SM_MIN$}
						<td on:click|stopPropagation>
							<a href="." class="h-link"
								 on:click|preventDefault|stopPropagation={evt => _.open_saveScheduleModal(ro_masterheading)}
							>
								<div class="fa fa-calendar"></div>
							</a>
						</td>
						<td>
							<CheckBox
								toggle={true}
								value={ro_masterheading.Enabled}
								on:change={evt => _.onchange_masterHead_Enabled(evt, ro_masterheading)}
							></CheckBox>
						</td>
						<td>
							<div
								class="fa fa-pencil"
								on:click|stopPropagation={evt => _.open_saveMasterheadingModal(ro_masterheading)}
							></div>
						</td>
						<td>
							<div
								class="fa fa-times"
								on:click|stopPropagation={evt => _.delete_masterHead(index, ro_masterheading)}
							></div>
						</td>
					{:else}
						<td>
							<CheckBox
								toggle={true}
								text="Active"
								value={ro_masterheading.Enabled}
								on:change={evt => _.onchange_masterHead_Enabled(evt, ro_masterheading)}
							></CheckBox>
						</td>
						<td>
							<Row class="controls">
								<a href="." class="col-xs-4 fa fa-calendar"
									 on:click|preventDefault|stopPropagation={evt => _.open_saveScheduleModal(ro_masterheading)}
								><span>Schedule</span></a>
								<div
									class="col-xs-4 fa fa-pencil"
									on:click|stopPropagation={evt => _.open_saveMasterheadingModal(ro_masterheading)}
								><span>Edit</span></div>
								<div
									class="col-xs-4 fa fa-times"
									on:click|stopPropagation={evt => _.delete_masterHead(index, ro_masterheading)}
								><span>Delete</span></div>
							</Row>
						</td>
					{/if}
				</Sortable>
			</tbody>
		</table>
		<div class="action-buttons">
			<button
				class="btn btn-lg btn-success"
				on:click={evt => _.open_saveMasterheadingModal()}
			>Add Menu</button>
		</div>
	{:else if $ro_masterheadings$}
		<div class="no-result-placeholder">
			<div class="restaurant-menu-icon"></div>
			<div class="placeholder-title">You have no menu</div>
			<div class="placeholder-subtitle">Click to add a new menu.</div>
			<div class="placeholder-action-buttons">
				<button
					class="btn btn-lg btn-success"
					on:click={evt => _.open_saveMasterheadingModal()}
				>Add Menu</button>
			</div>
		</div>
	{/if}
</div>

{/if}
<style type=text/scss global>
@import "@menus/css/clearfix";
@import "@menus/ro-shared-css/lib";
.MenusTab {
	.menu-search-box-wrapper {
		margin: 16px 0;
	}
	.table {
		thead {
			th {
				padding-top: 0;
			}
		}
		.table-responsive-value.Name {
			@media (max-width: $screen-xs-max) {
				font-weight: bold;
			}
		}
	}
	.service-type-name {
		font-weight: $lato-bold;
		@media (max-width: $screen-xs-max) {
			float: left;
		}
		+ .service-type-name {
			margin-top: 22px;
			@media (max-width: $screen-xs-max) {
				margin-top: 0;
			}
		}
	}
	.no-result-placeholder {
		margin-top: 48px;
		text-align: center;
		.placeholder-title {
			font-weight: $lato-black;
			font-size: 24px;
		}
		.placeholder-subtitle {
			margin-top: 6px;
		}
		.placeholder-action-buttons {
			margin-top: 19px;
		}
	}
	.action-buttons {
		margin: 16px 0 0;
	}
	.controls {
		> * {
			height: 24px;
			line-height: 24px;
		}
	}
	.fa-times {
		color: $brand-danger;
	}
	.status-circle {
		min-width: 80px;
	}
}
</style>
