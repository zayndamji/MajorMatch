export const prerender = false;

import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const majorId = params.major;
  const universityId = params.university;

  try {
    // Adjust path as per your project structure
    const majorData = await import(`$lib/data/${universityId}/${majorId}.json`);
    return { program: majorData.default };
  } catch (e) {
    // If import fails, throw 404 to fallback to catchall route
    throw error(404, `University or Major not found: ${universityId}, ${majorId}`);
  }
}
