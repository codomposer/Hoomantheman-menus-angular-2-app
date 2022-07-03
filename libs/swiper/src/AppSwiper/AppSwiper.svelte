<script lang="ts">
import { createEventDispatcher, onDestroy } from 'svelte'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { has_dom } from '@ctx-core/dom'
import { refresh_writable_ } from '@menus/store'
import { getContext_ui_ctx } from '@menus/ui'
import type { Swiper_T } from '../Swiper/index.js'
import { Swiper } from '../Swiper/index.js'
import type { swiper_Ctx } from '../swiper_Ctx.js'
const ctx = getContext_ui_ctx() as swiper_Ctx, dispatch = createEventDispatcher()
export const swiper$ = refresh_writable_<Swiper_T>(null)
SwiperCore.use([Autoplay, Navigation, Pagination])
export let slidesPerView = null, slideWidth = 170, spaceBetween = 24
let swiper_component:Swiper_T, visible:boolean
let swiperEl:HTMLElement, prevEl:HTMLElement, nextEl:HTMLElement
let activeIndex:number, offsetWidth:number
let calculated_slidesPerView:number, refresh_swiper_time:number
$: activeIndex = $swiper$?.activeIndex || 0
$: refresh_swiper_time, offsetWidth = swiperEl?.offsetWidth || 0
$: calculated_slidesPerView = slidesPerView || Math.floor(offsetWidth / slideWidth) || 1
$: {
	swiper_component
	&& swiperEl
	&& (swiper_component.swiper().slidesPerView = calculated_slidesPerView)
	&& setTimeout(()=>{
		swiper$.refresh()
	})
}
const resize_observer =
	(has_dom && ('ResizeObserver' in window))
	? new ResizeObserver(entries=>{
		refresh_swiper()
	})
	: null
$: swiperEl && resize_observer && resize_observer.observe(swiperEl)
onDestroy(()=>{
	if (swiperEl) {
		resize_observer?.unobserve(swiperEl)
	}
})
function refresh_swiper() {
	refresh_swiper_time = new Date().getTime()
}
</script>

<svelte:window on:resize={evt => swiper$?.refresh()}
							 on:resize={evt => refresh_swiper()}
></svelte:window>
<Swiper
	bind:this={swiper_component}
	class="AppSwiper {visible ? 'visible' : ''}"
	navigation
	bind:swiperEl
	{prevEl} {nextEl}
	{spaceBetween}
	observer={true}
	slidesPerView={calculated_slidesPerView}
	watchSlidesVisibility={true}
	{...$$restProps}
	on:init={evt => visible = true}
	on:swiper={evt => swiper$.set(evt.detail[0])}
	on:slideChange={evt => swiper$.refresh()}
	on:observerUpdate={evt => swiper$.refresh()}
	on:swiper={evt => dispatch('swiper', evt.detail)}
	on:init={evt => dispatch('init', evt.detail)}
	on:beforeDestroy={evt => dispatch('beforeDestroy', evt.detail)}
	on:slideChange={evt => dispatch('slideChange', evt.detail)}
	on:slideChangeTransitionStart={evt => dispatch('slideChangeTransitionStart', evt.detail)}
	on:slideChangeTransitionEnd={evt => dispatch('slideChangeTransitionEnd', evt.detail)}
	on:slideNextTransitionStart={evt => dispatch('slideNextTransitionStart', evt.detail)}
	on:slideNextTransitionEnd={evt => dispatch('slideNextTransitionEnd', evt.detail)}
	on:slidePrevTransitionStart={evt => dispatch('slidePrevTransitionStart', evt.detail)}
	on:slidePrevTransitionEnd={evt => dispatch('slidePrevTransitionEnd', evt.detail)}
	on:transitionStart={evt => dispatch('transitionStart', evt.detail)}
	on:transitionEnd={evt => dispatch('transitionEnd', evt.detail)}
	on:touchStart={evt => dispatch('touchStart', evt.detail)}
	on:touchMove={evt => dispatch('touchMove', evt.detail)}
	on:touchMoveOpposite={evt => dispatch('touchMoveOpposite', evt.detail)}
	on:sliderMove={evt => dispatch('sliderMove', evt.detail)}
	on:touchEnd={evt => dispatch('touchEnd', evt.detail)}
	on:click={evt => dispatch('click', evt.detail)}
	on:tap={evt => dispatch('tap', evt.detail)}
	on:doubleTap={evt => dispatch('doubleTap', evt.detail)}
	on:doubleClick={evt => dispatch('doubleClick', evt.detail)}
	on:imagesReady={evt => dispatch('imagesReady', evt.detail)}
	on:progress={evt => dispatch('progress', evt.detail)}
	on:reachBeginning={evt => dispatch('reachBeginning', evt.detail)}
	on:reachEnd={evt => dispatch('reachEnd', evt.detail)}
	on:fromEdge={evt => dispatch('fromEdge', evt.detail)}
	on:toEdge={evt => dispatch('toEdge', evt.detail)}
	on:setTranslate={evt => dispatch('setTranslate', evt.detail)}
	on:setTransition={evt => dispatch('setTransition', evt.detail)}
	on:resize={evt => dispatch('resize', evt.detail)}
	on:observerUpdate={evt => dispatch('observerUpdate', evt.detail)}
	on:beforeLoopFix={evt => dispatch('beforeLoopFix', evt.detail)}
	on:loopFix={evt => dispatch('loopFix', evt.detail)}
	on:breakpoint={evt => dispatch('breakpoint', evt.detail)}
	on:Components={evt => dispatch('Components', evt.detail)}
