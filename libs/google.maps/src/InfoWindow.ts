import type { SvelteComponent } from 'svelte'
import type { marker_T } from './marker_T'
export interface InfoWindow extends google.maps.InfoWindow {
	marker:marker_T
	content:HTMLDivElement
	components?:SvelteComponent[]
}
