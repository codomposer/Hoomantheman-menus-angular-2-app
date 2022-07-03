<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { IPhoneXDevice, MobileDevice, MacbookDevice } from '@menus/device-ui'
import { innerWidth_gt_SCREEN_XS_MIN$_b } from '@menus/dom'
import { deep_equal } from '@menus/fast-deep-equal'
import {
	manage_platform_settings$_b, platform_settings_valid$_b, selected_restaurant_address$_b
} from '@menus/manage-platform-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { enableBodyScroll, log, merge } from '@menus/util'
import { WEB_APP_URL_, IFRAME_MOBILE_APP_URL_ } from '@menus/web-config'
import type { manage_platform_ui_MobilePreview_Ctx } from '../manage_platform_ui_MobilePreview_Ctx.js'
import { device_type$_b } from './device_type$_b.js'
import type { iframe_publish_settings_T, publish_settings_message_T } from './MobilePreview_T.js'
const ctx = getContext_ui_ctx() as manage_platform_ui_MobilePreview_Ctx, dispatch = createEventDispatcher()
const { webConfig } = ctx
const manage_platform_settings$ = manage_platform_settings$_b(ctx)
const device_type$ = device_type$_b(ctx)
let device_width = '', device_height = ''
$: {
	if ($device_type$ === 'iphone5s') {
		device_width = '320px'
		device_height = '568px'
	} else if ($device_type$ === 'iphone8') {
		device_width = '375px'
		device_height = '667px'
	} else if ($device_type$ === 'iphone-x') {
		device_width = '375px'
		device_height = '812px'
	} else if ($device_type$ === 'macbook') {
		device_width = '960px'
		device_height = '600px'
	}
}
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
let mobile_iframe:HTMLIFrameElement
const platform_settings_valid$ = platform_settings_valid$_b(ctx)
$:{
	if ($manage_platform_settings$ && $platform_settings_valid$) {
		publish_settings({ action: 'data' })
	}
}
const selected_restaurant_address$ = selected_restaurant_address$_b(ctx)
const component_name = 'MobilePreview'
$: {
	log(ctx, component_name, '$selected_restaurant_address$', $selected_restaurant_address$)
	publish_settings({ action: 'change-address' })
}
let loaded = false, current_message:publish_settings_message_T
export async function publish_settings(iframe_publish_settings:iframe_publish_settings_T) {
	if (!loaded || !$manage_platform_settings$) return
	const message = {
		type: 'iframe-platform-settings',
		platformSettings: $manage_platform_settings$,
		address: $selected_restaurant_address$,
		publicKey: $manage_platform_settings$?.PublicKey,
		env: ctx.webConfig.ENV,
	} as publish_settings_message_T
	merge(message, iframe_publish_settings)
	if (mobile_iframe) {
		if (!deep_equal(message, current_message)) {
			current_message = message
			console.info('mobile_iframe.contentWindow.postMessage', message)
			mobile_iframe.contentWindow.postMessage(message, '*')
		}
	}
}
function onmessage(e:MessageEvent) {
	const message = e.data
	if (message.type === 'mobile-app') {
		if (message.action === 'loaded') {
			loaded = true
			publish_settings({ action: 'data' })
		}
	}
	log(ctx, component_name, onmessage, e)
}
function onMobileMouseEnter() {
	enableBodyScroll(false)
}
function onMobileMouseLeave() {
	enableBodyScroll(true)
}
</script>

<svelte:window on:message={evt => onmessage(evt)}></svelte:window>
<div class="MobilePreview"
		 on:mouseenter={evt => onMobileMouseEnter()}
		 on:mouseleave={evt => onMobileMouseLeave()}
>
  {#if $device_type$ === 'iphone-x'}
    <IPhoneXDevice class={ $innerWidth_gt_SCREEN_XS_MIN$ ? 'iphone-x' : '' }>
      <iframe bind:this={mobile_iframe} title={$device_type$} scrolling="yes"
							width={device_width}
							src={IFRAME_MOBILE_APP_URL_(webConfig)}
							height={device_height}
							frameborder="0"
			></iframe>
    </IPhoneXDevice>
  {:else if $device_type$ === 'iphone5s' || $device_type$ === 'iphone8'}
    <MobileDevice class="silver { $innerWidth_gt_SCREEN_XS_MIN$ ? $device_type$ : '' }">
      <iframe bind:this={mobile_iframe} title={$device_type$} scrolling="yes"
							src={IFRAME_MOBILE_APP_URL_(webConfig)}
							width={device_width}
							height={device_height}
							frameborder="0"
			></iframe>
    </MobileDevice>
  {:else if $device_type$ === 'macbook'}
    <MacbookDevice>
      <iframe bind:this={mobile_iframe} title={$device_type$} scrolling="yes"
							src={WEB_APP_URL_()}
							width={device_width}
							height={device_height}
							frameborder="0"
			></iframe>
    </MacbookDevice>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.MobilePreview {
	@media (min-width: $screen-md-min) {
		position: fixed;
		bottom: 0;
		right: 24px;
		height: auto;
		max-height: 950px;
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 99;
	}
	@media (max-height: 830px) {
		bottom: 0;
		zoom: 0.75;
	}
	@media (max-height: 740px) {
		zoom: 0.7;
	}
	@media (max-height: 690px) {
		zoom: 0.65;
	}
	@media (max-height: 650px) {
		zoom: 0.6;
	}
	@media (max-width: $screen-xs-max) {
		display: flex;
		.marvel-device {
			flex: 1;
			.screen {
				display: flex;
				iframe {
					flex: 1;
				}
			}
		}
	}
	.marvel-device.iphone8:after {
		width: 0;
		height: 0;
	}
}
</style>
