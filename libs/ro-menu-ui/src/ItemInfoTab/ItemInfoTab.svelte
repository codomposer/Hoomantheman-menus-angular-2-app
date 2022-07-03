<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { api_src_ } from '@menus/api'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { is_navigating$_b } from '@menus/page'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_, gt_errors_2 } from '@menus/validation'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuitem_is_new_unselected_size$_b } from '../ro_menuitem_is_new_unselected_size$_b.js'
import { ItemInfoTab_c } from './ItemInfoTab_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const is_navigating$ = is_navigating$_b(ctx)
const ro_menuitem_is_new_unselected_size = ro_menuitem_is_new_unselected_size$_b(ctx)
export const _ = new ItemInfoTab_c(ctx, dispatch)
const {
	busy$, menuitem_image_input$, ro_menuitem_is_multisize$, MenuitemDetails_busy$, params_MenuitemID_IsNew$, ro_menuitem$,
	ro_menuitem_is_new_multisize$, ro_Menuitem_is_new_singlesize$, ro_menuitem_is_new_size_errors$, ro_menuoptionsizes$,
} = _
let info_form_errors:string[] = [], info_Name_errors:string[] = [], info_Price_errors:string[] = []
$: info_form_errors = [
	...info_Name_errors, ...info_Price_errors, ...$ro_menuitem_is_new_size_errors$,
	...($ro_menuitem$?.ShowImageInGallery_errors || [])
]
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="ItemInfoTab">
	{#if $busy$}
		<PageLoader center="page"></PageLoader>
	{/if}
	{#if !$is_navigating$ && $ro_menuitem$}
		<div class="clearfix">
			<div class="photo-upload-container">
				<div>Photo</div>
				<div class="photo-viewer">
					{#if $ro_menuitem$.MenuImageExist}
						<img src="{ api_src_($ro_menuitem$.FileName) }" alt={$ro_menuitem$.Name}>
					{:else}
						<img src="/assets/img/ro/photo-placeholder.svg" alt="">
					{/if}
				</div>
				<label
					class="file-upload-label"
					class:disabled={$params_MenuitemID_IsNew$}
					on:click={evt => _.onclick_menuitemImage_label()}
				>
					<input
						type="file"
						on:change={evt => _.upload_MenuImage()}
						bind:this={$menuitem_image_input$}
						disabled={$params_MenuitemID_IsNew$}
					/>
					<span>Upload</span>
				</label>
				{#if $ro_menuitem$.MenuImageExist}
					<div class="delete-menu-item-image">
						<button class="btn btn-danger btn-sm" on:click={evt => _.delete_MenuImage()}>Remove</button>
					</div>
				{/if}
			</div>
			<div class="menu-item-details">
				<form novalidate on:submit|preventDefault={evt => info_form_errors.length || _.save()}>
					<div class="row name-sizes-row">
						<div
							class:col-lg-8={!$ro_menuitem_is_multisize$}
							class:col-lg-12={$ro_menuitem_is_multisize$}
							class:Menuitem_Is_singlesize={!$ro_menuitem_is_multisize$}
						>
							<div
								class="form-group input-container"
								class:has-error={info_Name_errors.length}
							>
								<label for="menuitem_Name">Name</label>
								<input
									type="text" name="Name" id="menuitem_Name" class="form-control"
									required
									bind:value={$ro_menuitem$.Name}
									use:validation={$ro_menuitem$.Name, ['Name', required_errors_]}
									on:errors={evt => info_Name_errors = evt.detail}
								/>
								<ValidationMessages errors={info_Name_errors} input_tooltip={true}></ValidationMessages>
							</div>
						</div>
						{#if !$ro_menuoptionsizes$?.length}
							<div class="col-lg-4" class:Menuitem_Is_singlesize={!$ro_menuitem_is_multisize$}>
								<div class="form-group input-container" class:has-error={info_Price_errors.length}>
									{#if $ro_menuitem_is_new_unselected_size}
										<label for="menuitem_sizing">Size(s)</label>
										<div id="menuitem_sizing">
											<div class="action-buttons">
												<button
													class="btn btn-lg btn-primary col-lg-2"
													on:click={evt => $ro_Menuitem_is_new_singlesize$ = true}
												>Single Size</button>
												<button
													class="btn btn-lg btn-primary col-lg-2"
													on:click={evt => $ro_menuitem_is_new_multisize$ = true}
												>Multi Size</button>
											</div>
										</div>
										<ValidationMessages errors={$ro_menuitem_is_new_size_errors$}></ValidationMessages>
									{:else if !$ro_menuitem_is_multisize$}
										<label for="menuitem_Price">Single Size Price ($)</label>
										<input
											type="text" name="Price" id="menuitem_Price" class="form-control"
											required
											bind:value={$ro_menuitem$.Price}
											use:validation={$ro_menuitem$.Price, ['Price', required_errors_, gt_errors_2(0)]}
											on:errors={evt => info_Price_errors = evt.detail}
										/>
										<ValidationMessages errors={info_Price_errors} input_tooltip={true}></ValidationMessages>
									{/if}
								</div>
							</div>
						{/if}
					</div>
					<div class="row input-container">
						<div class="col-xs-6">
							<CheckBox
								toggle={true}
								id="ShowImageInGallery"
								text="Show In Gallery"
								bind:value={$ro_menuitem$.ShowImageInGallery}
							></CheckBox>
							<ValidationMessages
								errors={$ro_menuitem$.ShowImageInGallery_errors||[]}
								inplace_tooltip={true}></ValidationMessages>
						</div>
						<div class="col-xs-6">
							<CheckBox text="Active" toggle={true} bind:value={$ro_menuitem$.Enabled}></CheckBox>
							<ValidationMessages
								errors={$ro_menuitem$.menuoptionsizes_errors||[]}
								inplace_tooltip={true}></ValidationMessages>
						</div>
					</div>
					<div class="form-group input-container">
						<label for="menuitem_Description">Description (optional)</label>
						<textarea
							type="text" name="Description" id="menuitem_Description"
							rows="5" class="form-control"
							bind:value={$ro_menuitem$.Description}
						></textarea>
					</div>
					<div class="text-right">
						<button use:ladda={$MenuitemDetails_busy$} type="submit" class="btn btn-lg btn-success"
						>Save Item Info</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.ItemInfoTab {
	@media (min-width: $screen-lg-min) {
		padding: 24px 0 0;
	}
	.photo-upload-container {
		float: left;
		@media (max-width: $screen-md-max) {
			width: 100%;
			float: none;
			text-align: center;
		}
		.photo-viewer {
			position: relative;
			margin-top: 7px;
			margin-bottom: 12px;
			width: 144px;
			height: 144px;
			background-color: rgba(#455A64, 0.05);
			@media (max-width: $screen-md-max) {
				margin-left: auto;
				margin-right: auto;
			}
			img {
				position: absolute;
				margin: auto;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				max-width: 100%;
				max-height: 100%;
			}
		}
		.delete-menu-item-image {
			display: flex;
			justify-content: center;
			margin-top: 12px;
			button.btn.btn-sm {
				min-width: 144px;
			}
		}
	}
	.menu-item-details {
		overflow: hidden;
		padding-left: 48px;
		@media (max-width: $screen-md-max) {
			width: 100%;
			float: none;
			margin-top: 24px;
			padding-left: 0;
		}
		.name-sizes-row {
			@media (min-width: $screen-lg-min) {
				padding-bottom: 20px;
			}
			#menuitem_sizing {
				overflow: hidden;
			}
		}
		.Menuitem_Is_singlesize {
			label {
				display: flex;
				align-items: flex-end;
			}
		}
		.btn {
			height: 48px;
			margin-bottom: 4px;
			min-width: 140px;
		}
	}
}
</style>
