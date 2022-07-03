<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartType_bar } from '../ChartType.js'
import { ChartType_select } from '../ChartType_select/index.js'
import { ChartMissingMenu_c } from './ChartMissingMenu_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx, dispatch = createEventDispatcher()
export const _ = new ChartMissingMenu_c(ctx, dispatch)
const {
	ChartMissingMenu_busy$, ChartType$, index_axis$, ChartType_select_value$, charts_other_rest_a$, missing_menu_chart_canvas$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ChartMissingMenu chart-section-wrapper">
  <div class="row">
    <div class="col-sm-9">
      <div class="chart-heading">Top recommended menu addons</div>
    </div>
    <div class="col-sm-3">
      <div class="chart-page-size">
        <div class="form-group">
          <ChartType_select bind:value={$ChartType_select_value$}></ChartType_select>
        </div>
      </div>
    </div>
  </div>
	{#if $ChartMissingMenu_busy$}
    <PageLoader></PageLoader>
  {:else}
    <div class="missing_menu_chart_wrapper"
         style={style_({
          height:
            ($ChartType$ === ChartType_bar && $index_axis$ === 'y')
             ? `${($charts_other_rest_a$.length + 1) * 500}px`
             : null
         })}
		>
      <canvas bind:this={$missing_menu_chart_canvas$} id="missing_menu_chart"></canvas>
    </div>
  {/if}
</div>

<style type=text/scss>
</style>
