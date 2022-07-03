<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { ladda } from '@menus/ladda'
import { ro_sideMenuOpened$_b } from '@menus/ro-layout-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { SubscriptionCheckoutModal } from '@menus/ro-restaurant-ui'
import { RestContractModal } from '@menus/ro-restaurant-ui-RestContractModal'
import { SaveDeliveryZoneModal } from '@menus/ro-restaurant-ui-SaveDeliveryZoneModal'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { gte_errors_2, errors_2 } from '@menus/validation'
import { DELIVERY_MODE_NO_DELIVERY, REST_INFO_TAB } from '@menus/web-config'
import {
	ContactDetails_label, Contacts_label, Holidays_label, nav_item_a, OrderSettings_label, RestaurantAddress_label,
	RestaurantDetails_label, RestInfoTab_c,
} from './RestInfoTab_c.js'
import RestInfoTab_OnScheduledOrder from './RestInfoTab_OnScheduledOrder.svelte'
import RestInfoTab_Subscription from './RestInfoTab_Subscription.svelte'
import RestInfoTab_RestaurantDetails from './RestInfoTab_RestaurantDetails.svelte'
import RestInfoTab_RestaurantAddress from './RestInfoTab_RestaurantAddress.svelte'
import RestInfoTab_Contacts from './RestInfoTab_Contacts.svelte'
import RestInfoTab_ContactDetails from './RestInfoTab_ContactDetails.svelte'
import RestInfoTab_TaxSettings from './RestInfoTab_TaxSettings.svelte'
import RestInfoTab_OrderSettings from './RestInfoTab_OrderSettings.svelte'
import RestInfoTab_Delivery from './RestInfoTab_Delivery.svelte'
import RestInfoTab_WorkingHours from './RestInfoTab_WorkingHours.svelte'
import RestInfoTab_DeliveryHours from './RestInfoTab_DeliveryHours.svelte'
import RestInfoTab_Holidays from './RestInfoTab_Holidays.svelte'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
const ro_sideMenuOpened$ = ro_sideMenuOpened$_b(ctx)
export const _ = new RestInfoTab_c(ctx, dispatch)
const {
	activeNavItemID$, busy$, isNavFixed$, ro_restaurant$, restContractModal$, saveDeliveryZoneModal$,
	subscriptionCheckoutModal$
} = _
let ContactDetails_errors:string[] = [], Contacts_errors:string[] = [], Delivery_errors:string[] = [],
	Holidays_errors:string[] = [], OnScheduledOrderMinutes_errors:string[] = [], RestaurantAddress_errors:string[] = [],
	Subscription_errors:string[] = []
const min_90 = 90
$: OnScheduledOrderMinutes_errors = errors_2(['Call notification', gte_errors_2(min_90)])(
	$ro_restaurant$?.CallOnScheduledOrderMinutes)
$: if (($ro_restaurant$?.CallOnScheduledOrderMinutes ?? 0) < min_90)
	$ro_restaurant$?.CallOnScheduledOrderMinutes = min_90
$: if (($ro_restaurant$?.EmailOnScheduledOrderMinutes ?? 0) < min_90)
	$ro_restaurant$?.EmailOnScheduledOrderMinutes = min_90
$: if (($ro_restaurant$?.FaxOnScheduledOrderMinutes ?? 0) < min_90)
	$ro_restaurant$?.FaxOnScheduledOrderMinutes = min_90
$: if (($ro_restaurant$?.SMSOnScheduledOrderMinutes ?? 0) < min_90)
	$ro_restaurant$?.SMSOnScheduledOrderMinutes = min_90
let form_errors
$: form_errors = [
	...Contacts_errors, ...Delivery_errors, ...Holidays_errors, ...RestaurantAddress_errors, ...Subscription_errors,
]
let navItemList_errors
$: navItemList_errors = {
	[RestaurantDetails_label]: Subscription_errors,
	[RestaurantAddress_label]: RestaurantAddress_errors,
	[Contacts_label]: Contacts_errors,
	[ContactDetails_label]: ContactDetails_errors,
	[OrderSettings_label]: Delivery_errors,
	[Holidays_label]: Holidays_errors,
}
//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
let no_delivery = false
$: no_delivery =
	!$ro_restaurant$
	|| !$ro_restaurant$.EnableOnlineOrdering
	|| $ro_restaurant$.DeliveryModeID === DELIVERY_MODE_NO_DELIVERY
</script>

