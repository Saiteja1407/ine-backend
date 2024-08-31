import express from "express";
import { courseDetailsController, getCategoriesController, getCoursesController, getLessonController, lessonCompleteController } from "../controllers/coursesController.js";
import verifyToken from "../middlewares/verifyToken.js";
const coursesRouter = express.Router();

coursesRouter.get("/courses",verifyToken,getCoursesController);
coursesRouter.get('/courses/categories',verifyToken,getCategoriesController)

coursesRouter.get('/courses/:courseId/content',verifyToken,courseDetailsController)

coursesRouter.get('/courses/lesson/:lessonId',verifyToken,getLessonController)

coursesRouter.post('/courses/lesson/:lessonId/complete',verifyToken,lessonCompleteController)

export default coursesRouter;