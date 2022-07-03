<script lang="ts">
import { compact, flatten } from '@ctx-core/array'
import { style_ } from '@ctx-core/html'
import { Row } from '@menus/bootstrap'
import { vanilla_picker } from '@menus/color-ui'
import { Sortable } from '@menus/dnd'
import { CheckBox } from '@menus/form-ui'
import { required_errors_, validation, ValidationMessages } from '@menus/validation'
import { photo_placeholder_path } from '@menus/web-config'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const {
	IntroPage_ctx_a$, IPBGColor_errors_WeakMap$, IPColor_errors_WeakMap$, IPText1_errors_WeakMap$,
	IPText2_errors_WeakMap$, manage_platform_settings$, onsort_IntroPages,
} = _
export let AppConfiguration_IntroPages_errors:string[] = []
$: AppConfiguration_IntroPages_errors = compact([
	...flatten($manage_platform_settings$?.IntroPages || []).map(item=>$IPColor_errors_WeakMap$.get(item)),
	...flatten($manage_platform_settings$?.IntroPages || []).map(item=>$IPBGColor_errors_WeakMap$.get(item)),
	...flatten($manage_platform_settings$?.IntroPages || []).map(item=>$IPText1_errors_WeakMap$.get(item)),
	...flatten($manage_platform_settings$?.IntroPages || []).map(item=>$IPText2_errors_WeakMap$.get(item)),
]) as string[]
</script>

