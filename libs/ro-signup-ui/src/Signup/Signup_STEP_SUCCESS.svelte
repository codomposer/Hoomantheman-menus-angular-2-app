<script lang="ts">
import type { Signup_c } from './Signup_c.js'
export let _:Signup_c
</script>

<div class="Signup_STEP_SUCCESS">
	<div class="success-section">
		<div class="success-icon"></div>
		<div class="success-section-title">Success!</div>
		<div class="success-section-subtitle">Let's continue to your dashboard.</div>
	</div>
	<div class="continue-btn-section">
		<button class="btn btn-lg btn-success btn-block"
						on:click|preventDefault={_.continue_success_step}
		>Continue</button>
	</div>
</div>
