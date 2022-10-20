const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

const webSocket = require("ws")
const server = require("http").createServer(app);

const wss = new webSocket.Server({ server: server });
//gets triggered when new client connects
wss.on('connection', function connection(ws) {
  console.log("a new client connected");
  ws.send('welcome new client');

//when server recives message from client
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send("got your msg its: " + message )
  });
});

require('dotenv').config();

app.use(cookieParser());
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

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