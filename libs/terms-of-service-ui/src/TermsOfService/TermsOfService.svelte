<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { platform_settings$_b } from '@menus/http'
import { SiteFooter } from '@menus/shared-ui'
import { PlatformIcon } from '@menus/platform-ui'
import type { terms_of_service_ui_Ctx } from '../terms_of_service_ui_Ctx.js'
const ctx = getContext_ui_ctx() as terms_of_service_ui_Ctx
const platform_settings$ = platform_settings$_b(ctx)
</script>

<div class="TermsOfService terms-of-service-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-title-section">
    <div class="main-title">Terms of Service</div>
  </div>
  <div class="main-contents">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="page-text">
          {@html $platform_settings$?.TermsOfUse || ''}
        </div>
      </div>
    </div>
  </div>
  <SiteFooter topBorder="true"></SiteFooter>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.TermsOfService {
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
		.page-text {
			margin: 77px 0 47px;
		}
	}
}
</style>
