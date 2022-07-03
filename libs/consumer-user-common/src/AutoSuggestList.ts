import type { AutoSuggestItem } from './AutoSuggestItem.js'
import type { AutoSuggestList_I } from './AutoSuggestList_I.js'
export class AutoSuggestList implements AutoSuggestList_I {
	MenuItems?:AutoSuggestItem[]
	Dish?:AutoSuggestItem[]
	Cuisine?:AutoSuggestItem[]
	Restaurant?:AutoSuggestItem[]
}
