<script context="module" lang="ts">
import { flat } from '@menus/array'
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ query }) {
	const email = flat(query.email)[0]
	const code = flat(query.code)[0]
	return { email, code }
})
</script>

<script lang="ts">
import { ResetPassword } from '@menus/ro-reset-password-ui'
export let email, code
</script>

<ResetPassword {email} {code}></ResetPassword>
