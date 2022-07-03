import { round } from '@ctx-core/number'
export function distance_text_(in_distance:string|number):string {
	const distance = parseFloat(in_distance as string)
	return (
		distance < 0.5
		? `${round(distance * 5280, 0)}ft`
		: `${round(distance, 2)}mi`
	)
}
