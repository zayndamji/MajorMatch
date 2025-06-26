<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import majors from '$lib/data/stanford/majors.json';

  const segments = derived(page, ($page) => {
    const parts = $page.url.pathname.split('/').filter(Boolean);

    // If homepage, no other segments, just highlight home
    if (parts.length === 0) {
      return [];
    }

    const breadcrumbs = [];

    for (let i = 0; i < parts.length; i++) {
      const href = '/' + parts.slice(0, i + 1).join('/');
      const raw = parts[i];
      let label = raw;

      // Handle specific routes
      if (i === 0 && raw === 'stanford') {
        label = 'stanford';
      } else if (i === 1 && parts[0] === 'stanford' && raw === 'majors') {
        label = 'majors';
      } else if (i === 2 && parts[0] === 'stanford' && parts[1] === 'majors') {
        const match = majors.find((m) => m.shortName === raw);
        label = match?.name || raw;
      }

      breadcrumbs.push({ label, href });
    }

    return breadcrumbs;
  });
</script>

<nav class="breadcrumb has-succeeds-separator mt-5" aria-label="breadcrumbs">
  <ul>
    {#if $segments.length === 0}
      <!-- On homepage: highlight home -->
      <li class="is-active">
        <a href="#" class="has-text-white" aria-current="page">home</a>
      </li>
    {:else}
      <!-- Not homepage -->
      <li>
        <a href="/" class="has-text-grey-light">home</a>
      </li>
      {#each $segments.slice(0, -1) as segment}
        <li>
          <a href={segment.href} class="has-text-grey-light">{segment.label}</a>
        </li>
      {/each}
      <li class="is-active">
        <a href="#" class="has-text-white" aria-current="page">
          {$segments[$segments.length - 1].label}
        </a>
      </li>
    {/if}
  </ul>
</nav>
