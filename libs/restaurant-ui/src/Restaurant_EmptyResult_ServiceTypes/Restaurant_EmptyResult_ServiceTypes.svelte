<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { Enable_Catering$_b, Enable_Delivery$_b, Enable_DiningIn$_b, Enable_Pickup$_b } from '@menus/platform-settings'
import { params_serviceType$_b } from '@menus/page'
import {
	SERVICE_TYPE_DELIVERY, SERVICE_TYPE_PICKUP, SERVICE_TYPE_CATERING, SERVICE_TYPE_DINEIN,
} from '@menus/service-type-common'
import { restaurant_url_ } from '@menus/route'
import { restaurant_frame$_b } from '@menus/restaurant-frame'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const Enable_Delivery$ = Enable_Delivery$_b(ctx)
const Enable_Pickup$ = Enable_Pickup$_b(ctx)
const Enable_Catering$ = Enable_Catering$_b(ctx)
const Enable_DiningIn$ = Enable_DiningIn$_b(ctx)
const params_serviceType$ = params_serviceType$_b(ctx)
const restaurant_frame$ = restaurant_frame$_b(ctx)
export let visible = false
let cuisine:string, fireFlyID:string, name:string
$: cuisine = $restaurant_frame$?.cuisine
$: fireFlyID = $restaurant_frame$?.fireFlyID
$: name = $restaurant_frame$?.name
export let isDelivery:boolean, isPickup:boolean, isCatering:boolean, isDiningIn:boolean
$: isDelivery = $restaurant_frame$?.isDelivery
$: isPickup = $restaurant_frame$?.isPickup
$: isCatering = $restaurant_frame$?.isCatering
$: isDiningIn = $restaurant_frame$?.isDiningIn
export let delivery_visible:boolean, pickup_visible:boolean, catering_visible:boolean, diningin_visible:boolean
$: delivery_visible = $Enable_Delivery$ && isDelivery && $params_serviceType$ !== SERVICE_TYPE_DELIVERY
$: pickup_visible = $Enable_Pickup$ && isPickup && $params_serviceType$ !== SERVICE_TYPE_PICKUP
$: catering_visible = $Enable_Catering$ && isCatering && $params_serviceType$ !== SERVICE_TYPE_CATERING
$: diningin_visible = $Enable_DiningIn$ && isDiningIn && $params_serviceType$ !== SERVICE_TYPE_DINEIN
$: visible = delivery_visible || pickup_visible || catering_visible || diningin_visible
</script>

<div class="Restaurant_EmptyResult_ServiceTypes service-types">
  {#if delivery_visible}
    <a href={
         restaurant_url_({
           serviceType: SERVICE_TYPE_DELIVERY,
           cuisine: cuisine,
           name: name,
           fireFlyID: fireFlyID,
         })
       }
			 class="btn btn-sm btn-primary"
		>Delivery</a>
  {/if}
	{#if pickup_visible}
    <a href={
         restaurant_url_({
           serviceType: SERVICE_TYPE_PICKUP,
           cuisine: cuisine,
           name: name,
           fireFlyID: fireFlyID,
         })
       }
			 class="btn btn-sm btn-primary"
		>Pickup</a>
  {/if}
	{#if catering_visible}
    <a href={
         restaurant_url_({
           serviceType: SERVICE_TYPE_CATERING,
           cuisine: cuisine,
           name: name,
           fireFlyID: fireFlyID,
         })
       }
			 class="btn btn-sm btn-primary"
		>Catering</a>
  {/if}
	{#if diningin_visible}
    <a href={
         restaurant_url_({
           serviceType: SERVICE_TYPE_DINEIN,
           cuisine: cuisine,
           name: name,
           fireFlyID: fireFlyID,
         })
       }
			 class="btn btn-sm btn-primary"
		>Dine In</a>
  {/if}
</div>

<style type=text/scss global>
</style>
