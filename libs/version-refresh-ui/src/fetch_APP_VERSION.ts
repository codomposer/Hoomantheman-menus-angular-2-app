export async function fetch_APP_VERSION() {
	const response = await fetch('/client/APP_VERSION')
	return await response.text()
}
