<script lang="ts">
import { flatten, compact } from '@ctx-core/array'
import { has_dom } from '@ctx-core/dom'
export let alwaysShowErrors = true, focus = false, errors:string[], show = false, inplace_tooltip = false,
	input_tooltip = false
let processed_errors:string[]
$: processed_errors = compact(flatten([errors || []])) as string[]
$: show = processed_errors?.length && (alwaysShowErrors || (has_dom && focus))
let has_tooltip = false
$: has_tooltip = !!(inplace_tooltip || input_tooltip)
</script>

{#if show}
  <div
		class="ValidationMessages has-error"
		class:has_tooltip
		class:inplace_tooltip
		class:input_tooltip
	>
    {#each processed_errors as error}
      <div class="help-block f-bold">{@html error}</div>
    {/each}
  </div>
{/if}

<style type="text/scss" global>
@import "@menus/css/lib";
.ValidationMessages {
	border-color: $brand-danger;
	&.has_tooltip {
		position: absolute;
		padding: 0 12px;
		margin-bottom: auto;
		.help-block {
			margin: 0;
		}
		&.inplace_tooltip {
		}
		&.input_tooltip {
			margin-top: -18px;
		}
	}
}
</style>
