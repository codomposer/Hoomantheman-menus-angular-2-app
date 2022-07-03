<script lang="ts">
import { ladda } from '@menus/ladda'
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
const { verify_phone_busy$, verify_signup_resend_count$ } = _
</script>

<div class="Signup_STEP_VERIFY_EMAIL">
  <div class="success-section">
    <div class="success-section-title">Verify your email</div>
    <div class="success-section-subtitle">
      We have sent you an email. Please click on the link that is provided in the
      email to continue. If you haven't received email then please click Resend Email.
    </div>
  </div>
	{#if $verify_signup_resend_count$ < 3}
    <div class="resend-code-btn-section">
      <button use:ladda={$verify_phone_busy$} class="btn btn-lg btn-success btn-inverse btn-block"
							on:click={_evt => _.continue_email_step(true)}
			>Resend Email</button>
    </div>
  {/if}
</div>

<style type="text/scss" global>
.Signup_STEP_VERIFY_EMAIL {
	.success-section {
		.success-section-subtitle {
			margin-bottom: 0;
		}
	}
}
</style>
