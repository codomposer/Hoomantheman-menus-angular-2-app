export function next_dayID_(dayID:number):number {
	if (dayID < 7) return dayID + 1
	else return 1
}
