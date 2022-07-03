<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { ChatTemplatesModal } from '@menus/chat-ui'
import { CHAT_THREAD_TYPE_ORDERS } from '@menus/web-config'
import { initials_ } from '@menus/chat'
import { shortDate_ } from '@menus/date'
import type { ro_chat_ui_Ctx } from '../ro_chat_ui_Ctx.js'
import { Chat_c } from './Chat_c.js'
const ctx = getContext_ui_ctx() as ro_chat_ui_Ctx
export const _ = new Chat_c(ctx)
const {
	chatTemplatesModal$, messageText$, ro_sideMenuOpened$, keywords$, selectedThread$, selectedThreadActionsOpened$,
	threadChatSection$, threads$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="chat-page" on:click={evt => _.pageClick()}>
  <ChatTemplatesModal bind:this={$chatTemplatesModal$}></ChatTemplatesModal>
  <div class="chat-top-bg"></div>
  <div class="chat-section-wrapper" class:sidemenu-pl={$ro_sideMenuOpened$}>
    <div class="chat-section" class:selected-thread={$selectedThread$}>
      <div class="clearfix">
        <div class="thread-list-wrapper">
          <div class="thread-list-header">
            <div class="user-profile-section"></div>
            <div class="thread-search-section">
              <input type="text" class="form-control input-sm"
										 placeholder="Search by Order Number, Customer Name"
										 bind:value={$keywords$}
										 on:change={evt => _.onchange_search_text()}
							>
            </div>
          </div>
          <div class="thread-list">
            {#each $threads$ as thread}
              {#if !thread.hidden}
                <div class="thread-item"
										 class:active={$selectedThread$?.ID === thread.ID}
										 on:click={evt => _.chooseThread(thread)}
								>
                  <div class="customer-img profile-name-initials"
											 class:online={thread.isOtherOnline}
									>
                    <div class="profile-logo">
                      { initials_(
												thread.RestUserID
												? thread.RestUserName
												: thread.CustomerID
													? thread.CustomerName
													: thread.GuestName
											) }
                    </div>
                    <div class="user-status-wrapper">
                      <div class="user-status"></div>
                    </div>
                  </div>
                  <div class="item-details">
                    <div class="clearfix">
                      <div
												class="customer-name">{ thread.RestUserID ? thread.RestUserName : thread.CustomerID ? thread.CustomerName : thread.GuestName }</div>
                      <div class="message-date">&nbsp;</div>
                    </div>
                    <div class="clearfix">
                      <!-- <div class="message-text text-overflow">{ thread.messages && thread.messages.length > 0 ? thread.messages[thread.messages.length
                        - 1].Message: '&nbsp;' }</div> -->
                      <div
												class="message-text">{ thread.Type === CHAT_THREAD_TYPE_ORDERS ? thread.OrderNumber : 'Support' }</div>
											{#if thread.count}
                        <div class="message-count">{ thread.count }</div>
                      {/if}
                    </div>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
        <div class="thread-details-wrapper">
          <div class="thread-details">
            {#if $selectedThread$}
              <div>
                <div class="thread-details-header clearfix">
                  <div class="back-button" on:click={evt => _.unSelectThread()}>
                    <div class="arrow-back-black-icon"></div>
                  </div>
                  <div class="customer-img profile-name-initials"
											 class:online={$selectedThread$.isOtherOnline}
									>
                    <div
											class="profile-logo"
										>{
											initials_(
												$selectedThread$.RestUserID
												? $selectedThread$.RestUserName
												: $selectedThread$.CustomerID
													? $selectedThread$.CustomerName
													: $selectedThread$.GuestName
											) }</div>
                    <div class="user-status-wrapper">
                      <div class="user-status"></div>
                    </div>
                  </div>
                  <div class="thread-info">
                    <div
											class="customer-name"
										>{
											$selectedThread$.RestUserID
											? $selectedThread$.RestUserName
											: $selectedThread$.CustomerID
												? $selectedThread$.CustomerName
												: $selectedThread$.GuestName
										}</div>
                    <div
											class="order-number"
										>{
											$selectedThread$.Type == CHAT_THREAD_TYPE_ORDERS
											? $selectedThread$.OrderNumber
											: 'Support'
										}</div>
                  </div>
                  <div class="btn-group thread-actions">
                    <div class="more-vert-black-icon" mStopEvent
												 on:click|stopPropagation={evt => _.toggleSelectedThreadActions()}
										></div>
										{#if $selectedThreadActionsOpened$}
                      <ul class="dropdown-menu d-block">
                        <li><a href="."
															 on:click|preventDefault={evt => _.closeThread($selectedThread$)}>Close Chat</a></li>
                      </ul>
                    {/if}
                  </div>
                </div>
                <div class="thread-chat-section" bind:this={$threadChatSection$}>
                  {#each $selectedThread$.messages as item}
                    <div class="chat-item"
												 class:outgoing={item.SenderType === 'user'}
												 class:incoming={item.SenderType !== 'user'}
										>
                      <div class="chat-img profile-name-initials">
                        {#if item.SenderType === 'user'}
                          <div class="profile-logo"
													>{ initials_($selectedThread$.UserName) }</div>
                        {:else}
                          <div class="profile-logo"
													>{ initials_(
														$selectedThread$.RestUserID
														? $selectedThread$.RestUserName
														: $selectedThread$.CustomerID
															? $selectedThread$.CustomerName
															: $selectedThread$.GuestName
													) }</div>
                        {/if}
                      </div>
                      <div class="chat-message">
                        <div class="message-text">{ item.Message }</div>
                        <div class="message-date">{ shortDate_(item.DateCreated) }</div>
                      </div>
                    </div>
                  {/each}
                </div>
                <div class="send-message-section clearfix">
                  <div class="send-message-textarea">
                    <textarea class="form-control" name="messageText"
															bind:value={$messageText$}
															on:keyup={evt => evt.key ==='Enter' && _.send_message()}
															placeholder="Press Enter to send message."
										></textarea>
                  </div>
                  <div class="send-message-actions">
                    <div on:click={evt => _.open_chatTemplatesModal()} class="pencil-icon"></div>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.chat-page {
	.profile-name-initials {
		position: relative;
		padding: 10px;
		text-align: center;
		background-color: $brand-primary;
		border-radius: 50%;
		float: left;
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		.profile-logo {
			// width: 20px;
			// height: 20px;
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
		&.online {
			.user-status-wrapper {
				.user-status {
					background-color: $brand-success;
				}
			}
		}
	}
	.chat-top-bg {
		height: 200px;
		background-color: $gray;
		position: absolute;
		width: 100%;
		left: 0;
		margin-top: -1px;
	}
	.chat-section-wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: 80px;
		bottom: 0;
		width: 100%;
		padding-top: 32px;
		margin: 0;
		transition: padding $side-menu-transition-speed;
		@media (max-width: $screen-xs-max) {
			padding-left: 0;
			padding-right: 0;
		}
		.chat-section {
			margin: 0 16px;
			height: 100%;
			background-color: white;
			box-shadow: 0 4px 5px -2px rgba(0, 0, 0, .2), 0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 1px rgba(0, 0, 0, .12);
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
				.thread-list {
					padding-bottom: 64px;
					background-color: white;
					overflow: auto;
					height: calc(100vh - #{$user-profile-section-height} - #{$thread-search-section-height} - 85px - 30px);
					.thread-item {
						padding: 16px;
						border-bottom: 1px solid #DBDBDB;
						.customer-img {
							span {
							}
						}
						.item-details {
							overflow: hidden;
							padding-left: 16px;
							.customer-name {
								float: left;
								font-size: 16px;
							}
							.message-date {
								float: right;
								font-size: 12px;
							}
							.message-text {
								float: left;
								width: 60%;
								color: rgba(0, 0, 0, .38);
							}
							.message-count {
								float: right;
								width: 24px;
								height: 24px;
								text-align: center;
								border-radius: 50%;
								background-color: $brand-success;
								color: white;
								line-height: 24px;
							}
						}
						&.active {
							$active-bg-color: #DBDBDB;
							border-bottom: 1px solid $active-bg-color;
							background-color: $active-bg-color;
							.customer-img {
								&.profile-name-initials {
									.user-status-wrapper {
										background-color: $active-bg-color;
									}
								}
							}
							.item-details {
								.customer-name, .message-date, .message-text {
									color: $gray;
								}
								.customer-name {
									font-weight: $lato-bold;
								}
								.message-count {
									background-color: $gray;
									color: $brand-success;
								}
							}
						}
					}
				}
			}
			.thread-details-wrapper {
				overflow: hidden;
				$thread-details-header-height: 64px;
				$send-message-section-height: 106px;
				@media (max-width: $screen-xs-max) {
					display: none;
				}
				.thread-details {
					background-color: #f3f4f5;
					.thread-details-header {
						border-bottom: 1px solid #DBDBDB;
						height: 64px;
						padding: 12px 16px;
						.back-button {
							margin-top: 8px;
							float: left;
							margin-right: 16px;
							@media (min-width: $screen-sm-min) {
								display: none;
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
						overflow: auto;
						// height: calc(100vh - 64px - 106px);
						height: calc(100vh - #{$thread-details-header-height} - #{$send-message-section-height} - 85px - 30px);
						.chat-item {
							position: relative;
							$padding: 16px;
							padding: $padding 0;
							$img-size: 40px;
							.chat-img {
								position: absolute;
								width: $img-size;
								height: $img-size;
								span {
								}
							}
							.chat-message {
								position: relative;
								display: inline-block;
								box-shadow: 0 1px 0.5px rgba(0, 0, 0, .13);
								border-radius: 4px;
								padding: 11px 24px;
								min-width: 150px;
								.message-text {
								}
								.message-date {
									margin-top: 16px;
									text-align: right;
									font-size: 12px;
									color: rgba(0, 0, 0, .38);
								}
								&:after {
									content: '';
									position: absolute;
									border-style: solid;
									display: block;
									width: 0;
									z-index: 1;
									top: 10px;
								}
							}
							&.incoming {
								padding-right: 100px;
								.chat-img {
									left: $padding;
								}
								.chat-message {
									margin-left: $img-size + $padding + $padding;
									background-color: white;
									.message-date {
									}
									&:after {
										border-width: 6px 8px 6px 0;
										border-color: transparent #fff;
										left: -8px;
									}
								}
							}
							&.outgoing {
								text-align: right;
								padding-left: 100px;
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
									.message-date {
										color: white;
									}
									&:after {
										border-width: 6px 0 6px 8px;
										border-color: transparent $brand-success;
										right: -8px;
									}
								}
							}
						}
					}
				}
				.send-message-section {
					height: $send-message-section-height;
					border-top: 1px solid #DBDBDB;
					padding: 16px;
					width: 100%;
					.send-message-textarea {
						float: left;
						width: 90%;
						textarea {
							height: 71px;
						}
					}
					.send-message-actions {
						float: right;
						width: 10%;
						text-align: right;
						padding-top: 20px;
					}
				}
			}
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
		}
	}
}
</style>
