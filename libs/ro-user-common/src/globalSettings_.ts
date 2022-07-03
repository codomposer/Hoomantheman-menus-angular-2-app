import { assign } from '@ctx-core/object'
import type { GlobalSettings } from './GlobalSettings.js'
export function globalSettings_(globalSettings?:GlobalSettings):GlobalSettings {
	return assign({}, globalSettings)
}
