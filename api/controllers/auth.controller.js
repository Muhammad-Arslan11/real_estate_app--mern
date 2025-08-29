import User from '../models/user.model.js';

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        return res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
          return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}