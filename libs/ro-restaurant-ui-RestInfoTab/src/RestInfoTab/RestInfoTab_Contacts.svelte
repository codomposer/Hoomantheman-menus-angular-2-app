<script lang="ts">
import { email_errors_, errors_2, phone_errors_, required_errors_, ValidationMessages } from '@menus/validation'
import { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { ro_restaurant$ } = _
export let Phone_errors:string[], Mobile_errors:string[], Fax_errors:string[], Email_errors:string[]
$: Phone_errors = errors_2(['Phone', required_errors_, phone_errors_])($ro_restaurant$?.Phone)
$: Mobile_errors = errors_2(['Mobile', phone_errors_])($ro_restaurant$?.Mobile)
$: Fax_errors = errors_2(['Fax', phone_errors_])($ro_restaurant$?.Fax)
$: Email_errors = errors_2(['Email', required_errors_, email_errors_])($ro_restaurant$?.Email)
export let Contacts_errors:string[] = []
$: Contacts_errors = [...Phone_errors, ...Mobile_errors, ...Fax_errors, ...Email_errors]
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_Contacts">
  <div class="section-heading">Restaurant Contacts</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
        <div class="form-group input-container"
						 class:has-error={Phone_errors.length}
				>
          <label for="rest_Phone">Phone</label>
          <input type="text" class="form-control" name="Phone" id="rest_Phone"
								 required
								 bind:value={$ro_restaurant$.Phone}
					>
          <ValidationMessages errors={Phone_errors}></ValidationMessages>
        </div>
        <div class="form-group input-container"
						 class:has-error={Mobile_errors.length}
				>
          <label for="rest_Mobile">Mobile (optional)</label>
          <input type="text" class="form-control" name="Mobile" id="rest_Mobile"
								 bind:value={$ro_restaurant$.Mobile}
					>
          <ValidationMessages errors={Mobile_errors}></ValidationMessages>
        </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="form-group input-container"
					 class:has-error={Fax_errors.length}
			>
        <label for="rest_Fax">Fax (optional)</label>
        <input type="text" class="form-control" name="Fax" id="rest_Fax"
							 bind:value={$ro_restaurant$.Fax}
				>
        <ValidationMessages errors={Fax_errors}></ValidationMessages>
      </div>
      <div class="form-group input-container"
					 class:has-error={Email_errors.length}
			>
        <label for="rest_Email">Email</label>
        <input type="text" class="form-control" name="Email" id="rest_Email"
							 required
							 bind:value={$ro_restaurant$.Email}
				>
        <ValidationMessages errors={Email_errors}></ValidationMessages>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_Contacts {
	.section-heading {
		margin-top: 0;
 	}
}
</style>
