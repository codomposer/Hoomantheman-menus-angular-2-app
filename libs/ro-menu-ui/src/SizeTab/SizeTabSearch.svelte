<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { create_ro_menuoptionsize_b } from './create_ro_menuoptionsize_b.js'
import { toggle_isOpen_lookup_ro_menuoptionsizes_section_b } from './toggle_isOpen_lookup_ro_menuoptionsizes_section_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const create_ro_menuoptionsize = create_ro_menuoptionsize_b(ctx)
const toggle_isOpen_lookup_ro_menuoptionsizes_section = toggle_isOpen_lookup_ro_menuoptionsizes_section_b(ctx)
</script>

<div class="SizeTabSearch action-buttons">
  <button
		class="btn btn-lg btn-success btn-lg btn-option-category"
		on:click={evt => toggle_isOpen_lookup_ro_menuoptionsizes_section()}
	>Select Size</button>
  <button
		class="btn btn-lg btn-success btn-inverse btn-create-option-category"
		on:click={evt => create_ro_menuoptionsize()}
	>Create Size</button>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.SizeTabSearch {
	@media (max-width: $screen-xs-max) {
		margin-top: 12px;
		.btn {
			min-width: 140px;
		}
	}
}
</style>
