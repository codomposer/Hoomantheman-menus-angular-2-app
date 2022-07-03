<script lang="ts">
import { onMount } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { is_navigating_onclick_b } from '@menus/page'
import { PlatformIcon } from '@menus/platform-ui'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { VerifySignup_c } from './VerifySignup_c.js'
export let code = ''
const ctx = getContext_ui_ctx() as consumer_auth_ui_Ctx
const is_navigating_onclick = is_navigating_onclick_b(ctx)
export const _ = new VerifySignup_c(ctx)
const {
	busy$, in_code$, query_email$, signup_email$, signup_phone$, subtitle$, title$, verify_success$,
} = _
$: _.in_code$.$ = code
onMount(()=>_.onMount())
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
          <label for="code">Enter the Verification Code you received via SMS or check your email</label>
          <input class="form-control input-sm" type="text"
								 placeholder="Verification Code"
								 id="code"
								 bind:value={$in_code$}
								 on:keyup={evt => evt.key === 'Enter' && _.verify_signup()}
					>
          <div class="button-container">
            <button class="btn btn-sm btn-success"
										on:click={evt => _.verify_signup()}
						>Verify Code</button>
						{#if $query_email$ || $signup_phone$ || $signup_email$}
              <div>
                <a class="btn btn-sm"
									 href="."
									 on:click|preventDefault={evt => _.resend_code(evt)}
								>Resend Code</a>
              </div>
            {/if}
          </div>
        {/if}
				{#if $title$}
          <div class="success-section-title">{ $title$ }</div>
          <div class="success-section-subtitle">{ $subtitle$ }</div>
        {/if}
				<a class="btn btn-sm btn-success"
					 href="/login"
				>Log in</a>
      </div>
    {/if}
  </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.VerifySignup {
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
				margin-bottom: 12px;
			}
			input {
				margin-bottom: 12px;
			}
			.button-container {
				margin-bottom: 60px;
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
