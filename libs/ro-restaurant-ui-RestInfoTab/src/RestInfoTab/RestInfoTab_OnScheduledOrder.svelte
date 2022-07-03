<script context="module" lang="ts">
interface OnScheduledOrderMinutes_presenter_T {
	days:number
	hours:number
	minutes:number
	started:boolean
}
</script>

<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { day_minutes, hour_minutes } from '@menus/date'
import { CheckBox } from '@menus/form-ui'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ValidationMessages } from '@menus/validation'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
const ro_restaurant$ = ro_restaurant$_b(ctx)
export let OnScheduledOrderMinutes_errors = []
let OnScheduledOrderMinutes:number, days = 0, hours = 0, minutes = 0, started = false
let OnScheduledOrderMinutes_presenter:OnScheduledOrderMinutes_presenter_T
$: OnScheduledOrderMinutes_presenter = {
	days: 0, hours: 0, minutes: 0, started: false
}
$: {
	if (OnScheduledOrderMinutes == null) {
		OnScheduledOrderMinutes = $ro_restaurant$?.CallOnScheduledOrderMinutes
		OnScheduledOrderMinutes_presenter = rebalanced_OnScheduledOrderMinutes_presenter_(OnScheduledOrderMinutes)
	}
	const rebalanced_OnScheduledOrderMinutes_presenter =
		rebalanced_OnScheduledOrderMinutes_presenter_(
			OnScheduledOrderMinutes_presenter_minutes_(OnScheduledOrderMinutes_presenter)
		)
	if (
		rebalanced_OnScheduledOrderMinutes_presenter.days !== days
		|| rebalanced_OnScheduledOrderMinutes_presenter.hours !== hours
		|| rebalanced_OnScheduledOrderMinutes_presenter.minutes !== minutes
	) {
		OnScheduledOrderMinutes_presenter = rebalanced_OnScheduledOrderMinutes_presenter
	}
	if (OnScheduledOrderMinutes !== OnScheduledOrderMinutes_presenter_minutes_(OnScheduledOrderMinutes_presenter)) {
		if (
			OnScheduledOrderMinutes
			!== OnScheduledOrderMinutes_presenter_minutes_(OnScheduledOrderMinutes_presenter)
		) {
			OnScheduledOrderMinutes =
				OnScheduledOrderMinutes_presenter_minutes_(OnScheduledOrderMinutes_presenter)
		}
		if ($ro_restaurant$?.CallOnScheduledOrderMinutes !== OnScheduledOrderMinutes) {
			$ro_restaurant$.CallOnScheduledOrderMinutes = OnScheduledOrderMinutes
			$ro_restaurant$.EmailOnScheduledOrderMinutes = OnScheduledOrderMinutes
			$ro_restaurant$.FaxOnScheduledOrderMinutes = OnScheduledOrderMinutes
			$ro_restaurant$.SMSOnScheduledOrderMinutes = OnScheduledOrderMinutes
		}
	}
}
function rebalanced_OnScheduledOrderMinutes_presenter_(in_OnScheduledOrderMinutes:number):{
	days:number
	hours:number
	minutes:number
	started:boolean
} {
	const OnScheduledOrderMinutes = valid_OnScheduledOrderMinutes_(in_OnScheduledOrderMinutes)
	return {
		days: Math.floor(OnScheduledOrderMinutes / day_minutes),
		hours: Math.floor((OnScheduledOrderMinutes % day_minutes) / hour_minutes),
		minutes: Math.floor(OnScheduledOrderMinutes % hour_minutes),
		started: true,
	}
}
function valid_OnScheduledOrderMinutes_(in_OnScheduledOrderMinutes:number):number {
	return Math.min(7 * day_minutes - 1, Math.max(0, in_OnScheduledOrderMinutes))
}
function OnScheduledOrderMinutes_presenter_minutes_(OnScheduledOrderMinutes_presenter_):number {
	return (
		OnScheduledOrderMinutes_presenter_.days * day_minutes
		+ OnScheduledOrderMinutes_presenter_.hours * hour_minutes
		+ OnScheduledOrderMinutes_presenter_.minutes
	)
}
</script>

{#if $ro_restaurant$}
<div class="RestInfoTab_OnScheduledOrder">
<div class="section-subheading">Scheduled Order Notification</div>
  <div class="row">
    <div class="col-lg-8 input-container">
      <CheckBox
				text="Send Notification for Scheduled Orders" text_bold={true} toggle={true}
				bind:value={$ro_restaurant$.NotificationOnScheduledOrder}></CheckBox>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-8 input-container OnScheduledOrderMinutes-container">
      <div class="btn-xlg-height">You will be notified</div>
      <div>
        <label>
          <div>Days</div>
          <input type="number" class="form-control"
								 name="OnScheduledOrderMinutes_presenter_days" id="OnScheduledOrderMinutes_presenter_days"
								 placeholder={0}
								 bind:value={days}
					>
        </label>
        <label>
          <div>Hours</div>
          <input type="number" class="form-control"
								 name="OnScheduledOrderMinutes_presenter_hours" id="OnScheduledOrderMinutes_presenter_hours"
								 placeholder={0}
								 bind:value={hours}
					>
        </label>
        <label>
          <div>Minutes</div>
          <input type="number" class="form-control"
								 name="OnScheduledOrderMinutes_presenter_minutes" id="OnScheduledOrderMinutes_presenter_minutes"
								 placeholder={0}
								 bind:value={minutes}
					>
        </label>
      </div>
      <div class="btn-xlg-height">ahead of the preparation time&hellip;</div>
      <ValidationMessages errors={OnScheduledOrderMinutes_errors}></ValidationMessages>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-8">
      <div class="col-sm-6 col-md-6 col-lg-6 input-container">
        <CheckBox text="Call On Scheduled Order" toggle={true}
									disabled={!$ro_restaurant$.NotificationOnScheduledOrder}
									bind:value={$ro_restaurant$.CallOnScheduledOrder}></CheckBox>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 input-container">
        <CheckBox text="Email On Scheduled Order" toggle={true}
									disabled={!$ro_restaurant$.NotificationOnScheduledOrder}
									bind:value={$ro_restaurant$.EmailOnScheduledOrder}></CheckBox>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 input-container">
        <CheckBox text="Fax On Scheduled Order" toggle={true}
									disabled={!$ro_restaurant$.NotificationOnScheduledOrder}
									bind:value={$ro_restaurant$.FaxOnScheduledOrder}></CheckBox>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6 input-container">
        <CheckBox text="SMS On Scheduled Order" toggle={true}
									disabled={!$ro_restaurant$.NotificationOnScheduledOrder}
									bind:value={$ro_restaurant$.SMSOnScheduledOrder}></CheckBox>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
.RestInfoTab_OnScheduledOrder {
	.OnScheduledOrderMinutes-container {
		> div {
			display: inline-block;
		}
		label {
			text-align: center;
		}
		input[type=number] {
			width: 5em;
			text-align: right;
		}
	}
}
</style>
