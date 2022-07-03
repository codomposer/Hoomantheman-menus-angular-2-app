<script lang="ts">
import { has_dom } from '@ctx-core/dom'
export let App_IOS_Store_Link:string, App_Android_Store_Link:string
export let redirect_url:string
$: redirect_url =
	(has_dom && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
	? App_IOS_Store_Link
	: has_dom && /android/i.test(navigator.userAgent)
		? App_Android_Store_Link
		: '/'
$: {
	if (redirect_url && has_dom) window.location.href = redirect_url
}
</script>

<div>Redirecting to <a href="{redirect_url}">{redirect_url}</a></div>
