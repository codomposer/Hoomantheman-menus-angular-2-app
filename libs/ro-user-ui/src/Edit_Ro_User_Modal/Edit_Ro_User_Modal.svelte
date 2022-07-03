<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { CheckBox, Password } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import {
	ValidationMessages, validation, required_errors_, email_errors_, password_errors_, confirm_errors_2
} from '@menus/validation'
import { RO_USER_LEVEL_LIST } from '@menus/web-config'
import {
	Edit_Ro_User_Modal_c, TAB_PROFILE, TAB_ASSOC_REST, user_rest_ffid_a_error_msg
} from './Edit_Ro_User_Modal_c.js'
import type { ro_user_ui_Ctx } from '../ro_user_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_user_ui_Ctx, dispatch = createEventDispatcher()
const ro_login_user = ro_login_user$_b(ctx)
export const _ = new Edit_Ro_User_Modal_c(ctx, dispatch)
export const { open, close } = _
const {
	active_tab$, busy$, save_busy$, Email_save_errors$, is_modal_open$, isNewUser$, owner_rest_a$,
	rest_search_hidden_count$, rest_keywords$, select_all_rest$, ro_user$, user_rest_ffid_a$
} = _
let form_errors:string[] = []//region
let FirstName_errors:string[] = [], LastName_errors:string[] = [], Email_errors:string = [],
	Password_errors:string[] = [], ConfirmPassword_errors:string[] = [], UserLevel_errors:string[] = [],
	user_rest_ffid_a_errors:string[] = []
$: user_rest_ffid_a_errors = $user_rest_ffid_a$?.length === 0 ? [user_rest_ffid_a_error_msg] : []
$: form_errors = [
	...FirstName_errors, ...LastName_errors, ...Email_errors, ...Password_errors, ...ConfirmPassword_errors,
	...UserLevel_errors, ...user_rest_ffid_a_errors
]
let FirstName_validationMessages:string[], FirstName_errors_show:boolean, LastName_validationMessages:string[],
	LastName_errors_show:boolean, Email_validationMessages:string[], Email_errors_show:boolean,
	Password_validationMessages:string[], ConfirmPassword_validationMessages:string[],
	UserLevel_validationMessages:string[], UserLevel_errors_show:boolean
