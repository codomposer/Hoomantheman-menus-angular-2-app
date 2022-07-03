import { no_dom } from '@ctx-core/dom'
export function enableBodyScroll(enable:boolean, fnConfig?:any):void {
	if (no_dom) return
	fnConfig = fnConfig || {}
	if (enable) {
		if (fnConfig.mode === 'hide-scroll') {
			// Shows the scrollbar and user does see the change in `width` of content
			document.body.style.overflowY = null
		} else {
			// Shows the scrollbar and user doesn't see change in `width` of content
			const top = Math.abs(parseFloat(document.body.style.top))
			document.body.style.top = null
			document.body.style.position = null
			document.body.style.overflowY = null
			document.body.style.width = null
			window.scrollTo({ top })
		}
	} else {
		if (fnConfig.mode === 'hide-scroll') {
			// Hides the scrollbar and user does see the change in `width` of content
			document.body.style.overflowY = 'hidden'
		} else {
			// Hides the scrollbar and user doesn't see change in `width` of content
			document.body.style.top = `-${window.scrollY}px`
			document.body.style.position = 'fixed'
			document.body.style.overflowY = 'scroll'
			document.body.style.width = '100%'
		}
	}
}
