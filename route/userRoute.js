import { Router } from "express";
import { signup, sessionLogin, tokenLogin, logout } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authn.js";

const userRouter = Router();

userRouter.post('/user/auth/signup', signup);
userRouter.post('/user/auth/sessionLogin', sessionLogin);
userRouter.post('/user/auth/tokenLogin', tokenLogin);
userRouter.post('/user/auth/logout', isAuthenticated, logout);

export default userRouter;