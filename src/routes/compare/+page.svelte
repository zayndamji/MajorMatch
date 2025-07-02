<script>
  export let data;
  const { universities, universitiesWithMajors } = data;

  let leftUniversityId = '';
  let rightUniversityId = '';

  let leftUniversity = null;
  let rightUniversity = null;

  let leftMajors = [];
  let rightMajors = [];

  let leftMajorId = '';
  let rightMajorId = '';

  let leftMajorDetails = null;
  let rightMajorDetails = null;

  let leftMajorsLoading = false;
  let rightMajorsLoading = false;

  let leftMajorsAvailable = false;
  let rightMajorsAvailable = false;

  $: leftUniversity = universities.find(u => u.id === leftUniversityId) || null;
  $: rightUniversity = universities.find(u => u.id === rightUniversityId) || null;

  // Determine if university is supposed to have majors (from load)
  $: leftHasMajors = universitiesWithMajors.some(u => u.id === leftUniversityId);
  $: rightHasMajors = universitiesWithMajors.some(u => u.id === rightUniversityId);

  $: if (!leftUniversityId) {
    leftMajors = [];
    leftMajorId = '';
    leftMajorDetails = null;
    leftMajorsAvailable = false;
    leftMajorsLoading = false;
  }

  $: if (!rightUniversityId) {
    rightMajors = [];
    rightMajorId = '';
    rightMajorDetails = null;
    rightMajorsAvailable = false;
    rightMajorsLoading = false;
  }

  async function fetchMajors(univId, side) {
    if (!univId) return;

    if (side === 'left') {
      leftMajorsLoading = true;
      leftMajorsAvailable = false;
    } else {
      rightMajorsLoading = true;
      rightMajorsAvailable = false;
    }

    try {
      const res = await fetch(`/api/${univId}/majors.json`);
      if (!res.ok) throw new Error('No majors found');
      const majors = await res.json();

      if (side === 'left') {
        leftMajors = majors;
        leftMajorId = '';
        leftMajorDetails = null;
        leftMajorsAvailable = majors.length > 0;
        leftMajorsLoading = false;
      } else {
        rightMajors = majors;
        rightMajorId = '';
        rightMajorDetails = null;
        rightMajorsAvailable = majors.length > 0;
        rightMajorsLoading = false;
      }
    } catch {
      if (side === 'left') {
        leftMajors = [];
        leftMajorId = '';
        leftMajorDetails = null;
        leftMajorsAvailable = false;
        leftMajorsLoading = false;
      } else {
        rightMajors = [];
        rightMajorId = '';
        rightMajorDetails = null;
        rightMajorsAvailable = false;
        rightMajorsLoading = false;
      }
    }
  }

  // Trigger fetching majors when university changes and it is supposed to have majors
  $: {
    if (leftUniversityId && leftHasMajors) {
      fetchMajors(leftUniversityId, 'left');
    } else if (leftUniversityId && !leftHasMajors) {
      // No majors expected - clear majors and mark unavailable
      leftMajors = [];
      leftMajorsAvailable = false;
      leftMajorsLoading = false;
      leftMajorId = '';
      leftMajorDetails = null;
    }
  }

  $: {
    if (rightUniversityId && rightHasMajors) {
      fetchMajors(rightUniversityId, 'right');
    } else if (rightUniversityId && !rightHasMajors) {
      rightMajors = [];
      rightMajorsAvailable = false;
      rightMajorsLoading = false;
      rightMajorId = '';
      rightMajorDetails = null;
    }
  }

  async function fetchMajorDetails(univId, majorId, side) {
    if (!univId || !majorId) return;

    const res = await fetch(`/api/${univId}/${majorId}.json`);
    if (!res.ok) {
      if (side === 'left') leftMajorDetails = null;
      else rightMajorDetails = null;
      return;
    }

    const details = await res.json();
    if (side === 'left') leftMajorDetails = details;
    else rightMajorDetails = details;
  }

  $: if (leftMajorId && leftUniversityId) fetchMajorDetails(leftUniversityId, leftMajorId, 'left');
  $: if (rightMajorId && rightUniversityId) fetchMajorDetails(rightUniversityId, rightMajorId, 'right');
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container">
    <h1 class="title has-text-white has-text-centered">Compare Majors</h1>

    <div class="columns">
      <!-- Left Column: University & Major Select -->
      <div class="column is-half">
        <div class="field">
          <label class="label has-text-white">University</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select bind:value={leftUniversityId}>
                <option value="">Select university</option>
                {#each universities as u}
                  <option value={u.id}>{u.name}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label has-text-white">Major</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select
                bind:value={leftMajorId}
                disabled={!leftUniversityId || !leftHasMajors || leftMajors.length === 0}
              >
                <option value="">Select major</option>
                {#each leftMajors as m}
                  <option value={m.id}>{m.name}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        {#if leftUniversityId && !leftHasMajors}
          <div
            class="box construction-box has-text-white p-5 mt-3"
            style="border: 1px solid #555; border-radius: 8px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;"
          >
            <p class="is-size-5 has-text-weight-semibold mb-2">This site is under construction.</p>
            <p><strong>{leftUniversity?.name}</strong> has not been added yet. Please check back later.</p>
          </div>
        {/if}
      </div>

      <!-- Right Column: University & Major Select -->
      <div class="column is-half">
        <div class="field">
          <label class="label has-text-white">University</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select bind:value={rightUniversityId}>
                <option value="">Select university</option>
                {#each universities as u}
                  <option value={u.id}>{u.name}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label has-text-white">Major</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select
                bind:value={rightMajorId}
                disabled={!rightUniversityId || !rightHasMajors || rightMajors.length === 0}
              >
                <option value="">Select major</option>
                {#each rightMajors as m}
                  <option value={m.id}>{m.name}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        {#if rightUniversityId && !rightHasMajors}
          <div
            class="box construction-box has-text-white p-5 mt-3"
            style="border: 1px solid #555; border-radius: 8px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;"
          >
            <p class="is-size-5 has-text-weight-semibold mb-2">This site is under construction.</p>
            <p><strong>{rightUniversity?.name}</strong> has not been added yet. Please check back later.</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Program Header and Details -->

    <div class="columns">
      <div class="column is-half">
        {#if leftMajorDetails}
          <h2 class="title is-4 has-text-white mt-5">{leftMajorDetails.programName}</h2>
          <h3 class="subtitle has-text-grey-light mb-4">{leftUniversity?.name} &middot; {leftMajorDetails.degreeAwarded}</h3>
        {/if}
      </div>
      <div class="column is-half">
        {#if rightMajorDetails}
          <h2 class="title is-4 has-text-white mt-5">{rightMajorDetails.programName}</h2>
          <h3 class="subtitle has-text-grey-light mb-4">{rightUniversity?.name} &middot; {rightMajorDetails.degreeAwarded}</h3>
        {/if}
      </div>
    </div>

    <div class="columns">
      <div class="column is-half is-flex is-flex-direction-column">
        {#if leftMajorDetails}
          <div class="box major-box mb-5 stretch">
            <div class="content has-text-white">
              <p>{leftMajorDetails.fullProgramDescription}</p>
            </div>
          </div>
        {/if}
      </div>
      <div class="column is-half is-flex is-flex-direction-column">
        {#if rightMajorDetails}
          <div class="box major-box mb-5 stretch">
            <div class="content has-text-white">
              <p>{rightMajorDetails.fullProgramDescription}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="columns">
      <div class="column is-half is-flex is-flex-direction-column">
        {#if leftMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Program Details</h3>
            <ul class="has-text-white">
              <li><strong>Program Type:</strong> {leftMajorDetails.programType}</li>
              <li><strong>Degree Awarded:</strong> {leftMajorDetails.degreeAwarded}</li>
              <li><strong>Program Duration:</strong> {leftMajorDetails.programDuration}</li>
              <li><strong>Credit Requirements:</strong> {leftMajorDetails.creditRequirements}</li>
            </ul>
          </div>
        {/if}
      </div>
      <div class="column is-half is-flex is-flex-direction-column">
        {#if rightMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Program Details</h3>
            <ul class="has-text-white">
              <li><strong>Program Type:</strong> {rightMajorDetails.programType}</li>
              <li><strong>Degree Awarded:</strong> {rightMajorDetails.degreeAwarded}</li>
              <li><strong>Program Duration:</strong> {rightMajorDetails.programDuration}</li>
              <li><strong>Credit Requirements:</strong> {rightMajorDetails.creditRequirements}</li>
            </ul>
          </div>
        {/if}
      </div>
    </div>

    <!-- Major Highlights -->
    <div class="columns">
      <div class="column is-half is-flex is-flex-direction-column">
        {#if leftMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Major Highlights</h3>
            <ul class="has-text-white">
              {#each leftMajorDetails.classHighlights as item}
                <li class="mb-2">{item}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
      <div class="column is-half is-flex is-flex-direction-column">
        {#if rightMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Major Highlights</h3>
            <ul class="has-text-white">
              {#each rightMajorDetails.classHighlights as item}
                <li class="mb-2">{item}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>

    <!-- Learning Outcomes -->
    <div class="columns">
      <div class="column is-half is-flex is-flex-direction-column">
        {#if leftMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Learning Outcomes</h3>
            <ul class="has-text-white">
              {#each leftMajorDetails.learningOutcomes as outcome}
                <li>{outcome}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
      <div class="column is-half is-flex is-flex-direction-column">
        {#if rightMajorDetails}
          <div class="box major-box mb-5 stretch">
            <h3 class="title is-5 has-text-white">Learning Outcomes</h3>
            <ul class="has-text-white">
              {#each rightMajorDetails.learningOutcomes as outcome}
                <li>{outcome}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>

    <!-- Program Links -->
    <div class="columns">
      <div class="column is-half">
        {#if leftMajorDetails?.sources[0]}
          <a
            href={leftMajorDetails.sources[0]}
            target="_blank"
            rel="noopener noreferrer"
            class="box major-box has-text-weight-semibold title is-5 stretch"
          >
            Visit Official Program Page
          </a>
        {/if}
      </div>
      <div class="column is-half">
        {#if rightMajorDetails?.sources[0]}
          <a
            href={rightMajorDetails.sources[0]}
            target="_blank"
            rel="noopener noreferrer"
            class="box major-box has-text-weight-semibold title is-5 stretch"
          >
            Visit Official Program Page
          </a>
        {/if}
      </div>
    </div>
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

  .stretch {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  a {
    cursor: pointer !important;
    color: #6cb1ff;
  }

  strong {
    color: white;
  }

  select {
    background-color: #2a2a2a;
    color: #f0f0f0;
    border: 1px solid #444;
  }

  select option {
    background-color: #2a2a2a;
    color: #f0f0f0;
  }

  .construction-box {
    background-color: #2a2a2a;
    flex-grow: 1;
  }

  .columns {
    display: flex !important;
    flex-wrap: nowrap !important;
    flex-direction: row !important; /* force horizontal row on all screen sizes */
    overflow-x: hidden; /* optional: prevent horizontal scroll */
  }

  .column.is-half {
    flex: 0 0 50% !important;
    max-width: 50% !important;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
