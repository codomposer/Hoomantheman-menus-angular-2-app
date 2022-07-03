<script lang="ts">
import { currency_str_ } from '@ctx-core/currency'
import { Sortable } from '@menus/dnd'
import { CheckBox } from '@menus/form-ui'
import { DeliveryMode_HasDeliveryZone_ } from '@menus/ro-user-common'
import { ServiceTypeID_r_ServiceType } from '@menus/service-type-common'
import {
	errors_2, gt_errors_2, gte_errors_2, lte_errors_2, number_errors_, required_errors_, ValidationMessages
} from '@menus/validation'
import { ZONE_TYPE_POLYGON } from '@menus/web-config'
import { Delivery_label } from './RestInfoTab_c.js'
import type { RestInfoTab_c } from './RestInfoTab_c'
import { DELIVERY_MODE_NO_DELIVERY, DELIVERY_MODE_RESTOWNER } from '@menus/web-config'
export let _:RestInfoTab_c, no_delivery:boolean
const {
	DeliveryModes$, DeliveryZone$, DeliveryTime_Max_errors_, ro_restaurant$, selected_DeliveryMode$, subscription$
} = _
let MinOrder_errors:string[], DeliveryCharge_errors:string[], WaivedDeliveryCharge_errors:string[],
	DeliveryTime_Min_errors:string[], DeliveryTime_Max_errors:string[], PickupTime_Min_errors:string[],
	PickupTime_Max_errors:string[]
$: MinOrder_errors = errors_2([
	'Min Order', required_errors_, number_errors_, gte_errors_2(0)
])($ro_restaurant$?.MinOrder)
$: DeliveryCharge_errors = errors_2(['Delivery Charge', number_errors_])(
	$ro_restaurant$?.DeliveryCharge)
