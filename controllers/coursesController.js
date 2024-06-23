import { getCourseDetails, getCourses, getLesson, markLessonComplete } from "../services/coursesServices.js";

export const getCoursesController = async(req, res) => {
    // Fetch course from database
    const result = await getCourses();
    if(!result){
        res.status(400).send({message: "Error fetching course"});
    }
    res.status(200).send({data:result});
    // res.status(200).send({message: "Course fetched successfully",data:result});
};

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