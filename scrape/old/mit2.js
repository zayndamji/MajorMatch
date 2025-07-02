// WARNING: THIS CODE DOES NOT WORK
// go to /scrape/mit.js for a new, working version

// paste into devtools at each school in MIT: https://catalog.mit.edu/schools/
// generates the majors.json file for MIT

// https://catalog.mit.edu/schools/architecture-planning/#degreesandprogramstext

{
  // change this for each school, combine list into majors.json at the end
  const currentCollegeName = 'School of Architecture and Planning';
  
  const courses = document.querySelectorAll('tbody');

  const majors = [];
  for (const course of courses) {
    let degrees = Array.from(course.children);
    degrees = degrees.filter(e => e.firstChild.textContent.trim() == 'SB' ||
                                  e.firstChild.textContent.trim() == 'SM');
    
    for (const degree of degrees) {
      const major = {};

      major.name = degree.children[1].textContent.trim();

      major.id = degree.firstChild.getAttribute('href').trim();
      if (major.id.slice(-1) == '/') { // remove trailing slash
        major.id = major.id.slice(0, -1);
      }
      major.id = major.id.slice(major.id.lastIndexOf('/')+1);

      major.college = currentCollegeName;

      console.log(major);

      majors.push(major);
    }
  }
}