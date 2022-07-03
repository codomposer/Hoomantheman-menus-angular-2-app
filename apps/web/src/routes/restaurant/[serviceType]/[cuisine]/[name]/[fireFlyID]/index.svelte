<script context="module" lang="ts">
import { I } from '@ctx-core/combinators'
import type { Page } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { case_insensitive_eql } from '@ctx-core/string'
import { preload_ } from '@menus/app'
import type { RestaurantFrame_I } from '@menus/restaurant-frame'
import { restaurant_frame$_b } from '@menus/restaurant-frame'
import type { ui_ctx__session_T } from '@menus/ui'
import { ssr_ui_ctx_ } from '@menus/ui'
import { timeout_ms } from '@menus/web-config'
export const preload = preload_(async function (page:Page, session:ui_ctx__session_T) {
	const { params } = page
	const ctx = ssr_ui_ctx_(page, session)
	const { serviceType, cuisine, name, fireFlyID } = params
	const restaurant_frame$ = restaurant_frame$_b(ctx)
	try {
		await subscribe_wait_timeout(restaurant_frame$.restaurant_frame_reload_params$, I, timeout_ms)
		const restaurant_frame = await subscribe_wait_timeout(restaurant_frame$, restaurant_frame=>{
			return (
				restaurant_frame
				&& case_insensitive_eql([serviceType as string, restaurant_frame.serviceType])
				&& case_insensitive_eql([cuisine as string, restaurant_frame.cuisine])
				&& case_insensitive_eql([name as string, restaurant_frame.name])
				&& case_insensitive_eql([fireFlyID as string, restaurant_frame.fireFlyID])
			)
		}, timeout_ms) as RestaurantFrame_I
		const { goto_url } = restaurant_frame
		if (goto_url) {
			this.redirect(302, goto_url)
			return
		}
		return { restaurant_frame }
	} catch (e) {
		console.trace(e)
		throw e
	}
})
</script>

<script lang="ts">
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import type { restaurant_frame_T } from '@menus/restaurant-frame'
import { Restaurant, Restaurant_Filters, Restaurant_ServiceTypeNav } from '@menus/restaurant-ui'
import { serviceType$_b } from '@menus/service-type'
import { getContext_ui_ctx } from '@menus/ui'
const ctx = getContext_ui_ctx()
export let restaurant_frame:restaurant_frame_T
const serviceType = serviceType$_b(ctx)
const restaurant_frame$ = restaurant_frame$_b(ctx)
restaurant_frame$.hydrate(restaurant_frame)
</script>

<CrMainDashboard userAddress_show={true}>
  <div class="Restaurant_Filters_container" slot="before-main">
    <Restaurant_Filters>
      <Restaurant_ServiceTypeNav></Restaurant_ServiceTypeNav>
    </Restaurant_Filters>
  </div>
  <Restaurant></Restaurant>
</CrMainDashboard>

<style type=text/scss global>
@import '@menus/css/lib';
.Restaurant_Filters_container {
	position: fixed;
	top: $navbar-height;
	width: 100%;
	z-index: 10;

	@media (max-width: $screen-sm-max) {
		top: $navbar-height-sm;
	}
}
</style>
