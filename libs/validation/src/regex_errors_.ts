export function regex_errors_(regex:RegExp, message:string, val:string):string[] {
	if (!val) return []
	return (
		regex.test(val)
		? []
		: [message]
	)
}
