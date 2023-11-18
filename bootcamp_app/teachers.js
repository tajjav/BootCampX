const {Pool} = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

// preventing SQL injection
const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1 
  ORDER BY teacher;
`;
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(queryString,values)
    .then(res => {
      // console.log(res.rows);
      res.rows.forEach(user => {
        console.log(`
        
        ${user.teacher} has assisted the ${user.cohort} cohort.

        `);
      })
    })
    .catch(err => {
    console.log('query error: ',err.stack);
    });









// without SQL injection attack prevention
// pool.query(`
//   SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
//   FROM teachers
//   JOIN assistance_requests ON teacher_id = teachers.id
//   JOIN students ON student_id = students.id
//   JOIN cohorts ON cohort_id = cohorts.id
//   WHERE cohorts.name LIKE '%${process.argv[2]}%'
//   ORDER BY teacher;
//   `)
//   .then(res => {
//     // console.log(res.rows);
//     res.rows.forEach(user => {
//       console.log(`
      
//       ${user.teacher} has assisted the ${user.cohort} cohort.

//       `);
//     })
//   })
//   .catch(err => {
//   console.log('query error: ',err.stack);
//   });