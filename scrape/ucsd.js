// paste into devtools at this URL: https://students.ucsd.edu/academics/advising/majors-minors/undergraduate-majors.html
// generates the majors.json file for UCSD

{
  const list = Array.from(document.querySelector('#main-content > div:nth-child(3) > div > section').children).slice(9)
                .filter(dept => dept.outerHTML.startsWith('<p') && dept.firstChild.getAttribute('href') != '#back' && dept.firstChild.getAttribute('href') != undefined);

  console.log(list);

  const majors = [];
  
  for (const dept of list) {
    const deptName = dept.firstChild.textContent.trim();
    console.log(deptName);

    const deptMajors = dept.innerText.trim().split('\n').slice(1).map(e => e.replace(/\*|‡|†/gi, "").trim());
    console.log(deptMajors);

    for (const majorName of deptMajors) {
      if (majorName.endsWith('(B.A./B.S.)')) { // add 2 majors
        addMajor(deptName, majorName.slice(0, -12) + ' (B.A.)');
        addMajor(deptName, majorName.slice(0, -12) + ' (B.S.)');
      } else {
        addMajor(deptName, majorName);
      }
    }
  }

  function addMajor(deptName, majorName) {
    const major = {};

    major.name = majorName;
    major.id = majorName.replace(/\.|\(|\)|:|(\- )|(\& )/gi, "").toLowerCase().split(' ').join('-').split('/').join('-');
    major.college = deptName;

    if (major.name != '' && major.id != '') {
      majors.push(major);
    }
  }

  console.log(majors);

  JSON.stringify(majors, undefined, 2);
}