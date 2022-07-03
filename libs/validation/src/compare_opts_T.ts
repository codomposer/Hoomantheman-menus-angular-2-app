export interface compare_opts_T {
	compare_fn?:compare_fn_T
	preprocess_fn?:preprocess_fn_T
	compare_error_text_fn?:compare_error_text_T
}
export type compare_fn_T = (value, cmp)=>boolean
export type preprocess_fn_T = (value)=>any
export type compare_error_text_T = (value)=>any
