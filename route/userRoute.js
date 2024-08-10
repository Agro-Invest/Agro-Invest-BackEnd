import { Router } from "express";
import { signup, sessionLogin, tokenLogin, logout } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authn.js";

const userRouter = Router();

userRouter.post('/user/auth/signup', signup);
userRouter.post('/user/auth/sessionlogin', sessionLogin);
userRouter.post('/user/auth/tokenlogin', tokenLogin);
userRouter.post('/user/auth/logout', isAuthenticated, logout);

export default userRouter;