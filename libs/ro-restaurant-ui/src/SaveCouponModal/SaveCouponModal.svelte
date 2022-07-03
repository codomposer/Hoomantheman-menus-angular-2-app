<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { clone } from '@ctx-core/object'
import { CheckBox, DateTime, Radio, Select } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import type { DateTimeOptions } from '@menus/ro-shared-models'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import {
	digits_errors_, gt_errors_2, lt_errors_2, number_errors_, required_errors_, validation, ValidationMessages
} from '@menus/validation'
import {
	COUPON_TYPE_ITEM_BASED, COUPON_TYPE_ORDER_BASED, DISCOUNT_CRITERIA_FULL, DISCOUNT_CRITERIA_INCREMENTAL,
	DISCOUNT_TYPE_AMOUNT, DISCOUNT_TYPE_PERCENT, DURATION_TYPE_ALWAYS, DURATION_TYPE_DATE,
} from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { SaveCouponModal_c } from './SaveCouponModal_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new SaveCouponModal_c(ctx, dispatch)//region
const {
	busy$, buttons_disabled$, can_update_coupon$, coupon_code_exists_errors$, DailyEndTime_errors$, date_range$,
	is_modal_open$, is_new_coupon$, MaxOrder_gte_MinOrder_errors$, MaxRedeem_gte_MaxRedeemPerCustomer_errors$,
	MenuItems$, menuitems_error$, MenuItems_is_open$, ro_coupon$, ro_restaurant$, save_busy$, serviceType_errors$,
} = _
export const { open, close } = _
let form_errors//region
let CouponCode_errors = [], DiscountValue_errors = [], MinSubtotal_errors = [], MaxSubtotal_errors = [],
	TotalCouponsPerCustomer_errors = [], TotalCoupons_errors = []
$: form_errors = [
	...$coupon_code_exists_errors$, ...$serviceType_errors$, ...CouponCode_errors, ...DiscountValue_errors,
	...MaxSubtotal_errors, ...MinSubtotal_errors, ...TotalCoupons_errors, ...TotalCouponsPerCustomer_errors,
]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
const timeDTOptions:DateTimeOptions = {
	enableTime: true,
	noCalendar: true,
}
</script>

