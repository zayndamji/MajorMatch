<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import universities from '$lib/data/universities.json';

  const segments = derived(page, ($page) => {
    const parts = $page.url.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always include Home
    breadcrumbs.push({ label: 'Home', href: '/' });

    if (parts.length === 0) return breadcrumbs;

    // Handle /compare route
    if (parts[0] === 'compare') {
      breadcrumbs.push({
        label: 'Compare Majors',
        href: '/compare'
      });
      return breadcrumbs;
    }

    if (parts[0] === 'universities') {
      breadcrumbs.push({ label: 'Universities', href: '/universities' });

      const universityId = parts[1];
      const university = universities.find(u => u.id === universityId);

      if (university) {
        breadcrumbs.push({
          label: university.name,
          href: `/universities/${universityId}`
        });
      }

      // Check if it's a major path: /universities/{id}/majors/{majorId}
      if (parts[2] === 'majors' && parts[3]) {
        try {
          const module = import.meta.glob('$lib/data/*/majors.json', { eager: true });
          const key = Object.keys(module).find(path =>
            path.includes(`/${universityId}/majors.json`)
          );
          const majors = key ? module[key].default : [];

          const major = majors.find(m => m.id === parts[3]);
          const label = major?.name || parts[3];

          breadcrumbs.push({
            label,
            href: `/universities/${universityId}/majors/${parts[3]}`
          });
        } catch (e) {
          breadcrumbs.push({
            label: parts[3],
            href: `/universities/${universityId}/majors/${parts[3]}`
          });
        }
      }
    }

    return breadcrumbs;
  });
</script>

<nav class="breadcrumb has-succeeds-separator mt-5" aria-label="breadcrumbs">
  <ul>
    {#if $segments.length > 1}
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
    {:else}
      <li class="is-active">
        <a href="/" class="has-text-white" aria-current="page">Home</a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav.breadcrumb ul {
    flex-wrap: wrap;
    white-space: normal;
  }

  nav.breadcrumb li {
    max-width: 100%;
    word-break: break-word;
  }

  nav.breadcrumb a {
    white-space: normal;
  }
</style>
