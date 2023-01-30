const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 8000

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/columns', require('./routes/columnRoutes'))
app.use('/api/cards', require('./routes/cardRoutes'))

app.get('/')

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
