import type { Plugin } from 'rollup'
import * as swc_plugin_cjs from 'rollup-plugin-swc'
const swc_plugin = (swc_plugin_cjs.default as any).default
import type { Options } from '@swc/core'
import type { JscTarget } from '@swc/core/types'
export const swc_plugin_options:Options = {
	jsc: {
		target: 'es2019' as JscTarget,
		keepClassNames: true,
		parser: {
			syntax: 'typescript',
			dynamicImport: true,
		}
	}
}
const _swc_plugin_i:Plugin = swc_plugin(swc_plugin_options)
export const swc_plugin_i = {
	name: 'swc',
	/**
	 * @param {string|Buffer} code
	 * @param {string} filename
	 */
	transform(code, filename) {
		if (/\.ts$/.test(filename)) {
			return (_swc_plugin_i as any).transform(code, filename)
		}
		return null
	}
}
