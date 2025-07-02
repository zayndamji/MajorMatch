// WARNING: THIS CODE DOES NOT WORK

// run in browser at https://mitadmissions.org/discover/the-mit-education/majors-minors/
// this will generate the majors.json for MIT

{ // isolate from doc code using scope
  let tableItems = Array.from(document.querySelector(`#majors > tbody`).children);
  tableItems = tableItems.filter(e => e.children[2].textContent.trim().endsWith('Yes')); // filter out majors

  const majors = [];

  for (const item of tableItems) {
    const major = {};

    major.name = item.children[0].firstChild.firstChild.firstChild.textContent.trim();

    major.id = item.children[0].firstChild.querySelector('a').getAttribute('href');
    major.id = major.id.slice(0, major.id.lastIndexOf('/'));
    major.id = major.id.slice(major.id.lastIndexOf('/')+1);

    console.log(major);

    majors.push(major);
  }
}