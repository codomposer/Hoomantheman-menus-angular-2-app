<script lang="ts">
import { style_ } from '@ctx-core/html'
import { Row } from '@menus/bootstrap'
import type { vanilla_picker_color_evt_T } from '@menus/color-ui'
import { ColorPalettePickerModal, EnsureVanillaPicker, vanilla_picker } from '@menus/color-ui'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import { PlatformSettings, PlatformSettingsIntroPage } from '@menus/platform-settings-lib'
import { getContext_ui_ctx } from '@menus/ui'
import { errors_2, required_errors_, ValidationMessages } from '@menus/validation'
import { EnsureVibrant } from '@menus/vibrant'
import { color_palette_picker_modal$_b } from './color_palette_picker_modal$_b.js'
import { copy_palette_color_b } from './copy_palette_color_b.js'
import { get_random_palette_b } from './get_random_palette_b.js'
import { image_color_rgb_ } from './image_color_rgb_.js'
import { manage_App_Splash_image_color_a$_b } from './manage_App_Splash_image_color_a$_b.js'
import { manage_App_Splash_palette$_b } from './manage_App_Splash_palette$_b.js'
import { open_color_palette_picker_modal_b } from './open_color_palette_picker_modal_b.js'
import { shuffle_map_colors_b } from './shuffle_map_colors_b.js'
import { selected_palette_item$_b } from './selected_palette_item$_b.js'
import { shuffle_palette_b } from './shuffle_palette_b.js'
import { shuffle_global_colors_b } from './shuffle_global_colors_b.js'
import { shuffle_top_navigation_colors_b } from './shuffle_top_navigation_colors_b.js'
const ctx = getContext_ui_ctx()
const color_palette_picker_modal$ = color_palette_picker_modal$_b(ctx)
const copy_palette_color = copy_palette_color_b(ctx)
const get_random_palette = get_random_palette_b(ctx)
const manage_App_Splash_image_color_a$ = manage_App_Splash_image_color_a$_b(ctx)
const manage_App_Splash_palette$ = manage_App_Splash_palette$_b(ctx)
const manage_platform_settings$ = manage_platform_settings$_b(ctx)
const open_color_palette_picker_modal = open_color_palette_picker_modal_b(ctx)
const selected_palette_item$ = selected_palette_item$_b(ctx)
const shuffle_global_colors = shuffle_global_colors_b(ctx)
const shuffle_map_colors = shuffle_map_colors_b(ctx)
const shuffle_palette = shuffle_palette_b(ctx)
const shuffle_top_navigation_colors = shuffle_top_navigation_colors_b(ctx)
let Promo_BGColor_errors:string[], Promo_TabTextColor_errors:string[],
	Promo_ActiveTabTextColor_errors:string[], Promo_ActiveTabUnderlineColor_errors:string[],
	ColorUserLocationText_errors:string[], Color_Balanced_errors:string[], Color_Positive_errors:string[],
	Color_Assertive_errors:string[], Color_Text1_errors:string[], Color_Text2_errors:string[],
	Color_Text3_errors:string[], Color_UserMapIcon_errors:string[]
$: Promo_BGColor_errors = errors_2(['Background Color', required_errors_])(
	$manage_platform_settings$?.Promo_BGColor)
$: Promo_TabTextColor_errors = errors_2(['Tab Text Color', required_errors_])(
	$manage_platform_settings$?.Promo_TabTextColor)
$: Promo_ActiveTabTextColor_errors = errors_2(['Active Tab Text Color', required_errors_])(
	$manage_platform_settings$?.Promo_ActiveTabTextColor)
$: Promo_ActiveTabUnderlineColor_errors = errors_2(['Active Tab Underline Color', required_errors_])(
	$manage_platform_settings$?.Promo_ActiveTabUnderlineColor)
$: ColorUserLocationText_errors = errors_2(['User Location Text Color', required_errors_])(
	$manage_platform_settings$?.ColorUserLocationText)
$: Color_Balanced_errors = errors_2(['Color Balanced', required_errors_])(
	$manage_platform_settings$?.Color_Balanced)
$: Color_Positive_errors = errors_2(['Color Positive', required_errors_])(
	$manage_platform_settings$?.Color_Positive)
$: Color_Assertive_errors = errors_2(['Color Assertive', required_errors_])(
	$manage_platform_settings$?.Color_Assertive)
$: Color_Text1_errors = errors_2(['Color Text 1', required_errors_])($manage_platform_settings$?.Color_Text1)
$: Color_Text2_errors = errors_2(['Color Text 2', required_errors_])($manage_platform_settings$?.Color_Text2)
$: Color_Text3_errors = errors_2(['Color Text 3', required_errors_])($manage_platform_settings$?.Color_Text3)
$: Color_UserMapIcon_errors = errors_2(['User Map Icon', required_errors_])(
	$manage_platform_settings$?.Color_UserMapIcon)
$: Color_RestMapIcon_errors = errors_2(['Rest Map Icon', required_errors_])(
	$manage_platform_settings$?.Color_RestMapIcon)
