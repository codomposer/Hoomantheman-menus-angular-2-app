<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { userAddress_text_short_ } from '@menus/user-address-common'
import { userAddress_text$_b } from '@menus/consumer-user-address'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
import { UserAddressLink_c } from './UserAddressLink_c.js'
export let color_white = false
export let ChangeAddressModal_i = undefined
const ctx = getContext_ui_ctx() as user_address_ui_Ctx
const userAddress_text$ = userAddress_text$_b(ctx)
export const _ = new UserAddressLink_c(ctx)
$: _.ChangeAddressModal_i.$ = ChangeAddressModal_i
</script>

<a class="UserAddressLink user-address-link"
	 class:color_white={color_white}
	 href="."
	 on:click|preventDefault={evt => _.open_ChangeAddressModal_i()}
>
  <div class="location-text">
    <div class="icon-custom"
				 class:location-icon={!color_white}
				 class:location-white-icon={color_white}
		></div>
		{ userAddress_text_short_($userAddress_text$) || 'Enter your address' }
  </div>
</a>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
$xs-link-height: 50px;
.UserAddressLink {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8px;
	cursor: pointer;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
	.icon-custom {
		min-width: 24px;
		vertical-align: middle;
	}
	.location-text {
		margin-right: 8px;
		.your-address {
			@media (max-width: $screen-xs-max) {
				display: none;
			}
		}
	}
}
</style>
