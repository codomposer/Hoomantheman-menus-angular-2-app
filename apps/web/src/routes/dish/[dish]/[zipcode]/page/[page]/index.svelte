<script context="module" lang="ts">
import { preload_ } from '@menus/app'
import { unslug } from '@menus/util'
export const preload = preload_(async function ({ params }) {
	const { dish, zipcode, page } = params
	return {
		dish: unslug(dish),
		zipcode,
		page,
	}
})
</script>

<script lang="ts">
import { SeoDishMenuItemList } from '@menus/consumer-seo-ui'
export let dish:string, zipcode:string, page:number
</script>
<SeoDishMenuItemList {dish} {zipcode} {page}></SeoDishMenuItemList>
