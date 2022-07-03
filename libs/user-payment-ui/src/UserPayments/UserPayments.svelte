<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Alert } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { SaveUserPaymentModal } from '../SaveUserPaymentModal'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
import { UserPayments_c } from './UserPayments_c.js'
const ctx = getContext_ui_ctx() as user_payment_ui_Ctx
export const _ = new UserPayments_c(ctx)
const { saveUserPaymentModal$, busy$, errorMessage$, successMessage$, userPayments$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<CrMainDashboard>
<SaveUserPaymentModal bind:this={$saveUserPaymentModal$}></SaveUserPaymentModal>
<div class="page">
  <div class="user-payments-page">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <div class="card p-0">
          <ul class="row tabs">
            <li class="col-sm-12 tab">
              <a href="." class="active" on:click|preventDefault>User Payments</a>
            </li>
          </ul>
        </div>
        <div class="card">
          <Alert title="Success!" message={$successMessage$} type="success"></Alert>
          <Alert title="Error!" message={$errorMessage$} type="danger"></Alert>
          <div class="p-10">
            <button class="btn btn-primary" on:click={_.openAddUserPaymentModal}
						>Add Payment Method</button>
          </div>
          <div class="m-t-20">
            {#if $busy$}
              <div class="loader"></div>
            {:else}
              <div class="table-responsive-xs">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Card Holder</th>
                      <th>Card Number</th>
                      <th>Card Type</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each $userPayments$ as userPayment,index}
                      <tr>
                        <td>{ index + 1 }</td>
                        <td><img src={userPayment.CardTypeImageURL} alt={userPayment.CardHolder}></td>
                        <td>{ userPayment.CardHolder }</td>
                        <td>{ userPayment.CardNumber }</td>
                        <td>
                          <button class="btn btn-warning"
                                  on:click={_evt => _.openAddUserPaymentModal(userPayment)}
                          >Edit</button>
                        </td>
                        <td>
                          <button class="btn btn-danger"
                                  on:click={_evt => _.delete_userPayment(userPayment)}
                          >Delete</button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</CrMainDashboard>

<style type=text/scss global>
.user-payments-page {
}
</style>
