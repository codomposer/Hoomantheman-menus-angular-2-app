<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { clone } from '@ctx-core/object'
import { params_serviceType$_b } from '@menus/page'
import { restaurant_url_ } from '@menus/route'
import {
	SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, SERVICE_TYPE_DINEIN, SERVICE_TYPE_PICKUP
} from '@menus/service-type'
import { ServiceTypeNav } from '@menus/service-type-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { Restaurant_ServiceTypeNav_c } from './Restaurant_ServiceTypeNav_c.js'
import { Restaurant_ServiceTypeNav_ul$_b } from './Restaurant_ServiceTypeNav_ul$_b.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx, dispatch = createEventDispatcher()
const params_serviceType$ = params_serviceType$_b(ctx)
const Restaurant_ServiceTypeNav_ul$ = Restaurant_ServiceTypeNav_ul$_b(ctx)
export const _ = new Restaurant_ServiceTypeNav_c(ctx, dispatch)
const { restaurant_frame$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<ServiceTypeNav
	bind:root={$Restaurant_ServiceTypeNav_ul$}
	class="Restaurant_ServiceTypeNav"
	Delivery_enabled={$restaurant_frame$ && $restaurant_frame$.isDelivery}
	Pickup_enabled={$restaurant_frame$ && $restaurant_frame$.isPickup}
	Catering_enabled={$restaurant_frame$ && $restaurant_frame$.isCatering}
	DiningIn_enabled={$restaurant_frame$ && $restaurant_frame$.isDiningIn}
	Delivery_active={$params_serviceType$ === SERVICE_TYPE_DELIVERY}
	Pickup_active={$params_serviceType$ === SERVICE_TYPE_PICKUP}
	Catering_active={$params_serviceType$ === SERVICE_TYPE_CATERING}
	DiningIn_active={$params_serviceType$ === SERVICE_TYPE_DINEIN}
	Delivery_href={restaurant_url_(clone($restaurant_frame$, { serviceType: SERVICE_TYPE_DELIVERY }))}
	Pickup_href={restaurant_url_(clone($restaurant_frame$, { serviceType: SERVICE_TYPE_PICKUP }))}
	Catering_href={restaurant_url_(clone($restaurant_frame$, { serviceType: SERVICE_TYPE_CATERING }))}
	DiningIn_href={restaurant_url_(clone($restaurant_frame$, { serviceType: SERVICE_TYPE_DINEIN }))}
	onclick_Delivery={evt =>{
		evt.preventDefault()
		return $restaurant_frame$ && $restaurant_frame$.isDelivery && _.click_serviceType(SERVICE_TYPE_DELIVERY) }
	}
	onclick_Pickup={evt =>{
		evt.preventDefault()
		return $restaurant_frame$ && $restaurant_frame$.isPickup && _.click_serviceType(SERVICE_TYPE_PICKUP) }
	}
	onclick_Catering={evt =>{
		evt.preventDefault()
		return $restaurant_frame$ && $restaurant_frame$.isCatering && _.click_serviceType(SERVICE_TYPE_CATERING) }
	}
	onclick_DiningIn={evt =>{
		evt.preventDefault()
		return $restaurant_frame$ && $restaurant_frame$.isDiningIn && _.click_serviceType(SERVICE_TYPE_DINEIN) }
	}
></ServiceTypeNav>
