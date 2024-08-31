import client from "../db.js";

export const getUserCart = async (userId) => {
    try {   
        // Fetch user cart from database
        const userCart = await client.query(`select * from cart join courses on cart.course_id = courses.id where user_id = $1 and status='in_cart'`, [userId]); 
        return userCart.rows;
    } catch (error) {
        console.log(error);
        
    }
}

export const checkCourseInCart = async (userId, courseId) => {
    // check if course is in cart of user
    try {
        const courseInCart = await client.query('select count(id) from cart where user_id = $1 and course_id = $2', [userId, courseId]);
        return courseInCart.rows[0];
    } catch (error) {
        console.log(error);
        
    }
}

export const addCourseToCart = async (userId, courseId) => {
    try {
        const courseAdded = await client.query('insert into cart(user_id,course_id) values($1,$2)', [userId, courseId]);
        return courseAdded.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export const removeCourseFromCart = async (userId, courseId) => {
    try {
        const courseRemoved = await client.query('delete from cart where user_id = $1 and course_id = $2', [userId, courseId]);
        return courseRemoved.rows[0];
    } catch (error) {
        console.log(error);
    }
}