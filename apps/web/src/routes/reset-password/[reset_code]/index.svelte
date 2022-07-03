<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
  const { reset_code } = params
	return { reset_code }
})
</script>

<script lang="ts">
import { ResetPassword } from '@menus/consumer-auth-ui'
export let reset_code
</script>

<ResetPassword {reset_code}></ResetPassword>
