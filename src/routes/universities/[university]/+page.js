export const prerender = true;

import universities from '$lib/data/universities.json';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const universityId = params.university;
  const university = universities.find(u => u.id === universityId);

  if (!university) {
    throw error(404, `University not found: ${universityId}`);
  }

  try {
    const majorData = await import(`$lib/data/${universityId}/majors.json`);

    // Normalize college property to always be an array
    const majors = majorData.default.map(major => {
      if (typeof major.college === 'string') {
        return { ...major, college: [major.college] };
      }
      return major;
    });

    return {
      university,
      majors
    };
  } catch (e) {
    // If majors.json is missing or error loading, return empty majors array
    return {
      university,
      majors: []
    };
  }
}
