<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { percentage_str_ } from '@ctx-core/number'
import { Row } from '@menus/bootstrap'
import { shortDate_ } from '@menus/date'
import { CheckBox } from '@menus/form-ui'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { No_Alcohol_SegmentID } from '@menus/web-config'
import { RestContractModal_c } from './RestContractModal_c.js'
import RestContractModal_row_info_field from './RestContractModal_row_info_field.svelte'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
export const _ = new RestContractModal_c(ctx)
const { cuisine_a$, globalSettings$, is_modal_open$, ro_restaurant$, segment_a$, subscription$, today$ } = _
export const { close, open } = _
let NoCannabisTobacco = false, read_accept_tos = false, read_accept_privacy = false
$: {
	if ($ro_restaurant$) {
		const selected_segment = $segment_a$.find(segment=>segment.ID === $ro_restaurant$.SegmentID)
		const selected_segment_ID = selected_segment?.ID, selected_segment_Name = selected_segment?.Name
		if ($ro_restaurant$.SegmentID !== selected_segment_ID) {
			$ro_restaurant$.SegmentID = selected_segment_ID
		}
		if ($ro_restaurant$.Segment !== selected_segment_Name) {
			$ro_restaurant$.Segment = selected_segment_Name
		}
		const selected_cuisine = $cuisine_a$.find(cuisine=>cuisine.ID === $ro_restaurant$.CuisineID)
		const selected_cuisine_ID = selected_cuisine?.ID, selected_cuisine_Name = selected_cuisine?.Name
		if ($ro_restaurant$.CuisineID !== selected_cuisine_ID) {
			$ro_restaurant$.CuisineID = selected_cuisine_ID
		}
		if ($ro_restaurant$.Cuisine !== selected_cuisine_Name) {
			$ro_restaurant$.Cuisine = selected_cuisine_Name
		}
	}
}
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Rest Contract Modal -->
  <div
		class="modal RestContractModal fade d-block in"
		on:click={evt => _.close(false)}
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog modal-lg" role="document" on:click|stopPropagation>
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close"
									on:click|stopPropagation={evt => _.close(false)}
					>
						<div class="delete-icon"></div>
					</button>
					<h4 class="modal-title">Contract</h4>
				</div>
				<div class="modal-body modal-scrollable">
					{#if !$ro_restaurant$}
						<PageLoader center="parent"></PageLoader>
					{:else}
						<div class="info-section">
							<div class="info-title">Contract</div>
							<div class="info-details">
								<Row>
									<CheckBox
										text="This business(es) does not (and will not) sell any kind or product of Cannabis and Tobacco via the menu.com platform."
										name="NoCannabisTobacco" id="NoCannabisTobacco"
										bind:value={NoCannabisTobacco}
									></CheckBox>
								</Row>
								<Row class="type-of-business mt">
									<div class="f-bold">Please define the Type of your Business:</div>
								</Row>
								<Row>
									<div>Segment</div>
									<select name="segment" id="segment" bind:value={$ro_restaurant$.SegmentID}>
										{#each $segment_a$ as segment}
											<option value={segment.ID}>{segment.Name}</option>
										{/each}
									</select>
								</Row>
								<Row>
									<div>Cuisine</div>
									<select name="cuisine" id="cuisine" bind:value={$ro_restaurant$.CuisineID}>
										{#each $cuisine_a$ as cuisine}
											<option value={cuisine.ID}>{cuisine.Name}</option>
										{/each}
									</select>
								</Row>
								{#if $ro_restaurant$.SegmentID !== No_Alcohol_SegmentID}
									<Row class="sell-alcohol mt">
										<div class="f-bold">Do you have (or will have) any kind of product of
											Alcohol (like Beer, Wine, Liquor, etc.)
											in your menu on menu.com?</div>
										<label for="sell_alcohol_true">Yes</label>
										<input type="radio" bind:group={$ro_restaurant$.Sell_Alcohol} value={true}
													 id="sell_alcohol_true">
										<label for="sell_alcohol_false">No</label>
										<input type="radio" bind:group={$ro_restaurant$.Sell_Alcohol} value={false}
													 id="sell_alcohol_false">
									</Row>
								{/if}
								<Row class="tos agree_policy mt">
									<CheckBox
										class="btn-md-height"
										text="I read and accept the Terms of Service"
										name="read_accept_tos" id="read_accept_tos"
										bind:value={read_accept_tos}
									></CheckBox>
									<button class="btn btn-md" on:click={evt => _.print_tos()}>Print Terms of Service</button>
								</Row>
								<Row class="agree_policy">
									<CheckBox
										class="btn-md-height"
										text="I read and accept the Privacy Policy"
										name="read_accept_privacy" id="read_accept_privacy"
										bind:value={read_accept_privacy}
									></CheckBox>
									<button class="btn btn-md" on:click={evt => _.print_privacy_policy()}>Print Privacy Policy</button>
								</Row>
							</div>
						</div>
						<div class="info-section">
							<div class="info-title">Restaurant Details</div>
							<div class="info-details">
								<div class="row">
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="Name"
											value={$ro_restaurant$.Name}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Address"
											value={ `${$ro_restaurant$.Address_1 } ${ $ro_restaurant$.Address_2 }`}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Tax"
											value={percentage_str_($ro_restaurant$.Tax)}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Menus ID"
											value={$ro_restaurant$.ID}
										></RestContractModal_row_info_field>
									</div>
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="Phone"
											value={$ro_restaurant$.Phone}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Fax"
											value={$ro_restaurant$.Fax}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Mobile"
											value={$ro_restaurant$.Mobile}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Email"
											value={$ro_restaurant$.Email}
										></RestContractModal_row_info_field>
									</div>
								</div>
							</div>
						</div>
						<div class="info-section">
							<div class="info-title">Package Subscription</div>
							<div class="info-details">
								<div class="row">
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="Subscription"
											value={$subscription$.Name}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Delivery by"
											value={$subscription$.DeliveryBy || ''}
										></RestContractModal_row_info_field>
									</div>
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="Service Fee"
											value={$subscription$.ServiceFeePercent}
										></RestContractModal_row_info_field>
									</div>
								</div>
							</div>
						</div>
						<div class="info-section">
							<div class="info-title">Contact Details</div>
							<div class="info-details">
								<div class="row">
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="First Name"
											value={$ro_restaurant$.CI_FirstName}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Last Name"
											value={$ro_restaurant$.CI_LastName}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Address"
											value={$ro_restaurant$.CI_Address}
										></RestContractModal_row_info_field>
									</div>
									<div class="col-md-6">
										<RestContractModal_row_info_field
											label="Contact #"
											value={$ro_restaurant$.CI_ContactNo}
										></RestContractModal_row_info_field>
										<RestContractModal_row_info_field
											label="Email"
											value={$ro_restaurant$.CI_Email}
										></RestContractModal_row_info_field>
									</div>
								</div>
							</div>
						</div>
						<div class="info-section">
							<div class="info-title">Agreement Dated: { shortDate_($today$) }</div>
						</div>
						<div class="action-buttons">
							<button
								type="button" class="btn btn-lg btn-success"
								disabled={!read_accept_tos || !read_accept_privacy || !NoCannabisTobacco}
								on:click={evt =>
									_.accept_terms(read_accept_tos && read_accept_privacy && NoCannabisTobacco)
								}
							>Accept</button>
						</div>
					{/if}
				</div>
			</div>
    </div>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.RestContractModal {
	.info-section {
		.info-title {
			margin-top: 24px;
			font-weight: $lato-black;
			font-size: 18px;
		}
		.info-details {
			padding: 24px;
			.Row {
				&.mt {
					margin-top: 32px;
				}
				&.type-of-business {
					select {
						margin-right: 8px;
					}
				}
				&.agree_policy {
					.CheckBox {
						width: 20em;
					}
					button {
						width: 200px;
					}
				}
			}
			select {
				border: none;
			}
			.CheckBox {
				display: inline-flex;
			}
			.btn {
				vertical-align: top;
			}
			.info-field {
				margin-top: 6px;
				&.delivery-address-field {
					margin-top: 22px;
				}
			}
		}
	}
	.terms-checkbox {
		margin: 24px 0;
	}
}
</style>
