<script lang="ts">
import { innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import { EnsureFontAwesome } from '@menus/font-awesome'
import type { RoMenuoptionitem } from '@menus/ro-shared-models'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { cancel_ro_menuoptionitem_b } from './cancel_ro_menuoptionitem_b.js'
import { edit_ro_menuoptionitem_b } from './edit_ro_menuoptionitem_b.js'
import { save_ro_menuoptionitem_b } from '../save_ro_menuoptionitem_b.js'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
export let menuoptionitem:RoMenuoptionitem
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const cancel_ro_menuoptionitem = cancel_ro_menuoptionitem_b(ctx)
const edit_ro_menuoptionitem = edit_ro_menuoptionitem_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
const save_ro_menuoptionitem = save_ro_menuoptionitem_b(ctx)
const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="RoMenuOptionModal_menuoptionitem">
	{#if menuoptionitem.edit_mode}
		<div class="action-buttons">
			<button type="submit" class="action-link save-link	"
							on:click|preventDefault={
								evt => save_ro_menuoptionitem($selected_ro_menuoption$, menuoptionitem)
							}
			>Save</button>
			<button type="button" class="action-link cancel-link"
							on:click={evt => cancel_ro_menuoptionitem(menuoptionitem)}
			>Cancel</button>
		</div>
	{:else}
		<div class="fa fa-pencil" on:click={evt => edit_ro_menuoptionitem(menuoptionitem)}>
			{#if $innerWidth_lte_SCREEN_XS_MIN$}<span>Edit</span>{/if}
		</div>
	{/if}
</div>

<style type=text/scss global>
@import '@menus/css/lib';
.RoMenuOptionModal_menuoptionitem {
	@media (max-width: $screen-xs-max) {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.fa {
		line-height: 24px;
	}
}
</style>
