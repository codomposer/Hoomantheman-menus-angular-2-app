<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Pagination } from '@menus/pagination-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_billing_ui_Ctx } from '../ro_billing_ui_Ctx.js'
import { SavePaymentMethodModal } from '../SavePaymentMethodModal/index.js'
import { ManagePayments_c, PAGINATION_ID } from './ManagePayments_c.js'
const ctx = getContext_ui_ctx() as ro_billing_ui_Ctx
export const _ = new ManagePayments_c(ctx)
const { busy$, page$, pageSize$, payment_methods$, SavePaymentMethodModal_i$, keywords$, TotalPages$, TotalRow$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ManagePayments page">
  <div class="main-contents">
    <SavePaymentMethodModal bind:this={$SavePaymentMethodModal_i$}></SavePaymentMethodModal>
    <div class="users-search-section">
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <input type="text" class="form-control input-sm"
									 name="search_text"
									 bind:value={$keywords$}
									 on:keyup={evt => evt.key === 'Enter' && _.search_text_Enter()}
									 placeholder="Search for Payment Methods">
          </div>
        </div>
        <div class="col-sm-3 action-buttons">
          <button class="btn btn-lg btn-success"
                  on:click={evt => _.open_SavePaymentMethodModal_i()}
          >Add Payment Method</button>
        </div>
      </div>
      <div class="users-list">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Card Type</th>
              <th>Card Number</th>
              <th>Expiry</th>
              <th>Card Holder</th>
              <th>First Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#if $busy$}
              <PageLoader></PageLoader>
            {/if}
            {#each $payment_methods$ as paymentMethod,index }
              <tr>
                <td>
                  { paymentMethod.CardType }
                </td>
                <td>
                  { paymentMethod.CardNumber }
                </td>
                <td>
                  { paymentMethod.Expiry }
                </td>
                <td>
                  { paymentMethod.CardHolder }
                </td>
                <td>
                  { paymentMethod.Billing_FirstName }
                </td>
                <td>
                  <div class="pencil-icon" on:click={evt => _.open_SavePaymentMethodModal_i(paymentMethod)}></div>
                  <div class="delete-time-icon" on:click={evt => _.delete_payment_method(index, paymentMethod)}></div>
                </td>
              </tr>
            {:else}
              <tr class="text-center">
                <td colspan="6">No Records to display</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
			{#if $payment_methods$.length}
        <Pagination id={PAGINATION_ID} bind:page={$page$} bind:pageSize={$pageSize$}
										TotalPages={$TotalPages$} TotalRow={$TotalRow$}
				></Pagination>
      {/if}
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.ManagePayments {
	.main-contents {
		.users-list {
			table {
				margin-bottom: 0;
				.email-no-verified {
					td {
						position: relative;
					}
				}
			}
		}
	}
}
</style>
