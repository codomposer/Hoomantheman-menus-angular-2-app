<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ query }) {
	const { returnUrl } = query
	return { returnUrl }
})
</script>

<script lang="ts">
import { Login } from '@menus/consumer-auth-ui'
export let returnUrl
</script>

<Login {returnUrl}></Login>
