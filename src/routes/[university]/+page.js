export const prerender = false;

import universities from '$lib/data/universities.json';

import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const universityId = params.university;
  const university = universities.find(u => u.id === universityId);

  try {
    // Adjust path as per your project structure
    const majorData = await import(`$lib/data/${universityId}/majors.json`);
    return { majors: majorData.default, university: university };
  } catch (e) {
    // If import fails, throw 404 to fallback to catchall route
    throw error(404, `University or Major not found: ${universityId}, ${majorId}`);
  }
}