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

export const getLesson = async (userId,lessonId) => {
    try {
        const lessonInfo = await client.query(`
                        SELECT 
                            l.id,
                            l.name,
                            l.text_material,
                            l.video_url,
                            l.topic_id,
                            l.lesson_no,
                            CASE 
                                WHEN up.user_id IS NOT NULL THEN true
                                ELSE false
                            END AS is_completed
                        FROM 
                            lessons l
                        LEFT JOIN 
                            user_progress up 
                        ON 
                            l.id = up.lesson_id 
                        AND 
                            up.user_id = $1
                        WHERE 
                            l.id = $2;

            `,[userId,lessonId]);
        return lessonInfo.rows[0];
    } catch (error) {
        console.log(error)
    }
}

export const markLessonComplete = async (userId,lessonId) => {
    try {
        const result = await client.query("INSERT INTO user_progress(user_id, lesson_id) VALUES($1,$2)",[userId,lessonId]);
        return result;
    } catch (error) {
        console.log(error)
    }
}