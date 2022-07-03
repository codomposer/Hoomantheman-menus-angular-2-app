<script lang="ts">
import { is_navigating_onclick_b, params_fireFlyID$_b } from '@menus/page'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { getContext_ui_ctx } from '@menus/ui'
import { close_ro_sideMenuOpened_b } from '../close_ro_sideMenuOpened_b.js'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
import { ro_selected_tab$_b } from '../ro_selected_tab$_b.js'
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
export let tab:string, name:string, requires_EnableOnlineOrdering = false, tutorial_chapter = '', a_class_:(tab:string)=>string = ()=>''
const close_ro_sideMenuOpened = close_ro_sideMenuOpened_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_restaurant$ = ro_restaurant$_b(ctx)
const ro_selected_tab$ = ro_selected_tab$_b(ctx)
let href:string
$: href = `/backoffice/manage-restaurant/${$params_fireFlyID$}/${tab}`
</script>

<li
	class="RoRestaurantNavLi {$$props.class||''}"
	class:active={$ro_selected_tab$ === tab}
	class:disabled={requires_EnableOnlineOrdering && !$ro_restaurant$?.EnableOnlineOrdering}
>
  {#if !requires_EnableOnlineOrdering || $ro_restaurant$?.EnableOnlineOrdering}
    <a {href}
			 class={a_class_(tab)}
			 class:active={$ro_selected_tab$ === tab}
			 on:click={evt => is_navigating_onclick(evt)}
			 on:click={_evt => close_ro_sideMenuOpened('mobile')}
			 aria-controls={tab}
		>{name}</a>
  {:else}
    <a {href}
			 class={a_class_(tab)}
			 class:active={$ro_selected_tab$ === tab}
			 on:click|preventDefault={_evt => close_ro_sideMenuOpened('mobile')}
			 aria-controls={tab}
		>{name}</a>
  {/if}

  	{#if $ro_selected_tab$ === tab && tutorial_chapter }
  		<a class="tutorial-link" href="/backoffice/tutorial?chapter={tutorial_chapter}" target="_blank"><i class="fa fa-youtube-play"></i></a>
	{/if}
</li>

<style type="text/scss" global>

.nav {
	&.nav-pills {
		>li {
			&.RoRestaurantNavLi {
				display: flex;
				align-items: center;

				.tutorial-link {
					padding-left: 0;
    				padding-right: 4px;
					border-bottom: none;

					i {
						font-size: 20px;
					}
				}

				&.active {
					color: white;
				}
				&.disabled {
					opacity: .3;
					cursor: not-allowed;
				}
			}
		}
	}
}
</style>
