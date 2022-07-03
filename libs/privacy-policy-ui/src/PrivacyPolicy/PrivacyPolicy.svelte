<script lang="ts">
import { SiteFooter } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { PlatformIcon } from '@menus/platform-ui'
import { PrivacyPolicy$_b } from '@menus/platform-settings'
import type { privacy_policy_Ctx } from '../privacy_policy_Ctx.js'
const ctx = getContext_ui_ctx() as privacy_policy_Ctx
const PrivacyPolicy$ = PrivacyPolicy$_b(ctx)
</script>

<div class="PrivacyPolicy privacy-policy-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-title-section">
    <div class="main-title">Privacy Policy</div>
  </div>
  <div class="main-contents">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="page-text">
          {@html $PrivacyPolicy$ || ''}
        </div>
      </div>
    </div>
  </div>
  <SiteFooter topBorder="true"></SiteFooter>
</div>

<style type=text/scss>
@import "@menus/consumer-shared-css/variables";
.PrivacyPolicy {
	$navbar-height: 73px;
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
