<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { city, zipcode } = params
	return { city, zipcode }
})
</script>

<script lang="ts">
import { SeoCityRestaurantList } from '@menus/consumer-seo-ui'
export let city:string, zipcode:string
</script>
<SeoCityRestaurantList {city} {zipcode}></SeoCityRestaurantList>
