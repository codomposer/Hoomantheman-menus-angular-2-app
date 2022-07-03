export function request_url_(in_url:string|URL, data?:any):string {
	const url = new URL(in_url.toString())
	for (const [k, v] of Object.entries(alphabetize_(data || {}))) {
		url.searchParams.set(k, v?.toString() || '')
	}
	return url.toString()
}
function alphabetize_(obj) {
	const sorted_keys = Object.keys(obj).sort()
	return sorted_keys.reduce((acc:any, key)=>{
		acc[key] = obj[key]
		return acc
	}, {})
}
