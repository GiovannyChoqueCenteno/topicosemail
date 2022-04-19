import express, { Application } from 'express'
import authRoute from  './routes/auth.route'
import cors from 'cors'
import morgan from 'morgan'

const app : Application = express();

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

app.use('/auth' , authRoute)

app.listen(4000,()=>{
    console.log("Run server on port 4000")
})