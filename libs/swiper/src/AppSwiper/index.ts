import 'svelte'
import in_AppSwiper from './AppSwiper.svelte'
import { AppSwiper_T } from './AppSwiper_T.js'
export * from './AppSwiper_T.js'
export const AppSwiper = in_AppSwiper as unknown as AppSwiper_T
