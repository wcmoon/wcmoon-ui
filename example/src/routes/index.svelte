<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import Dialog from "$packages/wm-dialog/Dialog.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Dialog></Dialog>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}


</style>
