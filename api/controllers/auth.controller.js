import { hashSync } from 'bcryptjs';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/ErrorHandler.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // hash password for better security
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        // check if the user exists
        const user = await User.findOne({ email });
        if (user) {
            return next(errorHandler(400, "User already exists"));
        }


        await newUser.save();
        return res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
        next(error);
    }

}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check if the user exists
        const user = await User.findOne({ email }); 
        if (!user) {
            return next(errorHandler(404, "User does not exists. Please sign Up."));
        }

        // check password
        const isCorrectPassword = bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        return res.status(200).json({ message: 'successfully signed in' });
    } catch (error) {
        return next(errorHandler(500, "internal server error"));

    }

}