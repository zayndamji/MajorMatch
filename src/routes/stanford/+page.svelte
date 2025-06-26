<script>
  import majors from '$lib/data/stanford/majors.json';
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container">
    <h1 class="title has-text-centered has-text-white">Stanford University</h1>

    <div class="is-flex is-flex-direction-column is-align-items-center mt-5">
      {#each majors as major (major.id)}
        <a
          class="box major-box has-text-white has-text-left mb-4 p-4"
          href={`/stanford/majors/${major.name}`}
        >
          <h2 class="title is-5 has-text-white">
            {major.longName} – {major.type}
          </h2>
          <p class="is-size-7 has-text-grey-light">
            {major.catalogDescription}
          </p>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .major-box {
    width: 90%;
    background-color: #1a1a1a;
    border: 1px solid #333;
    transition: background-color 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
  }

  .major-box * {
    cursor: inherit;
  }

  .major-box:hover,
  .major-box:focus {
    background-color: #111;
  }
</style>
