import type { nullish } from '@ctx-core/function'
import type { SearchMenuitem_I } from './SearchMenuitem_I.js'
export function isPopular_(menuitem:SearchMenuitem_I):boolean|nullish {
	return menuitem?.PopularLevel >= 1
}
