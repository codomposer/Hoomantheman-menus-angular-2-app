<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { chat_ui_Ctx } from '../chat_ui_Ctx.js'
import { ChatTemplatesModal_c } from './ChatTemplatesModal_c.js'
const ctx = getContext_ui_ctx() as chat_ui_Ctx
export const _ = new ChatTemplatesModal_c(ctx)
const { is_modal_open$, messageTemplates$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Modal -->
  <div class="modal confirm-modal fade d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1"
			 role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|preventDefault>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" on:click={evt => _.close()}>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">Choose Message Template</h4>
        </div>
        <div class="modal-body modal-scrollable">
          <table class="table table-hover">
            <tbody>
              <tr>
                {#each $messageTemplates$ as item}
                  <td on:click={evt => _.selectMessageTemplate(item)}>{ item.Value }</td>
                {/each}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}
