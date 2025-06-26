const AI = require('./ai');
const fs = require('fs');

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
  const stanfordMajors = JSON.parse(fs.readFileSync('../src/lib/data/majors.json'));
  for (const major of stanfordMajors.slice(0, 6)) {
    await scrapeProgram('Stanford', major.longName, `https://bulletin.stanford.edu/programs/${major.name}`, `../src/lib/data/stanford/${major.name}.json`);
  }
} stanford();