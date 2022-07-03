import { readFile } from 'fs/promises'
import { clone } from '@ctx-core/object'
import { resolve } from '@menus/import-meta-resolve'
import { versionable_T } from '@menus/version-build'
import { run_replace_r } from './run_replace_r.js'
import { replace_r_T } from './replace_r_async_b.js'
import type { Target } from './Target.js'
export async function assign_copy_targets_transform(replace_r:replace_r_T, target_a:Target[]):Promise<Target[]> {
	const font_awesome_pkg = JSON.parse(
		(await readFile(
				new URL(
					await resolve('font-awesome/package.json', import.meta.url)
				).pathname
			)
		).toString()
	) as versionable_T
	return target_a.map(target=>{
		const { src } = target
		if (
			['static/assets/manifest.json'].some(v=>~src.indexOf(v))
			|| /\.js$/.test(src)
			|| /\.css$/.test(src)
		) {
			target.transform = async (target)=>{
				const { src } = target
				const content = await readFile(src)
				return run_replace_r(replace_r, content).toString()
			}
		}
		if (['font-awesome.min.css'].some(v=>~src.indexOf(v))) {
			target.transform = async (target)=>{
				const { src } = target
				const font_awesome_version = font_awesome_pkg.version
				const content = await readFile(src)
				const replace_content = run_replace_r(clone(replace_r, {
					[`../fonts/fontawesome-webfont.eot?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.eot'],
					[`../fonts/fontawesome-webfont.woff2?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.woff2'],
					[`../fonts/fontawesome-webfont.woff?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.woff'],
					[`../fonts/fontawesome-webfont.ttf?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.ttf'],
					[`../fonts/fontawesome-webfont.svg?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.svg'],
				}), content).toString()
				return replace_content
			}
		}
		return target
	})
}
