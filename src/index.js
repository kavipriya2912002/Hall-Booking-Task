import express from 'express'
import AppRoutes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/', AppRoutes)

let date = new Date().toLocaleTimeString()
console.log(date)

app.listen(PORT, ()=>console.log(`Server Running at ${PORT}`))