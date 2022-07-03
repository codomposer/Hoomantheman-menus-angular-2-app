<script lang="ts">
import _404 from './_404.svelte'
import _500 from './_500.svelte'
export let status, error
const dev = process.env.NODE_ENV === 'development'
const components = {
	404: _404,
	500: _500,
}
let component
$: component = components[status]
$: console.error('_error.svelte', {
	status,
	error,
}, error.stack)
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

{#if component}
	<svelte:component this={component}></svelte:component>
{:else}
	<h1>{status}</h1>
	<p>{error.message}</p>
	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
{/if}

<style>
	h1, p {
		margin: 0 auto;
	}
	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}
	p {
		margin: 1em auto;
	}
	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
