<script lang="ts">
import { Row } from '@menus/bootstrap'
import { CheckBox, TextEditor } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { errors_2, required_errors_, ValidationMessages } from '@menus/validation'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const {
	About_Text_busy$, About_Text_errors$, Enable_Points$, is_super_admin_role$, manage_platform_settings$,
	PrivacyPolicy_busy$, PrivacyPolicy_errors$, ReturnPolicy_busy$, ReturnPolicy_errors$, TermsOfUse_busy$,
	TermsOfUse_errors$, YourPoints_errors$,
} = _
let Footer_Description_errors:string[]
$: Footer_Description_errors = errors_2(['Footer Description', required_errors_])(
	$manage_platform_settings$?.Footer_Description)
export let AppConfiguration_PagesText_errors:string[]
$: AppConfiguration_PagesText_errors = [
	...Footer_Description_errors, ...$About_Text_errors$, ...$YourPoints_errors$, ...$ReturnPolicy_errors$,
	...$PrivacyPolicy_errors$, ...$TermsOfUse_errors$
]
</script>

<Row>
  <div class="section-heading">Pages Text</div>
  <div class="section-subheading">Footer Description</div>
  <div class="col-sm-12">
    <div class="form-group input-container"
				 class:has-error={Footer_Description_errors.length}
		>
      <label for="Footer_Description">Footer Description</label>
      <textarea cols="30" rows="10" class="form-control"
								name="Footer_Description" id="Footer_Description"
								required
								bind:value={$manage_platform_settings$.Footer_Description}
			></textarea>
      <ValidationMessages errors={Footer_Description_errors} input_tooltip={true}></ValidationMessages>
    </div>
    <div class="form-group input-container">
      <div class="section-subheading">
        <div>
          <div class="col-sm-6">
            <div>About us
							{#if $About_Text_errors$.length}
                <span class="text-danger">({ $About_Text_errors$ })</span>
              {/if}
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-container">
              <CheckBox toggle={true} text="Enable"
												bind:value={$manage_platform_settings$.Enable_About_Text}
							></CheckBox>
            </div>
          </div>
        </div>
				{#if $manage_platform_settings$.Enable_About_Text}
          <div>
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
              <button use:ladda={$About_Text_busy$} type="button" class="btn btn-sm btn-success"
											on:click={evt => _.generate_page_text('About_Text')}
							>Generate Text</button>
            </div>
          </div>
        {/if}
      </div>
			{#if $manage_platform_settings$.Enable_About_Text}
        <TextEditor bind:value={$manage_platform_settings$.About_Text}
										id="About_Text"
				></TextEditor>
      {/if}
    </div>
		{#if $Enable_Points$ && $is_super_admin_role$}
      <div class="form-group input-container">
        <div class="section-subheading">Your Points
					{#if $YourPoints_errors$.length}
            <span class="text-danger">({ $YourPoints_errors$ })</span>
          {/if}
        </div>
        <div id="YourPoints">
          <TextEditor bind:value={$manage_platform_settings$.YourPoints}
											id="YourPoints"
					></TextEditor>
        </div>
      </div>
    {/if}
		{#if $is_super_admin_role$}
      <div class="form-group input-container">
        <div class="section-subheading">
          <div>
            <div class="col-sm-6">
              <div>Return Policy
								{#if $ReturnPolicy_errors$.length}
                  <span class="text-danger">({ $ReturnPolicy_errors$ })</span>
                {/if}
              </div>
            </div>
            <div class="col-sm-6">
              <button use:ladda={$ReturnPolicy_busy$} type="button"
											class="btn btn-sm btn-success"
											on:click={evt => _.generate_page_text('ReturnPolicy')}
							>Generate Text</button>
            </div>
          </div>
        </div>
        <TextEditor bind:value={$manage_platform_settings$.ReturnPolicy}
										id="ReturnPolicy"
				></TextEditor>
      </div>
    {/if}
		{#if $is_super_admin_role$}
      <div class="form-group input-container">
        <div class="section-subheading">
          <div>
            <div class="col-sm-6">
              <div>Privacy Policy
								{#if $PrivacyPolicy_errors$.length}
                  <span class="text-danger">({ $PrivacyPolicy_errors$ })</span>
                {/if}
              </div>
            </div>
            <div class="col-sm-6">
              <button use:ladda={$PrivacyPolicy_busy$} type="button"
											class="btn btn-sm btn-success"
											on:click={evt => _.generate_page_text('PrivacyPolicy')}
							>
                Generate Text
              </button>
            </div>
          </div>
        </div>
          <TextEditor bind:value={$manage_platform_settings$.PrivacyPolicy}
											id="PrivacyPolicy"
					></TextEditor>
      </div>
    {/if}
		{#if $is_super_admin_role$}
      <div class="form-group input-container">
        <div class="section-subheading">
          <div>
            <div class="col-sm-6">
              <div>Terms of Services
								{#if $TermsOfUse_errors$.length}
                  <span class="text-danger">({ $TermsOfUse_errors$ })</span>
                {/if}
              </div>
            </div>
            <div class="col-sm-6">
              <button use:ladda={$TermsOfUse_busy$} type="button"
											class="btn btn-sm btn-success"
											on:click={evt => _.generate_page_text('TermsOfUse')}
							>Generate Text</button>
            </div>
          </div>
        </div>
        <TextEditor bind:value={$manage_platform_settings$.TermsOfUse}
										id="TermsOfService"
				></TextEditor>
      </div>
    {/if}
  </div>
</Row>
