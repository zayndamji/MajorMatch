export const prerender = true;

import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const major = params.major;

  try {
    const data = await import(`$lib/data/stanford/${major}.json`);
    return {
      program: data.default
    };
  } catch (e) {
    console.error(`Major not found: ${major}`, e);
    throw error(404, `Program "${major}" not found.`);
  }
}
