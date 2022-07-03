<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { PlatformIcon } from '@menus/platform-ui'
import { globalSettings$_b } from '@menus/ro-user'
import type { ro_terms_conditions_ui_Ctx } from '../ro_terms_conditions_ui_Ctx.js'
import { TermsConditions_c } from './TermsConditions_c.js'
const ctx = getContext_ui_ctx() as ro_terms_conditions_ui_Ctx
const globalSettings$ = globalSettings$_b(ctx)
export const _ = new TermsConditions_c(ctx)
const { agree_to_privacy_policy$ } = _
const busy$ = _.busy$
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if has_dom}
<div class="TermsConditions">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-title-section">
    <div class="main-title">Terms & Conditions</div>
  </div>
  <div class="main-contents">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="page-text">
          {@html $globalSettings$?.TOS || ''}
        </div>
        <CheckBox bind:value={$agree_to_privacy_policy$} text="I Accept the Privacy Policy"></CheckBox>
        <button use:ladda={$busy$}
								class="btn btn-lg btn-success btn-continue"
								disabled={!$agree_to_privacy_policy$}
								title={
                  $agree_to_privacy_policy$
                  ? 'Accept'
                  : 'You must agree to the Privacy Policy, Terms of Service, & to your Personal Information not being sold'
                }
								on:click={_.accept}
				>Continue</button>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.TermsConditions {
	padding-bottom: 100px;
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
	.btn-continue {
		margin-top: 52px;
		width: 100%;
		max-width: 360px;
	}
}
</style>
