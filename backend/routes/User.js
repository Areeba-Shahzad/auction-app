import express from "express";
import { createUser,authUsers, changePassword, getUsers, getAuctions} from '../controllers/User.js';

export const UserRouter = express.Router();

UserRouter.post("/signup",createUser); // signup
UserRouter.post("/login", authUsers); // login
UserRouter.post("/changepassword", changePassword); // change password
UserRouter.post("/profile", getUsers); // my profile
UserRouter.post("/getauctions", getAuctions); // my profile

