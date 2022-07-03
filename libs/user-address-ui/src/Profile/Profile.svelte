<script lang="ts">
import { style_ } from '@ctx-core/html'
import { getContext_ui_ctx } from '@menus/ui'
import { PROFILE_ORDERS_TAB, SETTINGS_PROFILE_TAB } from '@menus/web-config'
import { is_navigating_onclick_b } from '@menus/page'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
export let activeTab:string
const ctx = getContext_ui_ctx() as user_address_ui_Ctx
const consumer_login_user$ = consumer_login_user$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
</script>

<div class="Profile">
  <div class="main-contents">
    <div class="user-info-section">
      <div class="user-details-section clearfix">
        <div class="user-img-wrapper">
          {#if $consumer_login_user$?.SocialPicture}
            <div class="user-img"
								 style={style_({
                   'background-image': `url(${$consumer_login_user$?.SocialPicture})`
                 })}
						></div>
          {:else}
            <div class="placeholder-img"></div>
          {/if}
        </div>
        <div class="user-details clearfix">
          <div class="user-info">
            <div
							class="user-name">{ $consumer_login_user$?.FirstName || '' } { $consumer_login_user$?.LastName || '' }</div>
            <div class="user-email c-text2">{ $consumer_login_user$?.Email || '' }</div>
          </div>
          <div class="user-points-wrapper">
            <div class="user-points">
              <div class="user-points-title">Total points</div>
              <div class="user-points-count">{ $consumer_login_user$?.Points || '' }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ul class="nav nav-pills nav-primary">
        <li
					class:active={activeTab === PROFILE_ORDERS_TAB}
				><a href="/past-orders" on:click={is_navigating_onclick}>My Orders</a></li>
        <li
					class:active={activeTab === SETTINGS_PROFILE_TAB}
				><a href="/settings" on:click={is_navigating_onclick}>Settings</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/consumer-shared-css/lib";
.Profile {
	.main-contents {
		.user-info-section {
			padding: 32px 48px;
			border-bottom: 1px solid #DDDDDD;
			@media (max-width: $screen-xs-max) {
				padding-top: 8px;
				padding-left: 24px;
				padding-right: 24px;
			}
			.user-details-section {
				.user-img-wrapper {
					width: 96px;
					height: 96px;
					border-radius: 50%;
					float: left;
					margin-right: 16px;
					background-color: #F5F7F7;
					display: flex;
					justify-content: center;
					align-items: center;

					@media (max-width: $screen-xs-max) {
						width: 72px;
						height: 72px;
						margin-top: 16px;
					}

					.user-img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-size: contain;
						background-position: center;
					}
					.placeholder-img {
						width: 32px;
						height: 32px;
						color: #455A64;
						background-image: vurl('/assets/img/cr/profile.svg');
						background-size: contain;
						background-position: center;
					}
				}
				.user-details {
					overflow: hidden;
					padding-top: 16px;
					.user-info {
						@media (min-width: $screen-sm-min) {
							float: left;
							width: 70%;
						}

						.user-name {
							font-weight: $lato-black;
							font-size: 18px;
							@media (min-width: $screen-sm-min) {
								font-size: 30px;
							}
						}
						.user-email {
							margin-top: 6px;
						}
					}
					.user-points-wrapper {

						@media (min-width: $screen-sm-min) {
							text-align: right;
							float: right;
							width: 30%;
						}

						.user-points {

							@media (max-width: $screen-xs-max) {
								margin-top: 8px;
							}
							
							@media (min-width: $screen-sm-min) {
								display: inline-block;
								padding-left: 24px;
							}

							.user-points-title {
								font-weight: $lato-bold;
							}
							.user-points-count {
								font-weight: $lato-black;
								font-size: 18px;
								@media (min-width: $screen-sm-min) {
									font-size: 30px;
								}
							}
						}
					}
				}
			}
		}
		.nav {
			padding: 16px 0;

			@media (min-width: $screen-sm-min) {
				padding-left: 56px;
				padding-right: 56px;
			}
		}
	}
}
</style>
