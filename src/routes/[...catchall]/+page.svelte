<script>
  import { page } from '$app/stores';
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container has-text-centered">
    <h1 class="title has-text-white">404 - Page Not Found</h1>
    <p class="subtitle has-text-grey-light">
      The page <strong class="has-text-white">{ $page.url.pathname }</strong> does not exist.
    </p>
    <a href="/" class="button is-outlined mt-4">Go Home</a>
  </div>
</section>

<style>
  :global(html), :global(body) {
    height: 100%;
    margin: 0;
    background-color: #363636; /* Bulma has-background-dark */
    color: white;
  }
</style>
