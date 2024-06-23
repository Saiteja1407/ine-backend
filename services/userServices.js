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
        return courses;
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