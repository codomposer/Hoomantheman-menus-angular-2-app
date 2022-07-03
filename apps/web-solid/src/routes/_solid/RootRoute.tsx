import 'svelte'
import { isServer } from 'solid-js/web'
import svelte_component from '../index.svelte'
export default ()=>{
	let html = ''
	if (isServer) {
		html = (svelte_component as any).render()
	} else {
		setTimeout(()=>{
			new svelte_component({
				target: document.getElementById('svelte'),
			})
		})
	}
	return <div id="svelte" innerHTML={html}></div>
}
