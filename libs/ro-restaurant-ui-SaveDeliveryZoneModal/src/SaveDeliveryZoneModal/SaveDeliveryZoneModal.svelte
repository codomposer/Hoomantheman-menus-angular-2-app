<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ZONE_TYPE_CIRCLE, ZONE_TYPE_POLYGON } from '@menus/web-config'
import { ServiceTypeId, SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, } from '@menus/service-type'
import { validation, ValidationMessages, required_errors_, number_errors_, gte_errors_2 } from '@menus/validation'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { SaveDeliveryZoneModal_c } from './SaveDeliveryZoneModal_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
export const _ = new SaveDeliveryZoneModal_c(ctx)
const {
	busy$, clearPolygonShape, confirmModal$, delivery_zone_map_el$, deliveryZoneItem$, is_modal_open$,
	confirmModal_is_modal_open$, onCircleRadiusChanged, onCircleRadiusSelected, onPolygonSelected, save,
} = _
export const open = _.open, close = _.close
let delivery_zone_map_el
$: $delivery_zone_map_el$ = delivery_zone_map_el
let form, form_errors = []//region
let Name_errors = [], MinimumOrderCost_errors = [], DeliveryCharge_errors = [], PreparationTime_Days_errors = [],
	PreparationTime_Hours_errors = [], PreparationTime_Minutes_errors = [], CircleRadius_errors = []
