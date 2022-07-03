import { assign } from '@ctx-core/object'
import { case_insensitive_compare_fn } from './case_insensitive_compare_fn.js'
import type { compare_opts_T } from './compare_opts_T.js'
import { confirm_errors_2 } from './confirm_errors_2.js'
import { errors__T } from './errors_2.js'
export function email_confirm_errors_2(cmp:any, opts:compare_opts_T = {}):errors__T {
	opts.compare_fn = case_insensitive_compare_fn
	return confirm_errors_2(cmp, assign({
		compare_fn: case_insensitive_compare_fn
	}, opts))
}
