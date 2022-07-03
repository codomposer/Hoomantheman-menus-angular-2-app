<script lang="ts">
import type { Order } from '@menus/shared-order'
import { order_is_new_, order_is_pending_ } from '@menus/ro-orders'
export let order:Order
</script>

{#if order.Is_Cancelled_By_DeliveryCompany}
	<div class="ribbon ribbon-danger align-right">
		<span>Delivery Rejected</span>
	</div>
{:else if order_is_new_(order)}
	<div class="ribbon ribbon-success align-right">
		<span>NEW</span>
	</div>
{:else if order_is_pending_(order)}
	<div class="ribbon ribbon-success align-right">
		<span>PENDING</span>
	</div>
{/if}
