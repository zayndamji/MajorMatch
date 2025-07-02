import adapter from '@sveltejs/adapter-static';
import fs from 'fs';
import path from 'path';

const universitiesPath = path.resolve('./src/lib/data/universities.json');
const universities = JSON.parse(fs.readFileSync(universitiesPath, 'utf-8'));

const dynamicEntries = [];

for (const university of universities) {
  const univId = university.id;

  // Webpage routes
  dynamicEntries.push(`/universities/${univId}`);
  dynamicEntries.push(`/universities/${univId}/majors`);

  // API route
  dynamicEntries.push(`/api/${univId}/majors`);

  const majorsPath = path.resolve(`./src/lib/data/${univId}/majors.json`);
  if (fs.existsSync(majorsPath)) {
    const majors = JSON.parse(fs.readFileSync(majorsPath, 'utf-8'));
    for (const major of majors) {
      // Webpage route
      dynamicEntries.push(`/universities/${univId}/majors/${major.id}`);

      // Individual major routes
      dynamicEntries.push(`/api/${univId}/majors/${major.id}`);
    }
  }
}

export default {
  kit: {
    adapter: adapter({
      pages: 'output',
      assets: 'output',
      fallback: 'error.html',
      precompress: false,
      ssr: true
    }),
    prerender: {
      entries: [
        '/',
        '/universities',
        ...dynamicEntries
      ],
      handleHttpError: ({ status, path }) => {
        console.warn(`Prerender warning: ${status} at ${path} — falling back to error page`);
        return true;
      }
    }
  }
};
