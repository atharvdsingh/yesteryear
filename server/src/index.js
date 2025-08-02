import { app } from './app.js'
import dotenv from 'dotenv'
import db from './db/index.js'

dotenv.config()
const port= process.env.port || 8000


db().then(
    app.listen(port,()=>{
        console.log(`server is listening at http://localhost:${port}`);
        
    })
).catch('mongo db connection failed')


