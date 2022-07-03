import { last_ } from '@ctx-core/array'
import { download } from './download.js'
export async function onclick_download_link(evt:MouseEvent) {
	evt.preventDefault()
	const { href } = evt.target as HTMLAnchorElement
	const response = await fetch(href)
	const url = new URL(response.url)
	const filename = last_(url.pathname.split('/'))
	const data = await response.arrayBuffer()
	const mime_type = 'text/csv'
	await download(filename, data, mime_type)
}
