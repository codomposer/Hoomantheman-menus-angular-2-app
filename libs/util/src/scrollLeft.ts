export function scrollLeft(element:HTMLElement, to:number, duration:number):void {
	if (duration <= 0) return
	const difference = to - element.scrollLeft
	const perTick = difference / duration * 10
	setTimeout(()=>{
		element.scrollLeft = element.scrollLeft + perTick
		if (element.scrollLeft === to) return
		scrollLeft(element, to, duration - 10)
	}, 10)
}
