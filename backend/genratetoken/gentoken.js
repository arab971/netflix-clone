import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (userId,res) => {
    const token = jwt.sign({ id:userId }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    })
    res.cookie("netflix_cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000
    })
    return token
    
}