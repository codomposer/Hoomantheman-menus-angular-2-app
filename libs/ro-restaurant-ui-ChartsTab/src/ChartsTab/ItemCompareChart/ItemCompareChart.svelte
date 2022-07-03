<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CheckBox } from '@menus/form-ui'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartType_bar } from '../ChartType.js'
import { ChartType_select } from '../ChartType_select/index.js'
import { ItemCompareChart_c } from './ItemCompareChart_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx, dispatch = createEventDispatcher()
export const _ = new ItemCompareChart_c(ctx, dispatch)
const {
	ChartCompare_busy$, ChartType$, index_axis$, ChartType_select_value$, charts_other_rest_a$, exclude_catering$,
	item_compare_chart_canvas$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ItemCompareChart chart-section-wrapper">
  <div class="row">
    <div class="col-sm-5">
      <div class="chart-heading">Top dishes price comparison</div>
    </div>
    <div class="col-sm-4">
      <div class="chart-page-size text-right">
        <CheckBox
					toggle={true}
					text="Exclude Catering?"
					bind:value={$exclude_catering$}
				></CheckBox>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="chart-page-size">
        <div class="form-group">
          <ChartType_select bind:value={$ChartType_select_value$}></ChartType_select>
        </div>
      </div>
    </div>
  </div>
	{#if $ChartCompare_busy$}
    <PageLoader center="parent"></PageLoader>
  {:else}
    <div
			class="item_compare_chart_wrapper"
			style={style_({
				height:
					($ChartType$ === ChartType_bar && $index_axis$ === 'y')
					? (`${($charts_other_rest_a$.length + 3) * 500}px`)
					: null
			})}
		>
      <canvas bind:this={$item_compare_chart_canvas$} id="item_compare_chart"></canvas>
    </div>
  {/if}
</div>

<style type=text/scss>
</style>
