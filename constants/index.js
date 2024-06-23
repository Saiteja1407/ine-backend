import dotenv from 'dotenv';
dotenv.config();
export const constants = {
    PORT: process.env.PORT,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URL: process.env.DB_URL
}