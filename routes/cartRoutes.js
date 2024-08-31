import express from 'express';
import { addCourseToCartController, checkCourseInCartController, getUserCartController,removeCourseFromCartController } from '../controllers/cartController.js';
import verifyToken from '../middlewares/verifyToken.js';

const cartRouter = express.Router();

cartRouter.get('/cart', verifyToken, getUserCartController);

cartRouter.get('/cart/:courseId', verifyToken, checkCourseInCartController);

cartRouter.post('/cart/:courseId', verifyToken, addCourseToCartController);

cartRouter.delete('/cart/:courseId', verifyToken, removeCourseFromCartController);

export default cartRouter;