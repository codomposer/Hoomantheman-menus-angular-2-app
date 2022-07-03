export function join_query_prefix_(url:string):string {
	return url.split('?').length > 1 ? '&' : '?'
}
