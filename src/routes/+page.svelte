<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import UniversityList from '$lib/components/UniversityList.svelte';

  let fullLine = 'Explore your academic future.';
  let typedLine = '';

  const lines = [
    'Browse top universities',
    'Discover unique majors',
    'Compare academic programs',
    'Utilize AI summarizations and comparisons',
    'All in one location'
  ];
  let visibleLines = [];

  onMount(() => {
    let i = 0;
    const speedChar = 40;

    const typeInterval = setInterval(() => {
      if (i < fullLine.length) {
        typedLine += fullLine[i];
        i++;
      } else {
        clearInterval(typeInterval);
        revealLines();
      }
    }, speedChar);
  });

  function revealLines() {
    let index = 0;
    const delay = 500;

    const lineInterval = setInterval(() => {
      visibleLines = [...visibleLines, lines[index]];
      index++;
      if (index >= lines.length) {
        clearInterval(lineInterval);
      }
    }, delay);
  }
</script>

<section class="section has-background-dark is-fullheight">
  <div
    class="container has-text-centered is-flex is-flex-direction-column is-justify-content-center is-align-items-center px-4"
    style="min-height: 80vh;"
  >
    <h1 class="title is-size-1 has-text-white mb-3">
      Major Match
    </h1>

    <div class="underline-accent"></div>

    <div class="text-content" style="max-width: 600px;">
      <p class="has-text-white is-size-5 mb-3" style="min-height: 1.5em;">{typedLine}</p>

      {#each visibleLines as line (line)}
        <p class="has-text-grey-light is-size-6" transition:fade={{ duration: 400 }}>
          {#if line === 'All in one location'}
            <span class="has-text-weight-bold">{line}</span>
          {:else}
            {line}
          {/if}
        </p>
      {/each}
    </div>

    <UniversityList />

    <div class="buttons are-large">
      <a class="box homepage-button p-4 has-text-white" href="/universities">
        Browse Universities
      </a>
    </div>
    <div class="buttons are-large">
      <a class="box homepage-button p-4 has-text-white" href="/compare">
        Compare Majors
      </a>
    </div>
  </div>
</section>

<style>
  .underline-accent {
    width: 200px;
    height: 4px;
    background: linear-gradient(to right, #4a90e2, #a960ee);
    border-radius: 2px;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .homepage-button {
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s ease;
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .homepage-button:hover,
  .homepage-button:focus {
    background-color: #111;
  }

  .text-content {
    text-align: center;
  }
</style>
