<script context="module" lang="ts">
import type { page_T, PreloadContext } from '@ctx-core/sapper'
import type { ui_ctx__session_T } from '@menus/ui'
import { ssr_ui_ctx_ } from '@menus/ui'
import { gps$_b } from '@menus/http'
export async function preload(this:PreloadContext, page:page_T, session:ui_ctx__session_T) {
	const ctx = ssr_ui_ctx_(page, session)
	const gps$ = gps$_b(ctx)
	const gps = await gps$.load()
	if (gps.Status !== 'success') {
		this.redirect(302, '/')
		return
	}
	const { App_IOS_Store_Link, App_Android_Store_Link, } = gps.Data
	return { App_IOS_Store_Link, App_Android_Store_Link, }
}
</script>

<script lang="ts">
import { Download } from '@menus/download-ui'
export let App_IOS_Store_Link:string, App_Android_Store_Link:string
</script>

<Download {App_IOS_Store_Link} {App_Android_Store_Link}></Download>
