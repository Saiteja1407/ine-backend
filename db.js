
import pg from 'pg'
import { constants } from './constants/index.js';
const { Client } = pg;

const client = new Client({
    host: constants.DB_URL,
    user:  constants.DB_USER,
    password: constants.DB_PASSWORD,
    database: constants.DB_NAME,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect()
            .then(()=>console.log("connected to database"))
            .catch((error)=>console.log(error));
export default client;