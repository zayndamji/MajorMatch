<script>
  export let data;
  const { university } = data;
</script>

<svelte:head>
  <meta http-equiv="refresh" content={`0; URL=/universities/${university.id}`} />
</svelte:head>

<section class="section has-background-dark is-fullheight">
  <div class="container has-text-centered">
    <h1 class="title has-text-white">Redirecting...</h1>
    <p class="has-text-grey-light">
      You are being redirected to
      <a href={`/universities/${university.id}`} class="has-text-link">/universities/{university.id}</a>.
    </p>
  </div>
</section>

<style>
  a {
    text-decoration: underline;
  }
</style>
