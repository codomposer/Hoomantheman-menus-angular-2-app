export type Modal_I_open_T<open_T, close_T> = (data?:open_T)=>Promise<close_T>
export type Modal_I_close_T<close_T> = (data?:close_T)=>Promise<void>
export interface Modal_I<open_T, close_T> {
	open:Modal_I_open_T<open_T, close_T>
	close:Modal_I_close_T<close_T>
}
