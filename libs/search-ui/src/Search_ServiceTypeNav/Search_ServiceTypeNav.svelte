<script lang="ts">
import { page_host$_b, page_path$_b, page_query$_b } from '@ctx-core/sapper'
import { query_str_ } from '@ctx-core/uri'
import { assign_to_query_str__b, query_serviceType$_b } from '@menus/page'
import {
ServiceType,
	SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, SERVICE_TYPE_DINEIN, SERVICE_TYPE_PICKUP
} from '@menus/service-type'
import { ServiceTypeNav } from '@menus/service-type-ui'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { navigating_goto_b } from '@menus/page'
import { confirmModal$_b } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { search_ui_Ctx } from '../search_ui_Ctx.js'
import { clone } from '@ctx-core/object';
import { serviceType$_b } from '@menus/service-type'
const ctx = getContext_ui_ctx() as search_ui_Ctx
const assign_to_query_str_ = assign_to_query_str__b(ctx)
const page_host$ = page_host$_b(ctx)
const page_path$ = page_path$_b(ctx)
const page_query$ = page_query$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
const serviceType$ = serviceType$_b(ctx)
const confirmModal$ = confirmModal$_b(ctx)
const shopping_cart = shopping_cart_b(ctx)
const restaurant_cartitems$ = shopping_cart.restaurant_cartitems$

const click_serviceType = async (tab_serviceType:ServiceType)=>{
	if (tab_serviceType !== serviceType$.$) {
		if (
			!restaurant_cartitems$.$?.length
			|| (
				await confirmModal$.$.open({
					message: 'If you change your service type, then all your shopping cart items will be removed.',
					ok_text: 'Update',
					cancel_text: 'Cancel',
					cancel_class: 'btn-gray',
				})
			)
		) {
			// Navigating to search component page with queryParams
			await navigating_goto([
				window.location.pathname,
				query_str_(
					clone(
						page_query$.$, {
							serviceType: tab_serviceType
						}
					)
				)
			])
			return
		}
	}
}

let Delivery_href:string, Pickup_href:string, Catering_href:string, DiningIn_href:string
$: {
	if ($page_path$) {
		const url = new URL(`https://${$page_host$}${$page_path$}${query_str_($page_query$)}`)
		url.search = assign_to_query_str_({ serviceType: SERVICE_TYPE_DELIVERY })
		Delivery_href = url.toString()
	}
}
$: {
	if ($page_path$) {
		const url = new URL(`https://${$page_host$}${$page_path$}${query_str_($page_query$)}`)
		url.search = assign_to_query_str_({ serviceType: SERVICE_TYPE_PICKUP })
		Pickup_href = url.toString()
	}
}
$: {
	if ($page_path$) {
		const url = new URL(`https://${$page_host$}${$page_path$}${query_str_($page_query$)}`)
		url.search = assign_to_query_str_({ serviceType: SERVICE_TYPE_CATERING })
		Catering_href = url.toString()
	}
}
$: {
	if ($page_path$) {
		const url = new URL(`https://${$page_host$}${$page_path$}${query_str_($page_query$)}`)
		url.search = assign_to_query_str_({ serviceType: SERVICE_TYPE_DINEIN })
		DiningIn_href = url.toString()
	}
}
</script>

<ServiceTypeNav
	class="Search_ServiceTypeNav"
	Delivery_enabled={true}
	Pickup_enabled={true}
	Catering_enabled={true}
	DiningIn_enabled={true}
	Delivery_active={$serviceType$ === SERVICE_TYPE_DELIVERY}
	Pickup_active={$serviceType$ === SERVICE_TYPE_PICKUP}
	Catering_active={$serviceType$ === SERVICE_TYPE_CATERING}
	DiningIn_active={$serviceType$ === SERVICE_TYPE_DINEIN}
	{Delivery_href}
	{Pickup_href}
	{Catering_href}
	{DiningIn_href}
	onclick_Delivery={evt =>{
		evt.preventDefault()
		return click_serviceType(SERVICE_TYPE_DELIVERY) }
	}
	onclick_Pickup={evt =>{
		evt.preventDefault()
		return click_serviceType(SERVICE_TYPE_PICKUP) }
	}
	onclick_Catering={evt =>{
		evt.preventDefault()
		return click_serviceType(SERVICE_TYPE_CATERING) }
	}
	onclick_DiningIn={evt =>{
		evt.preventDefault()
		return click_serviceType(SERVICE_TYPE_DINEIN) }
	}
></ServiceTypeNav>
