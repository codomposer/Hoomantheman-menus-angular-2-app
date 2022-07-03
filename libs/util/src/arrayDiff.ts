export function arrayDiff<Val>(a:Val[], b:Val[]):Val[] {
	return a.filter(i=>{
		return b.indexOf(i) < 0
	})
}
