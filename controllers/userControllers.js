import {hashSync,compareSync, genSaltSync} from 'bcrypt';
import {addUser, checkStudentEnrolled, enrollStudent, getUserCoursesInfo, getUserCredentials, multipleEnrollments} from '../services/userServices.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
import { constants } from '../constants/index.js';
dotenv.config();

export const verifyCaptchaController = async(req, res) => {
    const {captchaValue} = req.body;
    const captchaSecret = constants.RECAPTCHA_SECRET_KEY;
    const  result  = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captchaValue}`,
      )
      res.send(result.data)
}


export const registerController = async(req, res) => {
    const user = req.body;
    // fetch user details from database, if user exists return error
    const userExists = await getUserCredentials(user.email);
    if(userExists){
        return res.status(409).send({message: "User already exists"});
    }
    const salt = genSaltSync(8);
    user.password = hashSync(user.password, salt);
    const result =  await addUser(user);
    if(!result) {
        return res.status(400).send({message: "User registration failed"});
    }
    const token = jwt.sign({id: result.id}, constants.JWT_SECRET, {expiresIn: "1d"});
    res.status(200).send({message: "User registered successfully", data: result.id, token: token})
}

export const loginController = async(req, res) => {
    const {email, password} = req.body;
    // get user details from database
    const user = await getUserCredentials(email);
    if(!user){
        return res.status(409).send({message: "email doesn't exist"});
    }
    const match = compareSync(password, user.password);
    if(!match){
        return res.status(401).send({message: "Invalid credentials"});
    }
    const token = jwt.sign({id: user.id}, constants.JWT_SECRET, {expiresIn: "1d"});
    res.status(200).send({message: "User logged in successfully", data: user.id, token: token});

}

export const getUserCoursesController = async(req, res) => {
    const userId = req.userId;
    // Fetch user courses  from database
    const result = await getUserCoursesInfo(userId);
    if(result.length === 0){
        return res.status(200).send({message: "No user courses",data:[]});
    }
    res.status(200).send({message: "User courses fetched successfully",data:result});
}


export const logoutController = (req, res) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({message: "No token provided"});
    }
    const decoded = jwt.decode(token, constants.JWT_SECRET);
    const userId = decoded.id;
    const expiringToken = jwt.sign({id:userId},constants.JWT_SECRET,{expiresIn:"1s"})
    res.status(200).send({message: "User logged out successfully"});
    
}

export const checkEnrolledController = async(req, res) => {
    const userId =req.userId;
    const courseId = req.params.courseId;
    // check if user is enrolled in the course
    const isEnrolled = await checkStudentEnrolled(userId, courseId);
    if(!isEnrolled){
        return res.status(200).send({msg:"not enrolled",code:0});
    }
    return res.status(200).send({msg:"enrolled",code:1});
}

export const enrollStudentController = async(req,res) => {
    const userId = req.userId;
    const {courseId} = req.body;
    const enrolledres = await enrollStudent(userId,courseId);
    if(!enrolledres){
        return res.status(400).send({msg:"error enrollig student"});
    }
    return res.status(200).send({msg:"student enrolled successfully",})
}

export const multipleEnrollmentsController = async(req,res) => {
    try {
        const {courses} = req.body;
        const userId = req.userId;
        const result = await multipleEnrollments(userId,courses);
        if(result){
            return res.status(200).send({msg:"enrolled successfully"});
        }
    } catch (error) {
        console.log("error enrolling paid courses:",error);
    }
}