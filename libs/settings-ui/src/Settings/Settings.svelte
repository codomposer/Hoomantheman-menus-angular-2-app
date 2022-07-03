<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { SETTINGS_PROFILE_TAB } from '@menus/web-config'
import { ChangeAddressModal, Profile, UserAddressList } from '@menus/user-address-ui'
import { validation, required_errors_, password_errors_, confirm_errors_2 } from '@menus/validation'
import { ValidationMessages } from '@menus/validation'
import { ladda } from '@menus/ladda'
import { UserPaymentList } from '@menus/user-payment-ui'
import { IMG_RADIO_ACTIVE$_b, IMG_RADIO$_b } from '@menus/platform-settings'
import { close_account_b } from '@menus/consumer-user-ui'
import type { settings_ui_Ctx } from '../settings_ui_Ctx.js'
import {
	Account_Settings, Settings_c, SoldOutActions_Settings, UserAddressList_Settings, UserPaymentList_Settings
} from './Settings_c.js'
import ExpandCollapseControl from './ExpandCollapseControl.svelte'
import { LoginAPIRequestQuery } from '@menus/consumer-user-common';
const ctx = getContext_ui_ctx() as settings_ui_Ctx
const close_account = close_account_b(ctx)
const IMG_RADIO$ = IMG_RADIO$_b(ctx)
const IMG_RADIO_ACTIVE$ = IMG_RADIO_ACTIVE$_b(ctx)
export const _ = new Settings_c(ctx)
const {
	change_password_busy$, form$, open_modals_set, selected_SoldOutAction$, show_current_password$,
	show_new_confirm_password$, show_new_password$, SoldOutActions$, SoldOutAction_busy$, change_password$, consumer_login_user$
} = _
let form_errors = []//region
let ChangeAddressModal_i:ChangeAddressModal
let current_password_errors = [], new_password_errors = [], confirm_password_errors = []
$: form_errors = [...current_password_errors, ...new_password_errors, ...confirm_password_errors]//endregion
let UserAddressList_expand = false
let UserPaymentList_expand = false
let SoldOutAction_expand = false
let Account_expand = false
let LOGIN_ACCOUNT_TEXT = LoginAPIRequestQuery.LOGIN_ACCOUNT_TEXT
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
$: {
	open_modals_set[UserAddressList_expand ? 'add' : 'delete'](UserAddressList_Settings)
	open_modals_set[UserPaymentList_expand ? 'add' : 'delete'](UserPaymentList_Settings)
	open_modals_set[SoldOutAction_expand ? 'add' : 'delete'](SoldOutActions_Settings)
	open_modals_set[Account_expand ? 'add' : 'delete'](Account_Settings)
}
</script>

