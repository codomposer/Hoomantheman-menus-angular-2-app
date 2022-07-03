<script lang="ts">
import { Breadcrumb } from '@menus/breadcrumb-ui'
import {
	manage_platform_settings$_b, platform_companies$_b, selected_platform_company$_b
} from '@menus/manage-platform-ui'
// import { createPdf } from '@menus/pdfmake'
import { TutorialChapterId } from '@menus/ro-support-ui';
import { getContext_ui_ctx } from '@menus/ui'
import { is_cordova_app, print, /*print_pdf*/ } from '@menus/web-cordova'
import type { ro_marketing_ui_Ctx } from '../ro_marketing_ui_Ctx.js'
import MarketingFlyer from './MarketingFlyer.svelte'
const ctx = getContext_ui_ctx() as ro_marketing_ui_Ctx
const manage_platform_settings$ = manage_platform_settings$_b(ctx)
const platform_companies$ = platform_companies$_b(ctx)
const selected_platform_company$ = selected_platform_company$_b(ctx)
let MarketingFlyer_root:HTMLDivElement
async function print_flyer() {
	// const canvas = await html2canvas(MarketingFlyer_root)
	// const data_url = canvas.toDataURL()
	// LETTER page size
	// const height = 792, width = 612
	// const dd = createPdf({
	// 	pageSize: 'LETTER',
	// 	pageOrientation: 'landscape',
	// 	content: [
	// 		{ svg: MarketingFlyer_root.querySelector('svg').outerHTML, width: width - 72 * 2, height: height - 72 * 2 }
	// 	]
	// })
	// await print_pdf('Marketing.svg', dd as any) // TODO: fix type conflict on JetBrains IDE
	if (is_cordova_app) {
		await print('Marketing.svg', MarketingFlyer_root.querySelector('svg').outerHTML)
	} else {
		window.print()
	}
}
</script>

<div class="breadcrumb-container">
  <Breadcrumb/>
</div>

<div class="Marketing page">
	<div class="page-title-section">
		<div class="page-title-text cursor-default">
			Marketing

			<a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.MARKETING}" target="_blank"><i class="fa fa-youtube-play"></i></a>
		</div>
	</div>

  <div class="main-contents">
    <div class="section-heading">Platform Companies</div>
		<div>To modify Flyer, visit <a href="/backoffice/manage-platform" class="blue_underline">Manage Platform</a></div>
    <div class="choose-company-wrapper">
      <div class="form-group choose-company">
        <label for="selected_platform_company">Choose a company</label>
        <select
					id="selected_platform_company"
					class="form-control"
					name="selected_platform_company"
					bind:value={$selected_platform_company$}
				>
          {#each $platform_companies$ || [] as company}
            <option value={company}>
              {company.Name ? company.Name : ""}
							{company.App_Name ? ` - ${company.App_Name}` : ""}
							{company.App_ID ? ` - ${company.App_ID}` : ""}
            </option>
          {/each}
        </select>
      </div>
			<button class="btn btn-success btn-md print-button" on:click={print_flyer} disabled={is_cordova_app}
			>Print{is_cordova_app ? ' available in web only' : ''}</button>
    </div>
    <MarketingFlyer bind:root={MarketingFlyer_root}/>
  </div>
</div>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Marketing.page {
	.section-heading {
		font-weight: $lato-black;
		font-size: 24px;
		margin-top: 43px;
		margin-bottom: 40px;
	}
	.choose-company-wrapper {
		display: flex;
		.choose-company {
			width: 400px;
		}
		.print-button {
			margin-top: 35px;
			margin-left: 20px;
		}
	}
}
</style>
