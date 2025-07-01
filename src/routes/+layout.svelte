<script>
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<!-- Conditionally show breadcrumb if not home page -->
{#if data.pageTitle !== 'Major Match'}
	<section class="section has-background-dark py-2">
		<div class="container">
			<Breadcrumb />
		</div>
	</section>
{/if}

<div style="min-height: 100vh; background-color: #363636;">
	<slot />
</div>
