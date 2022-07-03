<script lang="ts">
import { onMount } from 'svelte'
import { style_ } from '@ctx-core/html'
import { Row } from '@menus/bootstrap'
import { vanilla_picker } from '@menus/color-ui'
import { CheckBox } from '@menus/form-ui'
import type { manage_platform_ui_Ctx } from '@menus/manage-platform-ui'
import {
	DELIVERY_SERVICE_TYPE_ID, PICKUP_SERVICE_TYPE_ID, CATERING_SERVICE_TYPE_ID, DINEIN_SERVICE_TYPE_ID,
} from '@menus/service-type-common'
import { errors_2, required_errors_, validation, ValidationMessages } from '@menus/validation'
import { getContext_ui_ctx } from '@menus/ui'
import {
	INTRO_PAGES_FEATURE, FILTERS_FEATURE, ENABLE_MAP_VIEW_FEATURE, GROUP_SIMILAR_DISHES_FEATURE,
	MANAGE_CHAT_FEATURE, MANAGE_SUPPORT_CHAT_FEATURE, POINTS_FEATURE,
} from '@menus/web-config'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
import { remove_Image_b } from './remove_Image_b.js'
import { upload_Image_b } from './upload_Image_b.js'
const ctx = getContext_ui_ctx() as manage_platform_ui_Ctx
const remove_Image = remove_Image_b(ctx)
const upload_Image = upload_Image_b(ctx)
export let _:AppConfiguration_c
const {
	App_Flyer_errors$, App_Flyer_Mobile_errors$, IntroPages_errors$, is_super_admin_role$, manage_platform_isPlatform$,
	manage_platform_settings$, oncolor, platform_settings_serviceType_errors$, ro_auth_rules$
} = _
let Intro_Action_Button_Text_errors:string[], Intro_Action_Button_Color_errors:string[],
	Intro_Action_Button_BGColor_errors:string[], Points_Name_errors:string[], Review_Points_errors:string[],
	Image_Points_errors:string[], Order_Points_errors:string[], SocialLink_Facebook_errors:string[],
	SocialLink_Twitter_errors:string[], SocialLink_Instagram_errors:string[], SocialLink_Youtube_errors:string[],
	Google_Maps_Key_errors:string[], FB_CLIENT_ID_errors:string[], GOOGLE_PLUS_WEB_CLIENT_ID_errors:string[],
	Google_ClientSecret_errors:string[], GOOGLE_PLUS_REVERSE_CLIENT_ID_errors:string[]
$: Intro_Action_Button_Text_errors = errors_2(['Action Button Text', Enable_Intro_Pages ? required_errors_ : []])(
	$manage_platform_settings$?.Intro_Action_Button_Text)
$: Intro_Action_Button_Color_errors = errors_2(['Action Button Color', Enable_Intro_Pages ? required_errors_ : []])(
	$manage_platform_settings$?.Intro_Action_Button_Color)
$: Intro_Action_Button_BGColor_errors = errors_2(['Action Button Background Color',
	Enable_Intro_Pages ? required_errors_ : []])($manage_platform_settings$?.Intro_Action_Button_BGColor)
$: Points_Name_errors = errors_2(['Points Name', Enable_Points ? required_errors_ : []])(
	$manage_platform_settings$?.Points_Name)
$: Review_Points_errors = errors_2(['Review Points', Enable_Points ? required_errors_ : []])(
	$manage_platform_settings$?.Review_Points)
$: Image_Points_errors = errors_2(['Image Points', Enable_Points ? required_errors_ : []])(
	$manage_platform_settings$?.Image_Points)
$: Order_Points_errors = errors_2(['Order Points', Enable_Points ? required_errors_ : []])(
	$manage_platform_settings$?.Order_Points)
$: SocialLink_Facebook_errors = errors_2(['Facebook Link'])($manage_platform_settings$?.SocialLink_Facebook)
$: SocialLink_Twitter_errors = errors_2(['Twitter Link'])($manage_platform_settings$?.SocialLink_Twitter)
$: SocialLink_Instagram_errors = errors_2(['Instagram Link'])($manage_platform_settings$?.SocialLink_Instagram)
$: SocialLink_Youtube_errors = errors_2(['Youtube Link'])($manage_platform_settings$?.SocialLink_Youtube)
$: Google_Maps_Key_errors = errors_2(['Google Maps Key'])($manage_platform_settings$?.Google_Maps_Key)
$: FB_CLIENT_ID_errors = errors_2(['Facebook App ID'])($manage_platform_settings$?.FB_CLIENT_ID)
$: GOOGLE_PLUS_WEB_CLIENT_ID_errors = errors_2(['Google Web Client ID'])(
	$manage_platform_settings$?.GOOGLE_PLUS_WEB_CLIENT_ID)
