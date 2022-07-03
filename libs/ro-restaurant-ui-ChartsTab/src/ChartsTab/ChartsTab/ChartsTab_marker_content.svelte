<script lang="ts">
import { I } from '@ctx-core/combinators'
import { closest } from '@ctx-core/dom'
import { run, waitfor_val } from '@ctx-core/function'
import { brand_success } from '@menus/css'
import { innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import type { marker_T } from '@menus/google.maps'
import { style_ } from '@ctx-core/html'
import { url_slug_ } from '@menus/util'
import { WEB_APP_URL_ } from '@menus/web-config'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
export let ctx:ro_restaurant_ui_ChartsTab_Ctx, marker:marker_T, maxWidth:number,
	onclick_marker:(evt:MouseEvent)=>Promise<void>
const { webConfig } = ctx
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
let root:HTMLDivElement
$: {
	run(async ()=>{
		const dialog = await waitfor_val(async ()=>{
			if (!root) return
			const dialog = closest('[role=dialog]', root) as HTMLDivElement
			return dialog?.style.maxWidth ? dialog : null
		}, I, 2_000) as HTMLDivElement
		if ($innerWidth_lte_SCREEN_XS_MIN$) {
			setTimeout(()=>dialog.style.maxWidth = `${maxWidth}px`, 1_000)
		}
	})
}
</script>

<div bind:this={root} class="ChartsTab_marker_content clearfix" on:click={onclick_marker }>
	<div class="top">
		{#if marker.RestLogo}
			<div class="RestLogo logo"
					 style={style_({'background-image': `url('/assets/img/ro/photo-placeholder.svg')`})}></div>
		{:else}
			<div class="placeholder-container logo">
				<div class="placeholder"></div>
			</div>
		{/if}
		<h3>{marker.Name}</h3>
	</div>
	<div class="chart-marker-actions" style={style_({
		color: brand_success,
		'text-align': 'center',
		'font-weight': 'bold',
	})}>
		<a href="." class="compare" on:click|preventDefault>Compare</a>
		or
		<a
			href={`/?fireFlyID=${url_slug_(marker.FireFlyID)}`} target="_blank" class="view-menu"
			on:click|stopPropagation={evt =>
				window.open(`${WEB_APP_URL_(webConfig)}/?fireFlyID=${url_slug_(marker.FireFlyID)}`, '_system')
			}
		>View Menu</a>
	</div>
</div>

<style type="text/scss" global>
.ChartsTab_marker_content {
	cursor: pointer;
	.top {
		display: flex;
		flex-direction: row;
		.logo {
			&.RestLogo {
				width: 60px;
				height: 60px;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
			}
			&.placeholder-container {
				padding: 10px;
				background-color: rgba(69, 90, 100, 0.05);
				.placeholder {
					width: 0px;
					height: 40px;
					background-repeat: no-repeat;
					background-size: contain;
					background-position: center
				}
			}
		}
		h3 {
			flex: 1;
			margin: 0;
			padding-left: 10px;
		}
	}
}
</style>
