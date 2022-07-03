<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { open_RoMenuOptionModal_i_b } from './open_RoMenuOptionModal_i_b.js'
import { SelectOptionCategoryModal_i$_b } from './SelectOptionCategoryModal_i$_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const open_RoMenuOptionModal_i = open_RoMenuOptionModal_i_b(ctx)
const SelectOptionCategoryModal_i$ = SelectOptionCategoryModal_i$_b(ctx)
</script>

<div class="OptionTabSearch action-buttons">
  <button class="btn btn-lg btn-success btn-option-category"
					on:click={evt => $SelectOptionCategoryModal_i$.open()}
	>Select</button>
  <button class="btn btn-lg btn-success btn-inverse btn-create-option-category"
					on:click={evt => open_RoMenuOptionModal_i()}
	>Create</button>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.OptionTabSearch {
	text-align: right;
	.btn {
		min-width: 140px;
	}
}
</style>
