<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import UniversityList from '$lib/components/UniversityList.svelte';

  let fullLine = 'Explore your academic future.';
  let typedLine = '';

  const paragraph = 'Major Match lets you browse top universities, discover their unique majors, and compare academic programs—all in one place.';
  let showParagraph = false;

  onMount(() => {
    let i = 0;
    const speedChar = 40;

    const interval1 = setInterval(() => {
      if (i < fullLine.length) {
        typedLine += fullLine[i];
        i++;
      } else {
        clearInterval(interval1);
        showParagraph = true;
      }
    }, speedChar);
  });
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

      {#if showParagraph}
        <p class="has-text-grey-light is-size-6" transition:fade={{ duration: 400 }}>
          {paragraph}
        </p>
      {/if}
    </div>

    <UniversityList />

    <div class="buttons are-large">
      <a class="box homepage-button p-4 has-text-white" href="/universities">
        Browse Universities
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
