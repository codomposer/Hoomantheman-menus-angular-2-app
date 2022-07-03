<script lang="ts">
import { style_ } from '@ctx-core/html'
import { Row } from '@menus/bootstrap'
import type { manage_platform_ui_Ctx } from '@menus/manage-platform-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ValidationMessages } from '@menus/validation'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
import { copy_palette_color_b } from './copy_palette_color_b.js'
import { image_color_rgb_ } from './image_color_rgb_.js'
import { manage_App_Icon_image_color_a$_b } from './manage_App_Icon_image_color_a$_b'
import { manage_App_Icon_src$_b } from './manage_App_Icon_src$_b.js'
import { manage_App_Splash_src$_b } from './manage_App_Splash_src$_b.js'
import { remove_Image_b } from './remove_Image_b.js'
import { upload_Image_b } from './upload_Image_b.js'
export let _:AppConfiguration_c
const ctx = getContext_ui_ctx() as manage_platform_ui_Ctx
const copy_palette_color = copy_palette_color_b(ctx)
const {
	App_Icon_errors$, manage_App_Icon_palette$, App_Logo_errors$, App_Splash_errors$, manage_platform_settings$,
} = _
export let AppConfiguration_Icons_errors:string[]
// $App_Icon_errors$,$App_Splash_errors$ should not block form submission
$: AppConfiguration_Icons_errors = [...$App_Logo_errors$]
const manage_App_Icon_src$ = manage_App_Icon_src$_b(ctx)
const manage_App_Icon_image_color_a$ = manage_App_Icon_image_color_a$_b(ctx)
const manage_App_Splash_src$ = manage_App_Splash_src$_b(ctx)
const remove_Image = remove_Image_b(ctx)
const upload_Image = upload_Image_b(ctx)
</script>

<Row class="AppConfiguration_Icons">
	<div class="section-subheading">App Icon png (1024x1024)</div>
	<div class="photo-upload-container">
		<div class="photo-viewer">
			<img src={$manage_App_Icon_src$} alt="App Icon png (1024x1024)">
		</div>
		<label for="upload_App_Icon" class="file-upload-label">
			<input type="file" id="upload_App_Icon" on:change={evt => upload_Image(evt, 'App_Icon')}/>
			<span>Upload</span>
		</label>
		{#if $manage_platform_settings$.App_Icon}
			<div class="delete-menu-item-image">
				<buttpon
					type="button" class="btn btn-danger btn-sm"
					on:click={evt => remove_Image(evt, 'App_Icon')}
				>Remove</buttpon>
			</div>
		{/if}
		<ValidationMessages errors={$App_Icon_errors$} inplace_tooltip={true}></ValidationMessages>
	</div>
	{#if $manage_App_Icon_palette$}
		<div class="palette-item" id="manage_App_Icon_palette">
			<label for="manage_App_Icon_palette">App Icon color palette (click on a color to copy)</label>
			{#each $manage_App_Icon_image_color_a$ as image_color}
				<div class="d-iblock">
					{#if image_color.rgb}
						<div
							class="palette-color"
							style={style_({
								'background-color': image_color_rgb_(image_color)
							})}
							on:click={evt => copy_palette_color(image_color_rgb_(image_color))}
						>&nbsp;</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</Row>
<Row>
	<div class="section-subheading">App Splash png (2732x2732)</div>
	<div class="photo-upload-container">
		<div class="photo-viewer">
			<img src={ $manage_App_Splash_src$ } data-src-url={$manage_App_Splash_src$} alt="App Splash png (2732x2732)">
		</div>
		<label for="upload_App_Splash" class="file-upload-label">
			<input type="file" id="upload_App_Splash" on:change={evt => upload_Image(evt, 'App_Splash')}/>
			<span>Upload</span>
		</label>
		{#if $manage_platform_settings$.App_Splash}
			<div class="delete-menu-item-image">
				<button
					type="button" class="btn btn-danger btn-sm"
					on:click={evt => remove_Image(evt, 'App_Splash')}
				>Remove</button>
			</div>
		{/if}
		<ValidationMessages errors={$App_Splash_errors$} inplace_tooltip={true}></ValidationMessages>
	</div>
</Row>
