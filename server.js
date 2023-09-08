import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'

// security
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from 'express-rate-limit'
import xss from 'xss-clean'

// connect db
import connectDB from './db/connect.js'

// middlerware imports
import notFoundMiddleware from './middleware/not-Found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/authentication.js'

// routes imports
import authRoutes from './routes/auth.js'
import bookRoutes from './routes/book.js'
import allbooksRoutes from './routes/allbooks.js'

const app = express()


app.get('/', (req,res) => {
    res.send('Home welcome')
})

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000,
    max : 100
}))

app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/books/all', allbooksRoutes)
app.use('/api/v1/books', authenticateUser, bookRoutes)


// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {console.log(`Server listening on port ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()