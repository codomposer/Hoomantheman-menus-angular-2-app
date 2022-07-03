<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { schedule_ctx_I } from '@menus/restaurant-hours'
import { schedule_n0_, schedule_n1_value_ } from '@menus/restaurant-hours'
import type { consumer_shopping_cart_ui_Ctx } from '../consumer_shopping_cart_ui_Ctx.js'
export let schedule_ctx:schedule_ctx_I
const ctx = getContext_ui_ctx() as consumer_shopping_cart_ui_Ctx, dispatch = createEventDispatcher()
let schedule_n0_a, schedule_n0, schedule_n0_value, schedule_n1_value
$: update_schedule_ctx_deps(schedule_ctx)
$: {
	if (schedule_ctx.schedule_n0_value !== schedule_n0_value) {
		schedule_ctx.schedule_n1_value = schedule_n1_value_(schedule_ctx)
		update_schedule_ctx_deps(schedule_ctx)
		dispatch('change', schedule_ctx)
	} else if (schedule_ctx.schedule_n1_value !== schedule_n1_value) {
		update_schedule_ctx_deps(schedule_ctx)
		dispatch('change', schedule_ctx)
	}
}
function update_schedule_ctx_deps(schedule_ctx_:schedule_ctx_I) {
	schedule_n0_a = schedule_ctx_?.schedule_n0_a
	schedule_n0_value = schedule_ctx_?.schedule_n0_value
	schedule_n1_value = schedule_ctx_?.schedule_n1_value
	schedule_n0 = schedule_n0_(schedule_ctx_)
}
</script>

<div class="ScheduleDayTime c-success {$$props.class||''}">
	<select name="schedule_n0_value" id="schedule_n0_value"
					bind:value={schedule_ctx.schedule_n0_value}
	>
	{#each schedule_n0_a || [] as schedule_n0,idx(schedule_n0.value)}
		<option value={schedule_n0.value}>{schedule_n0.text}</option>
	{/each}
	</select>
	{#if schedule_n0?.schedule_n1_a?.length}
	<select name="schedule_n1_value" id="schedule_n1_value"
						bind:value={schedule_ctx.schedule_n1_value}
		>
		{#each schedule_n0.schedule_n1_a as schedule_n1,idx(schedule_n1.value)}
		<option value={schedule_n1.value}>{schedule_n1.text}</option>
		{/each}
	</select>
	{/if}
</div>

<style type=text/scss global>
.ScheduleDayTime {
	select {
		width: calc(50% - 2px);
		padding: 8px 16px;
	}
}
</style>
	