const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const express = require('express');
const ws = require('ws');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.use(cookieParser());

// Async Mongoose connection with error handling
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
connectDB();

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if(err) throw err;
        res.json(userData);
    });
}
);

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const foundUser = await User.findOne({username});
    if(foundUser){
        const passOK = bcrypt.compareSync(password, foundUser.password);
        if(passOK){
            jwt.sign({userId: foundUser._id, username}, jwtSecret,{}, (err,token) => {
                res.cookie('token', token, {sameSite:'none', secure:true}).json({
                    id: foundUser._id,
                });
            });
        }
    }
});



app.post('/register', async (req, res) => { // Fixed route URL
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password);
        // Create the user
        const createdUser = await User.create({ 
            username, 
            password: hashedPassword,
        })

        // Sign JWT token
        jwt.sign({ userId: createdUser._id, username}, jwtSecret, {}, (err, token) => {
            if (err) throw err;

            // Set cookie and return user ID
            res.cookie('token', token, { httpOnly: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Start the server
const server = app.listen(4020);

const wss = new ws.WebSocketServer({server});

wss.on('connection', (connection, req) => {

    // read username and id from the cookie for this connection
    const cookies = req.headers.cookie;
    if(cookies){
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token'));
        console.log(tokenCookieString);
        if(tokenCookieString){
            const token = tokenCookieString.split('=')[1];
            if(token){
                jwt.verify(token, jwtSecret, {}, (err, userData) =>{
                    if(err) {
                        throw err;
                    }
                    const {userId, username} = userData;
                    connection.userId = userId;
                    connection.username = username;
                }
                );
            }
        }
    }

    connection.on('message', (message) => {
        console.log(message);
    });

    // notify everyone about online people (when someone connects)
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({userId: c.userId, username: c.username}))
    }));
    });
});



