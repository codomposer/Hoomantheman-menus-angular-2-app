<script lang="ts">
import { Row } from '@menus/bootstrap'
import { CheckBox } from '@menus/form-ui'
import { copy_PublicKey_b } from '@menus/manage-platform-ui'
import { App_ID_regex } from '@menus/platform-settings'
import { getContext_ui_ctx } from '@menus/ui'
import {
	email_errors_, errors_2, gte_errors_2, lte_errors_2, regex_errors_2, required_errors_, validation, ValidationMessages,
	version_a_, version_a_compare_fn
} from '@menus/validation'
import {
	APP_CUSTOM_DOMAIN_FEATURE, APP_ID_READ_FEATURE, APP_ID_WRITE_FEATURE, APP_NAME_READ_FEATURE, APP_NAME_WRITE_FEATURE,
	APP_SUBDOMAIN_READ_FEATURE, APP_SUBDOMAIN_WRITE_FEATURE, BACKOFFICE_MIN_APP_VERSION_FEATURE,
	BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE, CONTACT_EMAIL_FEATURE, ENABLE_APP_FEATURE, MIN_APP_VERSION_FEATURE,
	MIN_FORCED_APP_VERSION_FEATURE, PUBLIC_KEY_FEATURE, WEB_APP_URL_
} from '@menus/web-config'
import { is_cordova_app } from '@menus/web-cordova'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const ctx = getContext_ui_ctx() as manage_platform_ui_AppConfiguration_Ctx
const { webConfig } = ctx
const copy_PublicKey = copy_PublicKey_b(ctx)
const {
	ro_auth_rules$, manage_platform_settings$, sub_App_ID$, App_Name_errors$, is_vendor_admin_role$,
	Contact_Email_errors$,
} = _
let App_ID_errors:string[], Subdomain_errors:string[], CustomDomain_errors:string[],
	MinAppVersion_errors:string[], MinForcedAppVersion_errors:string[], BackOfficeMinAppVersion_errors:string[],
	BackOfficeMinForcedAppVersion_errors:string[]
$:App_ID_errors = errors_2(['App ID',
	required_errors_,
	regex_errors_2(
		App_ID_regex, 'App ID must contain alpha-numeric characters, starting with a letter, & dot separators.js')
])($sub_App_ID$)
$: Subdomain_errors = errors_2(['Website Subdomain', required_errors_])($manage_platform_settings$?.Subdomain)
$: CustomDomain_errors = errors_2(['Custom Domain'])($manage_platform_settings$?.CustomDomain)
const min_version_cmp_fn = (val_a, cmp_a)=>version_a_compare_fn(val_a, cmp_a) >= 0
$: MinAppVersion_errors = errors_2(['Minimum App Version',
	gte_errors_2($manage_platform_settings$?.MinForcedAppVersion, {
		preprocess_fn: version_a_,
		compare_fn: min_version_cmp_fn,
		compare_error_text_fn: ()=>'Minimum Forced App Version'
	})
])($manage_platform_settings$?.MinAppVersion)
$: MinForcedAppVersion_errors = errors_2(['Minimum Forced App Version',
	lte_errors_2($manage_platform_settings$?.MinAppVersion, {
		preprocess_fn: version_a_,
		compare_fn: min_version_cmp_fn,
		compare_error_text_fn: ()=>'Minimum App Version'
	})
])($manage_platform_settings$?.MinForcedAppVersion)
$: BackOfficeMinAppVersion_errors = errors_2(['Back Office Minimum App Version',
	gte_errors_2($manage_platform_settings$?.BackOfficeMinForcedAppVersion, {
		preprocess_fn: version_a_,
		compare_fn: min_version_cmp_fn,
		compare_error_text_fn: ()=>'Back Office Minimum Forced App Version'
	})
])($manage_platform_settings$?.BackOfficeMinAppVersion)
$: BackOfficeMinForcedAppVersion_errors = errors_2(['Back Office Minimum Forced App Version',
	lte_errors_2($manage_platform_settings$?.BackOfficeMinAppVersion, {
		preprocess_fn: version_a_,
		compare_fn: min_version_cmp_fn,
		compare_error_text_fn: ()=>'Back Office Minimum App Version'
	})
])($manage_platform_settings$?.BackOfficeMinForcedAppVersion)
$: $Contact_Email_errors$ = errors_2(['Contact Email', required_errors_, email_errors_])(
	$manage_platform_settings$?.Contact_Email)
