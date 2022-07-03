import type Vibrant from 'node-vibrant'
import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { vibrant_Ctx } from './vibrant_Ctx'
const key = 'vibrant_loaded$'
export const vibrant_loaded$_b:B<vibrant_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as vibrant_loaded$_T
)
export type vibrant_loaded$_T = Writable$<boolean>
declare global {
	interface Window {
		Vibrant:typeof Vibrant
	}
}
