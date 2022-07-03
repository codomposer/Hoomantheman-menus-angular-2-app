<script lang="ts">
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
</script>

<div class="Signup_STEP_SENT_EMAIL">
	<div class="success-section">
		<div class="success-section-title">Success</div>
		<div class="success-section-subtitle">We received your request. We will get back to
			you in 24 hours.
		</div>
	</div>
	<div class="continue-btn-section">
		<button class="btn btn-lg btn-success btn-block"
						on:click={_.continue_sent_email_step}
		>Continue</button>
	</div>
</div>
