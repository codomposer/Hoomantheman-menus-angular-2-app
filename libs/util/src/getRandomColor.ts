export function getRandomColor():string {
	const r = Math.floor(Math.random() * 200)
	const g = Math.floor(Math.random() * 200)
	const b = Math.floor(Math.random() * 200)
	return `rgb(${r},${g},${b})`
}
