<script>
  import { onMount, onDestroy } from 'svelte';
  import universities from '$lib/data/universities.json';

  let visibleCount = 0;

  let resizeHandler;

  onMount(() => {
    function updateVisibleCount() {
      const iconSize = 72 + 16 + 50;
      const containerPadding = 40;
      const width = window.innerWidth - containerPadding;
      visibleCount = Math.floor(width / iconSize);
      visibleCount = Math.max(1, visibleCount);
    }

    updateVisibleCount();

    resizeHandler = () => updateVisibleCount();
    window.addEventListener('resize', resizeHandler);
  });

  onDestroy(() => {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
  });

  $: remaining = universities.length - visibleCount;
</script>

<section class="section has-background-dark">
  <div class="container has-text-centered">
    <div class="university-box box py-4">
      <div
        class="university-list is-flex is-justify-content-center is-align-items-center"
        style="flex-wrap: nowrap; overflow-x: hidden;"
      >
        {#each universities.slice(0, visibleCount) as uni}
          <a 
            href={'/universities' + uni.path} 
            class="university-link mx-3 my-2"
            aria-label={uni.name}
            title={uni.name}
          >
            <img 
              src={uni.imageUrl} 
              alt={uni.name} 
              class="university-icon"
              loading="lazy"
            />
          </a>
        {/each}
      </div>

      {#if remaining > 0}
        <p class="has-text-grey-light">and {remaining} other{remaining === 1 ? '' : 's'}</p>
      {/if}
    </div>
  </div>
</section>

<style>
  .university-box {
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
  }

  .university-list {
    gap: 1.5rem;
    width: 100%;
    max-width: 100%;
  }

  .university-link {
    display: inline-block;
    width: 72px;
    height: 72px;
    border: 1px solid #333;
    border-radius: 12px;
    padding: 8px;
    background-color: #111;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .university-link:hover,
  .university-link:focus {
    background-color: #222;
    border-color: #4a90e2;
  }

  .university-icon {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }
</style>
