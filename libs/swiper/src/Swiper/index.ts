import 'svelte'
// import Swiper from 'swiper/esm/svelte/swiper.svelte'
import in_Swiper from './Swiper.svelte'
import type { Swiper_T } from './Swiper_T.js'
export type { Swiper_T } from './Swiper_T.js'
export const Swiper = in_Swiper as unknown as Swiper_T
