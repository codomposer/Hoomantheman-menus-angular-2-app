import type { SvelteComponentTyped } from 'svelte'
import type { Pagination_c } from './Pagination_c.js'
export interface Pagination_T extends SvelteComponentTyped</*@formatter:off*/
  {
    id:string
    page:string|number
    pageSize:string|number
    TotalPages:number
    TotalRow:number
    pageSize_a:number[]
  }, {
    changepage:CustomEvent<number>
    changepagesize:CustomEvent<number>
  }
> {/*@formatter:on*/
	readonly _:Pagination_c
}
export interface Pagination_change_I {
	page:number
	pageSize:number
}
export type Pagination_change_evt_T = CustomEvent<Pagination_change_I>