export let AppConfiguration_Main_errors:string[]
$: AppConfiguration_Main_errors = [
	...App_ID_errors, ...Subdomain_errors, ...CustomDomain_errors, ...MinAppVersion_errors, ...MinForcedAppVersion_errors,
	...$App_Name_errors$, ...$Contact_Email_errors$
]
let Subdomain_a:string[], CustomDomain_a:string[]
$: Subdomain_a = ($manage_platform_settings$?.Subdomain || '').split(/\s*,\s*/)
$: CustomDomain_a = ($manage_platform_settings$?.CustomDomain || '').split(/\s*,\s*/)
</script>

<div class="AppConfiguration_Main">
  <Row>
    <div class="section-heading">Main</div>
		{#if $ro_auth_rules$[ENABLE_APP_FEATURE]}
      <div class="col-sm-12 col-md-6">
        <div class="enable-app-wrapper input-container">
          <CheckBox toggle={true} text="Enable Mobile App"
										bind:value={$manage_platform_settings$.Enable_App}
					></CheckBox>
        </div>
      </div>
    {/if}
  </Row>
	{#if $ro_auth_rules$[PUBLIC_KEY_FEATURE]}
    <Row class="PublicKey_Row">
      <div class="col-sm-12 col-md-6">
        <div class="form-group input-container">
          <label for="PublicKey">Public Key</label>
          <input type="text" class="form-control cursor-text" name="PublicKey" id="PublicKey"
								 bind:value={$manage_platform_settings$.PublicKey}
								 disabled="true"
					>
          <div class="fa fa-copy copy"
							 on:click={evt => copy_PublicKey()}
					></div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[APP_ID_READ_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container" class:has-error={App_ID_errors.length}>
          <label for="App_ID">App ID (can not be changed, only use lower-case alphanumeric characters)</label>
          <input type="text" class="form-control" name="App_ID" id="App_ID"
								 required
								 value={$sub_App_ID$}
								 readonly={!$ro_auth_rules$[APP_ID_WRITE_FEATURE]}
								 on:change={evt => $manage_platform_settings$.App_ID = evt.target.value}
								 on:change={evt => manage_platform_settings$.refresh()}
					>
          <ValidationMessages errors={App_ID_errors} input_tooltip={true}></ValidationMessages>
          <div class="help-block text-success"
					>com.dishzilla.{ $sub_App_ID$ || '[example]' }</div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[APP_NAME_READ_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container" class:has-error={$App_Name_errors$.length}>
          <label for="App_Name">App Name
						{#if !$is_vendor_admin_role$} (can not be changed){/if}</label>
          <input type="text" class="form-control" name="App_Name" id="App_Name"
								 required
								 disabled={!$is_vendor_admin_role$}
								 readonly={!$ro_auth_rules$[APP_NAME_WRITE_FEATURE]}
								 bind:value={$manage_platform_settings$.App_Name}
								 use:validation={$manage_platform_settings$.App_Name, ['App Name', required_errors_]}
								 on:errors={evt => App_Name_errors$.set(evt.detail)}
					>
          <ValidationMessages errors={$App_Name_errors$} input_tooltip={true}></ValidationMessages>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[APP_SUBDOMAIN_READ_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container" class:has-error={Subdomain_errors.length}>
          <label for="Subdomain">Website Subdomain (can not be changed)</label>
          <input type="text" class="form-control" name="Subdomain" id="Subdomain"
								 readonly={!$ro_auth_rules$[APP_SUBDOMAIN_WRITE_FEATURE]}
								 required
								 bind:value={$manage_platform_settings$.Subdomain}
					>
          <ValidationMessages errors={Subdomain_errors} input_tooltip={true}></ValidationMessages>
					{#each Subdomain_a as Subdomain}
            <div class="help-block text-success">
              <a
								class="view-store-link text-success"
								target="_blank"
								href={ `https://${Subdomain}` }
								on:click={evt => {
									if (is_cordova_app) {
										evt.preventDefault()
										window.open(`https://${Subdomain}`, '_system')
									}
								}}
							>Visit: { Subdomain || '[example]' }</a>
            </div>
          {/each}
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[APP_CUSTOM_DOMAIN_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container" class:has-error={CustomDomain_errors.length}>
          <label for="CustomDomain">Website Custom Domain (multiple domains can be added)</label>
          <input type="text" class="form-control" name="CustomDomain" id="CustomDomain"
								 bind:value={$manage_platform_settings$.CustomDomain}
					>
          <ValidationMessages errors={CustomDomain_errors} input_tooltip={true}></ValidationMessages>
					{#each CustomDomain_a as CustomDomain}
            <div class="help-block text-success">
              <a
								class="view-store-link text-success" target="_blank"
								href={ `https://${CustomDomain}` }
								on:click={evt => {
									if (is_cordova_app) {
										evt.preventDefault()
										window.open(`https://${CustomDomain}`, '_system')
									}
								}}
							>Visit: { CustomDomain || '[example]' }</a>
            </div>
          {/each}
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[MIN_APP_VERSION_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container">
          <div class="form-group input-container" class:has-error={MinAppVersion_errors.length}>
            <label for="MinAppVersion">Minimum App Version</label>
            <input type="text" class="form-control"
									 name="MinAppVersion" id="MinAppVersion"
									 bind:value={$manage_platform_settings$.MinAppVersion}
						>
            <ValidationMessages errors={MinAppVersion_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[MIN_FORCED_APP_VERSION_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container">
          <div class="form-group input-container" class:has-error={MinForcedAppVersion_errors.length}>
            <label for="MinForcedAppVersion">Minimum Forced App Version</label>
            <input type="text" class="form-control"
									 name="MinForcedAppVersion" id="MinForcedAppVersion"
									 bind:value={$manage_platform_settings$.MinForcedAppVersion}
						>
            <ValidationMessages errors={MinForcedAppVersion_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[BACKOFFICE_MIN_APP_VERSION_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container">
          <div class="form-group input-container" class:has-error={BackOfficeMinAppVersion_errors.length}>
            <label for="BackOfficeMinAppVersion">Back Office Minimum App Version</label>
            <input type="text" class="form-control"
									 name="BackOfficeMinAppVersion" id="BackOfficeMinAppVersion"
									 bind:value={$manage_platform_settings$.BackOfficeMinAppVersion}
						>
            <ValidationMessages errors={BackOfficeMinAppVersion_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container">
          <div class="form-group input-container" class:has-error={BackOfficeMinForcedAppVersion_errors.length}>
            <label for="BackOfficeMinForcedAppVersion">Back Office Minimum Forced App Version</label>
            <input type="text" class="form-control"
									 name="BackOfficeMinForcedAppVersion" id="BackOfficeMinForcedAppVersion"
									 bind:value={$manage_platform_settings$.BackOfficeMinForcedAppVersion}
						>
            <ValidationMessages errors={BackOfficeMinForcedAppVersion_errors} input_tooltip={true}></ValidationMessages>
          </div>
        </div>
      </div>
    </Row>
  {/if}
	{#if $ro_auth_rules$[CONTACT_EMAIL_FEATURE]}
    <Row>
      <div class="col-xs-12">
        <div class="form-group input-container" class:has-error={$Contact_Email_errors$.length}>
          <label for="Contact_Email">Contact Email</label>
          <input type="email" class="form-control" name="Contact_Email" id="Contact_Email"
								 required
								 bind:value={$manage_platform_settings$.Contact_Email}
					>
          <ValidationMessages errors={$Contact_Email_errors$} input_tooltip={true}></ValidationMessages>
        </div>
      </div>
    </Row>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.ManagePlatform {
	.AppConfiguration {
		.AppConfiguration_Main {
			.PublicKey_Row {
				.copy {
					&:hover {
						color: $gray-lighter;
					}
					position: absolute;
					bottom: 0;
					right: 0;
					height: 48px;
					width: 48px;
					font-size: 24px;
					line-height: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
