<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { userAddress_a$_b } from '@menus/consumer-user-address'
import { ChangeAddressModal } from '../ChangeAddressModal'
import { UserAddressList } from '../UserAddressList'
import { UserAddressListModal_c } from './UserAddressListModal_c'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
const ctx = getContext_ui_ctx() as user_address_ui_Ctx
const userAddress_a$ = userAddress_a$_b(ctx)
const userAddress_a_busy$ = userAddress_a$.busy$
export const _ = new UserAddressListModal_c(ctx)
const { is_modal_open$ } = _
export const open = _.open, close = _.close
let ChangeAddressModal_i
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in"></div>
<div class="UserAddressListModal modal fade d-block in"
		 class:d-block={!ChangeAddressModal_i?.is_modal_open$}
		 class:in={!ChangeAddressModal_i?.is_modal_open$}
		 on:click={_.close}
>
  <div class="modal-dialog" on:click|stopPropagation>
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close"
								on:click={_.close}
				>
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Choose Address</h4>
      </div>
      <div class="modal-body modal-scrollable">
        {#if $userAddress_a_busy$}
          <PageLoader></PageLoader>
        {/if}
				<UserAddressList {ChangeAddressModal_i}
												 on:select_userAddress={evt => _.on_select_userAddress(evt)}
												 on:set-default={evt => _.close()}
				></UserAddressList>
      </div>
    </div>
  </div>
</div>
{/if}
<ChangeAddressModal bind:this={ChangeAddressModal_i}></ChangeAddressModal>

<style type=text/scss global>
@import "@menus/consumer-shared-css/variables";
.UserAddressListModal {
	.modal-dialog {
		> .modal-content {
			> .modal-body {
				padding: 40px;
			}
		}
	}
}
</style>
