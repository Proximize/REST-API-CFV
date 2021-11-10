require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.on('open', () => console.error("Connected to Database"))

app.use(express.json())


const articlesRouter = require('./routes/articles')//Match the routes -> .js name
app.use('/articles', articlesRouter)

/*
const newsRouter = require('./routes/newsroute')//Match the routes -> .js name
app.use('/infos', newsRouter)*/

app.listen(3000, () => console.log('Server has Started'))