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

stanford();
// ucb();