<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { PageLoader } from '@menus/shared-ui'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
import { ChangeAddressModal_c } from './ChangeAddressModal_c.js'
const dispatch = createEventDispatcher()
const ctx = getContext_ui_ctx() as user_address_ui_Ctx
export const _ = new ChangeAddressModal_c(ctx)
const { busy$, changeAddress_map$, is_modal_open$, is_modal_open_animate$, map$, userAddress_text$, } = _
export const { open, close } = _
export let input:HTMLInputElement = null
$: _.input$.$ = input
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:keydown={evt => evt.key === 'Escape' && _.close()}></svelte:window>
{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal ChangeAddressModal fade d-block"
			 class:in={$is_modal_open_animate$}
			 on:click={evt => _.close()}
	>
    <div class="modal-dialog change-address-modal"
				 on:click|stopPropagation
		>
      <div class="modal-content">
        {#if $busy$}
          <PageLoader center="parent"></PageLoader>
        {/if}
				<div class="modal-header">
          <button type="button" class="close"
									on:click={evt => _.close()}
					>
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Choose Address</h4>
        </div>
        <div class="modal-body modal-scrollable"
						 class:has_map={$map$}
				>
          <div class="change-location-section">
            <div class="change-address-input">
              <div class="input-group">
                <div class="input-group-addon"
										 on:click={_evt => _.init_userAddress(true)}
								>
                  <div class="location-2-icon"></div>
                </div>
                <input
									bind:this={input}
									type="text"
									id="change-address"
									class="form-control input-lg"
									placeholder="Street number, Street, name, city, state"
									bind:value={$userAddress_text$}
								>
                <div class="input-group-addon"
										 on:click={evt => userAddress_text$.set('')}
								>
                  <div class="cancel-address-icon"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="map-container" class:has_map={$map$}>
            <div bind:this={$changeAddress_map$} id="change-address-map"></div>
            <div class="user-map-marker"></div>
            <div class="save-address-container">
              <button type="button"
											class="btn btn-lg btn-success btn-block"
											on:click={evt => _.save_userAddress()}
							>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type="text/scss" global>
@use "sass:math";
@import "@menus/css/lib";
.ChangeAddressModal {
	.modal-body {
		padding: 0;
		position: relative;
		@media (min-width: $screen-sm-min) {
			min-height: 140px;
			&.has_map {
				min-height: 560px;
			}
		}
		.user-map-marker {
			$width-height: 48px;
			position: absolute;
			z-index: 1;
			height: $width-height;
			width: $width-height;
			cursor: pointer;
			background-image: vurl('/assets/img/cr/user-location.svg');
			background-repeat: no-repeat;
			top: 50%;
			left: 50%;
			margin-left: - math.div($width-height, 2); // Should be half of image's width
			margin-top: - ($width-height - 4px); // -4px is used to nullify bottom spacing of icon
		}
		.change-location-section {
			position: absolute;
			top: 0;
			z-index: 1;
			width: 100%;
			padding: 40px 40px 0;
			@media (max-width: $screen-sm-max) {
				padding: 40px 0 0;
			}
			.change-address-input {
				position: relative;
				box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
				border-radius: 3px;
				.input-group {
					.input-group-addon {
						background-color: white;
						border: none;
					}
					.form-control {
						border: none;
					}
				}
			}
		}
		.map-container {
			display: none;
			&.has_map {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
				width: 100%;
				height: 100%;
			}
			#change-address-map {
				width: 100%;
				min-height: 100%;
			}
			.save-address-container {
				position: absolute;
				bottom: 120px; // above ios navbar
				width: 100%;
				padding: 0 40px 0;
			}
		}
	}
}
</style>
