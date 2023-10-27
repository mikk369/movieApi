const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws'); // Import the 'ws' library

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const server = require('http').createServer(app); // Create an HTTP server

require('dotenv').config();

app.use(cookieParser());
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static('uploads'));

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// DB connection
let DB = process.env.MONGO_CONNECTION_STRING.replace('<password>', encodeURIComponent(process.env.MONGO_PASSWORD))

// Inject database name into the connection string between the / and ? characters, encoded as a URI component
DB = DB.replace('<dbname>', encodeURIComponent(process.env.MONGO_DATABASE_NAME))

mongoose.connect(DB, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Connected to the database successfully.');
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err.message);
        process.exit();
    });


// Mounting routers on 2 routes
app.use('/api/post', postRoutes);
app.use('/api/users', userRoutes);

// Create a WebSocket server
const wss = new WebSocket.Server({server});

// WebSocket server logic
wss.on('connection', (ws) => {
    // Handle WebSocket connections here
    ws.on('message', (message) => {
        // Handle incoming WebSocket messages
        console.log(`Received: ${message}`);

        try {
            const data = JSON.parse(message);

            if (data.type === 'newMovie') {
                // Handle the 'newMovie' message
                // You can access the movie data using data.movie
                console.log('Received a new movie:', data.movie);

                // Broadcast the new movie to all connected clients
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: 'newMovie', movie: data.movie}));
                    }
                });
            } else if (data.type === 'deletePost') {
                // Handle the 'deletePost' message
                const postId = data.postId;

                // Broadcast the delete event to all connected clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: 'deletePost', postId}));
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    });

    // Send a welcome message to the newly connected client
    ws.send('Welcome to the WebSocket server!');
});

// Start the HTTP server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
