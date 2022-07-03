<script context="module" lang="ts">
import { has_dom } from '@ctx-core/dom'
import type { Page, PreloadContext } from '@ctx-core/sapper'
import { preload_ } from '@menus/app'
import { is_hash_routing } from '@menus/core-routing'
import type { gps$_T } from '@menus/http'
import { gps$_b } from '@menus/http'
import { isPlatform_ } from '@menus/platform-settings'
import type { ui_ctx__session_T } from '@menus/ui'
import { ssr_ui_ctx_ } from '@menus/ui'
import { backoffice_host_a } from '@menus/web-config'
export const preload = preload_(async function (this:PreloadContext, page:Page, session:ui_ctx__session_T) {
	const { host } = page
	if (~backoffice_host_a.indexOf(host) || (has_dom && is_hash_routing)) {
		return {}
	}
	const ctx = ssr_ui_ctx_(page, session)
	const gps$:gps$_T = gps$_b(ctx)
	const gps = await gps$.load()
	if (isPlatform_(gps.Data)) {
		this.redirect(302, '/',)
	}
	return { gps }
})
</script>
<script lang="ts">
import { watch_API_SAVE_INFO_b } from '@menus/ro-http'
import { RoMain } from '@menus/ro-layout-ui'
import { getContext_ui_ctx } from '@menus/ui'
const ctx = getContext_ui_ctx()
watch_API_SAVE_INFO_b(ctx)
</script>
<RoMain><slot></slot></RoMain>
