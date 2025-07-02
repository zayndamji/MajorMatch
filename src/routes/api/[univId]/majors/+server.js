import fs from 'fs/promises';
import path from 'path';

export async function GET({ params }) {
  const { univId } = params;
  const dataDir = path.resolve('src/lib/data');
  const majorsPath = path.join(dataDir, univId, 'majors.json');

  try {
    const data = await fs.readFile(majorsPath, 'utf-8');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Majors not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
