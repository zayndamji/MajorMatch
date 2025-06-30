<script>
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { page } from '$app/stores';
  
  // Auto-subscribe to the page store
  $: currentPath = $page.url.pathname;
</script>

{#if currentPath !== '/'}
  <section class="section has-background-dark py-2">
    <div class="container">
      <Breadcrumb />
    </div>
  </section>
{/if}

<slot />