<!-- Modal -->
{#if $is_modal_open$}
<div class="modal-backdrop fade in" on:click={evt => _.close()}></div>
<div class="modal SaveCouponModal save-coupon-modal fade d-block in" on:click={evt => _.close()}>
	<div class="modal-dialog" on:click|stopPropagation>
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close"
								on:click={evt => _.close()}
				>
					<div class="delete-icon"></div>
				</button>
				<h4 class="modal-title" id="myModalLabel">{ $is_new_coupon$ ? 'New Coupon' : $ro_coupon$?.CouponCode }</h4>
			</div>
			<div class="modal-body modal-scrollable">
				<form>
					{#if $busy$ || !$ro_coupon$}
						<PageLoader></PageLoader>
					{:else}
						<!-- Nav tabs -->
						<div class="nav-service-types"
								 class:has-error={$serviceType_errors$.length}
						>
							<ul class="nav nav-pills scrollable">
								<li
									class:active={$ro_coupon$.Delivery}
									class:disabled={!$ro_restaurant$.ST_Delivery_Enabled || !$can_update_coupon$}
									on:click={evt =>
										_.select_serviceType('Delivery', 'Delivery', $ro_restaurant$.ST_Delivery_Enabled)
									}
								><a href="." on:click|preventDefault>Delivery</a>
								</li>
								<li
									class:active={$ro_coupon$.Pickup}
									class:disabled={!$ro_restaurant$.ST_Pickup_Enabled || !$can_update_coupon$}
									on:click={evt =>
										_.select_serviceType('Pickup', 'Pickup', $ro_restaurant$.ST_Pickup_Enabled)
									}
								><a href="." on:click|preventDefault>Pickup</a></li>
								<li
									class:active={$ro_coupon$.Catering}
									class:disabled={!$ro_restaurant$.ST_Catering_Enabled || !$can_update_coupon$}
									on:click={evt =>
										_.select_serviceType('Catering', 'Catering', $ro_restaurant$.ST_Catering_Enabled)
									}
								><a href="." on:click|preventDefault>Catering</a>
								</li>
								<li
									class:active={$ro_coupon$.DiningIn}
									class:disabled={!$ro_restaurant$.ST_DiningIn_Enabled || !$can_update_coupon$}
									on:click={evt =>
										_.select_serviceType('DiningIn', 'Dine-in', $ro_restaurant$.ST_DiningIn_Enabled)
									}
								><a href="." on:click|preventDefault>Dine in</a></li>
							</ul>
							<ValidationMessages errors={$serviceType_errors$} inplace_tooltip={true}></ValidationMessages>
						</div>
						<div class="form-group input-container"
								 class:has-error={CouponCode_errors.length}
						>
							<label for="Code">Code</label>
							<input type="text" class="form-control" name="Code" id="Code"
										 required
										 disabled={!$can_update_coupon$}
										 bind:value={$ro_coupon$.CouponCode}
										 use:validation={$ro_coupon$.CouponCode, ['Code', required_errors_ ]}
										 on:errors={evt => CouponCode_errors = evt.detail}
							/>
							<ValidationMessages errors={
								[...CouponCode_errors, ...$coupon_code_exists_errors$]
							} input_tooltip={true}></ValidationMessages>
						</div>
						<div class="row">
							<div class="col-sm-6">
								<div class="form-group input-container">
									<label for="Description">Description (optional) (internal only)</label>
									<textarea type="text" name="Description" id="Description"
														class="form-control"
														rows="4"
														disabled={!$can_update_coupon$}
														bind:value={$ro_coupon$.Description}
									></textarea>
								</div>
							</div>
							<div class="col-sm-6">
								<div class="form-group input-container">
									<label for="Limitation">Limitation (optional) (internal only)</label>
									<textarea type="text" name="Limitation" id="Limitation"
														class="form-control"
														rows="4"
														disabled={!$can_update_coupon$}
														bind:value={$ro_coupon$.Limitation}
									></textarea>
								</div>
							</div>
						</div>
						<div class="row input-container">
							<div class="col-sm-12">
								<div class="radio-section">
									<Radio inline={true} text="Always Valid"
												 name="optionsDurationTypeRadios"
												 bind:group={$ro_coupon$.DurationType}
												 value={DURATION_TYPE_ALWAYS}
												 disabled={!$can_update_coupon$}
									>
									</Radio>
									<Radio inline={true} text="Choose Dates / Time"
												 name="optionsDurationTypeRadios"
												 bind:group={$ro_coupon$.DurationType}
												 value={DURATION_TYPE_DATE}
												 disabled={!$can_update_coupon$}
									>
									</Radio>
								</div>
							</div>
						</div>
						{#if $ro_coupon$.DurationType === DURATION_TYPE_DATE}
							<div class="row input-container">
								<div class="col-sm-12">
									<div>
										<label for="date_range">Select Dates</label>
										<div id="date_range">
											<DateTime bind:value={$date_range$} id="date_range"
																options={{ mode: 'range', hide_clear: !$can_update_coupon$ }}
																disabled={
																	$ro_coupon$.DurationType !== DURATION_TYPE_DATE
																	|| !$can_update_coupon$
																}
																validation={
																	$ro_coupon$.DurationType === DURATION_TYPE_DATE
																	? ['Date range', required_errors_]
																	: []
																}
											></DateTime>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<div class="input-container">
										<label for="DailyStartTime">Daily Start Time (optional)</label>
										<div id="DailyStartTime">
											<DateTime bind:value={$ro_coupon$.DailyStartTime} id="DailyStartTime"
																options={clone(timeDTOptions, { hide_clear: !$can_update_coupon$ })}
																disabled={
																	$ro_coupon$.DurationType !== DURATION_TYPE_DATE
																	|| !$can_update_coupon$
																}
											></DateTime>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="input-container">
										<label for="DailyEndTime">Daily End Time (optional)</label>
										<div id="DailyEndTime">
											<DateTime bind:value={$ro_coupon$.DailyEndTime} id="DailyEndTime"
																validation={{ validations: $DailyEndTime_errors$ }}
																options={clone(timeDTOptions, { hide_clear: !$can_update_coupon$ })}
																disabled={
																	$ro_coupon$.DurationType != DURATION_TYPE_DATE
																	|| !$can_update_coupon$
																}
											></DateTime>
										</div>
									</div>
								</div>
							</div>
						{/if}
						<div class="row input-container">
							<div class="col-sm-12">
								<div class="radio-section">
									<Radio inline={true} text="Order Based" name="optionsCouponTypeRadios"
												 bind:group={$ro_coupon$.CouponType}
												 value={COUPON_TYPE_ORDER_BASED}
												 on:change={evt => _.change_CouponType()}
												 disabled={!$can_update_coupon$}
									></Radio>
									<Radio inline={true} text="Item Based" name="optionsCouponTypeRadios"
												 bind:group={$ro_coupon$.CouponType}
												 value={COUPON_TYPE_ITEM_BASED}
												 on:change={evt => _.change_CouponType()}
												 disabled={!$can_update_coupon$}
									></Radio>
								</div>
							</div>
						</div>
						{#if $ro_coupon$.CouponType === COUPON_TYPE_ITEM_BASED}
							<div class="row input-container">
								<div class="col-sm-12">
									<Select items={$MenuItems$}
													validation={['Name', $menuitems_error$]}
													itemLabelProp={'Name'}
													readonly={!$can_update_coupon$}
													multiSelect={true}
													bind:is_open={$MenuItems_is_open$}
									></Select>
								</div>
							</div>
						{/if}
						<div class="row input-container">
							<div class="col-sm-12">
								<CheckBox bind:value={$ro_coupon$.Is_AllowBundle}
													text="Bundleable"
													disabled={!$can_update_coupon$}
								></CheckBox>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6">
								<div class="form-group">
									<label for="DiscountType">Discount Type</label>
									<select name="DiscountType" id="DiscountType"
													bind:value={$ro_coupon$.DiscountType}
													class="form-control"
													disabled={
														!$can_update_coupon$
														|| $ro_coupon$.CouponType == COUPON_TYPE_ITEM_BASED
													}
									>
										<option value={DISCOUNT_TYPE_PERCENT}>Percent</option>
										<option value={DISCOUNT_TYPE_AMOUNT}
														hidden={$ro_coupon$.CouponType == COUPON_TYPE_ITEM_BASED}
										>Amount</option>
									</select>
								</div>
							</div>
							<div class="col-sm-6">
								<div class="form-group"
										 class:has-error={DiscountValue_errors.length}
								>
									<label for="DiscountValue">Discount {
										$ro_coupon$.DiscountType === DISCOUNT_TYPE_PERCENT
										? 'Percent (%)'
										: 'Amount ($)'
									}</label>
									<input type="number" class="form-control"
												 name="DiscountValue" id="DiscountValue"
												 required
												 disabled={!$can_update_coupon$}
												 bind:value={$ro_coupon$.DiscountValue}
												 use:validation={$ro_coupon$.DiscountValue, ['Discount',
													 required_errors_, number_errors_, gt_errors_2(0),
													 $ro_coupon$.DiscountType === DISCOUNT_TYPE_AMOUNT
													 && lt_errors_2($ro_coupon$.MinOrder, {
													 })
												 ]}
												 on:errors={evt => DiscountValue_errors = evt.detail}
									/>
									<ValidationMessages errors={DiscountValue_errors} input_tooltip={true}></ValidationMessages>
								</div>
							</div>
						</div>
						{#if $ro_coupon$.CouponType === COUPON_TYPE_ORDER_BASED}
							<div class="row input-container">
								<div class="col-sm-12">
									<div class="radio-section">
										<Radio inline={true} text="Full Discount"
													 name="optionsDiscountCriteriaRadios"
													 bind:group={$ro_coupon$.DiscountCriteria}
													 value={DISCOUNT_CRITERIA_FULL}
													 disabled={!$can_update_coupon$}
										></Radio>
										<Radio inline={true} text="Incremental Discount"
													 name="optionsDiscountCriteriaRadios"
													 bind:group={$ro_coupon$.DiscountCriteria}
													 value={DISCOUNT_CRITERIA_INCREMENTAL}
													 disabled={!$can_update_coupon$}
										></Radio>
									</div>
								</div>
							</div>
						{/if}
						<div class="row">
							<div class="col-sm-6">
								<div class="form-group"
										 class:has-error={MinSubtotal_errors.length}
								>
									<label for="MinSubtotal">Min. Subtotal ($)
										{#if (
											$ro_coupon$.DiscountType === DISCOUNT_TYPE_PERCENT
											&& $ro_coupon$.DiscountCriteria === DISCOUNT_CRITERIA_FULL
										)}
											<span> (optional)</span>
										{/if}
									</label>
									<input type="number" class="form-control"
												 name="MinSubtotal" id="MinSubtotal"
												 disabled={!$can_update_coupon$}
												 bind:value={$ro_coupon$.MinOrder}
												 use:validation={$ro_coupon$.MinOrder, ['Min. Subtotal',
													 (
														 $ro_coupon$.DiscountType !== DISCOUNT_TYPE_PERCENT
														 || $ro_coupon$.DiscountCriteria !== DISCOUNT_CRITERIA_FULL
													 )
													 ? required_errors_ : null,
													 number_errors_, gt_errors_2(0),
													 $ro_coupon$.DiscountType !== DISCOUNT_TYPE_PERCENT
													 && gt_errors_2($ro_coupon$.DiscountValue, {
														 compare_error_text_fn: () =>'Discount'
													 })
												 ]}
												 on:errors={evt => MinSubtotal_errors = evt.detail}
									/>
									<ValidationMessages errors={MinSubtotal_errors} input_tooltip={true}></ValidationMessages>
								</div>
							</div>
							<div class="col-sm-6">
								{#if $ro_coupon$.CouponType !== COUPON_TYPE_ITEM_BASED}
									<div class="form-group"
											 class:has-error={MaxSubtotal_errors.length}
									>
										<label for="MaxSubtotal">Max. Subtotal ($) (optional)</label>
										<input type="number" class="form-control"
													 name="MaxSubtotal" id="MaxSubtotal"
													 disabled={!$can_update_coupon$}
													 bind:value={$ro_coupon$.MaxOrder}
													 use:validation={$ro_coupon$.MaxOrder, ['Max Subtotal',
														 number_errors_, gt_errors_2(0), $MaxOrder_gte_MinOrder_errors$,
													 ]}
													 on:errors={evt => MaxSubtotal_errors = evt.detail}
										/>
										<ValidationMessages errors={MaxSubtotal_errors} input_tooltip={true}></ValidationMessages>
									</div>
								{/if}
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6">
								<div class="form-group"
										 class:has-error={TotalCouponsPerCustomer_errors.length}
								>
									<label for="TotalCouponsPerCustomer">Total Coupons (Per Customer) (optional)</label>
									<input type="number" class="form-control"
												 name="TotalCouponsPerCustomer" id="TotalCouponsPerCustomer"
												 bind:value={$ro_coupon$.MaxRedeemPerCustomer}
												 use:validation={$ro_coupon$.MaxRedeemPerCustomer, ['Total Coupons (Per Customer)',
													 digits_errors_, gt_errors_2(0)
												 ]}
												 on:errors={evt => TotalCouponsPerCustomer_errors = evt.detail}
									/>
									<ValidationMessages errors={TotalCouponsPerCustomer_errors} input_tooltip={true}></ValidationMessages>
								</div>
							</div>
							<div class="col-sm-6">
								<div class="form-group"
										 class:has-error={TotalCoupons_errors.length}
								>
									<label for="TotalCoupons">Total Coupons (optional)</label>
									<input type="number" class="form-control"
												 name="TotalCoupons" id="TotalCoupons"
												 bind:value={$ro_coupon$.MaxRedeem}
												 use:validation={$ro_coupon$.MaxRedeem, ['Total Coupons',
													 digits_errors_, gt_errors_2(0), $MaxRedeem_gte_MaxRedeemPerCustomer_errors$
												 ]}
												 on:errors={evt => TotalCoupons_errors = evt.detail}
									/>
									<ValidationMessages errors={TotalCoupons_errors} input_tooltip={true}></ValidationMessages>
								</div>
							</div>
						</div>
					{/if}
				</form>
			</div>
			{#if !$busy$}
				<div class="modal-footer">
					<div class="row" class:visibility-hidden={$MenuItems_is_open$}>
						<button use:ladda={$save_busy$} type="submit"
										class="col-xs-6 btn btn-lg btn-success"
										on:click|preventDefault={evt => form_errors.length||_.save(evt)}
										disabled={$buttons_disabled$ || form_errors.length}
						>{ $is_new_coupon$ ? 'Add' : 'Save' }</button>
						<button type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
										on:click={evt => _.close()}
										disabled={$buttons_disabled$}
						>Cancel</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.SaveCouponModal {
	.modal-body {
		padding-top: 28px;
		padding-bottom: 96px;
		.Select {
			z-index: 1;
		}
		.nav-service-types {
			margin-bottom: 24px;
		}
		.radio-section {
			.Radio {
				&:first-child {
					padding-left: 0;
				}
			}
		}
	}
	.modal-footer {
		padding-top: 24px;
		padding-bottom: 100px;
		border-top: 1px solid #DBDBDB;
		@media (min-width: $screen-sm-min) {
			padding-bottom: 20px;
		}
		.action-buttons {
			&.visibility-hidden {
				visibility: hidden;
			}
		}
	}
}
</style>
