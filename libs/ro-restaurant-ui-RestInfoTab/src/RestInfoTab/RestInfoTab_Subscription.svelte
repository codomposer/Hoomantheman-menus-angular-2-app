<script lang="ts">
import { is_path_routing } from '@menus/core-routing'
import { shortDate_ } from '@menus/date'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { errors_2, required_errors_ } from '@menus/validation'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { EnableOnlineOrdering_busy$, nextSubscription$, ro_restaurant$, subscription$ } = _
let Name_errors:string[]
$: Name_errors = errors_2(['Name', required_errors_])($ro_restaurant$?.Name)
export let Subscription_errors:string[] = []
$: Subscription_errors = [...Name_errors]
</script>

{#if $ro_restaurant$}
<div class="restaurant-details-section RestInfoTab_Subscription">
  <div class="section-heading">{is_path_routing ? 'Subscription' : 'Looking for you account settings?'}</div>
  <div class="row">
    <div class="col-md-8">
      <div class="subscription-section">
        <div class="subscription-text">
					{#if is_path_routing}
						{#if $subscription$}
							{#if $ro_restaurant$.Subscription_Expired}
								<span>
									Your { $subscription$.Name || '' } subscription expired
									on { shortDate_($ro_restaurant$.Subscription_Expiration) || '' }.
								</span>
							{:else}
								<span>You are currently subscribed to { $subscription$.Name || '' } subscription.</span>
							{/if}
 						{/if}
						{#if $nextSubscription$}
							<span>Your { $nextSubscription$.Name || '' }
								subscription will start at {
									shortDate_($ro_restaurant$.Owner_NextSubscriptionStartDate) }</span>
						{/if}
					{:else}
						<span>Please go to Menu on the web to manage your account settings.</span>
					{/if}
        </div>
				{#if is_path_routing}
					<div class="change-subscription">
						<button use:ladda={$EnableOnlineOrdering_busy$} type="button" class="btn btn-lg btn-success"
										on:click={evt => _.open_subscriptionCheckoutModal()}
						>Change</button>
					</div>
        {/if}
      </div>
    </div>
  </div>
	{#if $ro_restaurant$.EnableOnlineOrdering}
    <div class="section-heading">Restaurant Status</div>
    <div class="row">
      <div class="col-md-8">
        <div class="online-ordering-section">
          <div class="row">
            <div class="col-xs-9">
              {#if $ro_restaurant$.Enabled}
                <span>Thanks for activation Online ordering, please review your Restaurant/Menus
                  Information and fill up required data.</span>
              {/if}
							<span>{ $ro_restaurant$.Enabled ? 'Disable' : 'Enable' } Online ordering</span>
            </div>
            <div class="col-xs-3 text-right">
              <CheckBox toggle={true}
												bind:value={$ro_restaurant$.Enabled}
												on:change={evt => _.save_API_RESTAURANT_enable()}
							></CheckBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="section-heading">Online Ordering</div>
    <div class="row">
      <div class="col-md-8">
        <div class="online-ordering-note">
          <div class="row">
            <div class="col-sm-6 col-lg-7 online-ordering-text">You need to active
              online ordering before you can edit information
            </div>
            <div class="col-sm-6 col-lg-5 active-online-ordering-wrapper">
              <button use:ladda={$EnableOnlineOrdering_busy$} type="button"
											class="btn btn-lg btn-success"
											on:click={evt => _.EnableOnlineOrdering_true()}
							>Active Online Ordering</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
{/if}

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
@import "@menus/css/clearfix";
.RestInfoTab_Subscription {
	.online-ordering-note {
		padding: 36px 16px;
		background-color: rgba(#7C8B92, .3);
		border-radius: 3px;
		.online-ordering-text {
			padding-top: 3px;
		}
		.active-online-ordering-wrapper {
			text-align: right;
			@media (max-width: $screen-xs-max) {
				margin-top: 24px;
			}
			@media (min-width: $screen-lg-min) {
				text-align: right;
			}
		}
	}
	.online-ordering-section {
		padding: 36px 16px;
		background-color: rgba(#7C8B92, .3);
		border-radius: 3px;
		.CheckBox {
			justify-content: flex-end;
		}
	}
	.subscription-section {
		@extend .clearfix;
		padding: 36px 16px;
		background-color: rgba(#7C8B92, .3);
		border-radius: 3px;
		.active-online-ordering-wrapper {
			@media (max-width: $screen-xs-max) {
				margin-top: 24px;
			}
			@media (min-width: $screen-lg-min) {
				text-align: right;
			}
		}
		.subscription-text {
			float: left;
			width: 70%;
			padding-top: 3px;
		}
		.change-subscription {
			float: right;
		}
	}
}
</style>
