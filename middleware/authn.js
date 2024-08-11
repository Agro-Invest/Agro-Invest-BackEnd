import jwt from 'jsonwebtoken'
import { UserModel } from '../model/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        if (req.session.user) {
            const userId = req.session.user.id;
            const user = await UserModel.findById(userId);
            if (user) {
                next();
            }
            else {
                return res.status(401).send('User not found');
            }
        }
        else if (req.headers.authorization){
            try {
                const token = req.headers.authorization.split(' ')[1];
                req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const user = await UserModel.findById(req.user.id);
                if (!user) {
                    return res.status(401).send('User not found');
                }
                next();
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json("Not Authenticated");
        }
    } catch (error) {
        next(error)
    }
}
