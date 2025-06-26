<script>
  import universities from '$lib/data/universities.json';
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container">
    <h1 class="title has-text-centered has-text-white">Universities</h1>

    <div class="is-flex is-flex-direction-column is-align-items-center mt-5">
      {#each universities as university (university.id)}
        <a
          class="box university-box has-text-white has-text-left mb-4 p-4"
          href={university.path}
        >
          <div class="media is-align-items-center">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src={university.imageUrl} alt={university.name} style="object-fit: contain;" />
              </figure>
            </div>
            <div class="media-content">
              <h2 class="title is-5 has-text-white">{university.name}</h2>
              <p class="is-size-7 has-text-grey-light">{university.description}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .university-box {
    width: 90%;
    background-color: #1a1a1a;
    border: 1px solid #333;
    transition: background-color 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
  }

  .university-box * {
    cursor: inherit;
  }

  .university-box:hover,
  .university-box:focus {
    background-color: #111;
  }
</style>
