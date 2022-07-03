<script lang="ts">
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { initials_ } from '@menus/chat'
import { EnsureSocketIO } from '@menus/socket.io'
import {
	validation, required_errors_, email_errors_, phone_errors_
} from '@menus/validation'
import { ValidationMessages } from '@menus/validation'
import { shortDateTime_ } from '@menus/date'
import type { chat_ui_Ctx } from '../chat_ui_Ctx.js'
import { SupportChatBox_c } from './SupportChatBox_c.js'
import type { SupportChatBox_type } from './SupportChatBox_c.js'
export let type:SupportChatBox_type
let showErrors = false
const ctx = getContext_ui_ctx() as chat_ui_Ctx
export const _ = new SupportChatBox_c(ctx)
const {
	busy$, email$, minimize$, messageText$, name$, phone$, showGuestForm$, thread$,
	threadChatSection$, UserName$, UserNameInitials$, userOnline$,
} = _
$: _.type$.$ = type
let form_errors//region
let name_errors = [], email_errors = [], phone_errors = []
$: form_errors = [...name_errors, ...email_errors, ...phone_errors]//endregion
let profileLogo//region
$: profileLogo =
	!$thread$
	|| (
		$thread$.RestUserID
		? $thread$.RestUserName
		: $thread$.CustomerID
			? $thread$.CustomerName
			: $thread$.GuestName
	)//endregion
</script>

