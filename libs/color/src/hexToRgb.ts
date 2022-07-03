export function hexToRgb(hex):number[] {
	hex = hex.replace(/[^0-9A-F]/gi, '')
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return [r, g, b]
}
