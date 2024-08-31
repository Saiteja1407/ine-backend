import express from 'express';
import { checkEnrolledController, enrollStudentController, getUserCoursesController, loginController, logoutController, multipleEnrollmentsController, registerController, verifyCaptchaController } from '../controllers/userControllers.js';
import verifyToken from '../middlewares/verifyToken.js';
const userRouter = express.Router();

userRouter.post('/auth/verifyCaptcha', verifyCaptchaController);

userRouter.post('/auth/register', registerController);

userRouter.post('/auth/login', loginController);

userRouter.post('/auth/logout', logoutController);

userRouter.get('/enrolled/:courseId',verifyToken,checkEnrolledController);
userRouter.post('/enrollments',verifyToken,enrollStudentController);
userRouter.post('/enrollments/multiple',verifyToken,multipleEnrollmentsController);

userRouter.get('/enrollments',verifyToken,getUserCoursesController);




export default userRouter;