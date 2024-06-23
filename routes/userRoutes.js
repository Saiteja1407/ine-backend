import express from 'express';
import { checkEnrolledController, enrollStudentController, getUserCoursesController, loginController, logoutController, registerController, verifyCaptchaController } from '../controllers/userControllers.js';
import verifyToken from '../middlewares/verifyToken.js';
const userRouter = express.Router();

userRouter.post('/auth/verifyCaptcha', verifyCaptchaController);

userRouter.post('/auth/register', registerController);

userRouter.post('/auth/login', loginController);

userRouter.post('/auth/logout', logoutController);

userRouter.get('/enrolled/:courseId',verifyToken,checkEnrolledController);
userRouter.post('/enrolled/:courseId',verifyToken,enrollStudentController);

userRouter.get('/:id/profile',verifyToken, getUserCoursesController);



export default userRouter;