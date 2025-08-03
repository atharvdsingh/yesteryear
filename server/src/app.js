import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/user.routes.js'

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

app.use('/api/v1/user' , router)

export {app}