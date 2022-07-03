<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { PlatformIcon } from '@menus/platform-ui'
import { VerifySignup_c } from './VerifySignup_c.js'
import type { ro_verify_ui_Ctx } from '../ro_verify_ui_Ctx.js'
export let code = ''
const ctx = getContext_ui_ctx() as ro_verify_ui_Ctx
export const _ = new VerifySignup_c(ctx)
const { busy$, in_code$, title$, subtitle$, verify_success$ } = _
$: _.in_code$.$ = code
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $busy$}
  <PageLoader center="page"></PageLoader>
{/if}
<div class="VerifySignup page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-section">
    {#if !$busy$}
      <div class="success-section">
        {#if $verify_success$}
          <div class="success-icon"></div>
        {:else}
          <label for="code">Enter the Verification Code you received in your email or text</label>
          <input class="form-control input-sm" type="text"
								 placeholder="Verification Code"
								 id="code"
								 bind:value={$in_code$}
					>
          <div class="button-container">
            <button class="btn btn-sm btn-success"
										on:click={evt => _.verify_signup()}
						>Verify Code</button>
            <a class="btn btn-sm"
							 href="/forgot-password"
						>Resend Code</a>
          </div>
        {/if}
				{#if $title$}
          <div class="success-section-title">{ $title$ }</div>
          <div class="success-section-subtitle">{ $subtitle$ }</div>
          <a class="btn btn-sm btn-success"
						 href="/backoffice/login"
					>Log in</a>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.VerifySignup {
	.header-logo-section {
		display: flex;
		height: $navbar-height;
	}
	.main-section {
		$side-padding: 24px;
		padding: 0 $side-padding;
		margin-top: 57px;
		background-color: white;
		border-radius: 3px;
		max-width: 360px + (2 * $side-padding);
		margin-left: auto;
		margin-right: auto;
		.success-section {
			text-align: center;
			label {
				color: $brand-success;
			}
			input {
				margin-bottom: 12px;
			}
			.button-container {
				margin-bottom: 12px;
			}
			.success-section-title {
				font-weight: $lato-black;
				font-size: 24px;
				margin-bottom: 12px;
			}
			.success-section-subtitle {
				font-size: 18px;
				margin-bottom: 66px;
			}
		}
	}
}
</style>