<svelte:window on:scroll={_.onscroll_window}></svelte:window>
{#if $ro_auth_rules$[REST_INFO_TAB]}
<RestContractModal bind:this={$restContractModal$}></RestContractModal>
<SaveDeliveryZoneModal bind:this={$saveDeliveryZoneModal$}></SaveDeliveryZoneModal>
<SubscriptionCheckoutModal bind:this={$subscriptionCheckoutModal$}></SubscriptionCheckoutModal>
<div class="RestInfoTab page">
  {#if $busy$}
    <PageLoader></PageLoader>
  {/if}
	<div class="restaurant-right-nav" class:fixed-nav={$isNavFixed$}>
    {#each nav_item_a as nav_item}
      <a href="." on:click|preventDefault={evt => _.scrollTo(nav_item.scrollSectionID)}
				 class="h-link"
			>
        {#if nav_item.heading}
          <div class="restaurant-nav-heading { nav_item.class }">{ nav_item.heading }</div>
        {/if}
				{#if nav_item.label}
          <div class="restaurant-nav-item"
							 class:active={$activeNavItemID$ === nav_item.scrollSectionID}
							 class:has-error={!$busy$ && navItemList_errors[nav_item.label]?.length}
					>{ nav_item.label }</div>
        {/if}
      </a>
    {/each}
  </div>
	{#if $ro_restaurant$}
    <form on:submit|preventDefault={evt => form_errors.length || _.API_RESTAURANT_update()}>
      <RestInfoTab_Subscription {_} bind:Subscription_errors></RestInfoTab_Subscription>
			<RestInfoTab_RestaurantDetails {_}></RestInfoTab_RestaurantDetails>
      <RestInfoTab_RestaurantAddress {_} bind:RestaurantAddress_errors></RestInfoTab_RestaurantAddress>
      <RestInfoTab_Contacts {_} bind:Contacts_errors></RestInfoTab_Contacts>
      <RestInfoTab_ContactDetails {_} bind:ContactDetails_errors></RestInfoTab_ContactDetails>
      <RestInfoTab_TaxSettings {_}></RestInfoTab_TaxSettings>
      <RestInfoTab_OrderSettings {_}>
        <RestInfoTab_OnScheduledOrder bind:OnScheduledOrderMinutes_errors></RestInfoTab_OnScheduledOrder>
      </RestInfoTab_OrderSettings>
      <RestInfoTab_Delivery {_} bind:Delivery_errors bind:no_delivery></RestInfoTab_Delivery>
      <RestInfoTab_WorkingHours {_}></RestInfoTab_WorkingHours>
      <RestInfoTab_DeliveryHours {_} no_delivery={false}></RestInfoTab_DeliveryHours>
      <RestInfoTab_Holidays {_} bind:Holidays_errors></RestInfoTab_Holidays>
      <div class="action-buttons-wrapper" class:sidemenu-pl={$ro_sideMenuOpened$}>
        <div class="action-buttons">
          <button use:ladda={$busy$}
									disabled={!!form_errors.length}
									title="Save"
									class="btn btn-lg btn-success"
									type="submit"
					>Save</button>
        </div>
      </div>
    </form>
  {/if}
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
@import "@menus/css/clearfix";
.RestInfoTab {
	.CheckBox {
		display: inline-flex;
	}
	.section-heading {
		margin-bottom: 8px;
	}
	> form {
		padding: 0 0 120px;
		@media (max-width: $screen-xs-max) {
			padding-bottom: 92px;
		}
	}
	.action-buttons-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		margin: 64px 0 0;
		transition: padding $side-menu-transition-speed;
		@media (min-width: $screen-sm-min) {
			background-color: white;
		}
		.action-buttons {
			padding: 24px;
			@media (max-width: $screen-xs-max) {
				padding: 16px 12px;
			}
			@media (min-width: $screen-sm-min) {
				border-top: 1px solid #DBDBDB;
			}
			.btn {
				@media (max-width: $screen-xs-max) {
					width: 100%;
				}
			}
		}
	}
	.time-section {
		.table {
			tr {
				td {
					position: relative;
					vertical-align: middle;
					.help-block.text-success {
						position: absolute;
					}
				}
			}
		}
	}
	.restaurant-right-nav {
		position: absolute;
		top: 464px;
		right: 50px;
		width: 220px;
		background-color: $gray;
		border-radius: 4px;
		padding: 28px 24px 55px;
		@media (max-width: $screen-lg-min - 1) {
			display: none;
		}
		&.fixed-nav {
			position: fixed;
			top: 136px;
		}
		.restaurant-nav-heading {
			margin-bottom: 28px;
			font-weight: $lato-black;
			font-size: 18px;
			cursor: default;
			color: white;
		}
		.restaurant-nav-item {
			padding: 13px 0 14px;
			border-bottom: 1px solid #394A53;
			cursor: pointer;
			user-select: none;
			color: white;
			&.has-error {
				color: $brand-danger;
			}
			&.active {
				color: $brand-success;
			}
		}
	}
	.small {
		font-size: 0.8em;
	}
	.fa-plus-circle {
		display: flex;
		align-items: center;
		color: $brand-success;
		&:before {
			font-size: 24px;
		}
	}
}
</style>
