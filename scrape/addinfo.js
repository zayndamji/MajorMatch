import fs from 'fs';
import { AI } from './ai.js';

async function addAttributeToMajorsFile(attribute, description) {
  const universities = fs.readdirSync('../src/lib/data', { withFileTypes: true })
                    .filter(e => e.isDirectory())
                    .map(e => e.name);

  for (const university of universities) {
    const majors = JSON.parse(fs.readFileSync('../src/lib/data/' + university + '/majors.json'));
    console.log(university, majors.length);

    for (let i = 0; i < majors.length; i++) {
      const content = await AI(`This is current JSON data I have for major ${majors[i].name} at ${university}:\n\n\`\`\`\`\n${JSON.stringify(majors[i], undefined, 2)}\n\`\`\`\n\nCan you add an attribute called "${attribute}" to the major which should contain: ${description}\nOnly say the value of the attribute, do not include any description or \`\`\` or "" or anything else, unless required by the description I just listed.`);
      console.log(university, majors[i].name, content);

      majors[i].college = content;
    }

    fs.writeFileSync(`./test/${university}-new-data.json`, JSON.stringify(majors, undefined, 2));
  }
}

async function addAttributeToIndividualMajors(attribute, description) {
  const universities = fs.readdirSync('../src/lib/data', { withFileTypes: true })
                    .filter(e => e.isDirectory())
                    .map(e => e.name);

  for (const university of universities) {
    const majors = fs.readdirSync('../src/lib/data/' + university)
                    .filter(e => e != 'majors.json');
    
    for (const major of majors) {
      console.log(university, major);
    }
  }
}

// Add college to the majors.json file located in each folder
// addAttributeToMajorsFile('college', 'the official name of the college where the major is located. For example: "College of Engineering" or "College of Information". College/school names will vary from college to college, refer to the official major listing to confirm the College Name. If a major is jointly owned by two colleges within the same university (such as UC Berkeley MET programs), then list both colleges with a comma in between.');