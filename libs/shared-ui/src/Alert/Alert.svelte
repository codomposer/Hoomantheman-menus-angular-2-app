<script lang="ts">
export let title:string, type:string, message = ''
function close() {
	message = ''
}
</script>

{#if message}
  <div class="alert alert-{ type }">
    <a href="." class="close" aria-label="close" on:click|preventDefault={close}>&times;</a>
    <strong>{ title }</strong> { message }
  </div>
{/if}
