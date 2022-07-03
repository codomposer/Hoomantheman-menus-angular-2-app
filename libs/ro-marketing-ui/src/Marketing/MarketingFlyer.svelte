<script lang="ts">
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import { QRCodeViewer } from '@menus/qrcode-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_marketing_ui_Ctx } from '../ro_marketing_ui_Ctx.js'
import MarketingFlyerCircleImageSVG from './MarketingFlyerCircleImageSVG.svelte'
import MarketingFlyerDownloadImageSVG from './MarketingFlyerDownloadImageSVG.svelte'
const ctx = getContext_ui_ctx() as ro_marketing_ui_Ctx
const manage_platform_settings$ = manage_platform_settings$_b(ctx)
export let root:HTMLDivElement
</script>

{#if $manage_platform_settings$}
  <div bind:this={root} class="MarketingFlyer flyer-print-area-wrapper">
    <svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xmlns:xhtml="http://www.w3.org/1999/xhtml"
			x="0px"
			y="0px"
			viewBox="0 0 792 612"
			style="enable-background:new 0 0 792 612;"
			xml:space="preserve"
		>
      <rect class="st0" width="792" height="612"/>
      <rect y="324.29" class="st1" width="792" height="287.71"/>
      <g>
        <MarketingFlyerCircleImageSVG/>
        <g>
          <circle class="st2" cx="540.08" cy="291.21" r="193.36"/>
          <circle class="st3" cx="540.08" cy="291.21" r="193.36"/>
        </g>
      </g>
      <circle class="st4" cx="539.63" cy="291.23" r="164.64"/>
      <path
				class="st2"
				d="M792,371.58v110.26l-68.67-36.24c-23.87-12.6-32.97-42.08-20.31-65.85c8.77-16.49,25.73-25.9,43.26-25.9
        c7.73,0,15.57,1.83,22.87,5.68L792,371.58z"
			/>
      <line class="st5" x1="792" y1="521.92" x2="792" y2="403.52"/>
<!--			<g transform="translate(0, 12)">-->
<!--				<text class="st6 st7 st8" width="100%" height="120" style="padding: 0 16px;">-->
<!--					{$manage_platform_settings$?.Flyer_Title?.split(" ")?.[0]}-->
<!--				</text>-->
<!--				<g transform="translate(0, 20)">-->
<!--					<text class="st2 st7 st8" x="0" y="12" width="100%" height="120" style="padding: 0 16px;">-->
<!--						{$manage_platform_settings$?.Flyer_Title?.substr($manage_platform_settings$?.Flyer_Title?.split(" ")?.[0]?.length)}-->
<!--					</text>-->
<!--				</g>-->
<!--			</g>-->
      <foreignObject x="0" y="12" width="100%" height="120" style="padding: 0 16px;">
        <xhtml:span class="st6 st7 st8">{$manage_platform_settings$?.Flyer_Title?.split(" ")?.[0]}</xhtml:span>
        <xhtml:span class="st2 st7 st8">{
					$manage_platform_settings$?.Flyer_Title?.substr($manage_platform_settings$?.Flyer_Title?.split(" ")?.[0]?.length)
				}</xhtml:span>
      </foreignObject>
      <foreignObject
				x="0"
				y="401"
				width="375"
				height="35"
				style="text-align: center;"
			>
        <xhtml:span
					class="st2 st10 st11"
					style="font-size: 21px;">{$manage_platform_settings$?.Flyer_SubTitle}</xhtml:span>
			</foreignObject>
      <foreignObject
				x="0"
				y="486"
				width="240"
				height="20"
				style="text-align: center;"
			>
        <xhtml:span class="st0 st10 st12 app-subdomain">{$manage_platform_settings$?.Subdomain}</xhtml:span>
      </foreignObject>
      <foreignObject
				x="241"
				y="482"
				width="210"
				height="30"
				style="text-align: center;"
			>
        <xhtml:span class="st0 st10 st12">{$manage_platform_settings$?.App_Name}</xhtml:span>
      </foreignObject>
      <g>
        <defs>
          <circle id="SVGID_1_" cx="539.63" cy="291.23" r="160.29"/>
        </defs>
        <clipPath id="SVGID_2_">
          <use xlink:href="#SVGID_1_" style="overflow:visible;"/>
        </clipPath>
        <g style="clip-path:url(#SVGID_2_);">
          <image
						style="overflow:visible;"
						width="1398"
						height="1278"
						xlink:href={$manage_platform_settings$?.App_Flyer}
						transform="matrix(0.2509 0 0 0.2509 364.7189 130.9098)"
					/>
        </g>
      </g>
      <path
				class="st0"
				d="M248.08,440.29h-122.7c-0.53,0-0.96-0.43-0.96-0.96l0,0c0-0.53,0.43-0.96,0.96-0.96h122.7
        c0.53,0,0.96,0.43,0.96,0.96l0,0C249.04,439.85,248.61,440.29,248.08,440.29z"
			/>
      <text transform="matrix(1 0 0 1 71.0715 478.2689)" class="st2 st13 st14"
			>Visit us online:</text>
      <text transform="matrix(1 0 0 1 289.7144 478.2693)" class="st2 st13 st14"
			>Download our app:</text>
      <rect x="239.29" y="475.21" class="st0" width="1.07" height="24.64"/>
      <MarketingFlyerDownloadImageSVG/>
      <g>
        <rect x="77.63" y="515.38" class="st2" width="82.32" height="78.42"/>
        <QRCodeViewer
					dynamic={true}
					text={$manage_platform_settings$?.Subdomain}
					let:QRImage
				>
          <image
						style="overflow:visible;"
						width="1024"
						height="1024"
						xlink:href={QRImage}
						transform="matrix(0.0824 0 0 0.0824 76.5972 512.3929)"
					/>
        </QRCodeViewer>
      </g>
      <rect y="324.28" class="st1" width="117.5" height="63.44"/>
      <g>
        <g>
          <polygon
						class="st15"
						points="608.49,550.11 608.49,561.05 629.16,561.05 629.16,570.95 608.49,570.95 608.49,582.93
                632.63,582.93 632.63,593.52 595.82,593.52 595.82,539.35 632.63,539.35 632.63,550.11 		"
					/>
        </g>
        <g>
          <polygon
						class="st15"
						points="688.2,539.35 688.2,593.52 677.95,593.52 653.12,562.96 653.12,593.52 640.45,593.52 640.45,539.35
                650.52,539.35 675.35,571.12 675.35,539.35 		"
					/>
        </g>
        <g>
          <path
						class="st15"
						d="M744.29,539.35v27.26c0,3.65-0.52,7.29-1.39,10.77c-1.04,3.65-2.6,6.42-4.34,8.51
                c-2.08,2.26-4.51,4.17-7.64,5.56c-3.13,1.39-6.6,2.08-10.94,2.08c-4.51,0-8.16-0.69-11.11-2.26c-2.95-1.22-5.38-3.3-7.47-5.73
                c-1.91-2.26-3.3-5.04-4.17-8.51c-0.87-3.65-1.39-7.12-1.39-10.42v-27.26h12.68v27.26c0,1.91,0.17,3.82,0.52,5.73
                c0.35,2.08,1.04,3.65,1.91,4.86c0.87,1.56,2.08,2.78,3.47,3.47c1.39,1.04,3.13,1.56,5.38,1.56c2.26,0,3.99-0.52,5.38-1.39
                c1.56-0.87,2.78-2.26,3.65-3.82c1.04-1.74,1.56-3.47,1.91-4.86c0.35-1.74,0.52-3.65,0.52-5.73v-27.09H744.29z"
					/>
        </g>
        <g>
          <g>
            <polygon
							class="st16"
							points="554.51,556.34 554.51,556.34 533.85,571.27 533.85,541.06 554.8,556.12 			"
						/>
          </g>
        </g>
        <g>
          <g>
            <polygon
							class="st16"
							points="587.13,561.68 587.13,591.9 566.11,576.79 			"
						/>
          </g>
        </g>
        <g>
          <path
						class="st17"
						d="M587.83,546.88c0,3.99-1.74,7.99-5.21,10.59l-47.58,35.94c-1.74-2.6-2.43-5.9-2.08-9.03
                c0.52-3.47,2.26-6.6,5.04-8.68l47.58-36.12C587.14,541.85,587.83,544.28,587.83,546.88z"
					/>
        </g>
      </g>
			<style>
				.app-subdomain {
					font-size: 16px;
				}
				.st0 {
					fill: #65bb47;
					color: #65bb47 !important;
				}
				.st1 {
					fill: #232325;
				}
				.st2 {
					fill: #ffffff;
					color: #ffffff !important;
				}
				.st3 {
					fill: none;
					stroke: #f46e43;
					stroke-width: 4;
					stroke-miterlimit: 10;
				}
				.st4 {
					fill: #f46e43;
				}
				.st5 {
					fill: none;
				}
				.st6 {
					fill: #231f20;
					color: #231f20 !important;
				}
				.st7 {
					font-family: "Roboto";
					font-weight: 900;
				}
				.st8 {
					font-size: 46px;
				}
				.st9 {
					font-size: 40px;
				}
				.st10 {
					font-family: "Roboto";
					font-weight: 700;
				}
				.st11 {
					font-size: 26px;
				}
				.st12 {
					font-size: 19px;
				}
				.st13 {
					font-family: "Roboto";
					font-weight: 400;
				}
				.st14 {
					font-size: 14px;
				}
				.st15 {
					fill-rule: evenodd;
					clip-rule: evenodd;
					fill: #f46e43;
				}
				.st16 {
					fill: #f46e43;
					stroke: #f46e43;
					stroke-miterlimit: 10;
				}
				.st17 {
					fill: #f46e43;
					stroke: #f46e43;
					stroke-width: 0.25;
					stroke-miterlimit: 10;
				}
			</style>
    </svg>
    <div class="mobile-phone-frame">
      <img
				src={$manage_platform_settings$?.App_Flyer_Mobile}
				alt="flyer mobile frame"
			/>
    </div>
  </div>
{/if}

<style type="text/scss" global>
  .MarketingFlyer {
		width: 1020px;
		position: relative;
		-webkit-print-color-adjust: exact;
		.mobile-phone-frame {
			width: 155px;
			border-radius: 20px;
			display: inline-block;
			background: #1f1f1f;
			overflow: hidden;
			border: 8px solid #1f1f1f;
			position: absolute;
			left: 130px;
			top: 194px;
			img {
				max-width: 100%;
			}
		}
	}
	@media print {
		body * {
			visibility: hidden;
		}
		.MarketingFlyer, .MarketingFlyer * {
			visibility: visible;
		}
		.MarketingFlyer {
			position: absolute;
			left: 0;
			top: 0;
			padding-left: 30px;
			padding-top: 20px;
		}
		@page {
			margin: 0;
		}
	}
</style>
