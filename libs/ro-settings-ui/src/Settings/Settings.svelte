<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { notification_tone_url_a } from '@menus/notification-tone'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_, password_errors_, confirm_errors_2 } from '@menus/validation'
import { TutorialChapterId } from '@menus/ro-support-ui';
import type { ro_settings_ui_Ctx } from '../ro_settings_ui_Ctx.js'
import { Settings_c } from './Settings_c.js'
const ctx = getContext_ui_ctx() as ro_settings_ui_Ctx
export const _ = new Settings_c(ctx)
const { busy$, currentPassword_api_errors$, hasPassword$, password$, NotificationTone_url$, showRestTabNav$, } = _
let form_errors = []
let current_password_errors = [], new_password_errors = [], confirm_password_errors = []
let currentPassword_all_errors = []
$: currentPassword_all_errors = [...current_password_errors, ...$currentPassword_api_errors$]
$: form_errors = [
	...currentPassword_all_errors, ...$currentPassword_api_errors$, ...new_password_errors, ...confirm_password_errors,
]
let show_current_password = false, show_new_password = false, show_new_confirm_password = false
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="Settings page">
  <div class="page-title-section">
    <div class="page-title-text cursor-default">
      Settings

	  <a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.SETTINGS}" target="_blank"><i class="fa fa-youtube-play"></i></a>
    </div>
  </div>

  <div class="main-contents">
    <div class="row">
      <div class="col-sm-6">
        <form novalidate
							on:submit|preventDefault={form_errors.length || _.save()}
				>
          <div class="notification-tone-section">
            <div class="section-title">
              Restaurants
            </div>
            <div class="input-container">
              <CheckBox toggle={true}
												text="Enable Restaurant Tabs Navigation"
												bind:value={$showRestTabNav$}
							></CheckBox>
            </div>
          </div>
          <div class="notification-tone-section">
            <div class="section-title">
              Change Notification Tone
            </div>
            <div class="form-group">
              <select name="NotificationTone" class="form-control"
											bind:value={$NotificationTone_url$}
							>
                <option value="">Off</option>
								{#each notification_tone_url_a as item,idx}
                  <option value={item}>Notification { idx + 1 }</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="change-password-section">
            <div class="change-password-title">
              Change Password (optional)
            </div>
            <div class="form-group input-container"
								 class:has-error={currentPassword_all_errors.length}
						>
              <label for="currentPassword">Current Password</label>
              <div class="m-input-group has-addon-right">
                <input type="{ show_current_password ? 'text' : 'password' }"
											 class="form-control"
											 name="currentPassword" id="currentPassword"
											 value={$password$.old}
											 on:change={evt => $password$.old = evt.currentTarget.value}
											 on:change={evt => password$.refresh()}
											 use:validation={$password$.old, [
                         'Current Password',
                         $hasPassword$ ? required_errors_ : [],
                         password_errors_,
                         ]}
											 on:errors={evt => current_password_errors = evt.detail}
								>
                <div class="m-input-group-addon m-addon-right show-password-addon"
										 class:active={show_current_password}
										 on:click={evt => show_current_password = !show_current_password}
								>
                  <div class="show-password-icon"></div>
                </div>
              </div>
              <ValidationMessages errors={currentPassword_all_errors} input_tooltip={true}></ValidationMessages>
            </div>
            <div class="form-group input-container"
								 class:has-error={new_password_errors.length}
						>
              <label for="new_password">New Password</label>
              <div class="m-input-group has-addon-right">
                <input type="{ show_new_password ? 'text' : 'password' }" class="form-control"
											 reverse="true" name="new_password" id="new_password"
											 value={$password$.new}
											 on:change={evt => $password$.new = evt.currentTarget.value}
											 on:change={evt => password$.refresh()}
											 use:validation={$password$.new, [
                         'New Confirm Password',
                         $hasPassword$ ? required_errors_ : [],
                         password_errors_
                         ]}
											 on:errors={evt => new_password_errors = evt.detail}
								>
                <div class="m-input-group-addon m-addon-right show-password-addon"
										 class:active={show_new_password}
										 on:click={evt => show_new_password = !show_new_password}
								>
                  <div class="show-password-icon"></div>
                </div>
              </div>
              <ValidationMessages errors={new_password_errors} input_tooltip={true}></ValidationMessages>
            </div>
            <div class="form-group input-container"
								 class:has-error={confirm_password_errors.length}
						>
              <label for="confirm_password">New Confirm Password</label>
              <div class="m-input-group has-addon-right">
                <input type="{ show_new_confirm_password ? 'text' : 'password' }"
											 class="form-control"
											 name="confirm_password" id="confirm_password"
											 value={$password$.newConfirm}
											 on:change={evt => $password$.newConfirm = evt.currentTarget.value}
											 on:change={evt => password$.refresh()}
											 use:validation={$password$.newConfirm, [
                         'Confirm Password',
                         $hasPassword$ ? required_errors_ : [],
                         confirm_errors_2($password$.new)
                         ]}
											 on:errors={evt => confirm_password_errors = evt.detail}
								>
                <div class="m-input-group-addon m-addon-right show-password-addon"
										 class:active={show_new_confirm_password}
										 on:click={evt => show_new_confirm_password = !show_new_confirm_password}
								>
                  <div class="show-password-icon"></div>
                </div>
              </div>
              <ValidationMessages errors={confirm_password_errors} input_tooltip={true}></ValidationMessages>
            </div>
            <div class="change-password-actions">
              <button use:ladda={$busy$} type="submit" class="btn btn-lg btn-success"
							>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.Settings {
	padding-bottom: 100px;
	.main-contents {
		.notification-tone-section {
			margin-bottom: 48px;
			.section-title {
				font-weight: $lato-black;
				font-size: 18px;
			}
		}
		.change-password-section {
			margin-top: 48px;
			.change-password-title {
				font-weight: $lato-black;
				font-size: 18px;
			}
			.change-password-actions {
				margin-top: 40px;
			}
		}
	}
}
</style>
