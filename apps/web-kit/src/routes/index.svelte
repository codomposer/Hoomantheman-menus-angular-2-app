<script context="module" lang="ts">
import type { LoadInput } from '@sveltejs/kit'
import { neql_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { consumer_home_url__b, fireFlyID_url__b } from '@menus/route'
import { gps$_b, PublicKey$_b } from '@menus/http'
import { ssr_ui_ctx_ } from '@menus/ui'
import { backoffice_host_a, timeout_ms } from '@menus/web-config'
// import { load_home_data_b } from '@menus/home-ui'
// let cities, popular_dishes
export async function load({ page, session }:LoadInput) {
	try {
		const { host, query } = page
		const ctx = ssr_ui_ctx_(page, session)
		const { fireFlyID } = query
		if (fireFlyID) {
			return {
				redirect: await fireFlyID_url__b(ctx)(fireFlyID)
			}
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
				return {
					redirect: consumer_home_url,
				}
			} else {
				return {
					props: { PublicKey }
				}
			}
		} else {
			return {
				redirect: '/backoffice'
			}
		}
	} catch (e) {
		console.trace(e)
		return {
			redirect: '/500'
		}
	}
	// TODO: Reenable when consumer site is active
	// if (!cities || !popular_dishes) {
	//   const load_home_data = load_home_data_b(ctx)
	//   const data = await load_home_data()
	//   cities = data.cities
	//   popular_dishes = data.popular_dishes
	// }
	// return { cities, popular_dishes, }
}
</script>

<script lang="ts">
import { CrMainDashboard } from '@menus/consumer-layout-ui'
// import { Home } from '@menus/home-ui'
// export let cities, popular_dishes
export let PublicKey
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
