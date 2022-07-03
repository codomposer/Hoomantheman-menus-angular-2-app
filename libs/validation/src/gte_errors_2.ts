import { I } from '@ctx-core/combinators'
import type { compare_opts_T } from './compare_opts_T.js'
import type { errors__T } from './errors_2.js'
import { label_str_ } from './label_str_.js'
export function gte_errors_2(cmp:any, opts:compare_opts_T = {}):errors__T {
	return (value:any, label = '')=>{
		if ((typeof value !== 'number' && !value) || (typeof cmp !== 'number' && !cmp)) return []
		const compare_fn = opts.compare_fn || ((value, cmp)=>value >= cmp)
		const preprocess_fn = opts.preprocess_fn || I
		const compare_error_text_fn = opts.compare_error_text_fn || I
		return (
			compare_fn(preprocess_fn(value), preprocess_fn(cmp))
			? []
			: [`${label_str_(label)}must be greater than or equal to ${compare_error_text_fn(cmp)}`]
		)
	}
}
