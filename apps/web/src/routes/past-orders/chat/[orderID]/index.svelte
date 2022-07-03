<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { orderID } = params
	return { orderID }
})
</script>

<script lang="ts">
import { CrMainDashboard } from '@menus/consumer-layout-ui'
// import { OrderChat } from '@menus/consumer-chat-ui'
// export let orderID:number
</script>

<CrMainDashboard>
<!--  <OrderChat {orderID}></OrderChat>-->
</CrMainDashboard>
