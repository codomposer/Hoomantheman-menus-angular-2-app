<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { Alert } from '@menus/shared-ui'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { UserAddresses_c } from './UserAddresses_c.js'
const ctx = getContext_ui_ctx()
export const _ = new UserAddresses_c(ctx)
const {
	autocomplete_new_userAddress$, busy$, new_userAddress$, new_userAddress_text$, error_message$, success_message$,
	userAddress_a$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<CrMainDashboard>
<div class="page user-addresses-page">
  <div class="row">
    <div class="col-sm-10 col-sm-offset-1">
      <div class="card p-0">
        <ul class="row tabs">
          <li class="col-sm-12 tab">
            <a href="." class="active" on:click|preventDefault>User Addresses</a>
          </li>
        </ul>
      </div>
      <div class="card">
        <Alert title="Success!" message={$success_message$} type="success"></Alert>
        <Alert title="Error!" message={$error_message$} type="danger"></Alert>
        <input bind:this={$autocomplete_new_userAddress$}
							 id="autocomplete-new-user-address"
							 type="text"
							 class="form-control"
							 bind:value={$new_userAddress_text$}
							 on:input={_.oninput_new_userAddress}
							 placeholder="Enter your location"
				>
        <div class="text-right m-t-10 m-b-10">
          <button type="button"
									class="btn btn-default"
									on:click={_.addnew_userAddress}
									disabled={!$new_userAddress$}
					>Add New</button>
        </div>
				{#if $busy$}
          <div class="loader"></div>
        {:else}
          <div class="table table-responsive-xs">
            <table class="table">
							<thead>
								<tr>
									<th></th>
									<th>Address</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#each $userAddress_a$ || [] as userAddress,index}
									<tr>
										<td>{ index + 1 }</td>
										<td>{ userAddress.Address }</td>
										<td>
											<button class="btn btn-warning" disabled>Edit</button>
										</td>
										<td>
											<button class="btn btn-danger"
															on:click={_evt => _.delete_userAddress(userAddress)}
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
</CrMainDashboard>
