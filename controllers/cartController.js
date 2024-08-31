import { addCourseToCart, checkCourseInCart, getUserCart, removeCourseFromCart } from "../services/cartServices.js";

export const getUserCartController = async (req, res) => {
    try {
        const userId = req.userId;
        // all courses in cart of user
        const cartCourses = await getUserCart(userId);
        res.status(200).send({data: cartCourses});
    } catch (error) {
        console.log(error);
        
    }
    
}

export const checkCourseInCartController = async (req, res) => {
    const userId = req.userId;
    const courseId = req.params.courseId;
    // check if course is in cart of user
    const courseInCart = await checkCourseInCart(userId, courseId);
    res.status(200).send({data: courseInCart});
}

export const addCourseToCartController = async (req, res) => {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const courseAdded = await addCourseToCart(userId, courseId);
    res.status(200).send({message: 'course added to cart'});
}

export const removeCourseFromCartController = async (req, res) => {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const courseRemoved = await removeCourseFromCart(userId, courseId);
    res.status(200).send({message: 'course removed from cart'});
}