import express from 'express';  
import jwt from 'jsonwebtoken';
import { getDb } from '../db.js';  
import bcrypt from 'bcryptjs';
const router = express.Router();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
router.use(cookieParser());
const JWT_SECRET='a3v5$7Y!z*2Dh@1jL%4O*8t@dU8PqL0oM9W9kZgR*3JvX!2KpCq5H3';

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const profiles = await getDb('profiles');
        const user = await profiles.findOne({ email });
        if (user) return res.status(400).json({ msg: "User Already Exists !!! " });
        const hashpassword = await bcrypt.hash(password, 10);
        await profiles.insertOne({ email, password: hashpassword });
        const token = generateToken(email);
        res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 }); 
        return res.status(200).json({ msg: 'User SignedIn successfully !!!', token });
    } catch (error) {
        console.log("error : ", error);
        return res.status(500).json({ msg: 'User Not Registered !!!' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const profiles = await getDb('profiles');
        const user = await profiles.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User Not Registered !!!' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Password !!!' });
        const token = generateToken(email);
        res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 });
        return res.status(200).json({ msg: 'User LoggedIn Successfully !!!', token });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'user not logged in' });
    }
});

export default router;