$: Google_ClientSecret_errors = errors_2(['Google Client Secret'])(
	$manage_platform_settings$?.Google_ClientSecret)
$: GOOGLE_PLUS_REVERSE_CLIENT_ID_errors = errors_2(['Color Assertive'])(
	$manage_platform_settings$?.GOOGLE_PLUS_REVERSE_CLIENT_ID)
export let AppConfiguration_Features_errors:string[]
$: AppConfiguration_Features_errors = [
	...$IntroPages_errors$, ...Intro_Action_Button_Text_errors, ...Intro_Action_Button_Color_errors,
	...Intro_Action_Button_BGColor_errors, ...Points_Name_errors,
	...Review_Points_errors, ...Image_Points_errors,
	...Order_Points_errors, ...SocialLink_Facebook_errors,
	...SocialLink_Twitter_errors, ...SocialLink_Instagram_errors,
	...SocialLink_Youtube_errors, ...Google_Maps_Key_errors,
	...FB_CLIENT_ID_errors, ...GOOGLE_PLUS_WEB_CLIENT_ID_errors,
	...Google_ClientSecret_errors, ...GOOGLE_PLUS_REVERSE_CLIENT_ID_errors
]
let Enable_Intro_Pages:boolean, Enable_Points:boolean
$: Enable_Intro_Pages = $manage_platform_settings$?.Enable_Intro_Pages
$: Enable_Points = $manage_platform_settings$?.Enable_Points
const default_Flyer_Title = 'HUNGRY? ORDER THE EASY WAY & ORDER DIRECT'
const default_Flyer_SubTitle = 'GET IT RIGHT & QUICK EVERYTIME'
onMount(()=> {
	if (!$manage_platform_settings$.Flyer_Title) {
		reset_Flyer_Title()
	}
	if (!$manage_platform_settings$.Flyer_SubTitle) {
		reset_Flyer_SubTitle()
	}
})
function reset_Flyer_Title() {
  $manage_platform_settings$.Flyer_Title = default_Flyer_Title
}
function reset_Flyer_SubTitle() {
  $manage_platform_settings$.Flyer_SubTitle = default_Flyer_SubTitle
}
const Flyer_Title_maxlength = 42
const Flyer_SubTitle_maxlength = 34
</script>

