export const prerender = true;

import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const majorId = params.major;
  const universityId = params.university;

  try {
    const majorData = await import(`$lib/data/${universityId}/${majorId}.json`);
    return { program: majorData.default };
  } catch (e) {
    // If import fails, throw 404 to fallback to catchall route
    throw error(404, `University or Major not found: ${universityId}, ${majorId}`);
  }
}
