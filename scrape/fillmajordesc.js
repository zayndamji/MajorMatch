// Fill in majors.json with "description" attribute from individual majors

import fs from 'fs';

function fill(universityId) {
  const majors = JSON.parse(fs.readFileSync(`../src/lib/data/${universityId}/majors.json`));

  for (let i = 0; i < majors.length; i++) {
    const majorInfo = JSON.parse(fs.readFileSync(`../src/lib/data/${universityId}/${majors[i].id}.json`));
    majors[i].description = majorInfo.fullProgramDescription;
  }

  fs.writeFileSync(`./test/${universityId}-new-data.json`, JSON.stringify(majors, undefined, 2));
}

fill('ucla');