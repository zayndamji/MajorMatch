import adapter from '@sveltejs/adapter-static';
import fs from 'fs';
import path from 'path';

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const file of fs.readdirSync(from)) {
    const srcFile = path.join(from, file);
    const destFile = path.join(to, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFolderSync(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

const srcDataDir = path.resolve('./src/lib/data');
const destDataDir = path.resolve('./static/data');
copyFolderSync(srcDataDir, destDataDir);

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
