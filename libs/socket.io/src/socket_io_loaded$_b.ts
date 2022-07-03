import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { socket_io_Ctx } from './socket_io_Ctx'
const key = 'socket_io_loaded$'
export const socket_io_loaded$_b:B<socket_io_Ctx, typeof key> = be_(key, ()=>
	writable$<socket_io_loaded_T>(false) as socket_io_loaded$_T
)
export type socket_io_loaded_T = boolean
export interface socket_io_loaded$_T extends Writable$<socket_io_loaded_T> {}
