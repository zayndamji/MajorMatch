<script>
  export let data;
  const { university } = data;
</script>

<svelte:head>
  <meta http-equiv="refresh" content={`0; URL=/${university.id}`} />
</svelte:head>

<section class="section has-background-dark is-fullheight">
  <div class="container has-text-centered">
    <h1 class="title has-text-white">Redirecting...</h1>
    <p class="has-text-grey-light">
      You are being redirected to
      <a href={`/${university.id}`} class="has-text-link">/{university.id}</a>.
    </p>
  </div>
</section>

<style>
  a {
    text-decoration: underline;
  }
</style>