$: WaivedDeliveryCharge_errors = errors_2([
	'Waived Delivery Charge', required_errors_, number_errors_, gte_errors_2(0), lte_errors_2(100)
])($ro_restaurant$?.WaivedDeliveryCharge)
$: DeliveryTime_Min_errors = errors_2([
	'Delivery/Catering Time (Min)(Minutes)', required_errors_, number_errors_, gte_errors_2(0)
])($ro_restaurant$?.DeliveryTime_Min)
$: DeliveryTime_Max_errors = errors_2([
	'Delivery/Catering Time (Max)(Minutes)', required_errors_, number_errors_, DeliveryTime_Max_errors_
])($ro_restaurant$?.DeliveryTime_Max)
$: PickupTime_Min_errors = errors_2([
	'Pickup Time (Min)(Minutes)', required_errors_, number_errors_, gt_errors_2(0)
])($ro_restaurant$?.PickupTime_Min)
$: PickupTime_Max_errors = errors_2([
	'Pickup Time (Max)(Minutes)', required_errors_, number_errors_, _.PickupTime_Max_errors_
])($ro_restaurant$?.PickupTime_Max)
export let Delivery_errors:string[]
$:Delivery_errors = [
	...MinOrder_errors, ...WaivedDeliveryCharge_errors, ...DeliveryTime_Min_errors, ...DeliveryTime_Max_errors,
	...PickupTime_Min_errors, ...PickupTime_Max_errors,
]
let rest_owner_and_delivery_disabled:boolean
$: rest_owner_and_delivery_disabled =
	!$ro_restaurant$
	|| !$ro_restaurant$.EnableOnlineOrdering
	|| $ro_restaurant$.DeliveryModeID === DELIVERY_MODE_NO_DELIVERY
	|| $ro_restaurant$.DeliveryModeID === DELIVERY_MODE_RESTOWNER
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_Delivery" class="RestInfoTab_Delivery">
  <div class="section-heading">{Delivery_label}</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container">
        <label for="rest_DeliveryModeID">Delivery Type</label>
        <select class="form-control" name="DeliveryModeID" id="rest_DeliveryModeID"
								bind:value={$ro_restaurant$.DeliveryModeID}
								disabled={!$ro_restaurant$.EnableOnlineOrdering}
				>
          {#each $DeliveryModes$ || [] as delivery_mode}
            <option value={delivery_mode.ID}>{ delivery_mode.Name }</option>
          {/each}
        </select>
      </div>
      <div class="form-group input-container"
					 class:has-error={MinOrder_errors.length}
			>
        <label for="rest_MinOrder">Delivery/Catering Minimum Order ($)</label>
        <input type="number" class="form-control" name="MinOrder" id="rest_MinOrder"
							 disabled={rest_owner_and_delivery_disabled}
							 required
							 bind:value={$ro_restaurant$.MinOrder}
				>
        <ValidationMessages errors={MinOrder_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={DeliveryTime_Min_errors.length}
					>
            <label for="rest_DeliveryTime_Min">Delivery/Catering Time (Min)(Minutes)</label>
            <input type="number" class="form-control" name="DeliveryTime_Min"
									 id="rest_DeliveryTime_Min"
									 disabled={no_delivery}
									 required
									 bind:value={$ro_restaurant$.DeliveryTime_Min}
						>
            <ValidationMessages errors={DeliveryTime_Min_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={DeliveryTime_Max_errors.length}
					>
            <label for="rest_DeliveryTime_Max">Delivery/Catering Time (Max)(Minutes)</label>
            <input type="number" class="form-control" name="DeliveryTime_Max"
									 id="rest_DeliveryTime_Max"
									 disabled={no_delivery}
									 required
									 bind:value={$ro_restaurant$.DeliveryTime_Max}
						>
            <ValidationMessages errors={DeliveryTime_Max_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={PickupTime_Min_errors.length}
					>
            <label for="rest_PickupTime_Min">Pickup Time (Min)(Minutes)</label>
            <input type="number" class="form-control" name="PickupTime_Min"
									 id="rest_PickupTime_Min"
									 required
									 bind:value={$ro_restaurant$.PickupTime_Min}
						>
            <ValidationMessages errors={PickupTime_Min_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={PickupTime_Max_errors.length}
					>
            <label for="rest_PickupTime_Max">Pickup Time (Max)(Minutes)</label>
            <input type="number" class="form-control" name="PickupTime_Max"
									 id="rest_PickupTime_Max"
									 required
									 bind:value={$ro_restaurant$.PickupTime_Max}
						>
            <ValidationMessages errors={PickupTime_Max_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <!-- TODO: Depends on selected delivery mode, Edit only in-case of their own delivery -->
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group input-container"
							 class:has-error={DeliveryCharge_errors.length}
					>
            <label for="rest_DeliveryCharge1">Delivery/Catering Charge ($)</label>
            <input type="number" class="form-control" name="DeliveryCharge1" id="rest_DeliveryCharge1"
									 disabled={true}
									 bind:value={$ro_restaurant$.DeliveryCharge}
						>
            <ValidationMessages errors={DeliveryCharge_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
				{#if !'disable'}
          <div class="col-lg-4">
            <div class="form-group input-container"
								 class:has-error={WaivedDeliveryCharge_errors.length}
						>
              <label for="rest_WaivedDeliveryCharge">Waived Delivery Charge (%) = {
								$subscription$
								? (
									currency_str_(
										$ro_restaurant$.WaivedDeliveryCharge * ($ro_restaurant$.DeliveryCharge / 100),
										'USD'
									)
								) : ''
							}</label>
              <input type="number" class="form-control" name="WaivedDeliveryCharge"
										 id="rest_WaivedDeliveryCharge"
										 disabled={rest_owner_and_delivery_disabled}
										 required
										 bind:value={$ro_restaurant$.WaivedDeliveryCharge}
							>
              <span class="small">Delivery by delivery company</span>
              <ValidationMessages errors={WaivedDeliveryCharge_errors} input_tooltip={true}></ValidationMessages>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
	{#if DeliveryMode_HasDeliveryZone_($selected_DeliveryMode$)}
    <div class="row">
      <div class="col-lg-8">
        <div class="delivery-zone-list-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>Name</td>
                <td>Service Type</td>
                <td class="hidden-xs">Min Order</td>
                <td class="hidden-xs">Delivery Charge</td>
                <td>Type</td>
                <td>Active</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {#if $DeliveryZone$?.length}
                <Sortable tag="tr"
													list={$DeliveryZone$} key="ID"
													let:item={deliveryZone} let:index
													on:sort={evt => _.onsort_deliveryZoneList(evt)}
													on:itemclick={evt => _.onitemclick_deliveryZoneList(evt)}
								>
                  <td class="f-bold">{ deliveryZone.Name }</td>
                  <td>{ ServiceTypeID_r_ServiceType[deliveryZone.ServiceTypeID] || '' }</td>
                  <td class="hidden-xs">${ deliveryZone.MinimumOrderCost }</td>
                  <td class="hidden-xs">${ deliveryZone.DeliveryCharge }</td>
                  <td>{
										deliveryZone.ZoneType === ZONE_TYPE_POLYGON
										? 'Polygon'
										: `Circle (${deliveryZone.CircleRadius} miles)`
									}</td>
                  <td>
                    <CheckBox toggle={true}
															value={deliveryZone.Enabled}
															on:change={evt => _.onchange_deliveryZone_Enabled(evt, deliveryZone)}
										></CheckBox>
                  </td>
                  <td>
                    <div class="delete-time-icon"
												 on:click|stopPropagation={evt => _.API_RESTAURANT_dzone_del(index, deliveryZone)}
										></div>
                  </td>
                </Sortable>
              {:else}
                <tr class="text-center">
                  <td colspan="13">No Records to display</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
        <div class="delivery-zone-action-buttons">
          <button type="button"
									class="btn btn-lg btn-success"
									on:click={evt => _.open_saveDeliveryZoneModal()}
					>Add Zone</button>
        </div>
      </div>
    </div>
  {/if}
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_Delivery {
	.section-heading {
		margin-top: 0;
	}
	.delivery-zone-list-table {
		position: relative;
	}
	.delivery-zone-action-buttons {
		margin-bottom: 20px;
	}
	.input-container {
		label {
			display: flex;
			align-items: flex-end;
			height: 32px;
		}
	}
}
</style>
