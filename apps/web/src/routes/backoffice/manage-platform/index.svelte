<script context="module" lang="ts">
import type { PageContext } from '@ctx-core/sapper'
import { preload_ } from '@menus/app'
import { ro_isLoggedIn_noauth_url_, ro_login_user_terms_noauth_url_ } from '@menus/ro-route'
import type { ui_ctx__session_T } from '@menus/ui'
import { ssr_ui_ctx_ } from '@menus/ui'
export const preload = preload_(async function (page_get:PageContext, session:ui_ctx__session_T) {
	const ctx = ssr_ui_ctx_(page_get, session)
	const noauth_url =
		await ro_isLoggedIn_noauth_url_(ctx)
		|| await ro_login_user_terms_noauth_url_(ctx)
	if (noauth_url) {
		this.redirect(302, noauth_url)
		return
	}
})
</script>

<script lang="ts">
import { RoMainDashboard } from '@menus/ro-layout-ui'
import { ManagePlatform } from '@menus/manage-platform-ui-ManagePlatform'
</script>
<RoMainDashboard>
  <ManagePlatform></ManagePlatform>
</RoMainDashboard>
