import { query_str_ } from '@ctx-core/uri'
import { join_query_prefix_ } from './join_query_prefix_.js'
export function join_query(url, query:string|any) {
	return `${url}${query_str_(query, join_query_prefix_(url))}`
}
