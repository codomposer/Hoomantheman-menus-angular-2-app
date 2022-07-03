<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartType_bar } from '../ChartType.js'
import { ChartType_select } from '../ChartType_select/index.js'
import { ChartMenuCompetition_c } from './ChartMenuCompetition_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx, dispatch = createEventDispatcher()
export const _ = new ChartMenuCompetition_c(ctx, dispatch)
const {
	charts_other_rest_a$, ChartMenuCompetition_busy$, ChartType_select_value$, ChartType$, index_axis$,
	menu_competition_bar_chart_canvas$
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ChartMenuCompetition chart-section-wrapper">
  <div class="row">
    <div class="col-sm-9">
      <div class="chart-heading">
        <div>Menu coverage by key dish/item categories of similar type restaurants</div>
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
	{#if $ChartMenuCompetition_busy$}
    <PageLoader></PageLoader>
  {:else}
    <div
			class="menu_competition_bar_chart_wrapper"
      style={style_({
        height:
          ($ChartType$ === ChartType_bar && $index_axis$ === 'y')
          ? `${($charts_other_rest_a$.length + 2) * 500}px`
          : null
      })}
		>
      <canvas bind:this={$menu_competition_bar_chart_canvas$} id="menu_competition_bar_chart"></canvas>
    </div>
  {/if}
</div>
