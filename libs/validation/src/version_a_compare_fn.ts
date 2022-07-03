export function version_a_compare_fn(i0_version_a:string[], i1_version_a:string[]) {
	const length = Math.max(i0_version_a.length, i1_version_a.length)
	for (let i = 0; i < length; i++) {
		const i0_version = parseFloat(i0_version_a[i])
		const i1_version = parseFloat(i1_version_a[i])
		if (i0_version > i1_version) return 1
		if (i0_version < i1_version) return -1
	}
	return 0
}
