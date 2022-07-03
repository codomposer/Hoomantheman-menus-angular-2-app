<script lang="ts">
import { UTC_HH_mm_meridian_ } from '@menus/date'
import { current_day_restaurant_hour$_b } from '@menus/restaurant-hours'
import { getContext_ui_ctx } from '@menus/ui'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const current_day_restaurant_hour$ = current_day_restaurant_hour$_b(ctx)
</script>

{#each $current_day_restaurant_hour$?.Time || [] as time}
  <div class="restaurant-MenuHour Restaurant_MenuHours">{
		UTC_HH_mm_meridian_(
			new Date(new Date(time.Start_ISO).getTime() + time.TzOffsetMilliSeconds)
		)
	} to {
		UTC_HH_mm_meridian_(
			new Date(new Date(time.End_ISO).getTime() + time.TzOffsetMilliSeconds)
		)
	}</div>
{/each}
