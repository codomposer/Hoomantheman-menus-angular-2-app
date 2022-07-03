export function sortRandom<Val>(array:Val[]):Val[] {
	return array.sort((_i0, _i1)=>0.5 - Math.random())
}
