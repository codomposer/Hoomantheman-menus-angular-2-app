export function getRandomItem<Val>(array:Val[]):Val {
	return array[Math.floor(Math.random() * array.length)]
}