<Row class="section-heading">Features</Row>
<Row class="section-subheading">Service Types
	{#if $platform_settings_serviceType_errors$?.length}
    <span class="text-danger">({ $platform_settings_serviceType_errors$.join(', ') })</span>
  {/if}
</Row>
<Row class="ServiceType">
  <div class="col-md-6 input-container">
    <CheckBox toggle={true} text="Delivery"
							bind:value={$manage_platform_settings$.Enable_Delivery}
		></CheckBox>
    <input type="radio"
					 id="default_Enable_Delivery"
					 bind:group={$manage_platform_settings$.Default_ServiceType}
					 value={DELIVERY_SERVICE_TYPE_ID}
					 disabled={!$manage_platform_settings$.Enable_Delivery}
		>
    <label class="btn btn-xxs" for="default_Enable_Delivery">Default</label>
  </div>
  <div class="col-md-6 input-container">
    <CheckBox
			toggle={true} text="Pickup"
			bind:value={$manage_platform_settings$.Enable_Pickup}
		></CheckBox>
    <input
			type="radio"
			id="default_Enable_Pickup"
			bind:group={$manage_platform_settings$.Default_ServiceType}
			value={PICKUP_SERVICE_TYPE_ID}
			disabled={!$manage_platform_settings$.Enable_Pickup}
		>
    <label class="btn btn-xxs" for="default_Enable_Pickup">Default</label>
  </div>
  <div class="col-md-6 input-container">
    <CheckBox
			toggle={true} text="Catering"
			bind:value={$manage_platform_settings$.Enable_Catering}
		></CheckBox>
    <input
			type="radio"
			id="default_Enable_Catering"
			bind:group={$manage_platform_settings$.Default_ServiceType}
			value={CATERING_SERVICE_TYPE_ID}
			disabled={!$manage_platform_settings$.Enable_Catering}
		>
    <label class="btn btn-xxs" for="default_Enable_Catering">Default</label>
  </div>
  <div class="col-md-6 input-container">
    <CheckBox
			toggle={true} text="Dine in"
			bind:value={$manage_platform_settings$.Enable_DiningIn}
		></CheckBox>
    <input
			type="radio"
			id="default_Enable_DiningIn"
			bind:group={$manage_platform_settings$.Default_ServiceType}
			value={DINEIN_SERVICE_TYPE_ID}
			disabled={!$manage_platform_settings$.Enable_DiningIn}
		>
    <label class="btn btn-xxs" for="default_Enable_DiningIn">Default</label>
  </div>
</Row>
{#if $ro_auth_rules$[INTRO_PAGES_FEATURE]}
  <Row>
    <div class="section-subheading">Intro Pages
			{#if $IntroPages_errors$?.length}
        <span class="text-danger">({ $IntroPages_errors$.join(', ') })</span>
      {/if}
    </div>
    <div class="col-md-6 input-container">
      <CheckBox
				toggle={true} text="Intro Pages"
				bind:value={$manage_platform_settings$.Enable_Intro_Pages}
			></CheckBox>
    </div>
  </Row>
{/if}
{#if Enable_Intro_Pages}
  <Row>
    <div class="col-md-6">
      <div
				class="form-group input-container"
				class:has-error={Intro_Action_Button_Text_errors.length}
			>
        <label for="Intro_Action_Button_Text">Action Button Text</label>
        <div class="m-input-group has-addon-right">
          <input
						type="text" class="form-control"
						name="Intro_Action_Button_Text" id="Intro_Action_Button_Text"
						required
						use:validation={$manage_platform_settings$.Intro_Action_Button_Text,
							['Intro Action Button Text', required_errors_]
						}
						bind:value={$manage_platform_settings$.Intro_Action_Button_Text}
					>
        </div>
        <ValidationMessages errors={Intro_Action_Button_Text_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6">
      <div
				class="form-group input-container"
				class:has-error={Intro_Action_Button_Color_errors.length}
			>
        <label for="Intro_Action_Button_Color">Action Button Color</label>
        <div class="m-input-group has-addon-right">
          <input
						use:vanilla_picker={$manage_platform_settings$.Intro_Action_Button_Color}
						on:color={evt => oncolor(evt, $manage_platform_settings$, 'Intro_Action_Button_Color')}
						type="text" class="form-control"
						name="Intro_Action_Button_Color" id="Intro_Action_Button_Color"
						required
						bind:value={$manage_platform_settings$.Intro_Action_Button_Color}
					>
          <div class="m-input-group-addon m-addon-right">
            <div
							class="color-preview-addon cursor-default"
							style={style_({'background-color': $manage_platform_settings$.Intro_Action_Button_Color})}
						></div>
          </div>
        </div>
        <ValidationMessages errors={Intro_Action_Button_Color_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6">
      <div
				class="form-group input-container"
				class:has-error={Intro_Action_Button_BGColor_errors.length}
			>
        <label for="Intro_Action_Button_BGColor">Action Button Background Color</label>
        <div class="m-input-group has-addon-right">
          <input
						use:vanilla_picker={$manage_platform_settings$.Intro_Action_Button_BGColor}
						on:color={evt => oncolor(evt, $manage_platform_settings$, 'Intro_Action_Button_BGColor')}
						type="text" class="form-control"
						name="Intro_Action_Button_BGColor" id="Intro_Action_Button_BGColor"
						required
						bind:value={$manage_platform_settings$.Intro_Action_Button_BGColor}
					>
          <div class="m-input-group-addon m-addon-right">
            <div
							class="color-preview-addon cursor-default"
							style={style_({'background-color': $manage_platform_settings$.Intro_Action_Button_BGColor})}
						></div>
          </div>
        </div>
        <ValidationMessages errors={Intro_Action_Button_BGColor_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
  </Row>
{/if}
<slot></slot>
{#if $manage_platform_isPlatform$ && $ro_auth_rules$[POINTS_FEATURE]}
  <Row>
    <div class="section-subheading">Points Feature</div>
    <div class="col-md-6">
      <CheckBox
				toggle={true} text="Enable"
				bind:value={$manage_platform_settings$.Enable_Points}
			></CheckBox>
    </div>
  </Row>
{/if}
{#if Enable_Points && $ro_auth_rules$[POINTS_FEATURE]}
  <Row>
    <div class="col-md-6">
      <div class="form-group input-container" class:has-error={Points_Name_errors.length}>
        <label for="Points_Name">Points Name</label>
        <input
					type="text" class="form-control"
					name="Points_Name" id="Points_Name"
					required
					bind:value={$manage_platform_settings$.Points_Name}
				>
        <ValidationMessages errors={Points_Name_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group input-container" class:has-error={Review_Points_errors.length}>
        <label for="Review_Points">Review Points</label>
        <input
					type="text" class="form-control" name="Review_Points" id="Review_Points"
					required
					bind:value={$manage_platform_settings$.Review_Points}
				>
        <ValidationMessages errors={Review_Points_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group input-container" class:has-error={Image_Points_errors.length}>
        <label for="Image_Points">Image Points</label>
        <input
					type="text" class="form-control" name="Image_Points" id="Image_Points"
					required
					bind:value={$manage_platform_settings$.Image_Points}
				>
        <ValidationMessages errors={Image_Points_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group input-container" class:has-error={Order_Points_errors.length}>
				<label for="Order_Points">Order Points</label>
        <input
					type="text" class="form-control" name="Order_Points" id="Order_Points"
					required
					bind:value={$manage_platform_settings$.Order_Points}
				>
        <ValidationMessages errors={Order_Points_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
  </Row>
{/if}
{#if $ro_auth_rules$[FILTERS_FEATURE]}
  <Row>
    <div class="section-subheading">Filters</div>
      <div class="col-md-6 input-container">
        <CheckBox
					toggle={true} text="Cuisine Filter"
					bind:value={$manage_platform_settings$.Enable_Cuisine_Filter}
				></CheckBox>
      </div>
		<div class="col-md-6 input-container">
      <CheckBox
				toggle={true} text="Dish Filter (Only for Multi Restaurants and Market Place)"
				bind:value={$manage_platform_settings$.Enable_Dish_Filter}
			></CheckBox>
    </div>
  </Row>
{/if}
<Row>
  <div class="col-md-6">
    <div class="form-group">
      <label for="DefaultView">Default View</label>
      <select
        class="form-control"
        name="DefaultView" id="DefaultView"
        bind:value={$manage_platform_settings$.Default_View}
      >
        <option value={0}>Restaurant Map View</option>
        <option value={1}>Restaurant List View</option>
      </select>
    </div>
  </div>
</Row>
<Row>
  <div class="section-subheading">Yelp</div>
  <div class="col-md-6">
    <CheckBox
			toggle={true} text="Rating"
			bind:value={$manage_platform_settings$.Enable_Yelp_Rating}
		></CheckBox>
  </div>
  <div class="col-md-6">
    <CheckBox
			toggle={true} text="Count"
			bind:value={$manage_platform_settings$.Enable_Yelp_Count}
		></CheckBox>
  </div>
</Row>
<Row>
  <div class="section-subheading">Mobile App/Website Customer Social Login</div>
  <div class="input-container">
    <div class="col-md-6">
      <CheckBox
				toggle={true} text="Facebook"
				bind:value={$manage_platform_settings$.Enable_Facebook_Login}
			></CheckBox>
    </div>
    <div class="col-md-6">
      <CheckBox
				toggle={true} text="Google"
				bind:value={$manage_platform_settings$.Enable_Google_Login}
			></CheckBox>
    </div>
  </div>
</Row>
<Row>
  <div class="section-subheading">Restaurant Social Website Links</div>
  <div class="input-container">
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={SocialLink_Facebook_errors.length}>
        <label for="SocialLink_Facebook">Facebook</label>
        <input
					type="text" class="form-control"
					name="SocialLink_Facebook" id="SocialLink_Facebook"
					bind:value={$manage_platform_settings$.SocialLink_Facebook}
				>
        <ValidationMessages errors={SocialLink_Facebook_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={SocialLink_Twitter_errors.length}>
        <label for="SocialLink_Twitter">Twitter</label>
        <input
					type="text" class="form-control"
					name="SocialLink_Twitter" id="SocialLink_Twitter"
					bind:value={$manage_platform_settings$.SocialLink_Twitter}
				>
        <ValidationMessages errors={SocialLink_Twitter_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={SocialLink_Instagram_errors.length}>
        <label for="SocialLink_Instagram">Instagram</label>
        <input
					type="text" class="form-control"
					name="SocialLink_Instagram" id="SocialLink_Instagram"
					bind:value={$manage_platform_settings$.SocialLink_Instagram}
				>
        <ValidationMessages errors={SocialLink_Instagram_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={SocialLink_Youtube_errors.length}>
        <label for="SocialLink_Youtube">Youtube</label>
        <input
					type="text" class="form-control"
					name="SocialLink_Youtube" id="SocialLink_Youtube"
					bind:value={$manage_platform_settings$.SocialLink_Youtube}
				>
        <ValidationMessages errors={SocialLink_Youtube_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
  </div>
</Row>
{#if $is_super_admin_role$}
  <Row>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={Google_Maps_Key_errors.length}>
        <label for="Google_Maps_Key"
				>Google Maps Key (Change requires force reload of Mobile App Preview from Home Page)</label>
        <input
					type="text" class="form-control"
					name="Google_Maps_Key" id="Google_Maps_Key"
					bind:value={$manage_platform_settings$.Google_Maps_Key}
				>
        <ValidationMessages errors={Google_Maps_Key_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={FB_CLIENT_ID_errors.length}>
        <label for="FB_CLIENT_ID">Facebook App ID (can not be changed)</label>
        <input
					type="text" class="form-control"
					name="FB_CLIENT_ID" id="FB_CLIENT_ID"
					bind:value={$manage_platform_settings$.FB_CLIENT_ID}
				>
        <ValidationMessages errors={FB_CLIENT_ID_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={GOOGLE_PLUS_WEB_CLIENT_ID_errors.length}>
        <label for="GOOGLE_PLUS_WEB_CLIENT_ID">Google Web Client ID (can not be changed)</label>
        <input
					type="text" class="form-control"
					name="GOOGLE_PLUS_WEB_CLIENT_ID" id="GOOGLE_PLUS_WEB_CLIENT_ID"
					bind:value={$manage_platform_settings$.GOOGLE_PLUS_WEB_CLIENT_ID}
				>
        <ValidationMessages errors={GOOGLE_PLUS_WEB_CLIENT_ID_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={Google_ClientSecret_errors.length}>
        <label for="Google_ClientSecret">Google Client Secret (can not be changed)</label>
        <input
					type="text" class="form-control"
					name="Google_ClientSecret" id="Google_ClientSecret"
					bind:value={$manage_platform_settings$.Google_ClientSecret}
				>
        <ValidationMessages errors={Google_ClientSecret_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container" class:has-error={GOOGLE_PLUS_REVERSE_CLIENT_ID_errors.length}>
        <label for="GOOGLE_PLUS_REVERSE_CLIENT_ID"
				>Google Reverse Client ID (IOS URL Scheme)(can not be changed)</label>
        <input
					type="text" class="form-control"
					name="GOOGLE_PLUS_REVERSE_CLIENT_ID" id="GOOGLE_PLUS_REVERSE_CLIENT_ID"
					bind:value={$manage_platform_settings$.GOOGLE_PLUS_REVERSE_CLIENT_ID}
				>
        <ValidationMessages errors={GOOGLE_PLUS_REVERSE_CLIENT_ID_errors} input_tooltip={true}></ValidationMessages>
      </div>
    </div>
  </Row>
{/if}
<Row id="marketing">
  <div class="section-subheading">Marketing</div>
	<div>To review and print Flyer visit <a href="/backoffice/marketing" class="blue_underline">Marketing</a></div>
  <div class="input-container">
    <div class="col-md-12">
      <div class="form-group input-container">
        <label for="Flyer_Title">
					Flyer Title ({$manage_platform_settings$.Flyer_Title?.length || 0} of {Flyer_Title_maxlength} characters)
				</label>
        <input
					type="text" class="form-control"
					name="Flyer_Title" id="Flyer_Title"
					maxlength={Flyer_Title_maxlength}
					bind:value={$manage_platform_settings$.Flyer_Title}
				>
      </div>
    </div>
    <div class="col-md-12">
      <div class="form-group input-container">
        <label for="Flyer_SubTitle">
					Flyer Sub Title ({$manage_platform_settings$.Flyer_SubTitle?.length || 0} of {Flyer_SubTitle_maxlength} characters)
				</label>
        <input
					type="text" class="form-control"
					name="Flyer_SubTitle" id="Flyer_SubTitle"
					maxlength={Flyer_SubTitle_maxlength}
					bind:value={$manage_platform_settings$.Flyer_SubTitle}
				>
      </div>
    </div>
  </div>
</Row>
<Row>
  <div class="section-subheading">App Flyer png</div>
  <div class="input-container">
    <div class="col-md-6">
      <div class="photo-upload-container">
        <div class="photo-viewer">
          {#if $manage_platform_settings$.App_Flyer}
            <img src={ $manage_platform_settings$.App_Flyer } alt="">
          {:else}
            <img src="/assets/img/ro/photo-placeholder.svg" alt="">
          {/if}
        </div>
        <label for="upload_App_Flyer" class="file-upload-label">
          <input
						type="file" id="upload_App_Flyer"
						on:change={evt => upload_Image(evt, 'App_Flyer')}
					/>
          <span>Upload</span>
          <ValidationMessages errors={$App_Flyer_errors$}></ValidationMessages>
        </label>
				{#if $manage_platform_settings$.App_Flyer}
          <div class="delete-menu-item-image">
            <button
							type="button" class="btn btn-danger btn-sm"
							on:click={evt => remove_Image(evt, 'App_Flyer')}
						>Remove</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</Row>
<Row>
  <div class="section-subheading">App Flyer Mobile png</div>
  <div class="input-container">
    <div class="col-md-6">
      <div class="photo-upload-container">
        <div class="photo-viewer">
          {#if $manage_platform_settings$.App_Flyer_Mobile}
            <img src={ $manage_platform_settings$.App_Flyer_Mobile } alt="">
          {:else}
            <img src="/assets/img/ro/photo-placeholder.svg" alt="">
          {/if}
        </div>
        <label for="upload_App_Flyer_Mobile" class="file-upload-label">
          <input
						type="file" id="upload_App_Flyer_Mobile"
						on:change={evt => upload_Image(evt, 'App_Flyer_Mobile')}
					/>
          <span>Upload</span>
          <ValidationMessages errors={$App_Flyer_Mobile_errors$}></ValidationMessages>
        </label>
				{#if $manage_platform_settings$.App_Flyer_Mobile}
          <div class="delete-menu-item-image">
            <button
							type="button" class="btn btn-danger btn-sm"
							on:click={evt => remove_Image(evt, 'App_Flyer_Mobile')}
						>Remove</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</Row>
<Row>
<div class="section-subheading">General</div>
  <div class="col-md-6 input-container">
    <CheckBox
			toggle={true} text="Enable Coupons"
			bind:value={$manage_platform_settings$.Enable_Coupons}
		></CheckBox>
  </div>
	{#if $ro_auth_rules$[ENABLE_MAP_VIEW_FEATURE]}
    <div class="col-md-6 input-container">
      <CheckBox
				toggle={true} text="Map View"
				bind:value={$manage_platform_settings$.Enable_Map_View}
			></CheckBox>
    </div>
  {/if}
	<div class="col-md-6 input-container">
    <CheckBox
			toggle={true} text="Popular Ribbon"
			bind:value={$manage_platform_settings$.Enable_Popular_Ribbon}
		></CheckBox>
  </div>
	{#if $ro_auth_rules$[GROUP_SIMILAR_DISHES_FEATURE]}
    <div class="col-md-12 input-container">
      <CheckBox
				toggle={true} text="Group Similar Dishes (Mobile ONLY)"
				bind:value={$manage_platform_settings$.Group_SimilarDishes}
			></CheckBox>
    </div>
  {/if}
</Row>
{#if $ro_auth_rules$[MANAGE_CHAT_FEATURE]}
  <Row>
    <div class="section-subheading">Chat</div>
    <div class="col-md-6 input-container">
      <CheckBox
				toggle={true} text="Hi Waiter"
				bind:value={$manage_platform_settings$.Enable_HiWaiter}
			></CheckBox>
    </div>
  </Row>
{/if}
{#if $ro_auth_rules$[MANAGE_SUPPORT_CHAT_FEATURE]}
  <Row>
    <div class="section-subheading">Support Chat</div>
    <div>
      <div class="col-md-7 input-container">
        <CheckBox
					toggle={true} text="Registered Users Chat"
					bind:value={$manage_platform_settings$.EnableLoggedInSupportChat}
				></CheckBox>
      </div>
      <div class="col-md-5 input-container">
        <CheckBox
					toggle={true} text="Guest Chat"
					bind:value={$manage_platform_settings$.EnableGuestSupportChat}
				></CheckBox>
      </div>
    </div>
  </Row>
{/if}
