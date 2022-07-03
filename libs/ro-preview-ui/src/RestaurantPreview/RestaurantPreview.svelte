<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { Path } from '@menus/route'
import { RestaurantMenuPreview } from '../RestaurantMenuPreview'
import type { ro_preview_ui_Ctx } from '../ro_preview_ui_Ctx.js'
import { RestaurantPreview_c } from './RestaurantPreview_c.js'
const ctx = getContext_ui_ctx() as ro_preview_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new RestaurantPreview_c(ctx, dispatch)
const { is_loaded$, other_data$, params_fireFlyID$, params_other_fireFlyID$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_loaded$}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{:else}
  <PageLoader center="page"></PageLoader>
{/if}
<div class="restaurant-preview-page">
  {#if $is_loaded$}
    <div class="main-contents">
      <div class="page-title-section">
        <a class="page-title-text"
           href={`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${$params_fireFlyID$}?tab=charts`}
        >
          <div class="arrow-left-icon"></div>
          { $other_data$?.RestName || '' }
        </a>
      </div>
			{#if $params_other_fireFlyID$}
        <div class="restaurant-menu-preview-container">
          <RestaurantMenuPreview on:change_data={evt => _.onchange_other_data(evt)}></RestaurantMenuPreview>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style type=text/scss>
.restaurant-preview-page {
	.restaurant-menu-preview-container {
		padding-top: 48px;
	}
}</style>
