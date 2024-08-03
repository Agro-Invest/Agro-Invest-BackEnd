import jwt from 'jsonwebtoken'
import { UserModel } from '../model/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        if (req.session.user) {
            const userId = req.session.user.id;
            console.log(req.session.user.id);
            console.log(userId);
            const user = await UserModel.findById(userId);
            console.log(user);
            if (user) {
                next();
            }
            else {
                return res.status(401).send('User not found using session');
            }
        }
        else if (req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const correctToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (!correctToken) {
                return res.status(401).send('User not found using token');
            }
            else{
                next(); 
            }
        }
    } catch (error) {
        next(error)
    }
}