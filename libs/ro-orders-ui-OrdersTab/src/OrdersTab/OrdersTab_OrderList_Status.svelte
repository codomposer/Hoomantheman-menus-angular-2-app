<script lang="ts">
import { order_is_cancelled_ } from '@menus/ro-orders'
import type { Order } from '@menus/shared-order'
import { order_status_r_StatusID } from '@menus/web-config'
export let order:Order
</script>

<div
	class="OrdersTab_OrderList_Status Status {$$props.class||''}"
	class:text-success={order.Is_Accepted && !order_is_cancelled_(order)}
	class:text-danger={order_is_cancelled_(order)}
	class:text-dark-gray={
		order.StatusID == order_status_r_StatusID.MENUS_AGENT_CALLRESTAURANT_ADD_QUEUE
	}
>{ order.RestaurantOrderStatusText }</div>
