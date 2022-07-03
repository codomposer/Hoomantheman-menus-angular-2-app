<script lang="ts">
import { Row } from '@menus/bootstrap'
import { errors_2, required_errors_, ValidationMessages } from '@menus/validation'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const { manage_platform_settings$ } = _
let App_IOS_Store_Link_errors:string[], App_Android_Store_Link_errors:string[]
$: App_IOS_Store_Link_errors = errors_2(['IOS Store Link', required_errors_])(
	$manage_platform_settings$?.App_IOS_Store_Link)
$: App_Android_Store_Link_errors = errors_2(['Android Store Link', required_errors_])(
	$manage_platform_settings$?.App_Android_Store_Link)
export let AppConfiguration_Store_errors:string[] = []
$: AppConfiguration_Store_errors = [...App_IOS_Store_Link_errors, ...App_Android_Store_Link_errors]
</script>

<div class="AppConfiguration_Store">
<Row class="section-heading">
  <div class="col-sm-6">
    <div>Store</div>
  </div>
  <div class="col-sm-6 text-right">
    <button type="button" class="btn btn-sm btn-success"
						on:click={evt => _.load_Store_Links()}
		>Refresh</button>
  </div>
</Row>
<Row>
  <div class="col-md-12">
    <div class="form-group input-container"
				 class:has-error={App_IOS_Store_Link_errors.length}
		>
      <label for="App_IOS_Store_Link">App Store Link (iOS)</label>
      <input type="text" class="form-control"
						 name="App_IOS_Store_Link" id="App_IOS_Store_Link"
						 required disabled
						 bind:value={$manage_platform_settings$.App_IOS_Store_Link}
			>
      <ValidationMessages errors={App_IOS_Store_Link_errors} input_tooltip={true}></ValidationMessages>
      <div class="help-block"><a class="view-store-link text-success" target="_blank"
																 href={$manage_platform_settings$.App_IOS_Store_Link}
			>Visit on App Store</a></div>
    </div>
  </div>
  <div class="col-md-12">
    <div class="form-group input-container"
				 class:has-error={App_Android_Store_Link_errors.length}
		>
      <label for="App_Android_Store_Link">Play Store Link (Android)</label>
      <input type="text" class="form-control"
						 name="App_Android_Store_Link" id="App_Android_Store_Link"
						 required disabled
						 bind:value={$manage_platform_settings$.App_Android_Store_Link}
			>
      <ValidationMessages errors={App_Android_Store_Link_errors} input_tooltip={true}></ValidationMessages>
      <div class="help-block"><a class="view-store-link text-success" target="_blank"
																 href={$manage_platform_settings$.App_Android_Store_Link}
			>Visit on Play Store</a></div>
    </div>
  </div>
</Row>
<Row>
	<div class="col-md-12">
		<div class="form-group input-container">
			<label for="BackOffice_App_IOS_Store_Link">Back Office App Store Link (iOS)</label>
			<input type="text" class="form-control"
						 name="BackOffice_App_IOS_Store_Link" id="BackOffice_App_IOS_Store_Link"
						 required disabled
						 bind:value={$manage_platform_settings$.BackOffice_App_IOS_Store_Link}
			>
			<div class="help-block"><a class="view-store-link text-success" target="_blank"
																 href={$manage_platform_settings$.BackOffice_App_IOS_Store_Link}
			>Visit on App Store</a></div>
		</div>
	</div>
	<div class="col-md-12">
		<div class="form-group input-container">
			<label for="BackOffice_App_Android_Store_Link">Back Office Play Store Link (Android)</label>
			<input type="text" class="form-control"
						 name="BackOffice_App_Android_Store_Link" id="BackOffice_App_Android_Store_Link"
						 required disabled
						 bind:value={$manage_platform_settings$.BackOffice_App_Android_Store_Link}
			>
			<div class="help-block"><a class="view-store-link text-success" target="_blank"
																 href={$manage_platform_settings$.BackOffice_App_Android_Store_Link}
			>Visit on Play Store</a></div>
		</div>
	</div>
</Row>
</div>
