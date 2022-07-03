export function clicked_outside_(el:HTMLElement, fn:(evt:Event)=>void) {
	return (evt)=>{
		if (!el.contains(evt.target)) {
			fn(evt)
		}
	}
}
