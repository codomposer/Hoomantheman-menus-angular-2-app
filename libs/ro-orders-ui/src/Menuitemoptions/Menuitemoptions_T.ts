import type { SvelteComponentTyped } from 'svelte'
import type { Menuitemoptions_c } from './Menuitemoptions_c.js'
import type { action$_T, menu_cartitem$_T } from './Menuitemoptions_c.js'
export interface Menuitemoptions_T extends SvelteComponentTyped<{
	menu_cartitem:menu_cartitem$_T
	action:action$_T
}> {
	readonly _:Menuitemoptions_c
}
