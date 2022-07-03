import type { SvelteComponentTyped } from 'svelte'
import type { MenuSearchBox_c } from './MenuSearchBox_c.js'
import type { MenuSearchBox_itemclicked_evt_I } from './MenuSearchBox_itemclicked_evt_I.js'
export interface MenuSearchBox_T extends SvelteComponentTyped</*@formatter:off*/
  { click_action:string },
  { itemclicked:CustomEvent<MenuSearchBox_itemclicked_evt_I> }
>/*@formatter:on*/
{
	readonly _:MenuSearchBox_c
}
