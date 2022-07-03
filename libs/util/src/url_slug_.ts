import type { url_segment_T } from '@ctx-core/uri'
export function url_slug_(
	value:url_slug__value_T,
	opts:url_slug__opts_T = { join_str: '-' }
):string {
	if (!value) {
		return
	}
	const { join_str } = opts
	// Replace space with `-` + Remove `/` as it breaks the url
	return (
		[value].flat()
			.join(join_str)
			.replace(/['"@#\$\/]+/g, '')
			.replace(/\s+/g, '-')
			.toLowerCase()
	)
}
export type url_slug__value_T = url_segment_T|url_segment_T[]
export interface url_slug__opts_T {
	join_str:string
}
