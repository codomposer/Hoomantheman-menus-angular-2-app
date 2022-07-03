<script lang="ts">
import { api_src_ } from '@menus/api'
import { CheckBox } from '@menus/form-ui'
import { errors_2, required_errors_, ValidationMessages } from '@menus/validation'
import { No_Alcohol_SegmentID } from '@menus/web-config'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { is_vendor_admin_role$, restImageInput$, ro_restaurant$ } = _
let Name_errors:string[]
$: Name_errors = errors_2(['Name', required_errors_])($ro_restaurant$?.Name)
export let Subscription_errors:string[] = []
$: Subscription_errors = [...Name_errors]
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_RestaurantDetails" class="restaurant-details-section RestInfoTab_RestaurantDetails">
	<div class="section-heading">Restaurant Details</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container" class:has-error={Name_errors.length}>
        <label for="rest_Name">Name {#if !$is_vendor_admin_role$} (can not be changed){/if}</label>
				{#if $ro_restaurant$}
					<input
						type="text" class="form-control" id="rest_Name" name="Name"
						required
						disabled={!$is_vendor_admin_role$}
						bind:value={$ro_restaurant$.Name}
					/>
				{/if}
				<ValidationMessages errors={Name_errors}></ValidationMessages>
      </div>
      <div class="form-group input-container">
        <label for="rest_Keywords">Keywords (optional)</label>
        <input type="text" class="form-control" id="rest_Keywords" name="Keywords"
							 bind:value={$ro_restaurant$.Keywords}
				/>
      </div>
      <div class="form-group input-container"
					 on:click={evt => _.modify_contact_customer_support()}
			>
        <label for="rest_Segment">Segment</label>
        <input type="text" class="form-control" id="rest_Segment" name="Segment"
							 disabled={true}
							 bind:value={$ro_restaurant$.Segment}
				/>
      </div>
      <div class="form-group input-container"
					 on:click={evt => _.modify_contact_customer_support()}
			>
        <label for="rest_Cuisine">Cuisine</label>
        <input type="text" class="form-control" id="rest_Cuisine" name="Cuisine"
							 disabled={true}
							 bind:value={$ro_restaurant$.Cuisine}
				/>
      </div>
			{#if $ro_restaurant$.SegmentID !== No_Alcohol_SegmentID}
        <div class="form-group input-container">
          <CheckBox text="Sell Alcohol" toggle={true}
										disabled={true}
										bind:value={$ro_restaurant$.Sell_Alcohol}
										on:click={evt=>_.modify_contact_customer_support()}
					></CheckBox>
        </div>
      {/if}
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="photo-upload-container input-container">
        <div>Photo (width and height must be same)</div>
        <div class="photo-viewer" class:photo-exist={$ro_restaurant$.RestImageExist}>
          {#if $ro_restaurant$.RestImageExist}
            <img src={api_src_($ro_restaurant$.FileName)} alt={$ro_restaurant$.Name}>
          {:else}
            <img src="/assets/img/ro/photo-placeholder.svg" alt="">
          {/if}
        </div>
				{#if $ro_restaurant$.EnableOnlineOrdering}
          <div class="action-buttons">
            <label class="btn btn-md file-upload-label" for="rest_image">
              <input
								bind:this={$restImageInput$} type="file" id="rest_image"
								title="Upload (1024x1024)"
								on:change={_.API_RESTAURANT_image_upload}
							/>
              <span>Upload</span>
            </label>
						{#if $ro_restaurant$.RestImageExist}
							<button
								type="button" class="btn btn-danger btn-md"
								on:click={_.API_RESTAURANT_image_del}
							>Remove</button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container store-group">
        <label for="rest_Description">App Store/Google Play Description (optional)</label>
				{#if $ro_restaurant$}
          <textarea
						class="form-control" name="Description" id="rest_Description"
						bind:value={$ro_restaurant$.Description} cols="30" rows="6"
					></textarea>
        {/if}
      </div>
    </div>
    <div class="col-md-6 col-lg-4"></div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import '@menus/css/lib';
.RestInfoTab_RestaurantDetails {
	.photo-upload-container {
		.photo-viewer {
			position: relative;
			overflow: hidden;
			margin-top: 7px;
			margin-bottom: 12px;
			width: 144px;
			height: 144px;
			background-color: rgba(#455A64, 0.05);
			&.photo-exist {
				background-color: transparent;
			}
			img {
				position: absolute;
				margin: auto;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				max-width: 100%;
			}
		}
		.delete-image {
			margin-top: 12px;
		}
	}
	.action-buttons {
		display: block;
		.btn {
			display: block;
			@media (max-width: $screen-xs-max) {
				min-width: 144px;
			}
			+ .btn {
				margin-top: 12px;
			}
		}
	}
}
</style>
