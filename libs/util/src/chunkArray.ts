export function chunkArray<Val>(arr:Val[], chunkSize:number):Val[][] {
	const groups:Val[][] = []
	for (let i = 0; i < arr.length; i += chunkSize) {
		groups.push(arr.slice(i, i + chunkSize))
	}
	return groups
}
