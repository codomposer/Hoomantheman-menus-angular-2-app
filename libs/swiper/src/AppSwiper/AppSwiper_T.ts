import { SvelteComponentTyped } from 'svelte'
import SwiperCore from 'swiper'
import type { refresh_writable_T } from '@menus/store'
export interface AppSwiper_T extends SvelteComponentTyped {
	swiper$: refresh_writable_T<SwiperCore>
}
