<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import universities from '$lib/data/universities.json';

  const segments = derived(page, ($page) => {
    const parts = $page.url.pathname.split('/').filter(Boolean);

    if (parts.length === 0) return [];

    const breadcrumbs = [];
    const universityId = parts[0];
    const university = universities.find(u => u.id === universityId);

    for (let i = 0; i < parts.length; i++) {
      const href = '/' + parts.slice(0, i + 1).join('/');
      const raw = parts[i];
      let label = raw;

      if (i === 0 && university) {
        label = university.name;
      } else if (i === 1 && raw === 'majors') {
        label = 'majors';
      } else if (i === 2 && parts[1] === 'majors') {
        // Dynamically import majors for this university
        try {
          const module = import.meta.glob('$lib/data/*/majors.json', { eager: true });
          const key = Object.keys(module).find(path => path.includes(`/${universityId}/majors.json`));
          const majors = key ? module[key].default : [];

          const major = majors.find(m => m.shortName === raw);
          label = major?.name || raw;
        } catch (e) {
          label = raw;
        }
      }

      breadcrumbs.push({ label, href });
    }

    return breadcrumbs;
  });
</script>

<nav class="breadcrumb has-succeeds-separator mt-5" aria-label="breadcrumbs">
  <ul>
    {#if $segments.length === 0}
      <li class="is-active">
        <a href="#" class="has-text-white" aria-current="page">home</a>
      </li>
    {:else}
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
