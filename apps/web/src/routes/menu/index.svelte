<script context="module" lang="ts">
import { preload_ } from '@menus/app'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { Menu, Search_ServiceTypeNav } from '@menus/search-ui'
import { Restaurant_Filters } from '@menus/restaurant-ui'
import type { ServiceType } from '@menus/service-type-common'
import { getContext_ui_ctx } from '@menus/ui'
export const preload = preload_(async function ({ query }) {
	const { serviceType } = query
	return { serviceType }
})
</script>

<script lang="ts">
export let serviceType:ServiceType
const ctx = getContext_ui_ctx()
</script>

<CrMainDashboard SearchBox_show={true} userAddress_show={true}>
  <div class="Search_Restaurant_Filters_container" slot="before-main">
    <Restaurant_Filters>
      <Search_ServiceTypeNav></Search_ServiceTypeNav>
    </Restaurant_Filters>
  </div>
  <svelte:fragment slot="default">
    <Menu></Menu>
  </svelte:fragment>
</CrMainDashboard>