$: Color_SelectedMapIcon_errors = errors_2(['Selected Map Icon', required_errors_])(
	$manage_platform_settings$?.Color_SelectedMapIcon)
export let AppConfiguration_Colors_errors:string[] = []
$: AppConfiguration_Colors_errors = [
	...Promo_BGColor_errors, ...Promo_TabTextColor_errors, ...Promo_ActiveTabTextColor_errors,
	...Promo_ActiveTabUnderlineColor_errors, ...ColorUserLocationText_errors, ...Color_Balanced_errors,
	...Color_Positive_errors, ...Color_Assertive_errors, ...Color_Text1_errors, ...Color_Text2_errors,
	...Color_Text3_errors, ...Color_UserMapIcon_errors, ...Color_RestMapIcon_errors,
	...Color_SelectedMapIcon_errors
]
function oncolor(evt:vanilla_picker_color_evt_T, item:PlatformSettings|PlatformSettingsIntroPage, key:string) {
	const current_color = item[key]
	const hex = evt.detail.hex.slice(0, 7) // # + 6 hex digits
	if (current_color !== hex) {
		item[key] = hex
		manage_platform_settings$.refresh()
	}
}
</script>

<EnsureVibrant></EnsureVibrant>
<EnsureVanillaPicker></EnsureVanillaPicker>
<ColorPalettePickerModal bind:this={$color_palette_picker_modal$}></ColorPalettePickerModal>
<Row>
  <div class="section-heading">Colors</div>
  <div class="section-subheading">
    <div>Palette</div>
    <div class="palette-actions-wrapper">
      <button type="button" class="btn btn-sm btn-success get-random-palette"
							on:click={evt => get_random_palette()}
			>Get Random Palette</button>
      <button type="button" class="btn btn-sm btn-success pick-color"
							on:click={evt => open_color_palette_picker_modal()}
			>Choose Palette</button>
      <button type="button" class="btn btn-sm btn-success shuffle-palette"
							on:click={evt => shuffle_palette()}
							disabled={!$selected_palette_item$}
			>Shuffle Palette</button>
    </div>
  </div>
	{#if $manage_App_Splash_palette$}
    <div class="palette-item">
      {#each $manage_App_Splash_image_color_a$ || [] as image_color}
        <div class="d-iblock">
          {#if image_color.rgb}
            <div class="palette-color"
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
	{#if $selected_palette_item$}
    <div class="palette-item">
      {#each $selected_palette_item$ as item}
        <div class="palette-color"
						 style={style_({'background-color': item})}
						 on:click={evt => copy_palette_color(item)}
				>&nbsp;</div>
      {/each}
    </div>
  {:else}
    <div class="text-center">(No Palette Selected)</div>
  {/if}
</Row>
<Row>
  <div class="section-subheading">
    <div class="col-sm-6">Top Navigation</div>
    <div class="col-sm-6 text-right">
      <button type="button" class="btn btn-sm btn-success shuffle-colors"
							on:click={evt => shuffle_top_navigation_colors()}
			>Shuffle Colors</button>
    </div>
  </div>
</Row>
<Row>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Promo_BGColor_errors.length}
		>
      <label for="Promo_BGColor">Background Color</label>
      <div class="m-input-group has-addon-right">
        <input type="text" class="form-control"
							 name="Promo_BGColor" id="Promo_BGColor"
							 required
							 use:vanilla_picker={$manage_platform_settings$.Promo_BGColor}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Promo_BGColor')}
							 bind:value={$manage_platform_settings$.Promo_BGColor}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={
                 style_({'background-color': $manage_platform_settings$.Promo_BGColor})
               }
					></div>
        </div>
      </div>
      <ValidationMessages errors={Promo_BGColor_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Promo_TabTextColor_errors.length}
		>
      <label for="Promo_TabTextColor">Tab Text Color</label>
      <div class="m-input-group has-addon-right">
        <input type="text"
							 use:vanilla_picker={$manage_platform_settings$.Promo_TabTextColor}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Promo_TabTextColor')}
							 class="form-control" name="Promo_TabTextColor" id="Promo_TabTextColor"
							 required
							 bind:value={$manage_platform_settings$.Promo_TabTextColor}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Promo_TabTextColor})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Promo_TabTextColor_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Promo_ActiveTabTextColor_errors.length}
		>
      <label for="Promo_ActiveTabTextColor">Active Tab Text Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Promo_ActiveTabTextColor}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Promo_ActiveTabTextColor')}
							 type="text"
							 class="form-control" name="Promo_ActiveTabTextColor" id="Promo_ActiveTabTextColor"
							 required
							 bind:value={$manage_platform_settings$.Promo_ActiveTabTextColor}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Promo_ActiveTabTextColor})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Promo_ActiveTabTextColor_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Promo_ActiveTabUnderlineColor_errors.length}
		>
      <label for="Promo_ActiveTabUnderlineColor">Active Tab Underline Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Promo_ActiveTabUnderlineColor}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Promo_ActiveTabUnderlineColor')}
							 type="text" class="form-control"
							 name="Promo_ActiveTabUnderlineColor" id="Promo_ActiveTabUnderlineColor"
							 required
							 bind:value={$manage_platform_settings$.Promo_ActiveTabUnderlineColor}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Promo_ActiveTabUnderlineColor})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Promo_ActiveTabUnderlineColor_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={ColorUserLocationText_errors.length}
		>
      <label for="ColorUserLocationText">User Location Text Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.ColorUserLocationText}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'ColorUserLocationText')}
							 type="text" class="form-control"
							 name="ColorUserLocationText" id="ColorUserLocationText"
							 required
							 bind:value={$manage_platform_settings$.ColorUserLocationText}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.ColorUserLocationText})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={ColorUserLocationText_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
</Row>
<Row class="section-subheading">
  <div class="col-sm-6">
    <div>Global</div>
  </div>
  <div class="col-sm-6 text-right">
    <button type="button" class="btn btn-sm btn-success shuffle-colors"
						on:click={evt => shuffle_global_colors()}
		>Shuffle Colors</button>
  </div>
</Row>
<Row>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Balanced_errors.length}
		>
      <label for="Color_Balanced">Action Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Balanced}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Balanced')}
							 type="text" class="form-control"
							 name="Color_Balanced" id="Color_Balanced"
							 required
							 bind:value={$manage_platform_settings$.Color_Balanced}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Balanced})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Balanced_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Positive_errors.length}
		>
      <label for="Color_Positive">Feedback Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Positive}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Positive')}
							 type="text" class="form-control"
							 name="Color_Positive" id="Color_Positive"
							 required
							 bind:value={$manage_platform_settings$.Color_Positive}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Positive})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Positive_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Assertive_errors.length}
		>
      <label for="Color_Assertive">Notification Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Assertive} type="text"
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Assertive')}
							 class="form-control"
							 name="Color_Assertive" id="Color_Assertive"
							 required
							 bind:value={$manage_platform_settings$.Color_Assertive}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Assertive})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Assertive_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
