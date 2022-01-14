import express from 'express'
import routes from './server/routes/recipeRoutes'
import { connect, mongoose } from './server/models/database';
import cookieParser from 'cookie-parser';
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const app = express()

app.use(cookieParser());
import dotenv from 'dotenv'
import { connectTestDB } from './server/models/mongoMemoryServer.ts';
dotenv.config()

// require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
      secret: 'keyboard cat',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection}),
    })
  )
if (process.env.NODE_ENV==='test') {
  connectTestDB()
  console.log(process.env.NODE_ENV);
} else {
  connect()
  console.log(process.env.NODE_ENV);
}
app.use('/', routes)
export default app