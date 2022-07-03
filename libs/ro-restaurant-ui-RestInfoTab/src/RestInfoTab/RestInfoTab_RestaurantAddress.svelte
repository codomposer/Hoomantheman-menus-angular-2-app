<script lang="ts">
import { Select } from '@menus/form-ui'
import { errors_2, required_errors_, ValidationMessages, zip_errors_ } from '@menus/validation'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { ro_restaurant$, stateList$ } = _
let Address_1_errors:string[], City_errors:string[], State_errors:string[], ZipCode_errors:string[]
$: Address_1_errors = errors_2(['Address 1', required_errors_])($ro_restaurant$?.Address_1)
$: City_errors = errors_2(['City', required_errors_])($ro_restaurant$?.City)
$: State_errors = errors_2(['State', required_errors_, _.state_errors_($stateList$, 'State')])($stateList$)
$: ZipCode_errors = errors_2(['Zip Code', required_errors_, zip_errors_])($ro_restaurant$?.ZipCode)
export let RestaurantAddress_errors:string[] = []
$: RestaurantAddress_errors = [...Address_1_errors, ...City_errors, ...State_errors, ...ZipCode_errors]
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_RestaurantAddress">
  <div class="section-heading">Restaurant Address</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={Address_1_errors.length}
			>
        <label for="rest_Address_1">Address 1</label>
        <input type="text" class="form-control" id="rest_Address_1" name="Address_1"
							 required
							 bind:value={$ro_restaurant$.Address_1}
				>
        <ValidationMessages errors={Address_1_errors}></ValidationMessages>
      </div>
			{#if $ro_restaurant$}
        <div class="form-group input-container" class:has-error={City_errors.length}>
          <label for="rest_City">City</label>
          <input type="text" class="form-control" name="City" id="rest_City"
								 required
								 bind:value={$ro_restaurant$.City}
					>
          <ValidationMessages errors={City_errors}></ValidationMessages>
        </div>
      {/if}
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={State_errors.length}
			>
        <label for="rest_Address_2">Address 2 (optional)</label>
        <input type="text" class="form-control" name="Address_2" id="rest_Address_2"
							 bind:value={$ro_restaurant$.Address_2}
				>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group input-container">
            <label for="stateList">State</label>
            <div id="stateList">
              <Select bind:items={$stateList$}
											itemLabelProp={'State'}
							></Select>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          {#if $ro_restaurant$}
            <div class="form-group input-container"
								 class:has-error={ZipCode_errors.length}
						>
              <label for="rest_Zip">Zip</label>
              <input type="text" class="form-control" name="ZipCode" id="rest_Zip"
										 required
										 bind:value={$ro_restaurant$.ZipCode}
							>
              <ValidationMessages errors={ZipCode_errors}></ValidationMessages>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_RestaurantAddress {
	.section-heading {
		margin-top: 0;
	}
}
</style>
