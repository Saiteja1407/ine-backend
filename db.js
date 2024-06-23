
import pg from 'pg'
import { constants } from './constants/index.js';
const { Client } = pg;

const client = new Client({
    host: constants.DB_URL,
    user: "postgres",
    password: "saitejareddy",
    database: "postgres",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect()
            .then(()=>console.log("connected to database"))
            .catch((error)=>console.log(error));
export default client;