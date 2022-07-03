import 'svelte'
export * from './changepage_evt_T.js'
export * from './Pagination_T.js'
import type { Pagination_T } from './Pagination_T.js'
import in_Pagination from './Pagination.svelte'
export const Pagination:Pagination_T = in_Pagination as unknown as Pagination_T
