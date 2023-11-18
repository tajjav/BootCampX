
SELECT DISTINCT teachers.name AS teacher,
                cohorts.name AS cohort,
                COUNT(assistance_requests.id) AS total_assistances
FROM teachers
LEFT JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
GROUP BY teachers.name, cohorts.name
HAVING cohorts.name = 'JUL02'
ORDER BY teachers.name;