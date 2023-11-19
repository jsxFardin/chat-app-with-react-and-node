const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// Close the connection when done
//   mongoose.connection.close();
// });


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL 
}));

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
  
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } else {
        res.status(401).json('no token');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username: username,
            password: password,
        });
        jwt.sign({ userId: createdUser._id, username }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
});

app.listen(4000)