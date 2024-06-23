import client from "../db.js";

export const getCourses = async () => {
    try {
        // Fetch courses from database
        const result = await client.query("SELECT * FROM courses");
        return result.rows;
    } catch (error) {
        console.log("error fetching courses");
    }
}

export const getCourseDetails = async (courseId) => {
    try {
        // Fetch course details from database
        const courseDetails = await client.query("SELECT * FROM courses WHERE id=$1",[courseId]);
        const topics = await client.query("SELECT * FROM topics WHERE course_id=$1",[courseId]);
        const lessons = await client.query(`
            SELECT lessons.* 
            FROM lessons 
            JOIN topics ON lessons.topic_id = topics.id 
            WHERE topics.course_id = $1
        `, [courseId]);
        return {
            courseDetails: courseDetails.rows[0],
            topics: topics.rows,
            lessons: lessons.rows
        };
    } catch (error) {
        console.log("error fetching course details");
    }
}

export const getLesson = async (lessonId) => {
    try {
        const lessonInfo = await client.query('select * from lessons where id=$1',[lessonId]);
        return lessonInfo.rows[0];
    } catch (error) {
        console.log(error)
    }
}