import adapter from '@sveltejs/adapter-static';
import fs from 'fs';
import path from 'path';

const universitiesPath = path.resolve('./src/lib/data/universities.json');
const universities = JSON.parse(fs.readFileSync(universitiesPath, 'utf-8'));

const dynamicEntries = [];

for (const university of universities) {
  dynamicEntries.push(`/universities/${university.id}`);
  dynamicEntries.push(`/universities/${university.id}/majors`);

  const majorsPath = path.resolve(`./src/lib/data/${university.id}/majors.json`);
  if (fs.existsSync(majorsPath)) {
    const majors = JSON.parse(fs.readFileSync(majorsPath, 'utf-8'));
    for (const major of majors) {
      dynamicEntries.push(`/universities/${university.id}/majors/${major.id}`);
    }
  }
}

export default {
  kit: {
    adapter: adapter({
      pages: 'output',
      assets: 'output',
      fallback: 'index.html',
      precompress: false
    }),
    prerender: {
      entries: [
        '/',
        '/universities',
        ...dynamicEntries
      ],
      handleHttpError: ({ status, path }) => {
        console.warn(`Prerender warning: ${status} at ${path} — falling back to error page`);

        // Return true to suppress the error and use fallback instead of failing build
        return true;
      }
    }
  }
};
