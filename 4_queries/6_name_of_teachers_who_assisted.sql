-- Both queries works
-- SELECT DISTINCT teachers.name AS teacher,
--        cohorts.name AS cohort 
-- FROM teachers
-- LEFT JOIN assistance_requests ON teachers.id = teacher_id
-- JOIN students ON students.id = student_id
-- JOIN cohorts ON cohorts.id = cohort_id
-- GROUP BY teachers.name, cohorts.name
-- HAVING cohorts.name = 'JUL02'
-- ORDER BY teachers.name;


SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;