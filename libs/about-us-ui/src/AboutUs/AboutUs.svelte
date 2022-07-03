<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { SiteFooter } from '@menus/shared-ui'
import { About_Text$_b } from '@menus/platform-settings'
import { PlatformIcon } from '@menus/platform-ui'
import type { about_us_ui_Ctx } from '../about_us_ui_Ctx'
const ctx = getContext_ui_ctx() as about_us_ui_Ctx
const About_Text$ = About_Text$_b(ctx)
</script>

<div class="AboutUs about-us-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-title-section">
    <div class="main-title">About us</div>
  </div>
  <div class="main-contents">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="page-text">
          {@html $About_Text$ || ''}
        </div>
      </div>
    </div>
  </div>
  <SiteFooter topBorder="true"></SiteFooter>
</div>

<style type=text/scss>
@import "@menus/consumer-shared-css/variables";
.AboutUs {
	$main-title-section-height: 182px;
	$site-footer-height: 293px;
	.main-title-section {
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		background-image: vurl('/assets/img/ro/kitchen.png');
		background-size: cover;
		background-repeat: no-repeat;
		@media (min-width: 1440px) {
			background-image: vurl('/assets/img/ro/kitchen@2x.png');
		}
		.main-title {
			padding: 64px 0 73px;
			font-weight: $lato-black;
			font-size: 32px;
			color: white;
		}
	}
	.main-contents {
		min-height: calc(100vh - #{$navbar-height} - #{$main-title-section-height} - #{$site-footer-height});
		padding: 0 24px;
		.page-text {
			margin: 77px 0 47px;
		}
	}
}
</style>