<EnsureSocketIO></EnsureSocketIO>
<div class="SupportChatBox support-chat-box">
  <div class="chat-section-wrapper">
    <div class="chat-section"
				 class:selected-thread={$thread$}
		>
      <div class="clearfix">
        <div class="thread-details-wrapper">
          <div class="thread-details">
            {#if $minimize$ && !$thread$}
              <div class="thread-details-header clearfix cursor-pointer"
									 on:click={_.open_chat}
							>
                <div class="customer-img profile-name-initials bg-primary"
										 class:online={true}
								>
                  <div class="profile-logo">&nbsp;</div>
                  <div class="user-status-wrapper">
                  <div class="user-status"></div>
                  </div>
                </div>
                <button type="button" class="close"
												on:click={_.hide_chat_window}
												aria-label="Close"
								>
                  <div class="delete-icon"></div>
                </button>
                <div class="chat-with-us-section clearfix">
                  <div class="customer-name">Chat with us!</div>
                  <div>Any question? Click here.</div>
                </div>
              </div>
            {:else}
              <div>
                <div class="thread-details-header cursor-pointer clearfix"
										 on:click={_.toggleMinimize}
								>
                  <div class="customer-img profile-name-initials bg-primary"
											 class:online={$thread$?.userOnline}
									>
                  <div class="profile-logo">{ $UserNameInitials$ }</div>
                  <div class="user-status-wrapper">
                    <div class="user-status"></div>
                  </div>
                  </div>
                  <div class="thread-info">
                    <div class="customer-name">{ $UserName$ || '&nbsp;' }</div>
										{#if $thread$ && !$busy$}
                      <div>{ $userOnline$ ? '(online)' : '(offline)' }</div>
                    {:else if !$showGuestForm$}
                      <div>Connecting...</div>
                    {/if}
                  </div>
                  <button type="button" class="close"
													on:click={_.close_chat_window}
													aria-label="Close"
									><div class="delete-icon"></div></button>
                </div>
              </div>
							{#if !$minimize$}
                <div>
                  <div class="thread-chat-section"
											 class:has-guest-form={$showGuestForm$}
											 bind:this={$threadChatSection$}
									>
                    {#if $busy$}
                      <div class="chat-loader">
                        <PageLoader></PageLoader>

                        <div class="busy-text">
                          Our waiters are serving other customers.
                          Please wait we connect you. Sorry for the delay.
                        </div>
                      </div>
                    {/if}
										{#if !$showGuestForm$}
                      <div class="guest-form">
                        <form on:submit|preventDefault={_.submitGuestForm}>
                          <div class="form-group input-container"
															 class:has-error={name_errors.length}
													>
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="Name" name="Name"
																	 placeholder="Enter your name here."
																	 required
																	 bind:value={$name$}
																	 use:validation={$name$, ['Name', required_errors_]}
																	 on:errors={evt => name_errors = evt.detail}
														>
                            <ValidationMessages errors={name_errors}></ValidationMessages>
                          </div>
                          <div class="form-group input-container"
															 class:has-error={!email_errors.length}
													>
                            <label for="Email">Email</label>
                            <input type="email" class="form-control" name="Email" id="Email"
																	 bind:value={$email$}
																	 placeholder="Enter your email here."
																	 required
																	 use:validation={$email$, ['Email', required_errors_, email_errors_]}
																	 on:errors={evt => email_errors = evt.detail}
														>
                            <ValidationMessages errors={email_errors}></ValidationMessages>
                          </div>
                          <div class="form-group input-container"
															 class:has-error={phone_errors.length}
													>
                            <label for="Phone">Phone</label>
                            <input type="tel" class="form-control" name="Phone" id="Phone"
																	 placeholder="Enter your phone here."
																	 bind:value={$phone$}
																	 use:validation={$phone$, ['Phone', required_errors_, phone_errors_]}
																	 on:errors={evt => phone_errors = evt.detail}
														>

                            <ValidationMessages errors={phone_errors}></ValidationMessages>
                          </div>
                          <div>
                            <button class="btn btn-lg btn-success btn-block">Start Chat</button>
                          </div>
                        </form>
                      </div>
                    {/if}
										{#each $thread$?.messages || [] as item}
                      <div class="chat-item"
													 class:outgoing={item.SenderType !== 'user'}
													 class:incoming={item.SenderType === 'user'}
											>
                        <div class="chat-img profile-name-initials bg-primary">
                          {#if item.SenderType === 'user'}
                            <div class="profile-logo"
														>{ initials_($thread$.UserName) }</div>
                          {/if}
													{#if item.SenderType !== 'user'}
                            <div class="profile-logo">{ initials_(profileLogo) }</div>
                          {/if}
                        </div>
                        <div class="chat-message">
                          <div class="message-text">{ item.Message }</div>
                          <div class="message-date">{ shortDateTime_(new Date(item.DateCreated)) }</div>
                        </div>
                      </div>
                    {/each}
                  </div>
                  <div class="send-message-section clearfix">
                    <div class="send-message-textarea">
                      <textarea disabled={!$thread$ || $busy$}
																class="form-control"
																name="messageText"
																bind:value={$messageText$}
																on:keyup={evt => evt.key === 'Enter' && _.send_message()}
																placeholder="Press Enter to send message."
											></textarea>
                    </div>
                  </div>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style type="text/scss" global>
@import "@menus/css/lib";
.SupportChatBox {
	position: fixed;
	width: $sidebar-grid-width - 20px;
	bottom: 0;
	right: 20px;
	z-index: 99;
	@media (max-width: $screen-xs-max) {
		position: static;
		bottom: 8px;
		width: 100%;
		right: 0;
	}
	.profile-name-initials {
		position: relative;
		padding: 10px;
		text-align: center;
		border-radius: 50%;
		float: left;
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
		&.online {
			.user-status-wrapper {
				.user-status {
					background-color: $brand-success;
				}
			}
		}
		.profile-logo {
			display: inline-block;
			color: white;
			font-weight: $lato-black;
		}
		.user-status-wrapper {
			position: absolute;
			right: -2px;
			bottom: -5px;
			border-radius: 50%;
			background-color: white;
			padding: 2px;
			.user-status {
				width: 14px;
				height: 14px;
				border: 2px solid $brand-success;
				border-radius: 50%;
			}
		}
	}
	.chat-section-wrapper {
		width: 100%;
		margin: 0;
		transition: padding 1s;
		@media (max-width: $screen-xs-max) {
			padding-left: 0;
			padding-right: 0;
		}
		.chat-section {
			margin: 0;
			height: 100%;
			background-color: white;
			box-shadow: 0 4px 5px -2px rgba(0, 0, 0, .2), 0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 1px rgba(0, 0, 0, .12);
			// When a thread is selected
			&.selected-thread {
				.thread-list-wrapper {
					@media (max-width: $screen-xs-max) {
						display: none;
					}
				}
				.thread-details-wrapper {
					@media (max-width: $screen-xs-max) {
						display: block;
					}
				}
			}
			.thread-list-wrapper {
				float: left;
				width: 30%;
				min-width: 300px;
				height: 100%;
				background-color: #f3f4f5;
				border-right: 1px solid #DBDBDB;
				$user-profile-section-height: 64px;
				$thread-search-section-height: 72px;
				@media (max-width: $screen-xs-max) {
					width: 100%;
				}
				.thread-list-header {
					background-color: #f3f4f5;
					.user-profile-section {
						height: $user-profile-section-height;
						border-bottom: 1px solid #DBDBDB;
						@media (max-width: $screen-xs-max) {
							display: none;
						}
					}
					.thread-search-section {
						padding: 16px;
						height: $thread-search-section-height;
					}
				}
			}
			.thread-details-wrapper {
				overflow: hidden;
				$thread-details-header-height: 64px;
				.thread-details {
					background-color: #f3f4f5;
					.thread-details-header {
						height: $thread-details-header-height;
						border-bottom: 1px solid #DBDBDB;
						padding: 12px;
						.back-button {
							margin-top: 8px;
							float: left;
							margin-right: 16px;
							@media (min-width: $screen-sm-min) {
								display: none;
							}
						}
						.chat-with-us-section {
							overflow: hidden;
							padding-left: 24px;
							.customer-name {
								font-weight: $lato-black;
							}
						}
						.thread-info {
							float: left;
							margin-left: 24px;
							.customer-name {
								font-weight: $lato-black;
							}
						}
						.thread-actions {
							float: right;
							margin-top: 8px;
							.dropdown-menu {
								left: auto;
								right: 0;
							}
						}
					}
					.thread-chat-section {
						position: relative;
						overflow: auto;
						height: 300px;
						&.has-guest-form {
							height: auto;
						}
						.chat-loader {
							padding: 24px;
							.busy-text {
								margin-top: 24px;
							}
						}
						.guest-form {
							padding: 24px;
						}
						.chat-item {
							position: relative;
							$padding: 16px;
							padding: $padding 0;
							$img-size: 40px;
							&.incoming {
								padding-right: 16px;
								.chat-img {
									left: $padding;
								}
								.chat-message {
									margin-left: $img-size + $padding + $padding;
									background-color: white;
									&:after {
										border-width: 6px 8px 6px 0;
										border-color: transparent #fff;
										left: -8px;
									}
								}
							}
							&.outgoing {
								text-align: right;
								padding-left: 16px;
								.chat-img {
									right: $padding;
									&.profile-name-initials {
										background-color: $gray;
									}
								}
								.chat-message {
									margin-right: $img-size + $padding + $padding;
									color: white;
									background-color: $brand-success;
									&:after {
										border-width: 6px 0 6px 8px;
										border-color: transparent $brand-success;
										right: -8px;
									}
									.message-date {
										color: white;
									}
								}
							}
							.chat-img {
								position: absolute;
								width: $img-size;
								height: $img-size;
							}
							.chat-message {
								position: relative;
								display: inline-block;
								box-shadow: 0 1px 0.5px rgba(0, 0, 0, .13);
								border-radius: 4px;
								padding: 11px 24px;
								min-width: 150px;
								&:after {
									content: '';
									position: absolute;
									border-style: solid;
									display: block;
									width: 0;
									z-index: 1;
									top: 10px;
								}
								.message-date {
									margin-top: 16px;
									text-align: right;
									font-size: 12px;
									color: rgba(0, 0, 0, .38);
								}
							}
						}
					}
				}
				.send-message-section {
					border-top: 1px solid #DBDBDB;
					background-color: white;
					padding: 8px 0;
					width: 100%;
					.send-message-textarea {
						float: left;
						width: 100%;
						.form-control {
							border: none;
							height: 34px;
							&[disabled] {
								background-color: transparent;
							}
						}
					}
				}
			}
		}
	}
}
</style>
