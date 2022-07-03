<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ query }) {
	const { serviceType } = query
	return { serviceType }
})
</script>

<script lang="ts">
import { onMount } from 'svelte'
import { neq_ } from '@ctx-core/function'
import { page_query$_b } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { platform_settings$_b } from '@menus/http'
import { assign_to_query_goto_b } from '@menus/page'
import { Enable_Catering$_b, Enable_Delivery$_b, Enable_DiningIn$_b, Enable_Pickup$_b } from '@menus/platform-settings'
import { Restaurant_Filters } from '@menus/restaurant-ui'
import { Search, Search_ServiceTypeNav } from '@menus/search-ui'
import type { ServiceType } from '@menus/service-type-common'
import {
	SERVICE_TYPE_ALL, SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, SERVICE_TYPE_DINEIN, SERVICE_TYPE_PICKUP,
} from '@menus/service-type-common'
import { getContext_ui_ctx, goto_b } from '@menus/ui'
import { timeout_ms } from '@menus/web-config'
import { serviceType$_b } from '@menus/service-type'
export let serviceType:ServiceType
const ctx = getContext_ui_ctx()
const assign_to_query_goto = assign_to_query_goto_b(ctx)
const Enable_Delivery$ = Enable_Delivery$_b(ctx)
const Enable_Pickup$ = Enable_Pickup$_b(ctx)
const Enable_Catering$ = Enable_Catering$_b(ctx)
const Enable_DiningIn$ = Enable_DiningIn$_b(ctx)
const goto = goto_b(ctx)
const page_query$ = page_query$_b(ctx)
const platform_settings$ = platform_settings$_b(ctx)
const serviceType$ = serviceType$_b(ctx)
onMount(async ()=>{
	if (!serviceType) {
		await subscribe_wait_timeout(platform_settings$, neq_(null), timeout_ms)

		const newServiceType = serviceType$.$ ? serviceType$.$ : Enable_Delivery$.$
				? SERVICE_TYPE_DELIVERY
				: Enable_Pickup$.$
					? SERVICE_TYPE_PICKUP
					: Enable_Catering$.$
						? SERVICE_TYPE_CATERING
						: Enable_DiningIn$.$
							? SERVICE_TYPE_DINEIN
							: SERVICE_TYPE_ALL

		await assign_to_query_goto({
			serviceType:newServiceType
		})
	}
})
</script>

<CrMainDashboard SearchBox_show={true} userAddress_show={true}>
  <div class="Search_Restaurant_Filters_container" slot="before-main">
    <Restaurant_Filters>
      <Search_ServiceTypeNav></Search_ServiceTypeNav>
    </Restaurant_Filters>
  </div>
  <svelte:fragment slot="default">
    <Search></Search>
  </svelte:fragment>
</CrMainDashboard>
