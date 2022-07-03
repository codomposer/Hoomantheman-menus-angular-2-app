<script lang="ts">
import type { RoMenuoptionitem } from '@menus/ro-shared-models'
import type { SizeDetail } from '@menus/shared-menu'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
export let menuoptionitem:RoMenuoptionitem, size_detail:SizeDetail
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
</script>

{#if menuoptionitem.edit_mode}
	<input type="text"
				 class="form-control"
				 value={size_detail.Price||0}
				 on:input={evt => size_detail.Price = parseFloat(evt.target.value)}
				 on:input={evt => ro_menuoptionitems$.refresh()}
	>
{:else}
	<div>${ size_detail.Price || '' }</div>
{/if}
