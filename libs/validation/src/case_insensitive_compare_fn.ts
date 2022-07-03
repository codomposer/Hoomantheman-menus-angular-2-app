export function case_insensitive_compare_fn(value:string, cmp:string):boolean {
	return (value as string).toLowerCase() === (cmp as string).toLowerCase()
}
