<script type="ts">
import { ChartType_select_ctx_a } from '../ChartType.js'
import type { ChartType_select_item_T } from '../ChartType.js'
export let value:ChartType_select_item_T
</script>

<select
	class="form-control ChartType_select"
	bind:value
>
  {#each ChartType_select_ctx_a as ChartType_select_ctx}
    <option value={ChartType_select_ctx.value}>{ChartType_select_ctx.label}</option>
  {/each}
</select>
