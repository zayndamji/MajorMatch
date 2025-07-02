// paste into devtools at this URL: https://catalog.mit.edu/degree-charts/
// generates the majors.json file for MIT

{
  const undergradDegreesList = Array.from(document.querySelector('#undergraduatedegreestextcontainer').children).slice(2);

  let currentCollegeName = '';
  const majors = [];
  for (const degree of undergradDegreesList) {
    if (degree.classList.contains('pspace')) {
      // update current college name
      currentCollegeName = degree.textContent.trim();
    } else {
      // this is a degree, add it to the majors array
      const major = {};

      major.name = degree.textContent.trim();
      major.name = major.name.slice(0, major.name.lastIndexOf('(')).trim();

      major.id = degree.firstChild.getAttribute('href').trim();
      if (major.id.slice(-1) == '/') { // remove trailing slash
        major.id = major.id.slice(0, -1);
      }
      major.id = major.id.slice(major.id.lastIndexOf('/')+1);

      major.college = currentCollegeName;

      // console.log(major);

      majors.push(major);
    }
  }

  console.log(JSON.stringify(majors, undefined, 2));
}