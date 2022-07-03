<script context="module" lang="ts">
import { has_dom } from '@ctx-core/dom'
import { neql_ } from '@ctx-core/function'
import type { page_T, PreloadContext } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { preload_ } from '@menus/app'
import { is_hash_routing } from '@menus/core-routing'
import { gps$_b, PublicKey$_b } from '@menus/http'
import { ro_redirect_home_url_ } from '@menus/ro-route'
import { consumer_home_url__b, fireFlyID_url__b } from '@menus/route'
import { ssr_ui_ctx_ } from '@menus/ui'
import { backoffice_host_a, timeout_ms } from '@menus/web-config'
// import { load_home_data_b } from '@menus/home-ui'
// let cities, popular_dishes
export const preload = preload_(async function (this:PreloadContext, page:page_T, session) {
	if (!has_dom) return
	try {
		const { host, query } = page
		const ctx = ssr_ui_ctx_(page, session)
		if (is_hash_routing) {
			return await this.redirect(302, await ro_redirect_home_url_(ctx))
		}
		const { fireFlyID } = query
		if (fireFlyID) {
			const fireFlyID_url = await fireFlyID_url__b(ctx)(fireFlyID)
			return await this.redirect(302, fireFlyID_url)
		}
		if (~backoffice_host_a.indexOf(host)) {
			return await this.redirect(302, '/backoffice')
		}
		// Required for reliable SSR loading of gps on AWS Lambda
		const gps$ = gps$_b(ctx)
		await gps$.load_promise
		const PublicKey = await subscribe_wait_timeout(PublicKey$_b(ctx), neql_(undefined), timeout_ms)
    if (PublicKey) {
      const consumer_home_url = await consumer_home_url__b(ctx)()
      if (consumer_home_url) {
        return this.redirect(302, consumer_home_url)
      } else {
        return { PublicKey }
      }
    } else {
      await this.redirect(302, '/backoffice')
    }
  } catch (e) {
		console.trace(e)
		this.redirect(302, '/500')
	}
	// TODO: Reenable when consumer site is active
	// if (!cities || !popular_dishes) {
	//   const load_home_data = load_home_data_b(ctx)
	//   const data = await load_home_data()
	//   cities = data.cities
	//   popular_dishes = data.popular_dishes
	// }
	// return { cities, popular_dishes, }
})
</script>

<script lang="ts">
import { CrMainDashboard } from '@menus/consumer-layout-ui'
// import { Home } from '@menus/home-ui'
// export let cities, popular_dishes
export let PublicKey:string
</script>

{#if PublicKey}
<CrMainDashboard>
  <div class="no-restaurants">
    <h1>This app has no active restaurants.</h1>
  </div>
</CrMainDashboard>
{/if}
<!--<Home {cities} {popular_dishes}></Home>-->

<style type=text/scss>
@import "@menus/css/lib";
.no-restaurants {
	background-color: #F2F2F2;
	min-height: calc(100vh - 292px - #{$navbar-height});
	overflow-x: hidden;
	padding-bottom: 100px;
	h1 {
		text-align: center;
	}
}
</style>
