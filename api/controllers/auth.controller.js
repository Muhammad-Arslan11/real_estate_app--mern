import { hashSync } from 'bcryptjs';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/ErrorHandler.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // hash password for better security
    const newUser = new User({ username, email, password:hashedPassword });

    try {
        await newUser.save();
        return res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
          next(error);
    }

}