<script context="module" lang="ts">
import { preload_ } from '@menus/app'
import { flat } from '@menus/array'
export const preload = preload_(async function ({ query }) {
	const plan = flat(query.plan || '')[0]
	const fireFlyID = flat(query.fireFlyID)[0]
	const email = flat(query.email || '')[0]
	const token = flat(query.token || '')[0]
	return { plan, fireFlyID, email, token }
})
</script>

<script lang="ts">
import { Signup } from '@menus/ro-signup-ui'
export let plan:number, fireFlyID:string, email:string, token:string
</script>
<Signup {plan} {fireFlyID} {email} {token}></Signup>
