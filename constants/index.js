import dotenv from 'dotenv';
dotenv.config();
export const constants = {
    PORT: process.env.PORT,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URL: process.env.DB_URL,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}