<script>
  export let data;
  const { university, majors } = data;
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container has-text-centered">
    <img src={university.imageUrl} alt={university.name + ' logo'} class="university-icon mb-2" />

    <h1 class="title has-text-white mb-4">{university.name}</h1>

    <div class="is-flex is-flex-direction-column is-align-items-center mt-5">
      {#each majors as major (major.id)}
        <a
          class="box major-box has-text-white has-text-left mb-4 p-4"
          href={`/universities/${university.id}/majors/${major.id}`}
        >
          <p class="has-text-weight-bold is-size-4 has-text-white">
            {major.name}
          </p>
          <p class="is-size-6 has-text-grey-light">
            {major.description}
          </p>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .university-icon {
    width: 80px;
    height: auto;
    display: inline-block;
  }

  .major-box {
    width: 100%;
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
