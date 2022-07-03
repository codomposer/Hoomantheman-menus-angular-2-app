<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { UserAddressList_c } from './UserAddressList_c'
import { IMG_RADIO_ACTIVE$_b, IMG_RADIO$_b } from '@menus/platform-settings'
import { default_userAddress$_b } from '@menus/consumer-user-address'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
export let ChangeAddressModal_i, expand = true
const ctx = getContext_ui_ctx() as user_address_ui_Ctx
const default_userAddress$ = default_userAddress$_b(ctx)
const IMG_RADIO = IMG_RADIO$_b(ctx)
const IMG_RADIO_ACTIVE = IMG_RADIO_ACTIVE$_b(ctx)
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const dispatch = createEventDispatcher()
export const _ = new UserAddressList_c(ctx, dispatch)
const { action_busy$, userAddress_a$ } = _
$: _.ChangeAddressModal_i$.$ = ChangeAddressModal_i
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="UserAddressList">
  <div class="top-section">
    <div class="row">
      <div class="col-sm-6">
        <div class="section-title"
						 on:click={evt => dispatch('click-section-title', evt)}
				>Delivery Address</div>
      </div>
      <div class="col-sm-6"
					 class:text-right={$innerWidth_gt_SCREEN_SM_MIN$}
			>
			{#if expand}
        <button class="btn btn-lg btn-success btn-add-new-address"
								class:btn-sm={$innerWidth_lte_SCREEN_SM_MIN$}
								on:click={evt => _.edit_userAddress()}
				>Add a New Address</button>
			{/if}
      </div>
    </div>
  </div>
	{#if expand}
    <div class="user-address-table">
      {#if $action_busy$}
        <PageLoader></PageLoader>
      {/if}
			{#if $userAddress_a$?.length}
        <table class="table table-responsive-xs">
          <thead>
            <tr>
              <th>Default</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {#each $userAddress_a$ as userAddress,index}
              <tr on:click={_evt => dispatch('select_userAddress', { userAddress, index })}>
                <td>
                  {#if $default_userAddress$?.ID === userAddress.ID}
                    <img src={$IMG_RADIO_ACTIVE} alt=""/>
                  {:else}
                    <img src={$IMG_RADIO} alt=""/>
                  {/if}
                </td>
                <td>{ userAddress.Address }</td>
                <td>
                  <div class="pencil-icon"
											 on:click|stopPropagation={_evt => _.edit_userAddress(userAddress)}
									></div>
                </td>
                <td>
                  <div class="delete-time-icon"
											 on:click|stopPropagation={_evt => _.delete_userAddress(index, userAddress)}
									></div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/consumer-shared-css/variables";
.UserAddressList {
	.top-section {
		.section-title {
			font-weight: $lato-black;
			font-size: 18px;
		}
		.btn-add-new-address {
			min-width: 176px;
			@media(max-width: $screen-xs-max) {
				margin-top: 20px;
			}
		}
	}
	.user-address-table {
		position: relative;
		margin-top: 40px;
		@media(max-width: $screen-xs-max) {
			margin-top: 20px;
		}
		table {
			@media(max-width: $screen-xs-max) {
				// See https://stackoverflow.com/questions/23989463/how-to-set-tbody-height-with-overflow-scroll
				tbody {
					display: block;
					max-height: 200px;
					overflow: auto;
				}
				thead, tbody tr {
					display: table;
					width: 100%;
					table-layout: fixed;
				}
				thead {
					width: calc(100% - 1em);
				}
				// See https://css-tricks.com/responsive-data-tables/
				table, thead, tbody, th, td, tr {
					display: block;
				}
				thead tr {
					position: absolute;
					top: -9999px;
					left: -9999px;
				}
				tr {
					border: 1px solid #ccc;
					margin-bottom: 16px;
					td {
						border: none;
						border-bottom: 1px solid #eee;
						position: relative;
						padding: 0 0 0 50%;
						max-height: 3em;
						&:before {
							position: absolute;
							top: 0;
							left: 6px;
							width: 45%;
							padding: 0 10px 0 0;
							white-space: nowrap;
						}
						&:nth-of-type(1):before {
							content: "Default";
						}
						&:nth-of-type(2) {
							overflow: hidden;
						}
						&:nth-of-type(2):before {
							content: "Address";
						}
						&:nth-of-type(3):before {
							content: "Edit";
						}
						&:nth-of-type(4):before {
							content: "Delete";
						}
					}
				}
			}
			tr {
				th {
					border-top: 1px solid #ddd !important;
				}
			}
		}
	}
}
</style>
