export function meridian_(hours:number):string {
	return (hours % 24) > 11 ? 'PM' : 'AM'
}
