// See https://stackoverflow.com/a/2450976/142571
export function shuffle<In extends unknown = unknown>(a1:In[]):In[] {
	let currentIndex = a1.length, temporaryValue, randomIndex
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		// And swap it with the current element.
		temporaryValue = a1[currentIndex]
		a1[currentIndex] = a1[randomIndex]
		a1[randomIndex] = temporaryValue
	}
	return a1
}
