const AI = require('./ai');
const fs = require('fs');

const schema = fs.readFileSync('schema');
const example = fs.readFileSync('example.json');

async function scrapeProgram(collegeName, programName, programLink) {
  const content = await AI(
    `Format ${collegeName}'s ${programName} program (${programLink}) using this schema:
    ${schema}

    Here is an example output:
    ${example}

    Only give me the JSON formatted output.
    Do not write \`\`\` before or after the code.
    Do not write anything additional than what is asked for in the schema.
    Do not include any specific Capstone/Honors/Subplan/etc program in these requirements.
    Only include ALL required courses for the major itself.`
  );
  
  console.log(content);

  fs.writeFileSync(`data/${collegeName.toLowerCase().replaceAll(' ', '')}/${programName}.json`, JSON.stringify(JSON.parse(content), undefined, 2));
}

// Stanford
async function stanford() {
  const stanfordMajors = JSON.parse(fs.readFileSync('input/stanford.json'));
  for (const major of stanfordMajors.slice(0, 3)) {
    await scrapeProgram('Stanford', major.name, `https://bulletin.stanford.edu/programs/${major.name}`);
  }
} stanford();