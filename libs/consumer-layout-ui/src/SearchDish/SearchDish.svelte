<script lang="ts">
import { page_query$_b } from '@ctx-core/sapper'
import type { DishType_I } from '@menus/dish'
import { deep_equal } from '@menus/fast-deep-equal'
import { search_keyword_a$_b } from '@menus/filters-common'
import { assign_to_query_goto_b } from '@menus/page'
import { search_dish_a$_b } from '@menus/search-menu'
import { getContext_ui_ctx, goto_b } from '@menus/ui'
import { ChipsContainer } from '../ChipsContainer/index.js'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
import { Enable_Dish_Filter$_b } from '@menus/platform-settings'
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx
const assign_to_query_goto = assign_to_query_goto_b(ctx)
const Enable_Dish_Filter$ = Enable_Dish_Filter$_b(ctx)
const goto = goto_b(ctx)
const page_query$ = page_query$_b(ctx)
const search_dish_a$ = search_dish_a$_b(ctx)
const search_keyword_a$ = search_keyword_a$_b(ctx)
let processed_search_dish_a:DishType_I[]
$: onchange_search_keyword_a($search_keyword_a$)
function onchange_search_keyword_a(_query_search_keywords:string[]) {
	sync_search_dish_a()
}
$: onchange_search_dish_a($search_dish_a$)
async function onchange_search_dish_a(search_dish_a:DishType_I[]) {
	if (!processed_search_dish_a) {
		sync_search_dish_a()
	}
	if (search_dish_a) {
		processed_search_dish_a = search_dish_a
	}
	await sync_search_keyword_a()
}
function sync_search_dish_a() {
	const search_keyword_a = search_keyword_a$.$
	const search_dish_a = search_dish_a$.$
	console.debug('sync_search_dish_a|debug|1', {
		'search_keyword_a && search_keyword_a.slice()': search_keyword_a && search_keyword_a.slice(),
		'search_dish_a && search_dish_a.slice()': search_dish_a && search_dish_a.slice(),
	})
	let dirty = false
	for (const search_dish of (search_dish_a || [])) {
		if (~(search_keyword_a || []).indexOf(search_dish.DishName)) {
			search_dish.active = true
			dirty = true
		}
	}
	console.debug('sync_search_dish_a|debug|2', {
		dirty,
		'search_dish_a && search_dish_a.slice()': search_dish_a && search_dish_a.slice(),
	})
	if (dirty) {
		search_dish_a$.$ = search_dish_a
		console.debug('sync_search_dish_a|debug|3', {
			'search_dish_a && search_dish_a.slice()': search_dish_a && search_dish_a.slice(),
			'search_dish_a$.$ && search_dish_a$.$.slice()': search_dish_a$.$ && search_dish_a$.$.slice(),
		})
	}
}
async function sync_search_keyword_a() {
	const search_keyword_a = search_keyword_a$.$
	const search_dish_a = search_dish_a$.$
	if (search_dish_a) {
		const search_dish_keyword_a =
			search_dish_a
				.filter(search_dish=>search_dish.active)
				.map(search_dish=>search_dish.DishName)
				.sort()
		if (!deep_equal(search_dish_keyword_a, search_keyword_a)) {
			console.debug('sync_search_keyword_a|debug|1', {
				'search_keyword_a && search_keyword_a.slice()': search_keyword_a && search_keyword_a.slice(),
				'search_dish_a && search_dish_a.slice()': search_dish_a && search_dish_a.slice(),
				'search_dish_keyword_a && search_dish_keyword_a.slice()': search_dish_keyword_a && search_dish_keyword_a.slice(),
				"search_dish_keyword_a.join('|')": search_dish_keyword_a.join('|'),
			})
			await assign_to_query_goto({
				search_keywords: search_dish_keyword_a.join('|')
			})
		}
	}
}
</script>

{#if $Enable_Dish_Filter$}
<ChipsContainer
	class="SearchDish"
	bind:list={$search_dish_a$}
	key="DishName"
	multi_select={true}
></ChipsContainer>
{/if}
