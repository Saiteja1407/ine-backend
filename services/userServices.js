import client from "../db.js";

export const addUser = async (user) => {
    try {
        const { name, email, password } = user;
        // add user to database
        const result = await client.query("INSERT INTO users(name,email, password) VALUES($1,$2,$3) RETURNING *",[name, email, password]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export const getUserCredentials = async (emailId) => {
    try {
        // get user details from database
        const user = await client.query("SELECT * FROM users WHERE email=$1",[emailId]);
        return user.rows[0];
    } catch (error) {
        console.log("error verifying user");
    }
}

export const getUserCoursesInfo = async (userId) => {
    try {
        // Fetch user courses  from database
        const result = await client.query(`
            SELECT
                c.id AS course_id,
                c.title AS course_title,
                COUNT(l.id) AS total_lessons,
                COUNT(up.lesson_id) AS completed_lessons
            FROM courses c
            JOIN enrollments e ON c.id = e.course_id
            JOIN topics t ON c.id = t.course_id
            JOIN lessons l ON t.id = l.topic_id
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND e.user_id = up.user_id
            WHERE e.user_id = $1
            GROUP BY c.id, c.title
            ORDER BY c.title`, [userId]);
        return result.rows;
    } catch (error) {
        console.log("error fetching user courses");
    }
}

export const checkStudentEnrolled = async (userId, courseId) => {
    try {
        // check if user is enrolled in the course
        const isEnrolled = await client.query("SELECT * FROM enrollments WHERE user_id=$1 AND course_id=$2",[userId, courseId]);
        return isEnrolled.rows[0];
    } catch (error) {
        console.log("error checking enrollment");
    }
}


export const enrollStudent = async (userId,courseId) =>{
    try {
        const enrolled = await client.query("INSERT INTO enrollments(user_id, course_id) VALUES($1, $2) returning *", [userId, courseId]);
        return enrolled.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export const multipleEnrollments = async (userId, courseIds) => {
    try {
        await client.query('BEGIN');
        const enrollmentPromises = courseIds.map(courseId => {
            return client.query('insert into enrollments(user_id, course_id) values($1, $2) on conflict do nothing', [userId, courseId]);
        });
        await Promise.all(enrollmentPromises);
        await client.query(`
            update cart 
            set status = 'purchased'
            where user_id = $1 and course_id = any($2)`, [userId, courseIds]);
        await client.query('COMMIT');
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
    }
}