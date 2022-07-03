<script lang="ts">
export let id:string = null
</script>

<div {id} class="Row row {$$props.class||''}"><slot/></div>

<style type=text/scss global>
.Row.row {
	margin-left: 0;
	margin-right: 0;
}
</style>