<Row class="intro-page-list">
  <table class="table table-striped m-table">
    <thead class="m-tr">
      <div class="m-th">Image</div>
      <div class="m-th">Intro Page</div>
    </thead>
    <tbody>
      <Sortable tag="tr"
								list={$IntroPage_ctx_a$}
								key="index"
								let:item={IntroPage_ctx} let:index
								on:sort={evt => onsort_IntroPages(evt)}
								on:itemclick={evt => _.onitemclick_IntroPage(evt)}
			>
        <td class="m-td">
          <div class="photo-upload-container">
            <div class="photo-viewer">
							<img src={ IntroPage_ctx.IntroPage.Image || photo_placeholder_path } alt="">
            </div>
						{#if IntroPage_ctx.IntroPage.Image}
              <div class="delete-menu-item-image">
                <button class="btn btn-danger btn-sm"
												on:click={evt => _.delete_IntroPage_Image(evt, IntroPage_ctx.IntroPage)}
								>Remove</button>
              </div>
            {:else}
              <label for="upload_IntroPage_Image_{index}" class="file-upload-label">
                <input type="file" id="upload_IntroPage_Image_{index}"
											 on:change={evt => _.upload_IntroPage_Image(evt, IntroPage_ctx.IntroPage)}
								/>
                <span>Upload</span>
              </label>
            {/if}
          </div>
        </td>
        <td class="m-td">
          <div class="Enabled-row">
            <CheckBox toggle={true}
											value={IntroPage_ctx.IntroPage.Enabled}
											text="Enabled"
											on:change={evt => _.onchange_IntroPage_Enabled(evt, IntroPage_ctx.IntroPage)}
						></CheckBox>
          </div>
          <div class="form-group BGColor"
							 class:has-error={$IPBGColor_errors_WeakMap$.get(IntroPage_ctx.IntroPage)?.length}
					>
            <label for="BGColor_{index}">BGColor</label>
            <div class="m-input-group has-addon-right">
              <input type="text" name="IPBGColor" id="BGColor_{index}"
										 use:vanilla_picker={IntroPage_ctx.IntroPage.BGColor}
										 on:color={evt => _.oncolor(evt, IntroPage_ctx.IntroPage, 'BGColor')}
										 class="form-control"
										 placeholder="Background Color is required"
										 required
										 disabled={!IntroPage_ctx.IntroPage._edit_mode}
										 value={IntroPage_ctx.IntroPage.BGColor||''}
										 use:validation={IntroPage_ctx.IntroPage.BGColor, ['Background Color', required_errors_]}
										 on:change={evt => IntroPage_ctx.IntroPage.BGColor = evt.currentTarget.value}
										 on:change={evt => manage_platform_settings$.refresh()}
										 on:errors={evt => $IPBGColor_errors_WeakMap$.set(IntroPage_ctx.IntroPage, evt.detail)}
										 on:errors={evt => IPBGColor_errors_WeakMap$.refresh()}
							>
              <div class="m-input-group-addon m-addon-right">
                <div class="color-preview-addon cursor-default"
										 style={style_({'background-color': IntroPage_ctx.IntroPage.BGColor})}
								></div>
              </div>
            </div>
            <ValidationMessages errors={$IPBGColor_errors_WeakMap$.get(IntroPage_ctx.IntroPage)} inplace_tooltip={true}
						></ValidationMessages>
          </div>
          <div class="form-group Text1"
							 class:has-error={$IPText1_errors_WeakMap$.get(IntroPage_ctx.IntroPage)?.length}
					>
            <label for="Text1_index}">Primary Text</label>
            <div class="m-input-group has-addon-right">
              <input type="text" name="IPText1" id="Text1_index}"
										 required
										 placeholder="Primary Text is required"
										 class="form-control"
										 disabled={!IntroPage_ctx.IntroPage._edit_mode}
										 value={IntroPage_ctx.IntroPage.Text1||''}
										 use:validation={IntroPage_ctx.IntroPage.Text1, ['Primary Text', required_errors_]}
										 on:change={evt => IntroPage_ctx.IntroPage.Text1 = evt.currentTarget.value}
										 on:change={evt => manage_platform_settings$.refresh()}
										 on:errors={evt => $IPText1_errors_WeakMap$.set(IntroPage_ctx.IntroPage, evt.detail)}
										 on:errors={evt => IPText1_errors_WeakMap$.refresh()}
							>
            </div>
            <ValidationMessages errors={$IPText1_errors_WeakMap$.get(IntroPage_ctx.IntroPage)} inplace_tooltip={true}
						></ValidationMessages>
          </div>
          <div class="form-group Text2"
							 class:has-error={$IPText2_errors_WeakMap$.get(IntroPage_ctx.IntroPage)?.length}
					>
            <label for="Text2_{index}">Secondary Text</label>
            <div class="m-input-group has-addon-right">
              <input type="text" name="IPText2" id="Text2_{index}"
										 class="form-control"
										 placeholder="Secondary Text is required"
										 required
										 disabled={!IntroPage_ctx.IntroPage._edit_mode}
										 value={IntroPage_ctx.IntroPage.Text2||''}
										 on:change={evt => IntroPage_ctx.IntroPage.Text2 = evt.currentTarget.value}
										 on:change={evt => manage_platform_settings$.refresh()}
										 use:validation={IntroPage_ctx.IntroPage.Text2, ['Secondary Text', required_errors_]}
										 on:errors={evt => $IPText2_errors_WeakMap$.set(IntroPage_ctx.IntroPage, evt.detail)}
										 on:errors={evt => IPText2_errors_WeakMap$.refresh()}
							>
            </div>
            <ValidationMessages errors={$IPText2_errors_WeakMap$.get(IntroPage_ctx.IntroPage)} inplace_tooltip={true}
						></ValidationMessages>
          </div>
          <div class="controls">
            <div class="edit">
              {#if IntroPage_ctx.IntroPage._edit_mode}
                <button type="submit" class="btn action-link save-link"
												on:click|preventDefault|stopPropagation={evt => _.save_IntroPage(IntroPage_ctx.IntroPage)}
								>Save</button>
                <button type="button" class="btn action-link cancel-link"
												on:click|preventDefault|stopPropagation={evt => _.close_IntroPage(IntroPage_ctx.IntroPage, true)}
								>Cancel</button>
              {:else}
                <div class="pencil-icon" on:click={evt => _.open_IntroPage(IntroPage_ctx.IntroPage)}></div>
              {/if}
            </div>
						{#if !IntroPage_ctx.IntroPage._isNew}
              <div class="delete delete-time-icon"
									 on:click|stopPropagation={evt => _.delete_IntroPage(index)}
							></div>
            {/if}
          </div>
        </td>
      </Sortable>
    </tbody>
  </table>
	{#if !$manage_platform_settings$.IntroPages?.length}
    <div class="empty-record">
      No Records to display
    </div>
  {/if}
</Row>
<Row class="add-page-btn">
  <button type="button" class="btn btn-success btn-sm"
					on:click={evt => _.add_IntroPage()}
	>Add Page</button>
</Row>
