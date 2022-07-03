<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartRestType_c } from './ChartRestType_c.js'
import type { ChartRestType_T } from './ChartRestType_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx, dispatch = createEventDispatcher()
export const _ = new ChartRestType_c(ctx, dispatch)
const { ChartRestType_busy$, ChartRestType_canvas_a$, valid_ChartRestType_a$, } = _
export let valid_ChartRestType_a:ChartRestType_T[]
$: valid_ChartRestType_a = $valid_ChartRestType_a$
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if ($valid_ChartRestType_a$ || []).length}
  <div class="ChartRestType">
    {#if $ChartRestType_busy$}
      <PageLoader></PageLoader>
    {:else}
      {#each $valid_ChartRestType_a$ as ChartRestType,ChartRestType_a_index}
        <div class="chart-heading">Restaurants surrounding { ChartRestType.Name }</div>
        <div class="pie-chart-section-wrapper">
          <div class="pie-chart-section">
            <canvas bind:this={$ChartRestType_canvas_a$[ChartRestType_a_index]}
                    id="rest-type-chart-{ChartRestType_a_index}" class="pie-chart-canvas"
            ></canvas>
          </div>
          <div class="chart-label-list">
            {#each ChartRestType.labels || [] as item,restTypeChartItem_index}
              <div class="chart-label-item">
                <span class="bg-color"
                      style={style_({
                        'background-color': ChartRestType.bgColors[restTypeChartItem_index],
                      })}
                ></span>
                <span class="label-text">{ item }</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}
