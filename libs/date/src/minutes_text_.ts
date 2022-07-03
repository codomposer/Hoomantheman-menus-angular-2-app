export function minutes_text_(minutes:number):string {
	return minutes ? `${Math.ceil(minutes)} min` : ''
}