>
  <slot></slot>
  <div bind:this={prevEl}
			 class="swiper-button swiper-button-prev"
			 slot="button-prev"
			 class:hide={$swiper$?.isBeginning}
			 on:click={evt => $swiper$.slideTo(Math.max(activeIndex - calculated_slidesPerView, 0))}
	>
    <svg xmlns="http://www.w3.org/2000/svg"
				 width="100%" height="100%"
				 fill="currentColor"
				 class="bi bi-chevron-compact-left"
				 viewBox="0 0 16 16"
		>
      <path fill-rule="evenodd"
						d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
			/>
    </svg>
  </div>
  <div bind:this={nextEl}
			 class="swiper-button swiper-button-next"
			 slot="button-next"
			 class:hide={$swiper$?.isEnd}
			 on:click={evt => $swiper$.slideTo(Math.min(activeIndex + calculated_slidesPerView, $swiper$.slides.length - 1))}
	>
    <svg xmlns="http://www.w3.org/2000/svg"
				 width="100%" height="100%"
				 fill="currentColor"
				 class="bi bi-chevron-compact-right"
				 viewBox="0 0 16 16"
		>
      <path fill-rule="evenodd"
						d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
			/>
    </svg>
  </div>
</Swiper>
<!-- TODO: This file should be removed as it is no longer used in the project -->
<!-- <style type=text/scss global>
@import 'swiper/swiper.scss';
@import 'swiper/components/navigation/navigation.scss';
@import 'swiper/components/pagination/pagination.scss';
.AppSwiper {
	visibility: hidden;
	&.visible {
		visibility: visible;
	}
	.swiper-wrapper {
		width: 100%;
		.swiper-slide {
			width: 100%;
		}
	}
	.swiper-button {
		position: absolute;
		z-index: 2;
		margin-top: -32px;
		width: 64px;
		height: 64px;
		&.hide {
			display: none;
		}
		&.swiper-button-prev {
			color: var(--swiper-navigation-color, var(--swiper-theme-color));
			&:after {
				display: none;
			}
			left: 0;
		}
		&.swiper-button-next {
			color: var(--swiper-navigation-color, var(--swiper-theme-color));
			&:after {
				display: none;
			}
			right: 0;
		}
		&.swiper-button-disabled {
			pointer-events: auto;
			cursor: not-allowed;
		}
	}
}
</style> -->
