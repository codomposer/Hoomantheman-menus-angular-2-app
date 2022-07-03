<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { orderID } = params
	return { orderID }
})
</script>

<script lang="ts">
import { PastOrder } from '@menus/past-orders-ui'
export let orderID
</script>

<PastOrder {orderID}></PastOrder>
