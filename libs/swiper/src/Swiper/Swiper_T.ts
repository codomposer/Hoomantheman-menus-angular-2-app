import type { SvelteComponentTyped } from 'svelte'
import type SwiperCore from 'swiper'
export type Swiper_T = SvelteComponentTyped<{
	swiperEl:HTMLElement
	class:string
	swiper():SwiperCore
}, {
	swiper:CustomEvent<[SwiperCore]>
}>
