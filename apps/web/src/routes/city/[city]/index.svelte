<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { city } = params
	return { city }
})
</script>

<script lang="ts">
import { SeoCityRestaurantList } from '@menus/consumer-seo-ui'
export let city:string
</script>
<SeoCityRestaurantList {city}></SeoCityRestaurantList>
