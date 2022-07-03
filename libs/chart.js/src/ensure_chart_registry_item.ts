import { Chart, DatasetController, Element, Scale } from 'chart.js'
export function ensure_chart_registry_item(...items:{ id:string }[]) {
	const { registry } = Chart
	for (const item of items) {
		if (
			(isForType(DatasetController, item) && registry.controllers.get(item.id)) ||
			(isForType(Element, item) && registry.elements.get(item.id)) ||
			(isForType(Scale, item) && registry.scales.get(item.id)) ||
			(isForType(Object, item) && registry.plugins.get(item.id))
		) {
			continue
		}
		registry.add(item)
	}
}
function isForType(base_type, type) {
	return Object.prototype.isPrototypeOf.call(base_type.prototype, type.prototype)
}
