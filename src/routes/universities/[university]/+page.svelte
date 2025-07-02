<script>
  export let data;
  const { university, majors } = data;

  let searchTerm = '';
  let selectedColleges = [];

  const allColleges = Array.from(
    new Set(majors.flatMap(major => major.college))
  ).sort();

  import { onMount } from 'svelte';
  onMount(() => {
    selectedColleges = [...allColleges];
  });

  $: selectedSet = new Set(selectedColleges);

  function toggleCollege(college) {
    if (selectedSet.has(college)) {
      selectedColleges = selectedColleges.filter(c => c !== college);
    } else {
      selectedColleges = [...selectedColleges, college];
    }
  }

  function selectAllColleges() {
    selectedColleges = [...allColleges];
  }

  function clearAllColleges() {
    selectedColleges = [];
  }

  $: filteredMajors = majors.filter(major => {
    const lowerName = major.name.toLowerCase();
    const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    const matchesSearch = terms.every(term => lowerName.includes(term));
    const matchesCollege = major.college.some(col => selectedSet.has(col));

    return matchesSearch && matchesCollege;
  });
</script>

<section class="section has-background-dark is-fullheight">
  <div class="container has-text-centered">
    <img src={university.imageUrl} alt={university.name + ' logo'} class="university-icon mb-2" />
    <h1 class="title has-text-white mb-5">{university.name}</h1>

    <div class="search-bar-container mb-2">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search majors..."
        class="search-input"
      />
    </div>

    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button
          class="search-input"
          style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 400px; cursor: default;"
          disabled
        >
          <span>Choose colleges ({selectedColleges.length} selected currently)</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <div class="dropdown-menu" role="menu" style="width: 100%; max-width: 400px;">
        <div
          class="dropdown-content p-3"
          style="
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            color: white;
          "
        >
          <div class="columns is-mobile is-gapless mb-3 is-centered">
            <div class="column is-half">
              <button
                class="button custom-white-button is-small is-rounded"
                on:click={selectAllColleges}
              >
                Select All
              </button>
            </div>

            <div class="column is-half">
              <button
                class="button custom-white-button is-small is-rounded"
                on:click={clearAllColleges}
              >
                Clear All
              </button>
            </div>
          </div>

          {#each allColleges as college}
            <label class="dropdown-item has-text-white">
              <input
                type="checkbox"
                checked={selectedSet.has(college)}
                on:change={() => toggleCollege(college)}
                style="margin-right: 0.5em;"
              />
              {college}
            </label>
          {/each}
        </div>
      </div>
    </div>

    <div class="is-flex is-flex-direction-column is-align-items-center mt-5">
      {#if majors.length === 0}
        <div class="box has-text-white p-5 mb-5"
             style="max-width: 600px; background-color: #2a2a2a; border: 1px solid #555; border-radius: 8px; text-align: center;">
          <p class="is-size-5 has-text-weight-semibold mb-2">
            This site is under construction.
          </p>
          
          <p>
            <strong style="color: white">{university.name}</strong> has not been added yet. Please check back later.
          </p>
        </div>
      {/if}

      {#each filteredMajors as major (major.id)}
        <a
          class="box major-box has-text-white has-text-left mb-4 p-4"
          href={`/universities/${university.id}/majors/${major.id}`}
        >
          <p class="has-text-weight-bold is-size-4 has-text-white">
            {major.name}
          </p>

          <p class="is-size-6 mb-1 has-text-white">
            {major.college.join(' · ')}
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

  .dropdown-item {
    padding: 0.5em;
    cursor: pointer;
  }

  .dropdown-item input[type='checkbox'] {
    vertical-align: middle;
    cursor: pointer;
  }

  .search-bar-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .search-input {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem 1rem;
    background-color: #1a1a1a;
    border: 1px solid #333;
    color: white;
    border-radius: 8px;
    font-size: 1rem;
  }

  .search-input::placeholder {
    color: #888;
  }

  .search-input:focus {
    outline: none;
    background-color: #111;
  }

  .search-input:disabled {
    cursor: default;
    opacity: 1;
  }

  .custom-white-button {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    transition: background-color 0.2s ease, color 0.2s ease;
    width: 95%;
  }

  .custom-white-button:hover {
    background-color: white;
    color: black;
  }
</style>