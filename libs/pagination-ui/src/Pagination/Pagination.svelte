<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { Pagination_c } from './Pagination_c.js'
import type { pagination_ui_Ctx } from '../pagination_ui_Ctx.js'
export let id = ''
export let page:string|number
export let pageSize:string|number
export let TotalPages:string|number
export let TotalRow:number
export let pageSize_a = [25, 50, 75, 100]
const ctx = getContext_ui_ctx() as pagination_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new Pagination_c(ctx, dispatch)
const { in_page$, out_page$, in_pageSize$, out_pageSize$ } = _
$: _.in_page$.$ = page
$: _.out_page$.$ = parseInt(page as string)
$: {
	if ($out_page$ !== $in_page$) {
		page = $out_page$
	}
}
$: _.in_pageSize$.$ = pageSize
$: _.out_pageSize$.$ = parseInt(pageSize as string)
$: {
	if ($out_pageSize$ !== $in_pageSize$) {
		pageSize = $out_pageSize$
	}
}
$: _.TotalPages$.$ = parseInt(TotalPages as string)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div {id} class="Pagination">
  <div class="row">
    <div class="col-sm-4 noselect">
      <div class="page-icon first-page-icon"
					 class:disabled={page <= 2}
					 on:click={_evt => _.first_changepage()}
			></div>
      <div class="page-icon previous-page-icon"
					 class:disabled={page <= 1}
					 on:click={_evt => _.changepage(-1)}
			></div>
      <div class="pagination-count">{ page ?? '—' }</div>
      <div class="page-icon next-page-icon"
					 class:disabled={page >= TotalPages}
					 on:click={_evt => _.changepage(1)}
			></div>
      <div class="page-icon last-page-icon"
					 class:disabled={page >= (TotalPages - 1)}
					 on:click={_evt => _.last_changepage()}
			></div>
    </div>
    <div class="col-sm-4 page-out-off-label">
      { page ?? '—' } of { TotalPages ?? '—' }
    </div>
    <div class="col-sm-4">
      <div class="form-inline page-size-select-wrapper">
        <div class="form-group page-size-select">
          <label for="">Page Size:</label>
          <select class="form-control"
									bind:value={$out_pageSize$}
					>
            {#each pageSize_a as item,index}
              <option value={item}
											hidden={index > 0 && TotalRow < pageSize_a[index - 1]}
							>{ item }</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Pagination {
	margin-bottom: 50px;
	padding: 8px 0;
	border-bottom: 1px solid #DBDBDB;
	@media (max-width: $screen-xs-max) {
		text-align: center;
	}
	.page-icon {
		margin-left: 8px;
		vertical-align: middle;
	}
	.pagination-count {
		display: inline-block;
		margin: 0 24px;
		font-weight: $lato-bold;
		vertical-align: middle;
	}
	.page-change-icon {
		@media (max-width: $screen-xs-max) {
			text-align: right;
			margin-bottom: 20px;
		}
	}
	.page-out-off-label {
		text-align: center;
		@media (max-width: $screen-xs-max) {
			margin-top: 16px;
		}
	}
	.page-size-select-wrapper {
		@media (max-width: $screen-xs-max) {
			margin-top: 16px;
			// margin-left: 16px;
		}
		@media (min-width: $screen-sm-min) {
			text-align: right;
		}
		.page-size-select {
			margin-bottom: 0;
			label {
				display: inline-block;
				margin-bottom: 0;
			}
			select.form-control {
				display: inline-block;
				width: auto;
				cursor: pointer;
				font-weight: bold;
				border: none;
				vertical-align: initial;
				height: 24px;
				padding-top: 0;
				padding-bottom: 0;
			}
		}
	}
}
</style>
