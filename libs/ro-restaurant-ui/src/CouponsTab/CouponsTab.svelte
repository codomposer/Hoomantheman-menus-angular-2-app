<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { shortDate_ } from '@menus/date'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { PageLoader } from '@menus/shared-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { getContext_ui_ctx } from '@menus/ui'
import { DISCOUNT_TYPE_PERCENT, DURATION_TYPE_ALWAYS, DURATION_TYPE_DATE, COUPONS_TAB } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { SaveCouponModal } from '../SaveCouponModal/index.js'
import { CouponsTab_c } from './CouponsTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new CouponsTab_c(ctx)
const { busy$, ro_coupons$, SaveCouponModal_i$, search$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[COUPONS_TAB]}
<div class="CouponsTab page">
<div class="restaurant-coupons">
  <SaveCouponModal bind:this={$SaveCouponModal_i$}
									 on:additem={evt=>_.onadditem_SaveCouponModal_i(evt)}
	></SaveCouponModal>
	{#if $busy$}
    <PageLoader></PageLoader>
  {:else}
    <div class="row input-container">
      <div class="col-sm-6">
        <div class="form-group input-container">
          <input type="text" class="form-control input-sm" placeholder="Search" name="Search"
								 bind:this={$search$}
								 on:keyup={evt => evt.key === 'Enter' && _.searchEnter()}
					>
        </div>
      </div>
      <div class="col-sm-6">
        <button class="btn btn-xlg btn-success btn-inverse"
								on:click={evt => _.open_SaveCouponModal_i()}
				>Create Coupon</button>
      </div>
    </div>
    <div class="coupon-list">
      {#each $ro_coupons$ as ro_coupon,index}
        <div class="coupon-item">
          <div class="coupon-item-header clearfix">
            <div class="text-overflow CouponCode header" title={ro_coupon.CouponCode}>{ ro_coupon.CouponCode }</div>
            <div class="DiscountValue header">{
							ro_coupon.DiscountType == DISCOUNT_TYPE_PERCENT
							? `${ro_coupon.DiscountValue}%`
							: `$${ro_coupon.DiscountValue}`
						} OFF</div>
          </div>
          <div class="coupon-loader">
            {#if ro_coupon.busy}
              <PageLoader center="parent"></PageLoader>
            {/if}
          </div>
          <div class="coupon-details">
            <div class="coupon-title-description">Description</div>
            <div class="coupon-description">{ ro_coupon.Description || 'N/A' }</div>
            <div class="coupon-title-limitation">Limitation</div>
            <div class="coupon-limitation">{ ro_coupon.Limitation || 'N/A' }</div>
          </div>
					<div class="coupon-log">
						<div class="coupon-start">Total used: <span>{ ro_coupon.RedeemCount }</span></div>
						<div class="coupon-start">Total unique reach: <span>{ ro_coupon.TotalReach }</span></div>
						<div class="coupon-start">Total discount:
							<span>{ currency_str_(ro_coupon.TotalDiscount || 0, 'USD') }</span>
						</div>
						{#if ro_coupon.DurationType == DURATION_TYPE_DATE}
							{#if ro_coupon.StartDate && ro_coupon.EndDate}
								<div class="coupon-start-date coupon-start coupon-date">Start Date
									on { shortDate_(ro_coupon.StartDate) }</div>
								<div class="coupon-end-date coupon-date">End Date on { shortDate_(ro_coupon.EndDate) }</div>
							{/if}
							{#if ro_coupon.DailyStartTime && ro_coupon.DailyEndTime}
								<div
									class="coupon-start-time coupon-start coupon-time">Start Time on { ro_coupon.DailyStartTime }</div>
								<div class="coupon-end-time coupon-time">End Time on { ro_coupon.DailyEndTime }</div>
							{/if}
						{/if}
						{#if ro_coupon.DurationType == DURATION_TYPE_ALWAYS}
							<div>
								<div class="coupon-start-date coupon-start coupon-date">Always Valid</div>
							</div>
						{/if}
					</div>
          <div class="coupon-status-toggle">
            <CheckBox inline={true} toggle={true}
											text="Enable"
											bind:value={ro_coupon.Enabled}
											on:change={evt => _.save_coupon(ro_coupon)}
						></CheckBox>
            <CheckBox inline={true} toggle={true}
											text="Visible"
											bind:value={ro_coupon.Is_Visible}
											on:change={evt => _.save_coupon(ro_coupon)}
						></CheckBox>
          </div>
          <div class="coupon-action-buttons">
            <button class="btn btn-sm btn-success btn-inverse action-edit"
										on:click={evt => _.open_SaveCouponModal_i(ro_coupon)}
						>Edit</button>
            <button use:ladda={ro_coupon.busyDelete} class="btn btn-sm btn-danger btn-inverse"
										class:active={ro_coupon.busyDelete}
										on:click={evt => _.delete_coupon(index, ro_coupon)}
						>{ ro_coupon.RedeemCount == 0 ? 'Delete' : 'Archive' }</button>
          </div>
        </div>
      {:else}
        <div class="no-records">No Records to display</div>
      {/each}
    </div>
  {/if}
</div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.CouponsTab {
	.restaurant-coupons {
		padding: 12px 0 0;
		.coupon-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.no-records {
				text-align: center;
				margin-top: 48px;
				padding: 20px 0;
			}
			.coupon-item {
				width: 450px;
				max-width: 450px;
				position: relative;
				padding: 24px 32px 32px;
				margin-bottom: 25px;
				border: 1px solid rgba(#455A64, .3);
				@media (max-width: $screen-xs-max) {
					width: 100%;
					max-width: 100%;
				}
				.coupon-loader {
					margin-top: 27px;
				}
				.coupon-item-header {
					border-bottom: 1px solid #DBDBDB;
					> div {
						font-weight: $lato-black;
						letter-spacing: 0;
						&.CouponCode {
							font-size: 32px;
						}
						&.DiscountValue {
							font-size: 24px;
							color: $brand-success;
						}
					}
				}
				.coupon-details {
					margin-top: 30px;
					height: 150px;
					overflow: auto;
					.coupon-title-description, .coupon-title-limitation {
						font-weight: $lato-bold;
					}
					.coupon-title-limitation {
						margin-top: 16px;
					}
					.coupon-description {
					}
					.coupon-limitation {
						color: $brand-danger;
					}
				}
				.coupon-log {
					> div {
						display: inline-block;
						margin-top: 14px;
						color: #7C8B92;
						&.coupon-start {
							margin-right: 22px;
							clear: left;
						}
					}
				}
				.coupon-duration-details {
					height: 80px;
				}
				.coupon-status-toggle {
					margin-top: 29px;
					.checkbox-inline {
						padding-left: 0;
						padding-right: 20px;
					}
				}
				.coupon-action-buttons {
					overflow: hidden;
					margin-top: 29px;
					.action-edit {
						@media (max-width: $screen-xs-max) {
							margin-bottom: 16px;
						}
						@media (min-width: $screen-sm-min) {
							margin-right: 24px;
						}
					}
					.btn {
						@media (max-width: $screen-xs-max) {
							width: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
