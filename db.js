
import pg from 'pg'
import { constants } from './constants/index.js';
const { Client } = pg;

const client = new Client({
    host: constants.DB_URL,
    user:  "sai",
    password: "HHePGpQoHTcSsM3FmC3ZcXJVoToDfoJX",
    database: "ine_db",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect()
            .then(()=>console.log("connected to database"))
            .catch((error)=>console.log(error));
export default client;