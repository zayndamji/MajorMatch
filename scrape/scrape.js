import {AI} from './ai.js';
import fs from 'fs'

const schema = fs.readFileSync('schema');
const example = fs.readFileSync('example.json');

async function scrapeProgram(collegeName, programName, programLink, outputFile) {
  if (fs.existsSync(outputFile)) return;

  const content = await AI(
    `Format ${collegeName}'s ${programName} program (${programLink}) using this schema:
    ${schema}

    Here is an example output:
    ${example}

    Only give me the JSON formatted output.
    Do not write \`\`\` before or after the code.
    Do not write anything additional than what is asked for in the schema.
    Do not include any specific Capstone/Honors/Subplan/etc program in these requirements.`
  );

  console.log(content);

  fs.writeFileSync(outputFile, JSON.stringify(JSON.parse(content.replaceAll('`', '')), undefined, 2));
}

// Stanford
async function stanford() {
  const stanfordMajors = JSON.parse(fs.readFileSync('../src/lib/data/stanford/majors.json'));
  for (const major of stanfordMajors) {
    await scrapeProgram('Stanford University', major.name, `https://bulletin.stanford.edu/programs/${major.id}`, `../src/lib/data/stanford/${major.id}.json`);
  }
}

// UC Berkeley
async function ucb() {
  const ucbMajors = JSON.parse(fs.readFileSync('../src/lib/data/ucb/majors.json'));
  for (const major of ucbMajors) {
    await scrapeProgram('University of California, Berkeley', major.name, `https://guide.berkeley.edu/undergraduate/degree-programs/${major.id}`, `../src/lib/data/ucb/${major.id}.json`);
  }
}

// MIT
async function mit() {
  const mitMajors = JSON.parse(fs.readFileSync('../src/lib/data/mit/majors.json'));
  for (const major of mitMajors) {
    await scrapeProgram('Massachusetts Institute of Technology', major.name, `https://catalog.mit.edu/degree-charts/${major.id}`, `../src/lib/data/mit/${major.id}.json`);
  }
}

// UC San Diego
async function ucsd() {
  const ucsdMajors = JSON.parse(fs.readFileSync('../src/lib/data/ucsd/majors.json'));
  for (const major of ucsdMajors) {
    await scrapeProgram('University of California, San Diego', major.name + `(department: ${major.college})`, `use the official catalog: https://catalog.ucsd.edu/`, `../src/lib/data/ucsd/${major.id}.json`);
  }
}

async function ucsdFilterLinksFirstPass() {
  const ucsdMajors = JSON.parse(fs.readFileSync('../src/lib/data/ucsd/majors.json'));
  for (const major of ucsdMajors) {
    const content = await AI(
      `I have already gathered information on University of California, San Diego's ${major.name} (department: ${major.college}) program (using https://catalog.ucsd.edu/front/courses.html):

      Here is the JSON data I have collected:
      \`\`\`
      ${JSON.stringify(JSON.parse(fs.readFileSync(`../src/lib/data/ucsd/${major.id}.json`)), undefined, 2)}
      \`\`\`

      Change the first link in the "sources" array to instead use the link for the "undergraduate program", as noted on this page: https://catalog.ucsd.edu/front/courses.html
      For example, all majors in the "Astronomy & Astrophysics" department should have the first link in the sources array set to "https://catalog.ucsd.edu/curric/ASTR-ug.html".
      The first link in the sources attribute should be a currently valid URL in the UCSD catalog (https://catalog.ucsd.edu/). Check the catalog page manually to verify it exists.
      
      Give me new JSON data that only changes the first element in the sources attribute.
      Only give me the JSON formatted output.
      Do not write \`\`\` before or after the code.
      Do not change any other attributes.`
    );

    console.log(content);

    fs.writeFileSync(`../src/lib/data/ucsd/${major.id}.json`, JSON.stringify(JSON.parse(content.replaceAll('`', '')), undefined, 2));
  }
}

// stanford();
// ucb();
// mit();
// ucsd();
// ucsdFilterLinksFirstPass();