// WARNING: THIS CODE DOES NOT WORK

import fs from 'fs'
import xml2js from 'xml2js';

const parser = new xml2js.Parser();

let programs = [];

async function getProgram(id) {
  const res = await fetch(`https://guide.berkeley.edu/ribbit/index.cgi?page=getprogrampopup.rjs&id=${id}&level=ugrad`);
  
  let xml = await res.text();
  xml = xml.replace('<![CDATA[', '');
  xml = xml.replace(']]>', '')

  console.log(xml);

  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }

    const description = result.programpopupinfo.program[0].div[1].div[0].p[0];

    console.log(description + '\n');

    programs.push({
      description: description,
      id: id
    });
  });
}

async function main() {
  for (let i = 1; i <= 156; i++) {
    await getProgram(i);
  }

  fs.writeFileSync('./ucberkeleymajors.json', JSON.stringify(programs, undefined, 2));
} main();