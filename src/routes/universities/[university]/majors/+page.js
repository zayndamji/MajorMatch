export const prerender = false;

import universities from '$lib/data/universities.json';

import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const universityId = params.university;
  const university = universities.find(u => u.id === universityId);

  try {
    return { university: university };
  } catch (e) {
    // If import fails, throw 404 to fallback to catchall route
    throw error(404, `University not found: ${universityId}`);
  }
}