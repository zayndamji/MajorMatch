export const prerender = true;

import fs from 'fs/promises';
import path from 'path';

export async function GET({ params }) {
  const { univId, majorId } = params;
  const dataDir = path.resolve('src/lib/data');
  const majorPath = path.join(dataDir, univId, `${majorId}.json`);

  try {
    const data = await fs.readFile(majorPath, 'utf-8');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Major details not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
