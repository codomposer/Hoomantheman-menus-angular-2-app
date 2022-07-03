<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { city, zipcode, page } = params
	return { city, zipcode, page }
})
</script>

<script lang="ts">
import { SeoCityRestaurantList } from '@menus/consumer-seo-ui'
export let city, zipcode, page
</script>
<SeoCityRestaurantList {city} {zipcode} {page}></SeoCityRestaurantList>