$: form_errors = [
	...Name_errors, ...MinimumOrderCost_errors, ...DeliveryCharge_errors, ...PreparationTime_Days_errors,
	...PreparationTime_Hours_errors, ...PreparationTime_Minutes_errors, ...CircleRadius_errors
]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<!-- Modal -->
{#if $is_modal_open$ && !$confirmModal_is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal delivery-zone-modal fade d-block in"
			 on:click={evt => close()}
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog modal-lg" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click|stopPropagation={evt => close()}
									aria-label="Close"
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title" id="myModalLabel">Delivery Zone</h4>
        </div>
        <form bind:this={form} novalidate
							on:submit|preventDefault={evt => form_errors.length || save()}
				>
          <div class="modal-body modal-scrollable">
            {#if $busy$}
              <PageLoader></PageLoader>
            {/if}
						<div class="clearfix">
              <div class="map-section">
                <div bind:this={delivery_zone_map_el} id="delivery-zone-map"></div>
              </div>
              <div class="delivery-details">
                <div class="form-group input-container"
										 class:has-error={Name_errors.length}
								>
                  <label for="Name">Name</label>
                  <input type="text" name="Name" id="Name"
												 class="form-control"
												 required
												 bind:value={$deliveryZoneItem$.Name}
												 use:validation={$deliveryZoneItem$.Name, ['Name', required_errors_]}
												 on:errors={evt => Name_errors = evt.detail}
									/>
                  <ValidationMessages errors={Name_errors}></ValidationMessages>
                </div>
                <div class="form-group input-container"
										 class:has-error={MinimumOrderCost_errors.length}
								>
                  <label for="MinimumOrderCost">Minimum Order Cost ($)</label>
                  <input type="number" name="MinimumOrderCost" id="MinimumOrderCost"
												 class="form-control"
												 required
												 bind:value={$deliveryZoneItem$.MinimumOrderCost}
												 use:validation={$deliveryZoneItem$.MinimumOrderCost, ['Minimum Order Cost',
                           required_errors_, number_errors_, gte_errors_2(0)
                         ]}
												 on:errors={evt => MinimumOrderCost_errors = evt.detail}
									/>
                  <ValidationMessages errors={MinimumOrderCost_errors}></ValidationMessages>
                </div>
                <div class="form-group input-container"
										 class:has-error={DeliveryCharge_errors.length}
								>
                  <label for="DeliveryCharge">Delivery Charge ($)</label>
                  <input type="number" name="DeliveryCharge" id="DeliveryCharge"
												 class="form-control"
												 required
												 bind:value={$deliveryZoneItem$.DeliveryCharge}
												 use:validation={$deliveryZoneItem$.DeliveryCharge, ['Delivery Charge',
                           required_errors_, number_errors_, gte_errors_2(0)
                         ]}
												 on:errors={evt => DeliveryCharge_errors = evt.detail}
									/>
                  <ValidationMessages errors={DeliveryCharge_errors}></ValidationMessages>
                </div>
                <div class="prep-time-label">Preparation Time</div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group input-container"
												 class:has-error={PreparationTime_Days_errors.length}
										>
                      <label for="PreparationTime_Days">Days</label>
                      <input type="number" name="PreparationTime_Days"
														 id="PreparationTime_Days"
														 placeholder="Days"
														 class="form-control"
														 required
														 bind:value={$deliveryZoneItem$.PreparationTime_Days}
														 use:validation={$deliveryZoneItem$.PreparationTime_Days, ['Preparation Time Days',
                               required_errors_, number_errors_, gte_errors_2(0)
                             ]}
														 on:errors={evt => PreparationTime_Days_errors = evt.detail}
											/>
                      <ValidationMessages errors={PreparationTime_Days_errors}></ValidationMessages>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group input-container"
												 class:has-error={PreparationTime_Hours_errors.length}
										>
                      <label for="PreparationTime_Hours">Hours</label>
                      <input type="number" name="PreparationTime_Hours"
														 id="PreparationTime_Hours"
														 class="form-control"
														 placeholder="Hours"
														 required
														 bind:value={$deliveryZoneItem$.PreparationTime_Hours}
														 use:validation={$deliveryZoneItem$.PreparationTime_Hours, ['Preparation Time Hours',
                               required_errors_, number_errors_, gte_errors_2(0)
                             ]}
														 on:errors={evt => PreparationTime_Hours_errors = evt.detail}
											/>
                      <ValidationMessages errors={PreparationTime_Hours_errors}></ValidationMessages>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group input-container"
												 class:has-error={PreparationTime_Minutes_errors.length}
										>
                      <label for="PreparationTime_Minutes">Minutes</label>
                      <input type="number" name="PreparationTime_Minutes"
														 id="PreparationTime_Minutes"
														 placeholder="Minutes"
														 class="form-control"
														 required
														 bind:value={$deliveryZoneItem$.PreparationTime_Minutes}
														 use:validation={$deliveryZoneItem$.PreparationTime_Minutes, ['Preparation Time Minutes',
                               required_errors_, number_errors_, gte_errors_2(0)
                             ]}
														 on:errors={evt => PreparationTime_Minutes_errors = evt.detail}
											/>
                      <ValidationMessages errors={PreparationTime_Minutes_errors}></ValidationMessages>
                    </div>
                  </div>
                </div>
                <div class="form-group select-service-type">
                  <label for="ServiceTypeID">Service Type</label>
                  <select class="form-control"
													name="ServiceTypeID" id="ServiceTypeID"
													bind:value={$deliveryZoneItem$.ServiceTypeID}
													required
									>
                    <option value={ServiceTypeId[SERVICE_TYPE_DELIVERY]}>
                      Delivery
                    </option>
                    <option value={ServiceTypeId[SERVICE_TYPE_CATERING]}>
                      Catering
                    </option>
                  </select>
                </div>
                <div>Zone Type</div>
                <div class="radio-area">
                  <div class="radio polygon" on:click={evt => onPolygonSelected()}>
                    <label for="ZONE_TYPE_POLYGON">
                      <input type="radio" name="radioDeliveryZoneModal"
														 id="ZONE_TYPE_POLYGON"
														 value={ZONE_TYPE_POLYGON}
														 bind:group={$deliveryZoneItem$.ZoneType}
											/>
                      <span class="icon"></span>
                      <span class="text">Polygon
                        <span class="text-success text-clear"
															on:click={evt => clearPolygonShape()}
												>Clear</span></span>
                    </label>
                  </div>
                  <div class="radio circle-radius form-inline">
                    <label on:click={evt => onCircleRadiusSelected()} for="ZONE_TYPE_CIRCLE">
                      <input type="radio" name="radioDeliveryZoneModal" id="ZONE_TYPE_CIRCLE"
														 value={ZONE_TYPE_CIRCLE}
														 bind:group={$deliveryZoneItem$.ZoneType}
											/>
                      <span class="icon"></span>
                      <span class="text">Circle - Radius (in-miles):</span>
                    </label>

                    <div class="form-group circle-radius-input"
												 class:has-error={CircleRadius_errors.length}
										>
                      <input type="text" class="form-control" name="CircleRadius"
														 disabled={$deliveryZoneItem$.ZoneType !== ZONE_TYPE_CIRCLE}
														 required
														 bind:value={$deliveryZoneItem$.CircleRadius}
														 use:validation={$deliveryZoneItem$.CircleRadius, [
                               'Radius',
                               ($deliveryZoneItem$.ZoneType === ZONE_TYPE_CIRCLE) ? required_errors_ : null,
                             ]}
														 on:errors={evt => CircleRadius_errors = evt.detail}
														 on:change={evt => onCircleRadiusChanged()}
											/>
                      <ValidationMessages errors={CircleRadius_errors}></ValidationMessages>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <button type="submit" class="col-xs-6 btn btn-lg btn-success">Save</button>
              <button type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
											on:click={evt => close()}
							>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.modal.delivery-zone-modal {
	page-loader {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 1;
		transform: translate(-50px, -50px);
	}
	.delivery-details {
		padding: 44px 10px 0;
		.text-success {
			&.text-clear {
				margin-left: 8px;
			}
		}
		.circle-radius-input {
			padding-left: 11px;
			input {
				display: inline-block;
				width: 80px;
				height: 40px;
				margin-right: 16px;
				@media (max-width: $screen-xs-max) {
					margin-top: 16px;
				}
			}
		}
		.radio-area {
			margin-top: 30px;
			.radio {
				&.polygon {
					margin-bottom: 20px;
				}
				&.circle-radius {
					label {
						vertical-align: middle;
					}
				}
			}
		}
		.prep-time-label {
			margin-bottom: 7px;
		}
	}
	.map-section {
		padding: 0 10px;
	}
	.modal-footer {
		border-top: 1px solid #DBDBDB;
		padding: 40px 40px 100px;
		@media (min-width: $screen-sm-min) {
			padding-bottom: 40px;
		}
	}
	.rest-map-marker {
		position: absolute;
		z-index: 1;
		height: 28px;
		width: 28px;
		cursor: pointer;
		background-color: #455A64;
		border: 4px solid #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		margin-left: -14px; // Should be half of element width
		margin-top: -14px; // Should be half of element height
	}
	.map-section {
		position: relative;
	}
	.delivery-details {
		width: 100%;
		float: left;
	}
	.map-section {
		width: 100%;
		float: right;
		#delivery-zone-map {
			width: 100%;
			height: 600px;
		}
	}
	@media (min-width: $screen-md-min) {
		.delivery-details {
			width: 40%;
		}
		.map-section {
			width: 60%;
		}
	}
}
</style>
