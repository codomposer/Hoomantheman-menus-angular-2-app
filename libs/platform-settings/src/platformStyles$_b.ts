import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, } from '@ctx-core/store'
import { Color_Assertive$_b } from './Color_Assertive$_b.js'
import { Color_Balanced$_b } from './Color_Balanced$_b.js'
import { Color_Calm$_b } from './Color_Calm$_b.js'
import { Color_Gray$_b } from './Color_Gray$_b.js'
import { Color_Positive$_b } from './Color_Positive$_b.js'
import { Color_Text1$_b } from './Color_Text1$_b.js'
import { Color_Text2$_b } from './Color_Text2$_b.js'
import { Color_Text3$_b } from './Color_Text3$_b.js'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'platformStyles$'
export const platformStyles$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>{
	const Color_Assertive$ = Color_Assertive$_b(ctx)
	const Color_Balanced$ = Color_Balanced$_b(ctx)
	const Color_Calm$ = Color_Calm$_b(ctx)
	const Color_Gray$ = Color_Gray$_b(ctx)
	const Color_Positive$ = Color_Positive$_b(ctx)
	const Color_Text1$ = Color_Text1$_b(ctx)
	const Color_Text2$ = Color_Text2$_b(ctx)
	const Color_Text3$ = Color_Text3$_b(ctx)
	return derived$(tup(
		Color_Assertive$, Color_Balanced$, Color_Calm$,
		Color_Gray$, Color_Positive$,
		Color_Text1$, Color_Text2$, Color_Text3$,
	), (
		[
			Color_Assertive, Color_Balanced, Color_Calm,
			Color_Gray, Color_Positive,
			Color_Text1, Color_Text2, Color_Text3,
		]
	)=>{
		const prefix_class = '.cr-app ' // body.app-menus
		const rules = []
		const color_a = [{
			value: Color_Positive,
			name: 'primary'
		}, {
			value: Color_Calm,
			name: 'calm'
		}, {
			value: Color_Balanced,
			name: 'success'
		}, {
			value: Color_Assertive,
			name: 'danger'
		}, {
			value: Color_Gray,
			name: 'gray'
		}, {
			value: Color_Text1,
			name: 'text1'
		}, {
			value: Color_Text2,
			name: 'text2'
		}, {
			value: Color_Text3,
			name: 'text3'
		}]
		color_a.forEach(color=>{
			if (color.value) {
				// General
				rules.push(`${prefix_class}.c-${color.name} { color: ${color.value}!important; }`)
				rules.push(`${prefix_class} .c-${color.name}-h:hover { color: ${color.value} !important; }`)
				rules.push(`${prefix_class}.b-${color.name} { border-color: ${color.value}!important; }`)
				rules.push(`${prefix_class} .b-${color.name}-h:hover { border-color: ${color.value} !important; }`)
				rules.push(`${prefix_class}.bg-${color.name} { background-color: ${color.value}!important; }`)
				rules.push(`${prefix_class} .bg-${color.name}-h:hover { background-color: ${color.value} !important; }`)
				// Buttons
				const btnStyle1 = `{ background-color: ${color.value}!important; border-color: ${color.value}!important; color: white!important; }`
				const btnStyle2 = `{ color: ${color.value}!important; background-color: white!important; }`
				rules.push(`${prefix_class}.btn-${color.name} ${btnStyle1}`)
				rules.push(`${prefix_class}.btn-${color.name}.btn-inverse ${btnStyle2}`)
				rules.push(`${prefix_class}.btn-${color.name}.btn-inverse.active:not(.btn-no-hover) ${btnStyle1}`)
				rules.push(`${prefix_class}.btn-${color.name}.btn-inverse:active:not(.btn-no-hover) ${btnStyle1}`)
				rules.push(`${prefix_class}.btn-${color.name}.btn-inverse:hover:not(.btn-no-hover) ${btnStyle1}`)
			}
		})
		// Slider
		if (Color_Balanced) {
			const sliderStyles = `{ background: ${Color_Balanced}!important; border-color: ${Color_Balanced}!important; }`
			rules.push(`input[type=range].custom-range-slider::-webkit-slider-thumb ${sliderStyles}`)
			rules.push(`input[type=range].custom-range-slider::-moz-range-track ${sliderStyles}`)
			rules.push(`input[type=range].custom-range-slider::-moz-range-thumb ${sliderStyles}`)
			rules.push(`input[type=range].custom-range-slider::-ms-fill-lower ${sliderStyles}`)
			rules.push(`input[type=range].custom-range-slider::-ms-fill-upper ${sliderStyles}`)
			rules.push(`input[type=range].custom-range-slider::-ms-thumb ${sliderStyles}`)
			rules.push(`.range-fill.range-fill-active { background: ${Color_Balanced}!important; }`)
		}
		if (Color_Balanced) {
			rules.push(`${prefix_class}.chips.style-2 .chip-item.active { background-color: ${Color_Balanced}!important; color: white!important; }`)
			const tabsStyles1 = `a { color: ${Color_Balanced}!important; border-color: ${Color_Balanced}!important; }`
			rules.push(`${prefix_class} .nav.nav-pills li.active ${tabsStyles1}`)
			rules.push(`${prefix_class} .nav.nav-pills li:not(.disabled):hover ${tabsStyles1}`)
			rules.push(`${prefix_class}.list-item:hover, .list-item.active { color: white!important; background-color: ${Color_Balanced}!important; }`)
			rules.push(`${prefix_class} .form-control:focus { border-color: ${Color_Balanced}!important; }`)
			rules.push(`${prefix_class} .AppSwiper .swiper-button-prev, ${prefix_class} .AppSwiper .swiper-button-next { color: ${Color_Balanced}!important; }`)
		}
		if (Color_Positive) {
			rules.push(`${prefix_class} a { color: ${Color_Positive}; }`)
			rules.push(
				`${prefix_class}.chips.style-2 .chip-item { background-color: ${Color_Positive}!important; color: white!important; }`
			)
			rules.push(`${prefix_class}.chip-label.chip-label-primary { background-color: ${Color_Positive}!important; }`)
			const tabsStyles2 = `a { color: ${Color_Positive}!important; border-color: ${Color_Positive}!important; }`
			rules.push(`${prefix_class} .nav.nav-pills.nav-primary li.active ${tabsStyles2}`)
			rules.push(`${prefix_class} .nav.nav-pills.nav-primary li:not(.disabled):hover ${tabsStyles2}`)
		}
		if (Color_Text1) {
			rules.push(`${prefix_class}.chip-label.chip-label-gray { background-color: ${Color_Text1}!important; }`)
			rules.push(`${prefix_class}.list-item { color: ${Color_Text1}!important; }`)
			rules.push(`${prefix_class} { color: ${Color_Text1}!important; }`)
			rules.push(`.m-gmaps-ui-view { color: ${Color_Text1}!important; }`)
		}
		return rules.join('\n')
	}) as platformStyles$_T
})
export type platformStyles$_T = Readable$<string>
