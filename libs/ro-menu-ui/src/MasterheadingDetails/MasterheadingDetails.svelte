<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { Sortable } from '@menus/dnd'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b, } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { CheckBox } from '@menus/form-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { MenuSearchBox } from '../MenuSearchBox/index.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import SaveHeadModal from '../SaveHeadModal/SaveHeadModal.svelte'
import SaveScheduleModal from '../SaveScheduleModal/SaveScheduleModal.svelte'
import { MasterheadingDetails_c } from './MasterheadingDetails_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
export const _ = new MasterheadingDetails_c(ctx)
const { busy$, heading_list$, saveScheduleModal$, saveHeadModal$, selected_ro_masterheading$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<EnsureFontAwesome></EnsureFontAwesome>
{#if !$busy$}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
<div class="MasterheadingDetails page">
  <div class="main-contents">
    <SaveScheduleModal bind:this={$saveScheduleModal$}></SaveScheduleModal>
    <SaveHeadModal bind:this={$saveHeadModal$} on:additem={evt => _.onadditem__SaveHeadModal(evt)}></SaveHeadModal>
		{#if $busy$ || !$selected_ro_masterheading$}
      <PageLoader></PageLoader>
    {:else}
      <div class="page-title-section">
				<div class="page-title-text" on:click={evt => _.goBack()}>
					<div class="arrow-left-icon"></div>
					{ $selected_ro_masterheading$.Name }
				</div>
        <div class="masterhead-details-section">
          <div class="row">
            <div class="col-sm-3 details-item">
              { $selected_ro_masterheading$.Description }
            </div>
            <div class="col-sm-6 details-item">
              <div class="service-type-name">
                <div class="status-circle" class:active={$selected_ro_masterheading$.IsDelivery}>Delivery</div>
              </div>
              <div class="service-type-name service-type-dinein">
                <div class="status-circle" class:active={$selected_ro_masterheading$.IsDiningIn}>Dining-In</div>
              </div>
              <div class="service-type-name">
                <div class="status-circle" class:active={$selected_ro_masterheading$.IsPickup}>Pickup</div>
              </div>
              <div class="service-type-name service-type-catering">
                <div class="status-circle" class:active={$selected_ro_masterheading$.IsCatering}>Catering</div>
              </div>
            </div>
            <div class="col-sm-1 col-xs-6 details-item">
              <a class="h-link fa fa-calendar" href="."
								 on:click|preventDefault={evt => _.open_saveScheduleModal()}
							>{#if $innerWidth_lte_SCREEN_SM_MIN$}<span>Schedule</span>{/if}</a>
            </div>
            <div class="col-sm-2 col-xs-6 details-item">
              <CheckBox
								toggle={true}
								text="Enabled"
								bind:value={$selected_ro_masterheading$.Enabled}
								on:change={evt => _.onchange_masterheading_Enabled()}
							></CheckBox>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-search-box-wrapper">
        <MenuSearchBox></MenuSearchBox>
      </div>
			{#if !$heading_list$?.length}
        <div class="no-result-placeholder">
          <div class="burger-search-fail-icon"></div>
          <div class="placeholder-title">You can add categories for your menu</div>
          <div class="placeholder-subtitle">Click on the button below to add a category.</div>
          <div class="placeholder-action-buttons">
            <button class="btn btn-lg btn-success" on:click={evt => _.openSaveHeadModal()}>Add Category</button>
            <button class="btn btn-lg btn-success btn-inverse" on:click={evt => _.goBack()}>Back</button>
          </div>
        </div>
      {:else}
				<table class="menu-info-table table table-striped table-center table-responsive-xs">
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Description</th>
							<th>Active</th>
							<th>Action</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<Sortable
							tag="tr"
							list={$heading_list$||[]} key="ID"
							let:item={head} let:index
							on:sort={evt => _.onsort_heading_list(evt)}
							on:itemclick={evt => _.goto_headDetails(evt)}
						>
							<td class="f-bold">{ head.Name }</td>
							<td>{ head.Description }</td>
							{#if $innerWidth_gt_SCREEN_SM_MIN$}
								<td>
									<CheckBox
										toggle={true}
										text={$innerWidth_lte_SCREEN_SM_MIN$ ? 'Active' : ''}
										value={head.Enabled}
										on:change={evt => _.onchange_head_Enabled(evt, head)}
									></CheckBox>
								</td>
							{/if}
							{#if $innerWidth_lte_SCREEN_SM_MIN$}
								<td>
									<div class="row">
										<CheckBox
											toggle={true}
											class="col-xs-6"
											text="Active"
											value={head.Enabled}
											on:change={evt => _.onchange_head_Enabled(evt, head)}
										></CheckBox>
										<div
											class="col-xs-3 fa fa-pencil"
											on:click|stopPropagation={evt => _.openSaveHeadModal(head)}
										>Edit</div>
										<div
											class="col-xs-3 fa fa-times"
											on:click|stopPropagation={evt => _.deleteHead(index, head)}
										>Delete</div>
									</div>
								</td>
							{/if}
							{#if $innerWidth_gt_SCREEN_SM_MIN$}
								<td>
									<div class="fa fa-pencil" on:click|stopPropagation={evt => _.openSaveHeadModal(head)}></div>
								</td>
								<td on:click|stopPropagation>
									<div class="fa fa-times" on:click|stopPropagation={evt => _.deleteHead(index, head)}></div>
								</td>
							{/if}
						</Sortable>
					</tbody>
				</table>
				<div class="action-buttons menu-details">
					<button class="btn btn-lg btn-success" on:click={evt => _.openSaveHeadModal()}>Add Category</button>
					<button class="btn btn-lg btn-success btn-inverse" on:click={evt => _.goBack()}>Back</button>
				</div>
      {/if}
    {/if}
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.MasterheadingDetails {
	.main-contents {
		.page-title-section {
			.masterhead-details-section {
				margin-top: 16px;
				.details-item {
					@media (max-width: $screen-xs-max) {
						text-align: center;
					}
					.service-type-name {
						font-weight: $lato-bold;
						display: inline-block;
						margin-right: 8px;
					}
					.fa-calendar {
						line-height: 24px;
					}
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
				.btn {
					&:first-child {
						margin-right: 24px;
					}
				}
			}
		}
		.menu-info-table {
			border-bottom: 1px solid #DBDBDB;
		}
		.action-buttons.menu-details {
			margin: 12px 0;
			.btn {
				min-width: 120px;
			}
		}
	}
	.fa {
		line-height: 24px;
	}
}
</style>
