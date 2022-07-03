export function userAddress_text_short_(
	userAddress_text:string, include_state_zip = true
):string {
	if (!userAddress_text) return userAddress_text
	let out_userAddress_text = (
		userAddress_text
			.replace(', USA', '')
			.replace(', US', '')
	)
	const regex = /, [a-zA-Z]{2} [0-9]{5}/
	const state_zip_end =
		out_userAddress_text.search(regex)
		+ (
			include_state_zip
			? (out_userAddress_text.match(regex)?.[0]?.length || 0)
			: 0
		)
	out_userAddress_text = out_userAddress_text.slice(0, state_zip_end)
	return out_userAddress_text
}
