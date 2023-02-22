import express from 'express'
import dotenv from 'dotenv'
import employeeRoutes from './routes/employeeRoutes.js'

dotenv.config()
const app = express()

app.use(express.json());

app.use('/api/employees', employeeRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))