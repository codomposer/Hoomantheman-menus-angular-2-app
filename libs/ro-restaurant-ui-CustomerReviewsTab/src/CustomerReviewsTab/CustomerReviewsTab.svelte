<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { shortDate_ } from '@menus/date'
import { Pagination } from '@menus/pagination-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { getContext_ui_ctx } from '@menus/ui'
import { CUSTOMER_REVIEW_TAB } from '@menus/web-config'
import { onclick_download_link } from '@menus/web-cordova'
import type { ro_restaurant_ui_CustomerReviewsTab_Ctx } from '../ro_restaurant_ui_CustomerReviewsTab_Ctx.js'
import { CustomerReviewsTab_c } from './CustomerReviewsTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_CustomerReviewsTab_Ctx, dispatch = createEventDispatcher()
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new CustomerReviewsTab_c(ctx, dispatch)
const { busy$, data$, export_url$, page$, pageSize$, search$, TotalPages$, TotalRow$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[CUSTOMER_REVIEW_TAB]}
<div class="CustomerReviewsTab page">
  {#if $busy$}
    <PageLoader></PageLoader>
  {:else}
		<div class="customer-reviews-search filters-active">
			<div class="row">
				<div class="col-sm-5">
					<div class="form-group">
						<div class="m-input-group has-addon-left m-input-sm">
							<div class="m-input-group-addon m-addon-left">
								<div class="search-icon cursor-default"></div>
							</div>
							<input type="text" class="form-control input-sm"
										 name="customerReviewTabSearchText"
										 bind:value={$search$}
										 placeholder="Search for Customer Reviews"
										 on:keyup={evt => evt.key === 'Enter' && _.customer_review_search_text_Enter()}
							>
						</div>
					</div>
				</div>
				<div class="col-sm-7 text-right">
					<a href={ $export_url$ } target="_blank"
						 class="btn btn-xlg btn-success btn-inverse"
						 on:click|preventDefault={onclick_download_link}
					>Export</a>
				</div>
			</div>
		</div>
		<div class="customer-reviews-list">
			<table class="table table-striped">
				<thead>
					<tr>
						<th class="hidden-xs">Order Number</th>
						<th>Menu Item Name</th>
						<th>Customer</th>
						<th class="hidden-xs">Comment</th>
						<th>Rating</th>
						<th>Date Created</th>
						<!--<th>Approval Status</th>-->
						<!--<th></th>-->
					</tr>
				</thead>
				<tbody>
					{#each $data$ || [] as review}
						<tr>
							<td class="hidden-xs">
								<div class="f-black">{ review.OrderNumber || '' }</div>
							</td>
							<td>{ review.MenuItemName }</td>
							<td>{ review.Customer }</td>
							<td class="hidden-xs">{ review.Comment || '' }</td>
							<td>
								<div class="ratings-container">
									<div class="rating-off-icon"
											 class:rating-on-icon={review.Rating >= 1}
									></div>
									<div class="rating-off-icon"
											 class:rating-on-icon={review.Rating >= 2}
									></div>
									<div class="rating-off-icon"
											 class:rating-on-icon={review.Rating >= 3}
									></div>
									<div class="rating-off-icon"
											 class:rating-on-icon={review.Rating >= 4}
									></div>
									<div class="rating-off-icon"
											 class:rating-on-icon={review.Rating >= 5}
									></div>
								</div>
							</td>
							<td>
								{ shortDate_(review.Date_Created) }
							</td>
						</tr>
					{:else}
						<tr class="text-center">
							<td colspan="7">No Records to display</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if ($data$ || []).length}
			<Pagination id="CUSTOMER_REVIEW_PAGINATION_ID"
									bind:page={$page$}
									bind:pageSize={$pageSize$}
									TotalPages={$TotalPages$}
									TotalRow={$TotalRow$}
									on:change={evt => _.load_data()}
			></Pagination>
		{/if}
  {/if}
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
// Customer Reviews Tab
.CustomerReviewsTab {
	.customer-reviews-search {
		padding: 12px 0;
		border-bottom: 1px solid #DBDBDB;
	}
	.customer-reviews-list {
		table {
			margin-bottom: 0;
			tbody > tr > td {
				@media (max-width: $screen-xs-max) {
					padding: 4px;
				}
			}
		}
		.ratings-container {
			width: 120px;
		}
	}
}
</style>
