import { getCategories, getCourseDetails, getCourses, getLesson, markLessonComplete } from "../services/coursesServices.js";

export const getCoursesController = async (req, res) => {
    // Fetch course from database
    const {category, search } = req.query;
    const page = parseInt(req.query.page,10);
    const limit = parseInt(req.query.limit,10);
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM courses WHERE 1=1`;
    let values = [];

    // Handle category filter
    if (category) {
        query += ` AND category = $${values.length + 1}`;
        values.push(category);
    }

    // Handle search filter
    if (search) {
        query += ` AND (title ILIKE $${values.length + 1} OR description ILIKE $${values.length + 2} OR instructor_name ILIKE $${values.length + 3})`;
        values.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Fetch limit + 1 courses to check for more courses
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit + 1, offset);
    const result = await getCourses(query, values);

    // Determine if there are more courses available
    const hasMoreCourses = result.length > limit;

    // Remove the extra course from the result if it exists
    if (hasMoreCourses) {
        result.pop();
    }

    // Error handling
    if (!result) {
        return res.status(400).send({ message: "Error fetching courses" });
    }

    res.status(200).send({ data: result, hasMoreCourses: hasMoreCourses });
};


export const getCategoriesController = async(req, res) => {
    // Fetch categories from database
    const result = await getCategories();
    if(!result){
        res.status(400).send({message: "Error fetching categories"});
    }
    res.status(200).send({message: "Categories fetched successfully",categories:result});
}

export const courseDetailsController = async(req, res) => {
    const courseId = req.params.courseId;
    // Fetch course details from database
    const result = await getCourseDetails(courseId);
    if(!result){
        res.status(404).send({message: "Error fetching course details"});
    }
    res.status(200).send({message: "Course details fetched successfully",data:result});
}


export const getLessonController = async (req, res) => {
    const userId = req.userId;
    const lessonId = req.params.lessonId;
    const result = await getLesson(userId,lessonId);
    if(!result){
        return res.status(400).send({msg:"error fetching lesson"})
    }
    return res.status(200).send({data:result})
}

export const lessonCompleteController = async (req, res) => {
    const userId = req.userId;
    const lessonId = req.params.lessonId;
    const result = await markLessonComplete(userId,lessonId);
    if(!result){
        return res.status(400).send({msg:"error completing lesson"})
    }
    return res.status(200).send({msg:"lesson completed successfully"})
}

