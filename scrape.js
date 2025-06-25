const AI = require('./ai');
const fs = require('fs');

const schema = fs.readFileSync('schema');
const example = fs.readFileSync('example.json');

async function scrape() {
  const content = await AI(`Format Stanford's CS BS program (https://bulletin.stanford.edu/programs/CS-BS) using this schema:\n${schema}\nHere is an example output:\n${example}\nOnly give me the JSON formatted output. Do not write \`\`\` before or after the code. Do not write anything additional than what is asked for in the schema.\nDo not include any specific Capstone/Honors/Subplan/etc program in these requirements.\nOnly include ALL required courses for the major itself.`);
  console.log(content);
  fs.writeFileSync('data/stanford-cs-bs.json', content);
}

scrape();