<ChangeAddressModal bind:this={ChangeAddressModal_i}></ChangeAddressModal>
<div class="Settings">
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Settings</span>
			</li>
		</ul>
	</div>

	<Profile activeTab={SETTINGS_PROFILE_TAB}></Profile>
	<div class="profile-settings">
	<div class="UserAddressList_container expandable-section"
				class:expand={UserAddressList_expand}
		>
		<ExpandCollapseControl bind:expand={UserAddressList_expand}></ExpandCollapseControl>
		<UserAddressList {ChangeAddressModal_i}
											expand={UserAddressList_expand}
											on:click-section-title={evt => UserAddressList_expand = !UserAddressList_expand}
											on:select_userAddress={evt => _.on_select_userAddress(evt)}
			></UserAddressList>
	</div>
	<div class="UserPaymentList_container expandable-section"
				class:expand={UserPaymentList_expand}
		>
		<ExpandCollapseControl bind:expand={UserPaymentList_expand}></ExpandCollapseControl>
		<UserPaymentList expand={UserPaymentList_expand}
											on:click-section-title={evt => UserPaymentList_expand = !UserPaymentList_expand}
			></UserPaymentList>
	</div>
	<div class="sold-out-section expandable-section"
				class:expand={SoldOutAction_expand}
		>
		<ExpandCollapseControl bind:expand={SoldOutAction_expand}></ExpandCollapseControl>
		<div class="section-title"
					on:click={evt => SoldOutAction_expand = !SoldOutAction_expand}
			>Sold Out / Price Changing</div>
		<div class="sold-out-section-list expandable" class:expand={SoldOutAction_expand}>
		{#if $SoldOutAction_busy$}
			<PageLoader center="parent"></PageLoader>
		{/if}
				<div class="table table-responsive-xs">
			<table class="table">
						<tbody>
							{#each $SoldOutActions$ as SoldOutAction,index}
								<tr on:click={_evt => _.onclick_SoldOutAction(SoldOutAction)}>
									<td class="nostretch">
										{#if $selected_SoldOutAction$?.ID === SoldOutAction.ID}
											<img src={$IMG_RADIO_ACTIVE$} alt=""/>
										{:else}
											<img src={$IMG_RADIO$} alt=""/>
										{/if}
									</td>
									<td>
										<div class="sold-out-section-name">{ SoldOutAction.Name }</div>
										<div class="sold-out-section-description c-text2">{ SoldOutAction.Description }</div>
									</td>
								</tr>
							{/each}
						</tbody>
			</table>
		</div>
		</div>
	</div>
	<div class="account-section expandable-section"
				class:expand={Account_expand}
		>
		<ExpandCollapseControl bind:expand={Account_expand}></ExpandCollapseControl>
		<div class="section-title"
					on:click={evt => Account_expand = !Account_expand}
			>Account</div>
		<div class="account-section-form expandable" class:expand={Account_expand}>
		<div class="section-title">Change Password</div>
		{#if $consumer_login_user$?.SocialNetworkID === LoginAPIRequestQuery.LOGIN_MENU_ACCOUNT }
		<form bind:this={$form$} novalidate 
						on:submit|preventDefault={evt => form_errors.length || _.save_change_password()}
			>
		<div class="form-group input-container"
						class:has-error={current_password_errors.length}
				>
			<label for="currentPassword">Current Password</label>
			<div class="m-input-group has-addon-right">
			<input type="{ $show_current_password$ ? 'text' : 'password' }"
									class="form-control"
									required
									name="currentPassword" id="currentPassword"
									value={$change_password$.currentPassword||''}
									use:validation={$change_password$.currentPassword, [
					'Current Password', required_errors_, password_errors_
					]}
									on:errors={evt => current_password_errors = evt.detail}
									on:input={evt => $change_password$.currentPassword = evt.target.value}
						>
			<div class="m-input-group-addon m-addon-right show-password-addon"
								class:active={$show_current_password$}
								on:click={_.toggle_show_current_password}
						>
				<div class="show-password-icon"></div>
			</div>
			</div>
			<ValidationMessages errors={current_password_errors}></ValidationMessages>
		</div>
		<div class="form-group input-container" class:has-error={new_password_errors.length}>
			<label for="new_password">New Password</label>
			<div class="m-input-group has-addon-right">
			<input type="{ $show_new_password$ ? 'text' : 'password' }"
									class="form-control"
									reverse="true"
									name="new_password" id="new_password"
									required
									value={$change_password$.new_password||''}
									use:validation={$change_password$.new_password, ['New Password',
					required_errors_, password_errors_
					]}
									on:errors={evt => new_password_errors = evt.detail}
									on:input={evt => $change_password$.new_password = evt.target.value}
						>
			<div class="m-input-group-addon m-addon-right show-password-addon"
								class:active={$show_new_password$}
								on:click={_.toggle_show_new_password}
						>
				<div class="show-password-icon"></div>
			</div>
			</div>
			<ValidationMessages errors={new_password_errors}></ValidationMessages>
		</div>
		<div class="form-group input-container"
						class:has-error={confirm_password_errors.length}
				>
			<label for="confirm_password">New Confirm Password</label>
			<div class="m-input-group has-addon-right">
			<input type="{ $show_new_confirm_password$ ? 'text' : 'password' }"
									class="form-control"
									name="confirm_password" id="confirm_password"
									value={$change_password$.confirm_password||''}
									required
									use:validation={$change_password$.confirm_password, ['New Confirm Password',
					required_errors_, password_errors_, confirm_errors_2($change_password$.new_password)
					]}
									on:input={evt => $change_password$.confirm_password = evt.target.value}
									on:errors={evt => confirm_password_errors = evt.detail}
						>
			<div class="m-input-group-addon m-addon-right show-password-addon"
								class:active={$show_new_confirm_password$}
								on:click={evt => _.toggle_show_new_confirm_password()}
						>
				<div class="show-password-icon"></div>
			</div>
			</div>
			<ValidationMessages errors={confirm_password_errors}></ValidationMessages>
		</div>
		<div class="change-password-actions">
			<button use:ladda={$change_password_busy$}
									type="submit" class="btn btn-lg btn-success"
					>Change Password</button>
		</div>
		</form>
		{:else}
		<div class="can-not-change-password">
			You can't change your password because you are logged in with
			{#if $consumer_login_user$ }
				<span>{ LOGIN_ACCOUNT_TEXT[$consumer_login_user$.SocialNetworkID] }</span>
			{/if}
		</div>
		{/if}
		</div>
		<div class="form-group close-account-container expandable" class:expand={Account_expand}>
		<div class="section-title">Close your Account</div>
		<button class="btn btn-success btn-lg btn-close-account"
								href="/close-account"
								on:click|preventDefault={evt => close_account()}

				>Close your Account</button>
		</div>
	</div>
	</div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";

.Settings {
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}

	.profile-settings {
		padding: 16px 48px 0;

		@media (min-width: $screen-sm-min) {
			padding-left: 72px;
			padding-right: 72px;
		}
		.expandable-section {
			position: relative;
			margin-bottom: 43px;

			&.expand {
				@media (max-width: $screen-xs-max) {
					position: fixed;
					top: 72px;
					left: 0;
					height: calc(100vh - 72px);
					width: 100vw;
					overflow: hidden;
					z-index: 2;
					padding: 0 24px 72px 24px;
					background-color: white;
					.expand-collapse-controls {
						left: auto;
						right: 24px;
						z-index: 3;
					}
				}
			}
			.expand-collapse-controls {
				position: absolute;
				top: 0;
				left: -24px;
				font-size: 18px;
				z-index: 1;
			}
		}
		.UserAddressList_container {
			&.expand {
				.UserAddressList {
					.user-address-table {
						table {
							tbody {
								@media (max-width: $screen-xs-max) {
									max-height: calc(100vh - 170px);
								}
							}
						}
					}
				}
			}
		}
		.UserPaymentList_container {
			&.expand {
				.UserPaymentList {
					.payment-card-section-wrapper {
						margin-top: 24px;

						@media (max-width: $screen-xs-max) {
							max-height: calc(100vh - 150px);
						}
					}
				}
			}
		}

		.sold-out-section {

			.sold-out-section-list {
				margin-top: 24px;

				.table {
					border-bottom: none;
				}
			}
		}

		.account-section {
			.account-section-form {
				margin-top: 24px;
			}

			.close-account-container {
				.btn-close-account {
					margin-top: 24px;
				}
			}
		}

		.can-not-change-password {
			font-weight: bold;
		}

		.close-account-container {
			margin: 43px 0 0;
		}
		.section-title {
			margin: 0 0 43px;
			font-weight: $lato-black;
			font-size: 18px;
			cursor: pointer;
			user-select: none;
			margin-bottom: 0;
		}
		.expandable {
			display: none;
			&.expand {
				display: block;
			}
		}
	}
}
</style>
