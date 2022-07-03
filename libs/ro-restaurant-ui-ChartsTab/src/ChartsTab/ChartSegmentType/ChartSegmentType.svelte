<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { style_ } from '@ctx-core/html'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartSegmentType_c } from './ChartSegmentType_c.js'
import type { ChartSegmentType_T } from './ChartSegmentType_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx, dispatch = createEventDispatcher()
export const _ = new ChartSegmentType_c(ctx, dispatch)
const { ChartSegmentType_busy$, ChartSegmentType_canvas_a$, valid_ChartSegmentType_a$ } = _
export let valid_ChartSegmentType_a:ChartSegmentType_T[]
$: valid_ChartSegmentType_a = $valid_ChartSegmentType_a$
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if ($valid_ChartSegmentType_a$ || []).length}
  <div class="ChartSegmentType">
    {#if $ChartSegmentType_busy$}
      <PageLoader></PageLoader>
    {:else}
      {#each $valid_ChartSegmentType_a$ || [] as ChartSegmentTypeItem,index}
        <div>
          <div class="chart-heading">Segment types around { ChartSegmentTypeItem.Name }</div>
          <div class="pie-chart-section-wrapper">
            <div class="pie-chart-section">
              <canvas bind:this={$ChartSegmentType_canvas_a$[index]}
											id="segment-type-chart-{index}"
											class="pie-chart-canvas"
							></canvas>
            </div>
            <div class="chart-label-list">
              {#each ChartSegmentTypeItem.labels || [] as item,index}
                <div class="chart-label-item">
                  <span
										class="bg-color"
										style={style_({'background-color': ChartSegmentTypeItem.bgColors[index]})}
									></span>
                  <span class="label-text">{ item }</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}
