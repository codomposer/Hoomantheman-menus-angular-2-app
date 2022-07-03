<script lang="ts">
import { run } from '@ctx-core/function'
import { YYYY_MM_DD_inclusive_regex } from '@menus/date'
import { DateTime, Select } from '@menus/form-ui'
import {
	email_errors_, errors_2, phone_errors_, regex_errors_2, required_errors_, zip_errors_, ValidationMessages
} from '@menus/validation'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { CIStateList$, ro_restaurant$, } = _
let CI_FirstName_errors:string[], CI_LastName_errors:string[], CI_Address_errors:string[], CI_City_errors:string[],
	CI_State_errors:string[], CI_ZipCode_errors:string[], CI_ContactNo_errors:string[], CI_Email_errors:string[],
	CI_BirthDate_errors:string[]
$: CI_FirstName_errors = errors_2(['First Name', required_errors_])($ro_restaurant$?.CI_FirstName)
$: CI_LastName_errors = errors_2(['Last Name', required_errors_])($ro_restaurant$?.CI_LastName,)
$: CI_Address_errors = errors_2(['Address', required_errors_])($ro_restaurant$?.CI_Address)
$: CI_City_errors = errors_2(['City', required_errors_])($ro_restaurant$?.CI_City)
$: CI_State_errors = errors_2(['State', required_errors_, _.state_errors_($CIStateList$, 'State')])($CIStateList$)
$: CI_ZipCode_errors = errors_2(['Zip Code', required_errors_, zip_errors_])($ro_restaurant$?.CI_ZipCode)
$: CI_ContactNo_errors = errors_2(['Contact #', phone_errors_])($ro_restaurant$?.CI_ContactNo)
$: CI_Email_errors = errors_2(['Email', required_errors_, email_errors_])($ro_restaurant$?.CI_Email)
$: CI_BirthDate_errors = errors_2([
	'Birth Date', required_errors_, regex_errors_2(YYYY_MM_DD_inclusive_regex, 'Birth Date does not match format yyyy-mm-dd')
])($ro_restaurant$?.BirthDate)
export let ContactDetails_errors:string[] = []
$: ContactDetails_errors = [
	...CI_FirstName_errors, ...CI_LastName_errors, ...CI_Address_errors, ...CI_City_errors, ...CI_State_errors,
	...CI_ZipCode_errors, ...CI_ContactNo_errors, ...CI_Email_errors
]
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_ContactDetails">
  <div class="section-heading">Contact Details</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={CI_FirstName_errors.length}
			>
        <label for="rest_CI_FirstName">First Name</label>
        <input type="text" class="form-control" name="CI_FirstName" id="rest_CI_FirstName"
							 required
							 bind:value={$ro_restaurant$.CI_FirstName}
				>
        <ValidationMessages errors={CI_FirstName_errors}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={CI_LastName_errors.length}
			>
        <label for="rest_CI_LastName">Last Name</label>
        <input type="text" class="form-control" name="CI_LastName" id="rest_CI_LastName"
							 required
							 bind:value={$ro_restaurant$.CI_LastName}
				>
        <ValidationMessages errors={CI_LastName_errors}></ValidationMessages>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-8">
      <div class="form-group input-container"
					 class:has-error={CI_Address_errors.length}
			>
        <label for="rest_CI_Address">Address</label>
        <input type="text" class="form-control" name="CI_Address" id="rest_CI_Address"
							 required
							 bind:value={$ro_restaurant$.CI_Address}
				>
        <ValidationMessages errors={CI_Address_errors}></ValidationMessages>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={CI_City_errors.length}
			>
        <label for="rest_CI_City">City</label>
        <input type="text" class="form-control" name="CI_City" id="rest_CI_City"
							 required
							 bind:value={$ro_restaurant$.CI_City}
				>
        <ValidationMessages errors={CI_City_errors}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={CI_State_errors.length}
					>
            <label for="rest_State">State</label>
            <div id="rest_State">
              <Select bind:items={$CIStateList$} id="rest_State"
											itemLabelProp={'State'}
							></Select>
            </div>
            <ValidationMessages errors={CI_State_errors}></ValidationMessages>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group input-container"
							 class:has-error={CI_ZipCode_errors.length}
					>
            <label for="rest_CI_ZipCode">Zip</label>
            <input type="text" class="form-control" name="CI_ZipCode" id="rest_CI_ZipCode"
									 required
									 bind:value={$ro_restaurant$.CI_ZipCode}
						>
            <ValidationMessages errors={CI_ZipCode_errors}></ValidationMessages>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={CI_ContactNo_errors.length}
			>
        <label for="rest_CI_ContactNo">Contact # (optional)</label>
        <input type="text" class="form-control" id="rest_CI_ContactNo" name="CI_ContactNo"
							 bind:value={$ro_restaurant$.CI_ContactNo}
				>
        <ValidationMessages errors={CI_ContactNo_errors}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={CI_Email_errors.length}
			>
        <label for="rest_CI_Email">Email</label>
        <input type="text" class="form-control" id="rest_CI_Email" name="CI_Email"
							 required
							 bind:value={$ro_restaurant$.CI_Email}
				>
        <ValidationMessages errors={CI_Email_errors}></ValidationMessages>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-lg-4"
				 class:has-error={CI_BirthDate_errors.length}
		>
			<div class="form-group input-container">
				<label for="rest_BirthDate">Date of birth</label>
				<div id="rest_BirthDate">
					<DateTime bind:value={$ro_restaurant$.BirthDate}
										options={{
											hide_clear: true,
											maxDate: run(()=>{
												const date = new Date()
												date.setFullYear(date.getFullYear() - 13)
												return date
											})
										}}
					></DateTime>
				</div>
				<ValidationMessages errors={CI_BirthDate_errors}></ValidationMessages>
			</div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container">
        <label for="rest_CI_Webmaster_Name">Webmaster Name (optional)</label>
        <input type="text" class="form-control" name="CI_Webmaster_Name" id="rest_CI_Webmaster_Name"
							 bind:value={$ro_restaurant$.CI_Webmaster_Name}
				>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_ContactDetails {
	.section-heading {
		margin-top: 0;
	}
}
</style>
