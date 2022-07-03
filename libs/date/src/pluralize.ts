export function pluralize(number:number, singular:string, multiple = `${singular}s`) {
	return (
		(number === 1)
		? singular
		: multiple
	)
}
