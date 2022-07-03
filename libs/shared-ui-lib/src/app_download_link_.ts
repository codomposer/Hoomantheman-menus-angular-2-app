import { has_dom } from '@ctx-core/dom'
export function app_download_link_():string|null {
	return (
		has_dom
		? `${window.location.protocol}//${window.location.host}/download`
		: null
	)
}
