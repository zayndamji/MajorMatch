export const prerender = false;

export async function load({ fetch }) {
  const res = await fetch('/data/universities.json');
  const allUniversities = res.ok ? await res.json() : [];

  const universitiesWithMajors = [];

  await Promise.all(
    allUniversities.map(async (u) => {
      try {
        const majorsRes = await fetch(`/data/${u.id}/majors.json`);
        if (!majorsRes.ok) return;
        const majors = await majorsRes.json();
        if (Array.isArray(majors) && majors.length > 0) {
          universitiesWithMajors.push(u);
        }
      } catch {
        // ignore errors
      }
    })
  );

  return {
    universities: allUniversities,
    universitiesWithMajors
  };
}
