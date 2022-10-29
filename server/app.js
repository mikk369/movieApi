const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser")

const app = express();


const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const port = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
//DB connection 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
}).then;
console.log('DB connection successfull!');

//Mounting routers on 2 routes
app.use('/api/post', postRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});