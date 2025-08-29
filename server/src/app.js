import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import user from './routes/user.routes.js'
import router from './routes/blog.routes.js'
import { errorHandlear } from './middlewares/error.middleware.js'
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:'16kb'
}))

app.use(urlencoded(
    {extended:true,limit:'16kb'}
))

app.use(cookieParser())

app.use('/api/v1/user',user)
app.use('/api/v1/blog',router)
app.use(errorHandlear)
export {app}