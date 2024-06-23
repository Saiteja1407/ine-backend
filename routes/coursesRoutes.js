import express from "express";
import { courseDetailsController, getCoursesController, getLessonController } from "../controllers/coursesController.js";
import verifyToken from "../middlewares/verifyToken.js";
const coursesRouter = express.Router();

coursesRouter.get("/courses",verifyToken,getCoursesController);

coursesRouter.get('/courses/:courseId',verifyToken,courseDetailsController)

coursesRouter.get('/courses/lesson/:lessonId',getLessonController)

export default coursesRouter;