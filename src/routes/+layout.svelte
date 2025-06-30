<script>
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import universities from '$lib/data/universities.json';

  let currentPath;
  let unsubscribe;

  // Default title for SSR or before hydration
  let pageTitle = 'Major Match';

  // Update title reactively in SSR for first render
  $: {
    if (!browser) {
      // Basic sync logic for SSR (won't load majors.json dynamically)
      const segments = currentPath?.split('/').filter(Boolean) ?? [];
      const universityId = segments[1] ?? null;
      const majorId = segments[3] ?? null;

      if (currentPath === '/') {
        pageTitle = 'Major Match';
      } else if (currentPath === '/universities') {
        pageTitle = 'Major Match – All Universities';
      } else if (segments.length === 2 && universityId) {
        const uni = universities.find(u => u.id === universityId);
        pageTitle = uni ? `Major Match – ${uni.name}` : 'Major Match';
      } else {
        pageTitle = 'Major Match';
      }
    }
  }

  if (browser) {
    onMount(() => {
      unsubscribe = page.subscribe(async ($page) => {
        currentPath = $page.url.pathname;
        const segments = currentPath.split('/').filter(Boolean);
        const universityId = segments[1] ?? null;
        const majorId = segments[3] ?? null;

        let title = 'Major Match';

        if (currentPath === '/') {
          title = 'Major Match';
        } else if (currentPath === '/universities') {
          title = 'Major Match – All Universities';
        } else if (segments.length === 2 && universityId) {
          const university = universities.find(u => u.id === universityId);
          if (university) {
            title = `Major Match – ${university.name}`;
          }
        } else if (segments.length === 4 && universityId && majorId) {
          const university = universities.find(u => u.id === universityId);
          if (university) {
            try {
              const majorsModule = await import(`$lib/data/${universityId}/majors.json`);
              const major = majorsModule.default.find(m => m.id === majorId);
              if (major) {
                title = `Major Match – ${major.name} at ${university.name}`;
              } else {
                title = `Major Match – ${university.name}`;
              }
            } catch (e) {
              console.error('Failed to load major data:', e);
              title = `Major Match – ${university.name}`;
            }
          }
        }

        pageTitle = title;
        document.title = title;
      });

      return () => {
        unsubscribe && unsubscribe();
      };
    });
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

{#if currentPath !== '/'}
  <section class="section has-background-dark py-2">
    <div class="container">
      <Breadcrumb />
    </div>
  </section>
{/if}

<slot />
