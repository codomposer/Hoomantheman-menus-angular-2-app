<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { CheckBox } from '@menus/form-ui'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b, params_MasterheadingID$_b } from '@menus/page'
import type { save_API_MENUS_heading_params_T } from '@menus/ro-http'
import { ro_httpClient_b } from '@menus/ro-http'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { API_MENUS_masterheading_list_payload$_b, subscribe_ERR_INVALID_ACCESS_b } from '@menus/ro-restaurant-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { MenuSearchBox } from '../MenuSearchBox/index.js'
import { ro_heading$_b } from '../ro_heading$_b.js'
import { ro_menuitems$_b } from '../ro_menuitems$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { selected_ro_masterheading$_b } from '../selected_ro_masterheading$_b.js'
import HeadingDetailsList from './HeadingDetailsList.svelte'
import { HeadingDetails_goBack_b } from './HeadingDetails_goBack_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const HeadingDetails_goBack = HeadingDetails_goBack_b(ctx)
const ro_restaurant$ = ro_restaurant$_b(ctx)
const ro_heading$ = ro_heading$_b(ctx)
const ro_menuitems$ = ro_menuitems$_b(ctx)
const selected_ro_masterheading$ = selected_ro_masterheading$_b(ctx)
const subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(ctx)
let busy = false
const component_name = 'HeadingDetails.js'
onMount(async ()=>{
	selected_ro_masterheading$.invalidate()
	ro_restaurant$.invalidate()
	ro_heading$.invalidate()
	ro_menuitems$.invalidate()
	busy = true
	try {
		await Promise.all([
			subscribe_wait_timeout(ro_restaurant$, I, timeout_ms),
			subscribe_wait_timeout(selected_ro_masterheading$, I, timeout_ms),
			subscribe_wait_timeout(ro_heading$, I, timeout_ms),
			subscribe_wait_timeout(ro_menuitems$, I, timeout_ms),
		])
	} finally {
		busy = false
	}
})
onDestroy(subscribe_ERR_INVALID_ACCESS(
	selected_ro_masterheading$.is_ERR_INVALID_ACCESS$, component_name
))
onDestroy(subscribe_ERR_INVALID_ACCESS(
	ro_restaurant$.is_ERR_INVALID_ACCESS$, component_name
))
onDestroy(subscribe_ERR_INVALID_ACCESS(
	ro_heading$.is_ERR_INVALID_ACCESS$, component_name
))
onDestroy(subscribe_ERR_INVALID_ACCESS(
	ro_menuitems$.is_ERR_INVALID_ACCESS$, component_name
))
const API_MENUS_masterheading_list_payload$ = API_MENUS_masterheading_list_payload$_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_httpClient = ro_httpClient_b(ctx)
const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
const notyf_success = notyf_success_b(ctx)
const notyf_error = notyf_error_b(ctx)
async function save_ro_heading() {
	busy = true
	const ro_heading = ro_heading$.$
	try {
		const payload = await ro_httpClient.save_API_MENUS_heading({
			fireFlyID: params_fireFlyID$.$,
			MasterheadingID: params_MasterheadingID$.$,
			head: ro_heading,
		} as save_API_MENUS_heading_params_T)
		if (payload.Status === STATUS_SUCCESS) {
			notyf_success(`${ro_heading.Name} updated successfully.`)
		} else {
			notyf_error('Unable to update item, Please try later.')
		}
    API_MENUS_masterheading_list_payload$.invalidate()
		log(ctx, component_name, 'save_ro_heading', payload)
	} finally {
		busy = false
	}
}
</script>

{#if !busy}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
<div class="HeadingDetails page">
  <div class="main-contents">
    {#if busy || !$ro_heading$}
      <PageLoader></PageLoader>
    {:else}
      <div class="page-title-section">
        <div class="page-title-text" on:click={evt => HeadingDetails_goBack()}>
          <div class="arrow-left-icon"></div>
					{ $ro_heading$.Name }
        </div>
        <div class="head-details-section">
          <div class="row">
            <div class="col-sm-6 details-item">
              { $ro_heading$.Description }
            </div>
            <div class="col-sm-6 details-item text-right">
              <CheckBox toggle={true}
												text="Enabled"
												bind:value={$ro_heading$.Enabled}
												on:change={evt => save_ro_heading()}
							></CheckBox>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-search-box-wrapper">
        <MenuSearchBox></MenuSearchBox>
      </div>
      <HeadingDetailsList></HeadingDetailsList>
    {/if}
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.HeadingDetails {
	.main-contents {
		.page-title-section {
			.head-details-section {
				margin-top: 16px;

				.CheckBox {
					display: inline-block;
				}
			}
		}
		@media (max-width: $screen-xs-max) {
			.page-title-section {
				.head-details-section {
          margin-top: 0;
					.details-item {
						text-align: center;
						margin-top: 16px;
					}
				}
			}
		}
	}
}
</style>
