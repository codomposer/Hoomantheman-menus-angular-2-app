<script lang="ts">
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { getContext_ui_ctx } from '@menus/ui'
import type { settings_ui_Ctx } from '../settings_ui_Ctx.js'
const ctx = getContext_ui_ctx() as settings_ui_Ctx
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
export let expand:boolean
</script>

<div class="ExpandCollapseControl expand-collapse-controls">
  {#if expand}
    <div class="collapse fa"
				 class:fa-minus={$innerWidth_gt_SCREEN_SM_MIN$}
				 class:fa-close={$innerWidth_lte_SCREEN_SM_MIN$}
				 on:click={evt => expand = false}
		></div>
  {:else}
    <div class="expand fa fa-plus"
				 on:click={evt => expand = true}
		></div>
  {/if}
</div>