//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:keydown={evt => evt.key === 'Escape' && _.close()}></svelte:window>
{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Add User Modal -->
  <div class="modal fade Edit_Ro_User_Modal d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1"
			 role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button
						type="button" class="close"
						on:click={evt => _.close()}
					><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{ $isNewUser$ ? 'New User' : `${$ro_user$.FirstName} ${$ro_user$.LastName}` }</h4>
        </div>
				{#if $busy$}
          <div class="main-page-loader">
            <PageLoader></PageLoader>
          </div>
        {:else}
          <form on:submit|preventDefault={evt => _.save(form_errors)}>
            <div class="modal-body modal-scrollable">
              <!-- Nav tabs -->
              <ul class="nav nav-pills">
                <li class:active={$active_tab$ === TAB_PROFILE}
								><a href="." on:click|preventDefault={evt => _.select_ro_restaurant_tab(TAB_PROFILE)}
								>Profile</a></li>
                <li class="position-relative" class:active={$active_tab$ === TAB_ASSOC_REST}
								><a
									href="."
									class="associate-rest-count-container"
									on:click|preventDefault={evt => _.select_ro_restaurant_tab(TAB_ASSOC_REST)}
								>Associated Restaurants
                  <div class="associate-rest-count" class:active={$user_rest_ffid_a$.length}
									>{ $user_rest_ffid_a$.length }</div>
                </a></li>
              </ul>
              <div class="tab-content">
                {#if $active_tab$ === TAB_PROFILE}
                  <div class="tab-pane profile-tab-pane active">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group input-container" class:has-error={FirstName_errors_show}>
                          <label for="FirstName">First Name</label>
                          <input type="text" name="FirstName" id="FirstName"
																 required
																 class="form-control"
																 bind:value={$ro_user$.FirstName}
																 use:validation={$ro_user$.FirstName, {
                                   label: 'First Name',
                                   validations: [required_errors_],
                                   validationMessages: FirstName_validationMessages
                                 }}
																 on:errors={evt => FirstName_errors = evt.detail}
													/>
                          <ValidationMessages
														bind:this={FirstName_validationMessages}
														bind:show={FirstName_errors_show}
														errors={FirstName_errors}
													></ValidationMessages>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group input-container" class:has-error={LastName_errors_show}>
                          <label for="LastName">Last Name</label>
                          <input
														type="text" name="LastName" id="LastName"
														required
														bind:value={$ro_user$.LastName}
														use:validation={$ro_user$.LastName, {
															label: 'Last Name',
															validations: [required_errors_],
															validationMessages: LastName_validationMessages
														}}
														on:errors={evt => LastName_errors = evt.detail}
														class="form-control"
													/>
                          <ValidationMessages
														bind:this={LastName_validationMessages}
														bind:show={LastName_errors_show}
														errors={LastName_errors}
													></ValidationMessages>
                        </div>
                      </div>
                    </div>
                    <div class="form-group input-container" class:has-error={Email_errors_show}>
                      <label for="Email">Email (Username)</label>
                      <input type="email" name="Email" id="Email"
														 required mValidEmail
														 class="form-control"
														 bind:value={$ro_user$.Email}
														 use:validation={$ro_user$.Email, {
                               label: 'Email',
                               validations: [required_errors_, email_errors_, $Email_save_errors$],
                               validationMessages: Email_validationMessages,
                             }}
														 on:errors={evt => Email_errors = evt.detail}
											/>
                      <ValidationMessages
												bind:this={Email_validationMessages}
												bind:show={Email_errors_show}
												errors={Email_errors}
											></ValidationMessages>
                    </div>
                    <div class="row">
                      <div class="col-sm-6 input-container">
                        <Password
													bind:value={$ro_user$.Password}
													validation_args={{
														label: 'Password',
														validations: [
															$isNewUser$ ? required_errors_ : null,
															password_errors_
														],
														validationMessages: Password_validationMessages,
														noinit: true,
													}}
													bind:errors={Password_errors}
												></Password>
                      </div>
                      <div class="col-sm-6 input-container">
                        <Password
													bind:value={$ro_user$.ConfirmPassword}
													label="Confirm Password"
													name="confirm_password"
													validation_args={{
														label: 'Confirm Password',
														validations: [
															$isNewUser$ ? required_errors_ : null,
															confirm_errors_2($ro_user$.Password)
														],
														validationMessages: ConfirmPassword_validationMessages,
														noinit: true,
													}}
													bind:errors={Password_errors}
												></Password>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group input-container" class:has-error={UserLevel_errors_show}>
                          <label for="UserLevel">User Level</label>
                          <select
														class="form-control" name="UserLevel" id="UserLevel"
														required
														disabled={$ro_user$.id === $ro_login_user.id}
														bind:value={$ro_user$.UserLevel}
														use:validation={$ro_user$.UserLevel, {
															label: 'User Level',
															validations: [required_errors_],
															validationMessages: UserLevel_validationMessages
														}}
														on:errors={evt => UserLevel_errors = evt.detail}
													>
                            {#each RO_USER_LEVEL_LIST as item}
                              <option value={item.id}>{ item.value }</option>
                            {/each}
                          </select>
                          <ValidationMessages
														bind:this={UserLevel_validationMessages}
														bind:show={UserLevel_errors_show}
														errors={UserLevel_errors}
													></ValidationMessages>
                        </div>
                      </div>
                    </div>
                  </div>
                {:else if $active_tab$ === TAB_ASSOC_REST}
                  <div class="tab-pane associate-restaurant-tab-pane active">
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <input
														type="text" class="form-control" name="rest_search_text"
														bind:value={$rest_keywords$}
														on:change={evt => _.onchange_rest_search_text()}
														placeholder="Search"
													>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="select-all-wrapper">
                          <CheckBox
														text="Select All"
														disabled={$ro_user$.id === $ro_login_user.id}
														bind:value={$select_all_rest$}
													></CheckBox>
                        </div>
                      </div>
                    </div>
                    <div class="dishes-list">
                      {#if $rest_search_hidden_count$ === $owner_rest_a$.length}
                        <div class="no-records">No records found</div>
                      {:else}
                        {#each $owner_rest_a$ as rest}
                          <div class="dish-item" class:active={rest.is_selected}>
                            {#if !rest.isHidden}
                              <CheckBox
																text={rest.Name}
																disabled={$ro_user$.id === $ro_login_user.id}
																bind:value={rest.is_selected}
																on:change={evt => _.onchange_owner_rest_a_item_is_selected(rest)}
															></CheckBox>
                            {/if}
                          </div>
                        {/each}
                      {/if}
                    </div>
                    <ValidationMessages errors={user_rest_ffid_a_errors}></ValidationMessages>
                  </div>
                {/if}
              </div>
            </div>
            <div class="modal-footer">
              <div class="row">
                <button
									use:ladda={$save_busy$} type="submit"
									class="col-xs-6 btn btn-lg btn-success"
									disabled={!!form_errors.length}
								>{ $isNewUser$ ? 'Add' : 'Save' }</button>
                <button
									type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
									on:click={evt => _.close()}
								>Cancel</button>
              </div>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.Edit_Ro_User_Modal {
	form {
		margin-bottom: 0;
	}
	.main-page-loader {
		padding: 40px 0;
	}
	.modal-body {
		padding-left: 0;
		padding-right: 0;
		.nav {
			height: 40px;
			padding: 0 40px;
			@media (max-width: $screen-xs-max) {
				padding-left: 0;
				padding-right: 0;
			}
			li {
				.associate-rest-count-container {
					padding-right: 32px;
					.associate-rest-count {
						position: absolute;
						height: 20px;
						min-width: 20px;
						right: 0;
						border: 1px solid $gray;
						border-radius: 2px;
						text-align: center;
						color: $gray;
						&.active {
							background: $brand-success;
							border-color: $brand-success;
							border-radius: 2px;
							color: white;
						}
					}
				}
			}
		}
		.tab-pane {
			padding: 28px 40px 0;
			@media (max-width: $screen-xs-max) {
				padding-left: 20px;
				padding-right: 20px;
			}
		}
		.associate-restaurant-tab-pane {
			.select-all-wrapper {
				padding-top: 14px;
				@media (max-width: $screen-xs-max) {
					margin-bottom: 24px;
				}
			}
			.dishes-list {
				border: 1px solid #DBDBDB;
				max-height: 300px;
				overflow-y: auto;
				.no-records {
					text-align: center;
					padding: 12px 0;
				}
				.dish-item {
					&.active {
						background: rgba(#33CF79, 0.1);
					}
					.checkbox {
						padding: 12px 18px;
						margin: 0;
					}
				}
			}
		}
	}
	.modal-footer {
		padding-bottom: 100px;
		@media (min-width: $screen-sm-min) {
			padding-bottom: 40px;
		}
		.action-buttons {
			margin-top: 8px;
			@media (max-width: $screen-sm-min) {
				display: flex;
				flex-direction: row;
			}
			.btn {
				@media (max-width: $screen-sm-min) {
					flex: 1;
					min-width: auto;
				}
				&:first-child {
					margin-right: 24px;
					@media (max-width: $screen-sm-min) {
						margin-right: 0;
					}
				}
			}
		}
	}
}
</style>
