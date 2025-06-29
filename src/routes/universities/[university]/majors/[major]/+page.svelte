<script>
  export let data;
  const program = data.program;
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container">
    <h1 class="title has-text-white">{program.programName}</h1>
    <h2 class="subtitle has-text-grey-light mb-5">
      {program.collegeName} &middot; {program.degreeAwarded}
    </h2>

    <div class="box major-box mb-5">
      <div class="content has-text-white">
        <p>{program.fullProgramDescription}</p>
      </div>
    </div>

    <div class="box major-box mb-5">
      <h3 class="title is-5 has-text-white">Program Details</h3>
      <ul class="has-text-white">
        <li><strong>Program Type:</strong> {program.programType}</li>
        <li><strong>Degree Awarded:</strong> {program.degreeAwarded}</li>
        <li><strong>Program Duration:</strong> {program.programDuration}</li>
        <li><strong>Credit Requirements:</strong> {program.creditRequirements}</li>
      </ul>
    </div>

    <div class="box major-box mb-5">
      <h3 class="title is-5 has-text-white">Major Highlights</h3>
      <ul class="has-text-white">
        {#each program.classHighlights as highlight}
          <li class="mb-2">{highlight}</li>
        {/each}
      </ul>
    </div>

    <div class="box major-box mb-5">
      <h3 class="title is-5 has-text-white">Learning Outcomes</h3>
      <ul class="has-text-white">
        {#each program.learningOutcomes as outcome}
          <li>{outcome}</li>
        {/each}
      </ul>
    </div>

    {#if program.similarPrograms.length}
      <div class="box major-box mb-5">
        <h3 class="title is-5 has-text-white">Similar Programs</h3>
        <ul>
          {#each program.similarPrograms as sp}
            <li>
              <a href={sp.link} target="_blank" rel="noopener noreferrer">
                {sp.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="box major-box mb-5">
      <h3 class="title is-5 has-text-white">Additional Information</h3>
      <p class="has-text-white">{program.additionalInformation}</p>
    </div>

    <!-- <div class="box major-box mb-5">
      <h3 class="title is-5 has-text-white">Relevant Links</h3>
      <ul>
        {#each program.sources as src}
          <li>
            <a href={src} target="_blank" rel="noopener noreferrer">
              {src}
            </a>
          </li>
        {/each}
      </ul>
    </div> -->

    <a 
      href={program.sources[0]} 
      target="_blank" 
      rel="noopener noreferrer"
      class="box major-box has-text-weight-semibold title is-5"
    >
      Visit Official Program Page
    </a>
  </div>
</section>

<style>
  .major-box {
    background-color: #1a1a1a;
    border: 1px solid #333;
    transition: background-color 0.2s ease;
    cursor: default;
  }

  .major-box:hover,
  .major-box:focus {
    background-color: #111;
  }

  a {
    cursor: pointer !important;
    color: #6cb1ff;
  }

  strong {
    color: white;
  }
</style>
