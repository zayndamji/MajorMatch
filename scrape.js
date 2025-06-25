const AI = require('./ai');
const fs = require('fs');

const schema = fs.readFileSync('schema');

async function scrape() {
  const content = await AI(`Can you format Stanford's CS BS program (https://bulletin.stanford.edu/programs/CS-BS) using this schema:\n${schema}\n\nOnly give me the JSON formatted output. Do not write \`\`\` before or after the code. Do not write anything additional than what is asked for in the schema.\nMake sure to include ALL required courses using the webpage provided.`);
  console.log(content);
  fs.writeFileSync('data/stanford-cs-bs.json', content);
}

scrape();