</Row>
<Row>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Text1_errors.length}
		>
      <label for="Color_Text1">Primary Text Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Text1}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Text1')}
							 type="text" name="Color_Text1" id="Color_Text1"
							 class="form-control"
							 required
							 bind:value={$manage_platform_settings$.Color_Text1}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Text1})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Text1_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Text2_errors.length}
		>
      <label for="Color_Text2">Secondary Text Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Text2} type="text"
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Text2')}
							 class="form-control" id="Color_Text2"
							 name="Color_Text2"
							 required
							 bind:value={$manage_platform_settings$.Color_Text2}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Text2})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Text2_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_Text3_errors.length}
		>
      <label for="Color_Text3">Tertiary Text Color</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_Text3}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_Text3')}
							 type="text" name="Color_Text3" id="Color_Text3"
							 class="form-control"
							 required
							 bind:value={$manage_platform_settings$.Color_Text3}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_Text3})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_Text3_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
</Row>
<Row class="section-subheading">
  <div class="col-sm-6">
    <div>Map</div>
  </div>
  <div class="col-sm-6 text-right">
    <button type="button" class="btn btn-sm btn-success shuffle-colors"
						on:click={evt => shuffle_map_colors()}
		>Shuffle Colors</button>
  </div>
</Row>
<Row>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_UserMapIcon_errors.length}
		>
      <label for="Color_UserMapIcon">User Map Icon</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_UserMapIcon}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_UserMapIcon')}
							 type="text" name="Color_UserMapIcon" id="Color_UserMapIcon"
							 class="form-control"
							 required
							 bind:value={$manage_platform_settings$.Color_UserMapIcon}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_UserMapIcon})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_UserMapIcon_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_RestMapIcon_errors.length}
		>
      <label for="Color_RestMapIcon">Rest Map Icon</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_RestMapIcon}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_RestMapIcon')}
							 type="text" name="Color_RestMapIcon" id="Color_RestMapIcon"
							 class="form-control"
							 required
							 bind:value={$manage_platform_settings$.Color_RestMapIcon}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_RestMapIcon})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_RestMapIcon_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group input-container"
				 class:has-error={Color_SelectedMapIcon_errors.length}
		>
      <label for="Color_SelectedMapIcon">Selected Map Icon</label>
      <div class="m-input-group has-addon-right">
        <input use:vanilla_picker={$manage_platform_settings$.Color_SelectedMapIcon}
							 on:color={evt => oncolor(evt, $manage_platform_settings$, 'Color_SelectedMapIcon')}
							 type="text" name="Color_SelectedMapIcon" id="Color_SelectedMapIcon"
							 class="form-control"
							 required
							 bind:value={$manage_platform_settings$.Color_SelectedMapIcon}
				>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => evt.currentTarget.previousElementSibling.focus()}
				>
          <div class="color-preview-addon cursor-default"
							 style={style_({'background-color': $manage_platform_settings$.Color_SelectedMapIcon})}
					></div>
        </div>
      </div>
      <ValidationMessages errors={Color_SelectedMapIcon_errors} input_tooltip={true}></ValidationMessages>
    </div>
  </div>
</Row>
