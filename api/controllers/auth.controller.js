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
        return res.status(201).json({success: true, message: 'user created successfully' });
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
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        return res.status(200).json({ success:true, message: 'successfully signed in' });
    } catch (error) {
        return next(errorHandler(500, "internal server error"));

    }

}

export const google = async (req, res, next) =>{
    const {email} = req.body.user;
    try {
        // check if the user exists
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true})
            .status(200).json(rest);
        }else{
            // generate random passowrd of 16 length
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // hash the password
            const hashedPassword = bcrypt.hashSync(randomPassword, 5);
            const {name, email, photo} = req.body;
            const strongName = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);

            // create and save a new user
            const newUser = new User({name: strongName, email, password:hashedPassword, avatar:photo});
            await newUser.save();
        }
        
    } catch (error) {
        next(error);
    }
}
