<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { ChangeAddressModal_i$_b, UserAddressLink } from '@menus/user-address-ui'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const ChangeAddressModal_i$ = ChangeAddressModal_i$_b(ctx)
</script>

<div class="Restaurant_Filters clearfix">
  <div class="service-type-tabs-wrapper">
    <slot></slot>
  </div>
  <div class="top-location-section-wrapper">
    <UserAddressLink ChangeAddressModal_i={$ChangeAddressModal_i$}></UserAddressLink>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.Restaurant_Filters {
	display: flex;
	height: 40px;
	width: 100%;
	padding: 0 48px;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #DBDBDB;
	background: white;
	@media (max-width: $screen-sm-max) {
		flex-direction: column;
		height: auto;
		padding: 0;
	}
	> * {
		flex-grow: 1;
		display: flex;
		height: 100%;
		align-items: center;
		@media (max-width: $screen-sm-max) {
			min-width: 100%;
			max-width: 100%;
		}
		&.service-type-tabs-wrapper {
			justify-content: flex-start;
			@media (max-width: $screen-sm-max) {
				justify-content: center;
				order: 2;
			}
			.nav {
				height: 24px;

				@media (max-width: $screen-sm-max) {
					min-width: 100%;
					max-width: 100%;
					display: flex;
					flex-direction: row;
				}

				li {
					@media (max-width: $screen-sm-max) {
						flex-grow: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					a {
						padding-bottom: 0;
					}
				}
			}
		}
		&.top-location-section-wrapper {
			justify-content: flex-end;
			@media (max-width: $screen-sm-max) {
				display: none;
			}
		}
	}
}</style>
