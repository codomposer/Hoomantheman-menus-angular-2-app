import type { Menuoption_I } from './Menuoption_I.js'
export function OptionItems_is_selected_count_(Menuoption:Menuoption_I):number {
	const { OptionItems } = Menuoption
	let OptionItems_is_selected_count = 0
	for (const OptionItem of OptionItems) {
		if (OptionItem.is_selected) OptionItems_is_selected_count += 1
	}
	return OptionItems_is_selected_count
}
