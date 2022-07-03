<script lang="ts">
import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, } from 'svelte'
import SwiperCore from 'swiper'
import { getParams } from 'swiper/esm/svelte/get-params.js'
import { initSwiper, mountSwiper } from 'swiper/esm/svelte/init-swiper.js'
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses, extend } from 'swiper/esm/svelte/utils.js'
import { getChangedParams } from 'swiper/esm/svelte/get-changed-params.js'
import { updateSwiper } from 'swiper/esm/svelte/update-swiper.js'
const dispatch = createEventDispatcher()
//region export let swiperEl - custom
export let swiperEl = null
//endregion
let className = undefined
export { className as class }
let containerClasses = 'swiper-container'
let breakpointChanged = false
let swiperInstance = null
let oldPassedParams = null
let paramsData
let swiperParams
let passedParams
let restProps
let prevEl = null
let nextEl = null
let scrollbarEl = null
let paginationEl = null
let virtualData = { slides: [] }
export function swiper():SwiperCore {
	return swiperInstance
}
const setVirtualData = (data)=>{
	virtualData = data
	tick().then(()=>{
		swiperInstance.$wrapperEl.children('.swiper-slide').each((el)=>{
			if (el.onSwiper) el.onSwiper(swiperInstance)
		})
		swiperInstance.updateSlides()
		swiperInstance.updateProgress()
		swiperInstance.updateSlidesClasses()
		if (swiperInstance.lazy && swiperInstance.params.lazy.enabled) {
			swiperInstance.lazy.load()
		}
	})
}
const calcParams = ()=>{
	paramsData = getParams($$restProps)
	swiperParams = paramsData.params
	passedParams = paramsData.passedParams
	restProps = paramsData.rest
}
calcParams()
oldPassedParams = passedParams
const onBeforeBreakpoint = ()=>{
	breakpointChanged = true
}
swiperParams.onAny = (event, ...args)=>{
	dispatch(event, [args])
}
Object.assign(swiperParams.on, {
	_beforeBreakpoint: onBeforeBreakpoint,
	_containerClasses(_swiper, classes) {
		containerClasses = classes
	},
})
swiperInstance = initSwiper(swiperParams)
if (swiperInstance.virtual && swiperInstance.params.virtual.enabled) {
	const extendWith = {
		cache: false,
		renderExternal: (data)=>{
			setVirtualData(data)
			if (swiperParams.virtual && swiperParams.virtual.renderExternal) {
				swiperParams.virtual.renderExternal(data)
			}
		},
		renderExternalUpdate: false,
	}
	extend(swiperInstance.params.virtual, extendWith)
	extend(swiperInstance.originalParams.virtual, extendWith)
}
onMount(()=>{
	if (!swiperEl) return
	mountSwiper(
		{
			el: swiperEl,
			nextEl: nextEl,
			prevEl: prevEl,
			paginationEl: paginationEl,
			scrollbarEl: scrollbarEl,
			swiper: swiperInstance,
		},
		swiperParams,
	)
	dispatch('swiper', [swiperInstance])
	if (swiperParams.virtual) return
	swiperInstance.slides.each((el)=>{
		if (el.onSwiper) el.onSwiper(swiperInstance)
	})
})
afterUpdate(()=>{
	if (!swiperInstance) return
	calcParams()
	const changedParams = getChangedParams(passedParams, oldPassedParams)
	if (
		(changedParams.length || breakpointChanged) &&
		swiperInstance &&
		!swiperInstance.destroyed
	) {
		updateSwiper({
			swiper: swiperInstance,
			passedParams,
			changedParams,
			nextEl,
			prevEl,
			scrollbarEl,
			paginationEl,
		})
	}
	breakpointChanged = false
	oldPassedParams = passedParams
})
onDestroy(()=>{
	if (typeof window !== 'undefined' && swiperInstance && !swiperInstance.destroyed) {
		swiperInstance.destroy(true, false)
	}
})
</script>

<div
	bind:this={swiperEl}
	class={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
	{...restProps}
>
  <slot name="container-start"/>
	{#if needsNavigation(swiperParams)}
		<slot name="button-prev">
	    <div bind:this={prevEl} class="swiper-button-prev"/>
		</slot>
		<slot name="button-next">
	    <div bind:this={nextEl} class="swiper-button-next"/>
		</slot>
  {/if}
	{#if needsScrollbar(swiperParams)}
    <div bind:this={scrollbarEl} class="swiper-scrollbar"/>
  {/if}
	{#if needsPagination(swiperParams)}
    <div bind:this={paginationEl} class="swiper-pagination"/>
  {/if}
	<div class="swiper-wrapper">
    <slot name="wrapper-start"/>
    <slot {virtualData}/>
    <slot name="wrapper-end"/>
  </div>
  <slot name="container-end"/>
</div>
