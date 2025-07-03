// paste into DevTools at https://admission.ucla.edu/apply/majors
// generates major.json for UCLA

{
  const colleges = document.querySelectorAll('section.border-bottom.custom-field.section__text-background__white');

  const majors = [];
  
  for (const college of colleges) {
    console.log(college);

    const collegeName = college.firstElementChild.textContent.trim();
    console.log(collegeName);

    const majorList = Array.from(college.children[1].children);
    console.log(majorList);
    for (const degree of majorList) {
      console.log(degree);

      if (degree.outerHTML.startsWith('<p><a')) {
        const major = {};

        major.name = degree.firstElementChild.textContent.trim();

        major.id = major.name.replace(/\.|\(|\)|:|(\- )|(\& )|(\| )|(\,)/gi, "").toLowerCase().split(' ').join('-').split('/').join('-');

        major.url = degree.firstElementChild.getAttribute('href').trim();

        major.college = collegeName;

        if (major.name.endsWith(')')) {
          console.log(major);
          majors.push(major);
        }
      }
    }
  }

  console.log(majors);

  JSON.stringify(majors, undefined, 2);
}