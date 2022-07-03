<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { code } = params
	return { code }
})
</script>

<script lang="ts">
import { VerifySignup } from '@menus/ro-verify-ui'
export let code
</script>

<VerifySignup {code}></VerifySignup>
