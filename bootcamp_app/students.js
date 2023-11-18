const {Pool} = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});


// alternative way to connect is using client but Pool is preferred.
// const { Client } = require('pg');

// const client = new Client({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'bootcampx'
// });


const queryString = `

SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;

`;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`,limit];

pool.query(queryString,values)
    .then(res => {
        // console.log(res.rows);
        res.rows.forEach(user => {
          console.log(`
          
          ${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.
      
          `);
        })
      })
      .catch(err => {
        console.log('query error: ',err.stack);
      });








// without SQL injection attack
// pool.query(`

//   SELECT students.id as student_id, students.name as name, cohorts.name as cohort
//   FROM students
//   JOIN cohorts ON cohorts.id = cohort_id
//   WHERE cohorts.name LIKE '%${process.argv[2]}%'
//   LIMIT ${process.argv[3] || 5};

// `)
// .then(res => {
//   // console.log(res.rows);
//   res.rows.forEach(user => {
//     console.log(`
    
//     ${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.

//     `);
//   })
// })
// .catch(err => {
//   console.log('query error: ',err.stack);
// });