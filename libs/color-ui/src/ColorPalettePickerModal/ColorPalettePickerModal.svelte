<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { style_ } from '@ctx-core/html'
import { colorPaletteList } from '@menus/color'
import { ColorPalettePickerModal_c } from './ColorPalettePickerModal_c.js'
import type { color_ui_Ctx } from '../color_ui_Ctx.js'
const ctx = getContext_ui_ctx() as color_ui_Ctx
export const _ = new ColorPalettePickerModal_c(ctx)
const { is_modal_open$ } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Color Picker Modal -->
  <div class="modal fade ColorPalettePickerModal color-palette-picker-modal d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" on:click={evt => _.close()}
					><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Choose a color palette</h4>
        </div>

        <div class="modal-body modal-scrollable">

          <div class="palette-list">
            {#each colorPaletteList as paletteItem}
              <div class="palette-item"
									 on:click={evt => _.chooseColorPalette(paletteItem)}
							>
                {#each paletteItem as item}
                  <div class="palette-color"
											 style={style_({'background-color': item})}
									>&nbsp;</div>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss>
.ColorPalettePickerModal {
	.modal-body {
		padding-left: 0;
		padding-right: 0;
		.palette-list {
			margin-top: 48px;
			.palette-item {
				text-align: center;
				margin-top: 24px;
				cursor: pointer;
				.palette-color {
					display: inline-block;
					width: 88px;
					height: 44px;
				}
			}
		}
	}
}
</style>
