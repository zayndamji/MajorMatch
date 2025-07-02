import fs from 'fs/promises';
import path from 'path';

export async function load() {
  // Root data directory
  const dataDir = path.resolve('src/lib/data');

  // Load universities.json
  const universitiesRaw = await fs.readFile(path.join(dataDir, 'universities.json'), 'utf-8');
  const universities = JSON.parse(universitiesRaw);

  // Check which universities have majors.json
  const universitiesWithMajors = [];

  for (const univ of universities) {
    try {
      const majorsPath = path.join(dataDir, univ.id, 'majors.json');
      await fs.access(majorsPath);
      universitiesWithMajors.push(univ);
    } catch {
      // majors.json doesn't exist for this university, skip
    }
  }

  return {
    universities,
    universitiesWithMajors,
  };
}
